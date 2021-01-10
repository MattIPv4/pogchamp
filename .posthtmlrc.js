const data = require('./build/data.json');

module.exports = {
    plugins: {
        'posthtml-expressions': {
            locals: {
                pogChampId: data.id,
                pogChampUrlSmall: `https://static-cdn.jtvnw.net/emoticons/v2/${data.id}/default/dark/1.0`,
                pogChampUrlMedium: `https://static-cdn.jtvnw.net/emoticons/v2/${data.id}/default/dark/1.0`,
                pogChampUrlLarge: `https://static-cdn.jtvnw.net/emoticons/v2/${data.id}/default/dark/3.0`,
                siteTitle: 'PogChamp of the Day',
                siteDescription: 'Each day brings a new PogChamp emote to Twitch. View the latest PogChamp of the Day at pogchamp.today',
            },
        },
    },
};
