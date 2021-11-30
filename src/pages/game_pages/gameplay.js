import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js';
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
            scrollParent: true,
            fillParent : true,
            plugins: [
                RegionPlugin.create({ dragSelection: {
                    slop: 5
                }}),
                SpectrogramPlugin.create({
                    wavesurfer: wavesurfer,
                    container: '#spectrogram',
                    scrollParent: true,

                })
            ]

        });
        wavesurfer.on("error", error => console.log(error))
        wavesurfer.load(soundfile);
        console.log("async creation started")
        wavesurfer.once('ready', () => {
            //fix spectrogram sync issues
            console.log("ready success 2")
            const table = document.getElementById('forecast-table')
            const canvas = document.getElementsByTagName("spectrogram")[0].firstElementChild
            console.log(canvas)
            canvas.style.position = "relative"
            console.log("ready done")
            
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
            <div className="App">
                    <header className="App-header">
                    <p>
                        Gameplay is here
                    </p>
                    
                    
                    <script src="https://unpkg.com/wavesurfer.js"></script>
                    <script src="https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"></script>
                    
                    <div id="waveform" className="waveform"></div>
                    <div id="spectrogram" className="spectrogram_div"></div>
                    <Button 
                        onclick={() => wavesurfer.play()}
                        text={"Play"}
                        />
                    <Button 
                        onclick={() => Redirect("/annotate")}
                        text={"Next"}
                        />
            </header>
            </div>
        );
    } 
}

export default Gameplay;
