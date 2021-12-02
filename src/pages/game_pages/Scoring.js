import WaveSurfer from 'wavesurfer.js';
import {ground_strongly, ground_weakly} from '../../components/filesToLabel/data.js'
import {useLocation} from 'react-router-dom';

//yes this is bad code but I just need this for this one project





function Scoring(props) {

    let ground_truth = {}
    const label = Number(localStorage.getItem('label'));
    if (label != 1) {
      ground_truth = ground_strongly;
    } else {
      ground_truth = ground_weakly;
    }
  
    console.log(props)
    let score = 0
    let acc = 0
    let count = 0
    for(const item in props.old_labels) {
        count++;
        const data = props.old_labels[item]
        const ground_truth_item = ground_truth[item] //data["data"]
        console.log(data)
        if (label == 1) {
            score = data["data"] == ground_truth_item ? score + 1 : score
            acc = data["data"] == ground_truth_item ? acc + 100 : acc
        }
        else if (label != 1){
          if (data["data"] == null) {
            if (ground_truth[item]["data"] == null) {
                score += 1
                acc += 100
            }
          } else {
            console.log(data["data"])
            const strong_data = data["data"]
            if (Math.abs(strong_data.start - ground_truth_item.start)  < 1) {
              score += 1
                acc += 50
            }
                
            if (Math.abs(strong_data.end - ground_truth_item.end)  < 1) {
              score += 1
              acc += 50
            }
          }
          
                
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
