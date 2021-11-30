import WaveSurfer from 'wavesurfer.js';
import Redirect from '../../components/Redirct';
import Button from '../../components/Button';

function GameStart() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Gameplay Landing is here
        </p>
        <Button 
            onclick={() => Redirect("/annotate")}
            text={"Click Here to Start Annotating"}
            />
      </header>
    </div>
  );
}

export default GameStart;
