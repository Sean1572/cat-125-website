//BIG TODO: ADD IMAGE SUPPORT

import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js';
import {Redirect} from '../../components/Redirct';
import Button from '../../components/Button';
import soundfile from '../../components/filesToLabel/init.wav'
import getFiles from '../../components/filesToLabel/DataLoader';
import ImageAnnotationTool from '../../components/ImageAnnotationTool';
import { useNavigate  } from "react-router-dom";
import Scoring from './Scoring';

function Redirect_data  (path, data) {
    const navigate = useNavigate();
    const handleClick = () => {
       //console.log(typeof( data))
       //console.log(path, data)
       //console.log(JSON.stringify(data))
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
       //console.log(visual)
        this.state = {
            wavesurfer: null,
            spectrogram: visual == 1,
            label,
            curr: 0,
            curr_labels: null,
            old_labels:  {

            },
            audio: true,
            files: null,
            rect_data: []
        }
    }
    componentDidMount() {
        //this.resetImageLabeling()
        const {spectrogram, label} = this.state
       //console.log(spectrogram)
       //console.log("start render")
        //start a timer
        let audio = true;
        if (spectrogram && label != 1) {
           //console.log("regions enabled")
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
           
           //console.log("async creation started")
            wavesurfer.once('ready', () => {
                //fix spectrogram sync issues
               //console.log("ready success 2")
                const table = document.getElementById('forecast-table')
                const canvas = document.getElementsByTagName("spectrogram")[0].firstElementChild               
                canvas.style.position = "relative"
               //console.log("ready success 2")
               //console.log(document.getElementById("waveform"))
               //console.log("ready success 2")
                const wave_canvas = document.getElementById("waveform").firstElementChild
                wave_canvas.style.display = "block"
               //console.log(document.getElementById("waveform"))
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
           
           //console.log("async creation started")
            wavesurfer.once('ready', () => {
                const table = document.getElementById('forecast-table')
                const canvas = document.getElementsByTagName("spectrogram")[0].firstElementChild               
                canvas.style.position = "relative"
                const wave_canvas = document.getElementById("waveform").firstElementChild
                wave_canvas.style.display = "block"
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


        if (files[0][1]) {
            wavesurfer.load(files[0][0]);
        } else {
            audio = false;
        }
        
        wavesurfer.un('play', () => {
           //console.log("play success")
           
            
        });
        
        const start = Date.now();
        this.setState({wavesurfer, files, start, audio})
    }

    getStronglyImageData(data) {
       //console.log(data)
        this.setState({rect_data: data})

    }

    annotationLabeled(text) {
        let {curr_labels} = this.state;
        if (text != null) {
            curr_labels = text
        } 
        this.setState({curr_labels})
    }

    saveLabels(end_time) {
        let {curr, files, start, curr_labels, wavesurfer, rect_data} = this.state;
        if (curr > 0) {
            curr--;
        }
        const time = end_time - start
        let {old_labels} = this.state;
        if (curr_labels != null) {
            old_labels[files[curr][0]] = { //
                "data": curr_labels,
                time: time
            }
        } else if (files[curr][1]) {
            old_labels[files[curr][0]] = {
                time: time
            }
            const annotations = wavesurfer.regions.list;
            let count = 0;
            old_labels[files[curr][0]]["data"] = {}
            for (let region in annotations) {
                region = annotations[region]
               //console.log(wavesurfer.regions.list)
               
                old_labels[files[curr][0]]["data"][count] = { 
                        start: region.start,
                        end: region.end
                }
                count++;
                old_labels[files[curr][0]]["count"] = count;
            }
            wavesurfer.clearRegions() 
        } else {
            old_labels[files[curr][0]] = {
                time: time
            }
            old_labels[files[curr][0]]["data"] = {}
            for (let i = 0; i < rect_data.length; i++) { 
                let rect = rect_data[i]
                
                old_labels[files[curr][0]]["data"][i] = {
                        start: rect.x,
                        end: rect.width + rect.x,
                        top: rect.y,
                        bot: rect.height + rect.y
                }    
            }
            old_labels[files[curr][0]]["count"] = rect_data.length;
           //console.log(old_labels[files[curr][0]])
        }
       //console.log(old_labels)
        this.setState({old_labels})
    }



    next() {
        
        const end = Date.now();
        let {curr} = this.state
        if (curr == 0) {
            curr = 1;
        }

        const {wavesurfer, files, curr_labels, label, old_labels} = this.state;
        
        if (curr_labels == null && label == 1) {
            return;
        }
        let audio = false;
        this.saveLabels(end);
        if (curr >= files.length) {
            this.setState({scoreboard: true})
        }
        else if (files[curr][1]) {
            wavesurfer.load(files[curr][0]);
            audio = true;
        } else {
            this.resetImageLabeling(files[curr][0])
        }
        
        const next_item = curr + 1;
        const start = Date.now();
       //console.log(next_item)
        this.setState({start, curr: next_item, curr_labels: null, audio: audio, rect_data: {}})
        
    }

    resetImageLabeling(data) {
        const event = new CustomEvent('reset', { detail: data });
        const image_labeling  =  document.getElementById("img_annotator")
       //console.log(image_labeling)
        if (image_labeling) {
            image_labeling.dispatchEvent(event);
        }
    }

    render() { 
        const {wavesurfer, label, old_labels, scoreboard, audio, curr, files} = this.state
        {console.log(old_labels)}
        let wavesurfer_on = audio? 'block' :'none'
        let image_on = !audio
        let file = null
        if (files != null && curr < files.length) {
            file = files[curr][0]
           //console.log(files[curr][0])
        }

       //console.log("image on?", audio)

        return(
            <div className="App">
                    <header className="App-header">
                    { scoreboard?  <div>
                    
                    <Scoring old_labels={old_labels}/>
                    </div> :
                    <div className="App-header">
                        <p>
                        {label != 1 ?  "Click and Drag to Create Regions Over Birds!" : "Click the buttons below if you see or hear a Bird!"}
                        </p>
                    
                    
                        <script src="https://unpkg.com/wavesurfer.js"></script>
                        <script src="https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"></script>
                        
                        <div id="waveform" className="waveform" style={{"display": wavesurfer_on}}></div>
                        <div id="spectrogram" className="spectrogram_div" style={{"display": wavesurfer_on}}></div>
                        {image_on ? 
                        <ImageAnnotationTool filename={file}
                            getDataCallback={data => this.getStronglyImageData(data)}
                            disable_strongly={label == 1}
                        /> :  <Button 
                        onclick={() => wavesurfer.play()}
                        text={"Play"}
                        /> }

                        
                       
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
