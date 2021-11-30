import {
  Gameplay,
  GameStart,
  Leaderboard 
}from './pages/game_pages/game_index'
import {
  Landing
} from './pages/index.js'
import logo from './logo.svg';
import { 
    BrowserRouter as Router,
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
      {/* Path for game */}
      <Router>
        <Routes >
          <Route path="/cat-125-website" element={<Landing/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/annotate" element={<Gameplay/>}/>
          <Route path="/annotate_start" element={<GameStart/>}/>
          <Route path="/annotate_LeaderBoard" element={<GameStart/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;
