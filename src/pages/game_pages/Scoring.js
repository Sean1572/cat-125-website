import WaveSurfer from 'wavesurfer.js';

import {useLocation} from 'react-router-dom';
function Scoring(props) {
    console.log(props)
    let score = 0
    let acc = 0
    let count = 0
    for(const item in props.old_labels) {
        count++;
        const data = props.old_labels[item]
        const ground_truth = "no" //data["data"]
        if (typeof(data["data"] == String)) {
            score = data["data"] == ground_truth ? score + 1 : score
            acc = data["data"] == ground_truth ? acc + 100 : acc
        }
        else if (typeof(data["data"] == Object)){
            const strong_data = data["data"]
            if (Math.abs(strong_data.start - ground_truth.start)  < 1) 
                score += 1
                acc += 50
            if (Math.abs(strong_data.end - ground_truth.end)  < 1) 
                score += 1
                acc += 50
        }

        score += data["time"] / 500
    }

    console.log(Math.round(score), acc/count)


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Temp Score {score} {acc/count}%
        </p>
      </header>
    </div>
  );
}

export default Scoring;
