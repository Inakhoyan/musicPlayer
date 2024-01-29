// src/components/MusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./MusicPlayer.css";
import AudioPlayer from './components/AudioPlayer';

const MusicPlayer = ({ musicNumber, setMusicNumber }) => {
  const [musicList, setMusicList] = useState([]);
  const [audioSrc, setAudioSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [toggle, setToggle] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);



useEffect(() => {
	getMusic();
}, []);


async function getMusic() {
	axios.get('http://localhost:5000/api/music')
	.then(response => {
	  setMusicList(response.data);
	  setSelectedFile(response.data)
	  // musicList = response.data
	//   playMusic(0);
	})
	.catch(error => console.error('Error fetching music metadata:', error));
}


  const playMusic = (index) => {
    // Fetch the music file from the backend
	console.log(index);
    axios.get(`http://localhost:5000/api/music/${index}`, { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
		// setMusicNumber(index);
		console.log(blob);
      })
      .catch(error => console.error('Error fetching music file:', error));  
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
	  
    }
	setToggle((prev)=>!prev);

    const formData = new FormData();
    formData.append('music', selectedFile);

    // Upload the music file to the backend
    axios.post('http://localhost:5000/api/upload', formData)
      .then(response => {
        console.log(response.data);
		getMusic();
        // You can update the music list or perform other actions after successful upload
      })
      .catch(error => console.error('Error uploading music file:', error));

  };

  return (
    <div className='container-file'>
      {/* <h1>Music Player</h1> */}
      <ul>
        {musicList.map((song, index) => (
          <li key={index} onClick={() => playMusic(index)}>
            {song.name}
          </li>
        ))}
      </ul>
      {audioSrc && <AudioPlayer 
	  					src={audioSrc} 
						musicList={musicList} 
						musicNumber={musicNumber} 
						setMusicNumber={setMusicNumber}
					/>}

      {/* File input for selecting a file */}
	  <div className="but">
		<input className='file-input' type="file" onChange={handleFileChange} />

		{/* Button to upload the selected file */}
		<button className='upload-button' onClick={handleFileUpload}>Upload File</button>
	  </div>
    </div>
  );
};

export default MusicPlayer;