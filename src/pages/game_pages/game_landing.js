import WaveSurfer from 'wavesurfer.js';
import Redirect from '../../components/Redirct';
import Button from '../../components/Button';
import GameSettings from '../../components/GameSettings';
import { useEffect } from 'react';
function GameStart() {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Gameplay Landing is here
          If it is your frist time, we reccomend jumping in right away! 
        </p>
        
        <Button 
            onclick={() => Redirect("/annotate")}
            text={"Click Here to Start Annotating"}
            />
          <GameSettings />
      </header>
    </div>
  );
}

export default GameStart;
