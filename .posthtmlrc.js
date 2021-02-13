const data = require('./build/data.json');
const history = require('./build/history.json');

const historical = history.sort((a, b) => b.timestamp - a.timestamp).map(pog => ({
    date: (new Date(pog.timestamp * 1000)).toDateString(),
    image: pog.img.large,
}));

module.exports = {
    plugins: {
        'posthtml-expressions': {
            locals: {
                pogChampId: data.id,
                pogChampUrlSmall: data.img.small,
                pogChampUrlMedium: data.img.medium,
                pogChampUrlLarge: data.img.large,
                siteTitle: 'PogChamp of the Day',
                siteDescription: 'Your new PogChamp is... View the new Twitch PogChamp and the history of the PogChamp of the Day at pogchamp.today',
                winner: {
                    ...historical.shift(),
                    vote: 81,
                },
                historical,
            },
        },
    },
};
