import { useEffect, useState } from "react";

function GameSettings() {
    const [refresh, trigger_refresh] = useState(false)
    const label = localStorage.getItem('label');
    const visual = localStorage.getItem('visual');
    useEffect(() => {
        const label = localStorage.getItem('label');
        const visual = localStorage.getItem('visual');
        if (label == null) {
            localStorage.setItem('label', 1);
        }
        if (visual == null) {
            localStorage.setItem('visual', 0);
        }
    })

    function onChange(e) {
      trigger_refresh(!refresh)
      //console.log(e.target)
       const value = Number(e.target.value);
      //console.log(value)
       const id = e.target.id
       localStorage.setItem(id, value);
       
   }

  return (
      <div style={{alignContent: "center"}}>
        <p>Game Settings</p>
        <label for="label">Weakly / Strongly</label>
        <div style={{height: "0px" }}/>
        <select onChange={e => onChange(e)} name="label" id="label" >
          <option value={1} defaultValue={false}>Weakly</option>
          <option value={2} defaultValue={label == 2}>Strongly</option>
         
        </select>
        <div style={{height: "20px" }}/>
        <text>(Audio Only) </text>
        <div style={{height: "0px" }}/>
        <label for="label">Spectrogram / Waveform</label>
        <div style={{height: "5px" }}/>
        <select onChange={e => onChange(e)} name="visual" id="visual" >
          <option value={0}>Waveform</option>
          <option value={1}>Spectrogram</option>
        </select>

        <p>Currently enabled:</p>
        <p>
            {label == 1? "Weakly Labeling ": "Strongly Labeling "}
            {visual == 0? "Waveform ": "Spectrogram "}
        
        </p>
        </div>
  );
}

export default GameSettings;
