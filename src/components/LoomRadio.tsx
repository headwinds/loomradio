"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { stations } from "@/stations/stations";
import ReactPlayer from "@/ReactPlayer";
import loomradioMark from "@/logo.svg";

interface Station {
  name: string;
  url: string;
  ownmetadataurl?: string;
}

interface MetaData {
  host?: string;
  title?: string;
  artist?: string;
  album?: string;
  [key: string]: any;
}

const LoomRadio: React.FC = () => {
  const [station, setStation] = useState<Station>(
    stations.find((s) => s.name === "bassdrive") || stations[0]
  );
  const [url, setUrl] = useState<string>(station.url);
  const [pip, setPip] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [controls, setControls] = useState<boolean>(false);
  const [light, setLight] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [muted, setMuted] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [loaded, setLoaded] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [loop, setLoop] = useState<boolean>(false);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [currentShow, setCurrentShow] = useState<string>("Loom Radio");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isYouTube, setIsYouTube] = useState<boolean>(false);

  const playerRef = useRef<ReactPlayer>(null);

  const load = useCallback((newUrl: string) => {
    setUrl(newUrl);
    setPlayed(0);
    setLoaded(0);
    setPip(false);

    // Detect if it's a YouTube URL
    const isYT = newUrl.includes("youtube.com") || newUrl.includes("youtu.be");
    setIsYouTube(isYT);

    // Reset PIP if switching from YouTube to audio
    if (!isYT) {
      setPip(false);
    }
  }, []);

  const playPause = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const stop = useCallback(() => {
    setUrl("");
    setPlaying(false);
  }, []);

  const toggleControls = useCallback(() => {
    const currentUrl = url;
    setControls((prev) => !prev);
    setUrl("");
    setTimeout(() => load(currentUrl), 100);
  }, [url, load]);

  const toggleLight = useCallback(() => {
    setLight((prev) => !prev);
  }, []);

  const toggleLoop = useCallback(() => {
    setLoop((prev) => !prev);
  }, []);

  const setVolumeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
    },
    []
  );

  const toggleMuted = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const setPlaybackRateHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPlaybackRate(parseFloat(e.target.value));
    },
    []
  );

  const togglePIP = useCallback(() => {
    setPip((prev) => !prev);
  }, []);

  const onPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const onPause = useCallback(() => {
    setPlaying(false);
  }, []);

  const onProgress = useCallback(
    (state: { played: number; loaded: number }) => {
      setPlayed(state.played);
      setLoaded(state.loaded);
    },
    []
  );

  const onDuration = useCallback((duration: number) => {
    setDuration(duration);
  }, []);

  const onSeekMouseDown = useCallback(() => {
    setSeeking(true);
  }, []);

  const onSeekChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  }, []);

  const onSeekMouseUp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSeeking(false);
      if (playerRef.current) {
        playerRef.current.seekTo(parseFloat(e.target.value));
      }
    },
    []
  );

  const onEnded = useCallback(() => {
    setPlaying(false);
  }, []);

  const onError = useCallback((e: any) => {
    console.error("Player error:", e);
  }, []);

  const onBuffer = useCallback(() => {
    console.log("Player buffering...");
  }, []);

  const [seeking, setSeeking] = useState<boolean>(false);

  const renderMeta = (meta: MetaData) => {
    if (!meta) return null;

    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/20">
        {meta.title && (
          <div className="text-xl font-bold mb-2">{meta.title}</div>
        )}
        {meta.artist && (
          <div className="text-lg font-semibold mb-2 opacity-90">
            {meta.artist}
          </div>
        )}
        {meta.album && <div className="text-base opacity-80">{meta.album}</div>}
      </div>
    );
  };

  const renderStationButtons = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {stations.map((s) => (
        <button
          key={s.name}
          onClick={() => {
            setStation(s);
            load(s.url);
          }}
          className={`bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md ${
            station.name === s.name
              ? "bg-white/40 border-white/50 shadow-lg"
              : ""
          }`}
        >
          {s.name}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary-600 to-secondary-700 text-white font-sans ${
        light ? "from-secondary-500 to-primary-500" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <img
            src={loomradioMark}
            alt="LoomRadio"
            className="w-20 h-20 mx-auto mb-4 drop-shadow-lg animate-fade-in"
          />
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg">
            LoomRadio
          </h1>
        </div>

        {/* Player Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              {isYouTube ? "🎥 Video Player" : "🎵 Audio Player"}
            </h3>
            {isYouTube && (
              <p className="text-sm text-white/70">
                PIP mode available! Click "Enable PIP" to create a floating
                video window.
              </p>
            )}
          </div>
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            width="100%"
            height={isYouTube ? "400px" : "50px"}
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log("Player ready")}
            onStart={() => console.log("Player started")}
            onPlay={onPlay}
            onPause={onPause}
            onBuffer={onBuffer}
            onSeek={onSeekMouseDown}
            onEnded={onEnded}
            onError={onError}
            onProgress={onProgress}
            onDuration={onDuration}
            onEnablePIP={() => setPip(true)}
            onDisablePIP={() => setPip(false)}
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
          <button
            onClick={playPause}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-md"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            onClick={stop}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-md"
          >
            Stop
          </button>
          <button
            onClick={toggleControls}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-md"
          >
            {controls ? "Hide Controls" : "Show Controls"}
          </button>
          <button
            onClick={toggleLight}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-md"
          >
            {light ? "Dark" : "Light"}
          </button>
          <button
            onClick={toggleLoop}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-md"
          >
            {loop ? "No Loop" : "Loop"}
          </button>
          <button
            onClick={togglePIP}
            disabled={!isYouTube}
            className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-md ${
              isYouTube
                ? "bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                : "bg-gray-500/30 border border-gray-400/30 text-gray-300 cursor-not-allowed"
            }`}
          >
            {pip ? "Disable PIP" : "Enable PIP"}
          </button>
          <button
            onClick={() =>
              load(
                "https://www.youtube.com/watch?v=HLDMs7_miOc&list=RDHLDMs7_miOc&start_radio=1&t=20855s"
              )
            }
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border border-red-400 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-md"
          >
            🎵 Test YouTube
          </button>
        </div>

        {/* Volume Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 shadow-xl border border-white/20">
          <label className="font-semibold min-w-24 text-center md:text-left">
            Volume:
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={setVolumeHandler}
            className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <button
            onClick={toggleMuted}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>

        {/* Playback Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 shadow-xl border border-white/20">
          <label className="font-semibold min-w-32 text-center md:text-left">
            Playback Rate:
          </label>
          <input
            type="range"
            min={0.5}
            max={2}
            step="any"
            value={playbackRate}
            onChange={setPlaybackRateHandler}
            className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <span className="font-semibold text-lg">{playbackRate}x</span>
        </div>

        {/* Progress Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl border border-white/20">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={onSeekMouseDown}
            onChange={onSeekChange}
            onMouseUp={onSeekMouseUp as any}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb mb-4"
          />
          <div className="text-center font-semibold text-lg">
            {formatTime(played * duration)} / {formatTime(duration)}
          </div>
        </div>

        {renderStationButtons()}
        {meta && renderMeta(meta)}
      </div>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default LoomRadio;
