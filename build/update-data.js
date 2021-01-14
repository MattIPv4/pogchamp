const fs = require('fs').promises;
const path = require('path');

const exists = file => fs.access(file).then(() => true).catch(() => false);

const main = async () => {
    // Read in the latest
    const latest = JSON.parse(await fs.readFile(path.join(__dirname, 'data.json'), 'utf8'));

    // Get the historical data if present
    const historical = (await exists(path.join(__dirname, 'history.json')))
        ? JSON.parse(await fs.readFile(path.join(__dirname, 'history.json'), 'utf8'))
        : [];

    // Determine the latest in historical (newest first)
    const historicalLatest = historical.sort((a, b) => b.timestamp - a.timestamp);

    // If latest is historical latest, no-op
    if (historicalLatest.length && historicalLatest[0].id === latest.id) return '';

    // Set the timestamp to the unix value for midnight of current day
    const secondsInDay = 60 * 60 * 24;
    latest.timestamp = Math.floor(Date.now() / 1000 / secondsInDay) * secondsInDay;

    // Store the history with the latest added
    await fs.writeFile(path.join(__dirname, 'history.json'), JSON.stringify(historical.concat(latest), null, 2) + '\n');
    return 'updated';
};

// Do the check
main().then(result => {
    // Done, log the result
    console.log(result);
});
