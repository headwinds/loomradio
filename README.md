# Loom Radio

After discovering [React-Player](https://cookpete.com/react-player/), I wanted to strip it down to play shoutcast streams so that I could stream and switch between my favourite radio stations [bassdrive](http://www.basedrive.com) and [cbc radio](https://www.cbc.ca/radio/includes/stream.html).

I wanted to make React Player easy to deploy with [now](https://zeit.co/now) and thus ported it into a simple create react app so I wouldn't have to worry about webpack config. I added [icecast-parse](https://www.npmjs.com/package/icecast-parser) so that I could see the current show title. Then I thought it would be nice to throw that title into a google search.

#### Getting Started

sign up for a free [google search](https://developers.google.com/custom-search/v1/overview) API which gives 100 searches per day.

find src > config_sample.js and rename it to config.js - add your google API key to this file.

```
yarn 
yarn start
```

#### Deply to Zeit

```
now
```


#### Credit 
* [Create React App](https://github.com/facebook/create-react-app)
* [React-Player](https://cookpete.com/react-player/)
* [icecast-parse](https://www.npmjs.com/package/icecast-parser)
* [google search](https://developers.google.com/custom-search/v1/overview)
* [loom])(https://www.eurogamer.net/articles/2015-04-26-remembering-loom-the-game-designed-to-be-completed)
* [observable music viz](https://observablehq.com/@alandelip/music-viz)