import React, { Component } from "react";
// import { findDOMNode } from "react-dom";
// import screenfull from "screenfull";
// import config from "./config";
import DanceFloor from "./channel/DanceFloor";
import loomradioMark from "./loomradio_mark.svg";
import { version } from "../package.json";
import ReactPlayer from "./ReactPlayer";
import { stations } from "./stations/stations";

const station = stations.find((station) => station.name === "bassdrive");
const bassdrive = station.url;
const torontoRadio1 = bassdrive;
const torontoRadio2 = bassdrive;

class App extends Component {
  state = {
    station,
    url: bassdrive, //
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    meta: null,
    currentShow: "Loom Radio",
  };
  componentDidMount() {}
  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };
  playPause = (event) => {
    this.setState({ playing: !this.state.playing });
  };
  stop = () => {
    this.setState({ url: null, playing: false });
  };
  toggleControls = () => {
    const url = this.state.url;
    this.setState(
      {
        controls: !this.state.controls,
        url: null,
      },
      () => this.load(url)
    );
  };
  toggleLight = () => {
    this.setState({ light: !this.state.light });
  };
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };
  setVolume = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };
  setPlaybackRate = (e) => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };
  togglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };
  onSearch = () => {
    /*

    Need to get googleAPI key and store config on dropbox

    const { meta } = this.state;
    const cx = "001416230067881723525:aixpfy93ova";
    const query = `${meta.host} drum and bass`;
    const apiKey = config.googleAPI;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;
    fetch(url).then(
      success => {
        console.log("TCL: App -> onSearch -> success", success);
      },
      fail => {}
    );
    */
  };

  fetchMeta = (station) => {
    const { ownmetadataurl } = station;

    const self = this;

    const decoder = new TextDecoder("utf-8");
    return fetch(ownmetadataurl).then((response) => {
      response.body
        .getReader()
        .read()
        .then(({ value, done }) => {
          console.log(decoder.decode(value));
          const artist = decoder.decode(value);

          const host = artist.split("-")[0];
          const show = artist.split("-")[1]; // need parse out date

          return self.setState({ meta: { StreamTitle: artist }, host, show });
        });
    });
  };

  onPlay = () => {
    console.log("App onPlay");
    const self = this;
    const { station, url } = this.state;

    const Parser = require("icecast-parser");
    const radioStation = new Parser(url);

    // "http://bassdrive.radioca.st/;stream/1"

    if (station.ownmetadataurl) {
      this.fetchMeta(station);
    }

    radioStation.on("metadata", function (metadata) {
      //Live from NY hosted by Overfiend - special guest SOHLMAN
      //The Prague Connection June 17th 2019 - hosted by Blofeld
      const host = metadata.StreamTitle.split("by")[1];
      const show = metadata.StreamTitle.split("hosted")[0]; // need parse out date

      console.log("App onPlay metadata: ", metadata);

      self.setState({ meta: metadata, host, show });
    });

    radioStation.on("end", function (error) {
      console.log("radioStation ended");
    });

    radioStation.on("error", function (error) {
      console.log("radioStation error", error);
    });

    radioStation.on("empty", function () {
      console.log("radioStation empty");
    });

    radioStation.on("stream", function (stream) {
      //stream.pipe(process.stdout);
      console.log("radioStation stream ", stream);
    });

    radioStation.on("error", (error) => {
      console.log("radioStation error ", error);
    });

    this.setState({ playing: true });
  };
  onEnablePIP = () => {
    console.log("onEnablePIP");
    this.setState({ pip: true });
  };
  onDisablePIP = () => {
    console.log("onDisablePIP");
    this.setState({ pip: false });
  };
  onPause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  onSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };
  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };
  onSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };
  onProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  onEnded = () => {
    console.log("onEnded");
    this.setState({ playing: this.state.loop });
  };
  onDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };
  onClickFullscreen = () => {
    // screenfull.request(findDOMNode(this.player));
  };
  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };
  ref = (player) => {
    this.player = player;
  };
  renderMeta = (meta) => {
    if (this.state.playing && this.state.meta) {
      console.log("App meta: ", meta);
      return (
        <div className="meta">
          <button onClick={this.onSearch} className="meta-show">
            <h2>{this.state.meta.StreamTitle}</h2>
          </button>
        </div>
      );
    } else if (this.state.currentShow !== "Loom Radio") {
      return <div className="meta">no stream details available</div>;
    }
  };

  selectShow = (currentShow) => (e) => {
    const station = stations.find((station) => station.name === currentShow);
    const { url } = station;

    this.setState({ currentShow, station, url, meta: null });
  };

  onErrorHandler = (e) => {
    console.log(e);
  };

  onBufferHandler = () => {
    console.log("App handling buffer from FilePlayer");
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
      currentShow,
    } = this.state;
    const SEPARATOR = " · ";

    const min = 0;
    const max = 1;

    const renderStationButtons = () => {
      return stations.map((station) => {
        const { name } = station;
        return (
          <button
            className="select-show"
            onClick={this.selectShow(name)}
            key={name}
          >
            {name}
          </button>
        );
      });
    };

    return (
      <div className="loomradio">
        <section className="section">
          <DanceFloor />
          <div>
            <img src={loomradioMark} alt="loomradio" />
          </div>
          <h1>{currentShow}</h1>
          <div
            className="player-wrapper"
            style={{ display: "none", marginBottom: 20 }}
          >
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="100%"
              height="100%"
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log("onReady")}
              onStart={() => console.log("onStart")}
              onPlay={this.onPlay}
              onEnablePIP={this.onEnablePIP}
              onDisablePIP={this.onDisablePIP}
              onPause={this.onPause}
              onBuffer={this.onBufferHandler}
              onSeek={(e) => console.log("onSeek", e)}
              onEnded={this.onEnded}
              onError={this.onErrorHandler}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>
          {this.renderMeta()}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {currentShow !== "Loom Radio" && (
              <button className="playBtn animate-in" onClick={this.playPause}>
                {playing ? "Pause" : "Play"}
              </button>
            )}

            {currentShow !== "Loom Radio" && (
              <input
                className="InputRange animate-in"
                type="range"
                min={min}
                max={max}
                step="any"
                value={volume}
                onChange={this.setVolume}
                style={{
                  backgroundSize: `${
                    ((volume - min) / (max - min)) * 100
                  }% 100%`,
                }}
              />
            )}
          </div>
          <div>
            {renderStationButtons()}
            {/*
            <button
              className="select-show"
              onClick={this.selectShow("CBC Radio 1")}
            >
              CBC Radio 1
            </button>
            <button
              className="select-show"
              onClick={this.selectShow("CBC Radio 2")}
            >
              CBC Radio 2
            </button>*/}
          </div>
          <div>
            <span style={{ fontSize: 10, color: "#ddd" }}>{version}</span>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
