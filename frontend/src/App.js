import './App.css';
import MusicPlayer from './MusicPlayer';
import { useState } from 'react';

function App() {
	const [musicNumber, setMusicNumber] = useState(0);

  return (
	  <div className="container">
		<div className="shape shape-1"></div>
		<div className="shape shape-3"></div>
		<div className="shape shape-2"></div>
	<main>

	    <MusicPlayer setMusicNumber={setMusicNumber} />
	</main>

	</div>
  );
  }

  export default App