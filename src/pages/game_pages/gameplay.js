//BIG TODO: ADD IMAGE SUPPORT

import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js';
import {Redirect} from '../../components/Redirct';
import Button from '../../components/Button';
import soundfile from '../../components/filesToLabel/init.wav'
import getFiles from '../../components/filesToLabel/DataLoader';

import { useNavigate  } from "react-router-dom";
import Scoring from './Scoring';

function Redirect_data  (path, data) {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(typeof( data))
        console.log(path, data)
        console.log(JSON.stringify(data))
        navigate('/annotate_Scoring',{state : {data: data}});
  }
        
        //{"state": data})
        //navigate(path, data);
    return (
          <div
            id="redirect"
            onClick={()=>handleClick()}
          >
          </div>
    )
  }

class Gameplay extends React.Component {
    constructor(props) {
        super(props)
        
        const label = Number(localStorage.getItem('label'));
        const visual = Number(localStorage.getItem('visual'));
        console.log(visual)
        this.state = {
            wavesurfer: null,
            spectrogram: visual == 1,
            label,
            curr: 1,
            curr_labels: null,
            old_labels:  {

            }
        }
    }
    componentDidMount() {
        const {spectrogram, label} = this.state
        console.log(spectrogram)
        console.log("start render")
        //start a timer

        if (spectrogram && label != 1) {
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
        else if (label != 1) {
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
        } else if (label == 1 && spectrogram) {
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
        } else {
            var wavesurfer = WaveSurfer.create({
                container: '#waveform',
                scrollParent: true,
                fillParent : true,
                height: 256,
            });
        }

        let files = getFiles(1);
        //TODO ADD IMAGES INTO LOOP
        wavesurfer.load(files[0]);
        wavesurfer.un('play', () => {
            console.log("play success")
           
            
        });
        
        const start = Date.now();
        this.setState({wavesurfer, files, start})
    }

    getStronglyImageData() {

    }

    annotationLabeled(text) {
        let {curr_labels} = this.state;
        if (text != null) {
            curr_labels = text
        } 
        this.setState({curr_labels})
    }

    saveLabels(end_time) {
        const {curr, files, start, curr_labels, wavesurfer} = this.state;
        const time = end_time - start
        let {old_labels} = this.state;
        if (curr_labels != null) {
            old_labels[files[curr]] = { //
                "data": curr_labels,
                time: time
            }
        } else {
            old_labels[files[curr]] = {
                time: time
            }
            const annotations = wavesurfer.regions.list;
            let count = 0;
            for (let region in annotations) {
                region = annotations[region]
                console.log(wavesurfer.regions.list)
                old_labels[files[curr]]["data"] = {
                    start: region.start,
                    end: region.end
                }
            }
            wavesurfer.clearRegions() 
        }
        console.log(old_labels)
        this.setState({old_labels})
    }



    next() {
        const end = Date.now();
        const {curr, wavesurfer, files, curr_labels, label, old_labels} = this.state;
        if (curr == files.length) {
            this.setState({scoreboard: true})
            //Redirect("/annotate_Scoring", old_labels, this)
            return;
        }
        if (curr_labels == null && label == 1) {
            return;
        }

        this.saveLabels(end);
        wavesurfer.load(files[curr]);
        const next_item = curr + 1;
        const start = Date.now();
        console.log(next_item)
        this.setState({start, curr: next_item, curr_labels: null})
    }
    render() { 
        const {wavesurfer, label, old_labels, scoreboard} = this.state
        {console.log(old_labels)}
        return(
            <div className="App">
                    <header className="App-header">
                    { scoreboard?  <div>
                    
                    <Scoring old_labels={old_labels}/>
                    </div> :
                    <div>
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
                        <div style={{"height": "10px"}} />
                        {label == 1 ? 
                            <div> 
                                <Button 
                                    onclick={() => this.annotationLabeled("bird")}
                                    text={"Bird"}
                                />
                                <Button 
                                    onclick={() =>  this.annotationLabeled("no bird")}
                                    text={"No Bird"}
                                />
                            </div> : null
                        }

                        <Button 
                        onclick={() => this.next()}
                        text={"Next"}
                        />
                    </div>
                    
                    }
                    <Redirect_data path="/annotate_Scoring" data={old_labels}/>
            </header>
            </div>
        );
    } 
}

export default Gameplay;
