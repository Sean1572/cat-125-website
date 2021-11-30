import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import Redirect from '../../components/Redirct';
import Button from '../../components/Button';
import soundfile from './init.mp3'
const pokemon = require("./init.mp3");
class Gameplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wavesurfer: null
        }
    }
    componentDidMount() {
        console.log("start render")
        //start a timer
        var wavesurfer = WaveSurfer.create({
            container: '#waveform',

        });
        wavesurfer.on("error", error => console.log(error))
        wavesurfer.load(soundfile);
        console.log("async creation started")
        wavesurfer.once('ready', () => {
            console.log("ready success")
            wavesurfer.play();
            
        });
        wavesurfer.un('play', () => {
            console.log("play success")
           
            
        });
        
      
        this.setState({wavesurfer})
    }

    next() {
       //if last annotation
       Redirect("/annotate")
       //if not
       //   Save labels to local storage
       //   Save time and prepare to restart timer
       //   Load next audio clip (may make shorter if it takes too long) 
    }
    render() { 
        const {wavesurfer} = this.state
        return(
            /*<div className="App">
                <header className="App-header">
                    <p>
                        Gameplay is here
                    </p>
                    
                    <Button 
                        onclick={() => Redirect("/annotate")}
                        text={"Next"}
                        />
                    
                    </header>
            </div>*/
            <div>
            <div id="waveform" className="waveform"></div>
            <Button 
                        onclick={() => wavesurfer.play()}
                        text={"Next"}
                        />
            </div>
        );
    } 
}

export default Gameplay;
