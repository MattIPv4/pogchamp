const fs = require('fs').promises;
const path = require('path');
const tmi = require('tmi.js');
const config = require('./config');

// Get the PogChamp emote from the Twitch API directly
// This doesn't work, it returns the original (now removed) PogChamp
// const fetchFromAPI = async () => {
//     const resp = await fetch('https://api.twitch.tv/kraken/chat/emoticons', {
//         headers: {
//             'Accept': 'application/vnd.twitchtv.v5+json',
//             'Client-Id': config.TWITCH_CLIENT_ID,
//         },
//     });
//     const data = await resp.json();
//     const pogChamp = data.emoticons.filter(emoticon => emoticon.regex === 'PogChamp');
//     await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(pogChamp));
// };

// Abort if a nested Promise fails anywhere
process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

// Get the PogChamp emote by sending a message in chat
const fetchFromChat = () => new Promise(async (resolve, reject) => {
    // Create the bot client to send and a public client to listen
    const botClient = new tmi.Client({
        connection: {
            reconnect: true,
            secure: true,
        },
        identity: {
            username: config.TWITCH_USERNAME,
            password: config.TWITCH_PASSWORD,
        },
        channels: [ config.TWITCH_CHANNEL ],
    });
    const publicClient = new tmi.Client({
        connection: {
            reconnect: true,
            secure: true,
        },
        channels: [ config.TWITCH_CHANNEL ],
    });

    // Handle rejections and clean up
    const handleReject = err => {
        // Attempt to close
        publicClient.disconnect().catch(() => {});
        botClient.disconnect().catch(() => {});

        // Clear the timeout
        clearTimeout(abort);

        // Reject
        reject(err);
    };

    // Abort if Twitch doesn't work
    const abort = setTimeout(() => handleReject(new Error('Twitch interaction took too long (15s)')), 15 * 1000);

    // Define a unique key and message
    const key = (Math.random() * 10000).toString();
    const message = `PogChamp ${key}`;

    // Process incoming messages
    const handleMessage = async (channel, tags, msg) => {
        if (channel !== '#' + config.TWITCH_CHANNEL) return;
        if (tags.username !== config.TWITCH_USERNAME) return;
        if (msg !== message) return;

        // We have our message, find the emote
        const pogChamp = Object.keys(tags.emotes)[0];
        if (!pogChamp) return;

        // Disconnect clients
        await publicClient.disconnect().catch(handleReject);
        console.log('Public disconnected');
        await botClient.disconnect().catch(handleReject);
        console.log('Bot disconnected');

        // Resolve
        clearTimeout(abort);
        console.log(Number(pogChamp));
        resolve(Number(pogChamp));
    };
    publicClient.on('message', handleMessage);

    // Start the clients
    await publicClient.connect().catch(handleReject);
    console.log('Public connected');
    await botClient.connect().catch(handleReject);
    console.log('Bot connected');

    // Send the message
    await botClient.say(config.TWITCH_CHANNEL, message).catch(handleReject);
    console.log('Message sent');
});

const main = async () => {
    // Get the emote (allow one retry)
    const id = await fetchFromChat().catch(e => {
        console.warn(e);
        console.log('Running second attempt');
        return fetchFromChat();
    });

    // Build the full data
    const pogChamp = {
        id: id,
        img: {
            small: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`,
            medium: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/2.0`,
            large: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`,
        },
    };
    console.log(pogChamp);

    // Store
    await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(pogChamp, null, 2) + '\n');
};

// Do the fetch
main().then(() => {
    // Done, forcefully exit 'cause things don't always cleanup properly
    console.log('All done');
    process.exit(0);
});
