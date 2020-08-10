// HTTPS
//https://www.internet-radio.com/stations/techno/
/*
  {
    url: "http://24-7nicheradio.com:8230/stream?type=http&nocache=110076",
    type: "northernsoul",
    name: "24-7 Northern Soul",
    working: true,
  },


  metadatatechnic: "ownmetadataurl",
  ownmetadataurl: "https://www.internet-radio.com/ssl/uk7/8000/currentsong",
  streamurl: "https://uk7.internet-radio.com/proxy/movedahouse?mp=/",
  streamtype: "shoutcast2",

  const decoder = new TextDecoder('utf-8')
fetch('https://www.internet-radio.com/ssl/uk7/8000/currentsong')
  .then(response => {
    response.body
      .getReader()
      .read()
      .then(({value, done}) => {
        console.log(decoder.decode(value))
      })
  })

  https://uk6.internet-radio.com/proxy/oldskool/

  https://uk5.internet-radio.com/proxy/mmr?mp=/stream;

// icy https://www.moonmission.jp

  {
    url: "https://uk5.internet-radio.com/proxy/mmr?mp=/stream;",
    type: "deep, tech-house",
    name: "moon mission",
    working: true,
    streamtype: "shoutcast2",
  },

  Northern Soul but not https!
  http://146.71.124.10:8230/stream
  http://www.24-7nicheradio.com
  https://scraper2.onlineradiobox.com/uk.247northernsoul?l=0

*/

// working xsl
// https://www.internet-radio.com/ssl/uk2/8288/nowplaying.xsl

// https://uk7.internet-radio.com/proxy/movedahouse?mp=
// https://uk2.internet-radio.com/proxy/magic1152?mp=
// https://uk2.internet-radio.com/proxy/oldskool?mp=
// https://uk2.internet-radio.com/proxy/mmr?mp=

export const stations = [
  {
    url: "https://us1.streamingpulse.com/ssl/OLDSKOOL101",
    type: "hip hop, R&B",
    name: "oldskool101",
    working: true,
    streamtype: "shoutcast2",
    site: "http://www.oldskool101.com/",
  },
  {
    url: "https://uk6.internet-radio.com/proxy/oldskool?mp=/stream;",
    type: "house",
    name: "old skool house",
    working: true,
    streamtype: "shoutcast2",
  },
  {
    url: "https://uk7.internet-radio.com/proxy/movedahouse?mp=/stream;",
    ownmetadataurl: "https://www.internet-radio.com/ssl/uk7/8000/currentsong",
    type: "house",
    name: "move da house",
    working: true,
    streamtype: "shoutcast2",
  },
  {
    url: "https://bassdrive.radioca.st/;stream/1",
    type: "drumandbass",
    name: "bassdrive",
    working: true,
    streamtype: "icecast",
  },
  {
    url: "https://uk5.internet-radio.com/proxy/mmr?mp=/stream;",
    type: "deep, tech-house",
    name: "moon mission",
    working: true,
    streamtype: "shoutcast2",
  },
];

export const canadianRadioStations = [
  {
    url:
      "https://cbc_r1_tor.akacast.akamaistream.net/7/632/451661/v1/rc.akacast.akamaistream.net/cbc_r1_tor",
    type: "cbc",
    name: "CBC Radio 1",
    working: true,
  },
  {
    url:
      "https://cbc_r2_tor.akacast.akamaistream.net/7/364/451661/v1/rc.akacast.akamaistream.net/cbc_r2_tor",
    type: "cbc",
    name: "CBC Radio 2",
    working: true,
  },
];

export default {};
