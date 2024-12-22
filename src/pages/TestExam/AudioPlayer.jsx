import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateLeft,
  faRotateRight,
  faVolumeUp,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({
  src,
  submitting,
  practiceTestData,
  currentSkillKey,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false); // Track if user is dragging

  useEffect(() => {
    const audio = audioRef.current;

    const handleCanPlay = () => {
      // Only play if the conditions are met
      if (currentSkillKey === "listening" && !submitting) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Autoplay blocked or error occurred:", err);
          });
      }
    };

    const stopAudio = () => {
      if (submitting || currentSkillKey == "listening") {
        audio.pause();
        setIsPlaying(false);
      }
    };

    // Attach listener for canplay
    audio.addEventListener("canplay", handleCanPlay);

    // Check conditions immediately on mount or dependency change
    stopAudio();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.pause(); // Cleanup: stop audio when unmounting
      setIsPlaying(false);
    };
  }, [currentSkillKey, submitting]); // Dependencies include the states you're watching

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio play failed:", error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isSeeking) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    setCurrentTime(seekTime);
  };

  const commitSeek = async (event) => {
    const seekTime = (event.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
    setIsSeeking(false);
    if (wasPlayingBeforeSeek) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio play failed after seeking:", error);
      }
    }
  };

  const handleSeekStart = () => {
    if (audioRef.current) {
      setWasPlayingBeforeSeek(isPlaying); // Save the current play state
      audioRef.current.pause(); // Pause audio while seeking
      setIsSeeking(true); // Indicate seeking
    }
  };

  const seekBackward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
      setCurrentTime(audio.currentTime);
    }
  };

  const seekForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(duration, audio.currentTime + 10);
      setCurrentTime(audio.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

  return (
    <div
      className={`flex  gap-16 items-center ${
        practiceTestData ? "" : "invisible "
      }`}
    >
      <audio ref={audioRef} src={src} />
      <div className="flex gap-4   p-2   justify-center items-center ">
        <span>{formatTime(currentTime)}</span>
        <button
          type="button"
          className="p-2 border border-mainColor  "
          onClick={seekBackward}
        >
          <FontAwesomeIcon icon={faRotateLeft} /> 10s
        </button>
        <button
          type="button"
          className="p-2 border  border-mainColor "
          onClick={togglePlay}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button
          type="button"
          className="p-2 border border-mainColor "
          onClick={seekForward}
        >
          10s
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>
      <div className="flex-1">
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onInput={handleSeek}
          onMouseDown={handleSeekStart}
          onMouseUp={commitSeek}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() =>
            handleVolumeChange({ target: { value: Math.max(0, volume - 0.1) } })
          }
        >
          <FontAwesomeIcon icon={faVolumeDown} />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <button
          type="button"
          onClick={() =>
            handleVolumeChange({ target: { value: Math.min(1, volume + 0.1) } })
          }
        >
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
