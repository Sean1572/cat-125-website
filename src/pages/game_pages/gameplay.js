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
            wavesurfer: null,
            spectrogram: false
        }
    }
    componentDidMount() {
        const {spectrogram} = this.state
        console.log("start render")
        //start a timer
        if (spectrogram) {
            var wavesurfer = WaveSurfer.create({
                container: '#waveform',
                scrollParent: true,
                fillParent : true,
                height: 256,
                barHeight: 0,
                barGap: 100000000,
                waveColor: "rgba(0,0,0,0)",
                progressColor:"rgba(0,0,0,0)",
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
           
            console.log("async creation started")
            wavesurfer.once('ready', () => {
                //fix spectrogram sync issues
                console.log("ready success 2")
                const table = document.getElementById('forecast-table')
                const canvas = document.getElementsByTagName("spectrogram")[0].firstElementChild               
                canvas.style.position = "relative"
                console.log("ready success 2")
                console.log(document.getElementById("waveform"))
                console.log("ready success 2")
                const wave_canvas = document.getElementById("waveform").firstElementChild
                wave_canvas.style.display = "block"
                console.log(document.getElementById("waveform"))
            });
        }
        else {
            var wavesurfer = WaveSurfer.create({
                container: '#waveform',
                scrollParent: true,
                fillParent : true,
                height: 256,
                plugins: [
                    RegionPlugin.create({ dragSelection: {
                        slop: 5
                    }}),
                ]

            });
        }
        wavesurfer.load(soundfile);
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
                    <div id="spectrogram" className="spectrogram_div"></div>
                    <div id="waveform" className="waveform"></div>
                    
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