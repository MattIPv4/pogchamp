# pogchamp

**Each day brings a new PogChamp emote to Twitch. View the latest PogChamp of the Day at [pogchamp.today](https://pogchamp.today).**

## About

Following the recent events in the United States of America, [Twitch decided to remove the original PogChamp emote](https://twitter.com/Twitch/status/1347003152222937088) due to the person behind the face inciting further violence.

To replace the iconic 'Pog' moment that the old PogChamp emote filled, based on a community suggestion, [Twitch are now rolling out a new face for the PogChamp emote every 24hrs](https://twitter.com/Twitch/status/1347589555197595650).

Inspired by this, I decided to create [pogchamp.today](https://pogchamp.today), based on the [visuals Twitch used](https://twitter.com/Twitch/status/1347953496964931601) in [recent PogChamp reveals](https://twitter.com/Twitch/status/1348314946501808135), to allow anyone to quickly see the latest PogChamp emote online.

*pogchamp.today is not affiliated with [Twitch Interactive, Inc.](https://www.twitch.tv/about/) Built by [Matt Cowley](https://mattcowley.co.uk/).*

### How it works

For some reason or another, it seems that the new limited-edition PogChamp emotes aren't revealed in the [Twitch emotes API](https://dev.twitch.tv/docs/v5/reference/chat#get-all-chat-emoticons).

To get around this, the [`build/fetch-emote.js`](build/fetch-emote.js) script actually connects to a Twitch channel IRC chat and sends 'PogChamp', listening for the parsed response from Twitch which will include the emote data.

This emote data is then saved to a JSON file which is [ingested by the website build process](.posthtmlrc.js), using Parcel & PostHTML.

[GitHub Actions is then utilised to run the build script every 30 minutes](.github/workflows/build.yml), day and night, to ensure that the website is almost always showing the latest PogChamp emote for Twitch.

## License

This project is licensed under [Apache 2.0](LICENSE). Contributions are welcome!
