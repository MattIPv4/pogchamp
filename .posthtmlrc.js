const data = require('./build/data.json');
const history = require('./build/history.json');

module.exports = {
    plugins: {
        'posthtml-expressions': {
            locals: {
                pogChampId: data.id,
                pogChampUrlSmall: data.img.small,
                pogChampUrlMedium: data.img.medium,
                pogChampUrlLarge: data.img.large,
                siteTitle: 'PogChamp of the Day',
                siteDescription: 'Each day brings a new PogChamp emote to Twitch. View the latest PogChamp of the Day at pogchamp.today',
                historical: history.sort((a, b) => b.timestamp - a.timestamp).map(pog => ({
                    date: (new Date(pog.timestamp * 1000)).toDateString(),
                    image: pog.img.large,
                })),
            },
        },
    },
};
