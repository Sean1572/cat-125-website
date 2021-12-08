import {
  Gameplay,
  GameStart,
  Leaderboard , Scoring
}from './pages/game_pages/game_index'
import {
  Landing
} from './pages/index.js'
import logo from './logo.svg';
import { 
  HashRouter as Router,
    Routes ,
    Route
  } from 'react-router-dom';
import './App.css';



/**
 * TODO: Might replace this with a better heiarchical system
 * 
 */

function App() {
  return (
    <div className="App">
      <script src="https://unpkg.com/wavesurfer.js"></script>
      <script src="https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"></script>
      {/* Path for game */}
      <Router>
        <Routes >
          <Route path="/cat-125-website" element={<Landing/>}/>
          <Route path="/cat-125-website/localhost" element={<Landing/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/cat-125-website/annotate" element={<Gameplay/>}/>
          <Route path="/cat-125-website/annotate_start" element={<GameStart/>}/>
          <Route path="/cat-125-website/annotate_LeaderBoard" element={<Leaderboard/>}/>
          <Route path="/cat-125-website/annotate_scoring" element={<Scoring/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;
