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
         Be sure to check out the tutorial above before playing!
        </p>
        <p>
         Remember: It is reccomened to use Chrome!
        </p>
          <GameSettings />
          <Button 
            onclick={() => Redirect("/annotate")}
            text={"Click Here to Start Annotating"}
            />
      </header>
    </div>
  );
}

export default GameStart;
