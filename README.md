# Loom Radio

After discovering [React-Player](https://cookpete.com/react-player/), I wanted to strip it down to play shoutcast streams so that I could stream and switch between my favourite radio stations [bassdrive](http://www.basedrive.com) and [cbc radio](https://www.cbc.ca/radio/includes/stream.html).

I wanted to make React Player easy to deploy with [now](https://zeit.co/now) and thus ported it into a simple create react app so I wouldn't have to worry about webpack config. I added [icecast-parse](https://www.npmjs.com/package/icecast-parser) so that I could see the current show title. Then I thought it would be nice to throw that title into a google search.

[loomradio.now.sh](https://loomradio.now.sh/)

#### Getting Started

```
yarn
yarn start
```

#### Styles

see styles > LoomRadio.css

#### Google Search

sign up for a free [google search](https://developers.google.com/custom-search/v1/overview) API which gives 100 searches per day.

find src > config_sample.js and rename it to config.js - add your google API key to this file.

## Pusher 

I want to see who is connected to various channels and track usage over time. While I'd prefer to use Socket.io, I couldn't find a decent way to install it on Zeit and didn't want to host with Heroku so I used the [Pusher](https://www.pusher.com) service instead to create the socket as a service. 

#### Deply to Zeit

```
now
```

#### CBC Radio Schedules 

Since the stream meta is not available, could I scrape the schedules instead and display the show based on the current time?

https://www.cbc.ca/m/touch/pg-r1.html

TODO - Create a beautiful soup service


#### Credit 
* [Create React App](https://github.com/facebook/create-react-app)
* [React-Player](https://cookpete.com/react-player/)
* [icecast-parse](https://www.npmjs.com/package/icecast-parser)
* [google search](https://developers.google.com/custom-search/v1/overview)
* [loom](https://www.eurogamer.net/articles/2015-04-26-remembering-loom-the-game-designed-to-be-completed)
* [observable music viz](https://observablehq.com/@alandelip/music-viz)