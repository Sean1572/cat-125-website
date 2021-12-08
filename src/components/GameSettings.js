import { useEffect } from "react";
function onChange(e) {
   //console.log(e.target)
    const value = Number(e.target.value);
   //console.log(value)
    const id = e.target.id
    localStorage.setItem(id, value);
    
}
function GameSettings() {
    useEffect(() => {
        const label = localStorage.getItem('label');
        const visual = localStorage.getItem('visual');
        if (label == null) {
            localStorage.setItem('label', 0);
        }
        if (visual == null) {
            localStorage.setItem('visual', 0);
        }
    })


  return (
      <div style={{alignContent: "center"}}>
        <p>Game Settings</p>
        <label for="label">Weakly / Strongly / Both</label>
        <div style={{height: "0px" }}/>
        <select onChange={e => onChange(e)} name="label" id="label" >
          <option value={0} defaultValue={true}>Both</option>
          <option value={1}>Weakly</option>
          <option value={2}>Strongly</option>
         
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
        </div>
  );
}

export default GameSettings;
