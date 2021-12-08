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
          If it is your frist time, we reccomend jumping in right away! 

          You have been choosen to help label some data about birds. You will be given
          images of birds and thier bird audio. If you are strongly labeling the data,
          drag over the iamges and audio visualizations to annotate the data. 

          Feel free to enable/disable the spctrogram and waveform visualizations in the settings below
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
