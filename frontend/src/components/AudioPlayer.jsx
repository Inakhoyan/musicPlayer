// AudioPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PiArrowFatRightThin } from "react-icons/pi";
import { PiArrowFatLeftThin } from "react-icons/pi";
import axios from 'axios';

const AudioPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #2d2d2d;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const AudioProgressBar = styled.input`
  width: 100%;
  height: 10px;
  appearance: none;
  background-color: #555;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.3s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
  }

  &:hover {
    background-color: #777;
  }
`;

const AudioPlayer = ({ src, musicList, musicNumber, setMusicNumber }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState(0);

  

  const [musicNum,setMusicNum] = useState(0);
// console.log(musicList);
//   const [musicsNumber, setMusicNumber] = useState(0);

useEffect(() => {
    // Reset playback when musicNum changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Load new music
    playMusic(musicNum);
  }, [musicNum]);




  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);



  useEffect(() => {
	const audio = audioRef.current;
  
	const handleCanPlay = () => {
	  // Check if it's safe to play (audio is loaded)
	  audio.play();
	  if (!audio.paused && !isPlaying) {
		audio.play();
	  }
	  else {
		  audio.pause();
		}
	};
  
	audio.addEventListener('canplay', handleCanPlay);
  
	return () => {
	  audio.removeEventListener('canplay', handleCanPlay);
	};
  }, [musicNum, audioSrc]);
  

  const playMusic = (index) => {
    // Fetch the music file from the backend
	console.log(index);
    axios.get(`http://localhost:5000/api/music/${index}`, { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
		setMusicNum(index);
        setAudioSrc(url);
      })
      .catch(error => console.error('Error fetching music file:', error));
  };




  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };


  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };


const handleNext = () => {
	const nextIndex = (musicNum + 1) % musicList.length;
	setMusicNum(nextIndex);
	// playMusic(nextIndex);
  };
  
  const handlePrev = () => {
	const prevIndex = (musicNum - 1 + musicList.length) % musicList.length;
	setMusicNum(prevIndex);
	// playMusic(prevIndex);
  };



//   const playMusic = (index) => {
//     // Fetch the music file from the backend
// 	console.log(index);
//     axios.get(`http://localhost:5000/api/music/${index}`, { responseType: 'arraybuffer' })
//       .then(response => {
//         const blob = new Blob([response.data], { type: 'audio/mpeg' });
//         const url = URL.createObjectURL(blob);
//         setAudioSrc(url);
//       })
//       .catch(error => console.error('Error fetching music file:', error));
//   };
  

  return (
	  <>

    <AudioPlayerContainer>
      <audio ref={audioRef} src={audioSrc}></audio>

      <AudioControls>
        <button style={{backgroundColor: "rgba(234, 34, 177, 0.5)",
			border: 'none',
			width: '-webkit-fill-available',
			height: '35px',
			cursor: 'pointer'
		}} 
		onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>


        <span>{formatTime(currentTime)}</span>

		<PiArrowFatLeftThin onClick={handlePrev} style={{fontSize: "5.2rem", cursor: "pointer"}}/>
        <AudioProgressBar
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />

		<PiArrowFatRightThin onClick={handleNext} style={{fontSize: "5.2rem", cursor: "pointer"}}/>
        <span>{formatTime(duration)}</span>
      </AudioControls>
    </AudioPlayerContainer>

	  </>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioPlayer;
