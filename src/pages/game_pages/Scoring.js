import WaveSurfer from 'wavesurfer.js';
import {ground_strongly, ground_weakly} from '../../components/filesToLabel/data.js'
import {useLocation} from 'react-router-dom';
import Redirect from '../../components/Redirct';
//yes this is bad code but I just need this for this one project
import Button from '../../components/Button.js';




function Scoring(props) {
    let threshold = 5;
    let ground_truth = {}
    const label = Number(localStorage.getItem('label'));
    console.log(label)
    if (label != 1) {
      ground_truth = ground_strongly;
    } else {
      ground_truth = ground_weakly;
    }
  
   //console.log(props)
    let score = 0
    let acc = 0
    let count = 0
    for(const item in props.old_labels) {
        count++;
        const data = props.old_labels[item]
        const ground_truth_item = ground_truth[item]["data"]
       console.log(data, ground_truth_item)
        if (label == 1) {
            score = data["data"] == ground_truth_item ? score + 1 : score
            acc = data["data"] == ground_truth_item ? acc + 100 : acc
        }
        else if (label != 1){
          if (data == null || data["data"] == null) {
            if (ground_truth[item] == null || ground_truth[item]["data"] == null) {
                score += 1
                acc += 100
            }
          } else {
           //console.log(data["data"])
            const strong_data = data["data"]
            let acc_incrment = 50
            if (strong_data.start != null && strong_data.start != null) {
              acc_incrment = 25
             //console.log(strong_data.top - ground_truth_item.top)
             //console.log(ground_truth_item.top)
             //console.log(ground_truth_item)
              if (Math.abs(strong_data.top - ground_truth_item.top)  < threshold) {
                score += 1
                  acc += acc_incrment
              }
                  
              if (Math.abs(strong_data.bot - ground_truth_item.bot)  < threshold) {
                score += 1
                acc += acc_incrment
              }
            }
            console.log(Math.abs(strong_data.start - ground_truth_item.start)  < threshold)
            if (Math.abs(strong_data.start - ground_truth_item.start)  < threshold) {
              score += 1
                acc += acc_incrment
            }
                
            if (Math.abs(strong_data.end - ground_truth_item.end)  < threshold) {
              score += 1
              acc += acc_incrment
            }
          }
          
                
        }

        //score -= data["time"] / 500
        if (score < 0) {
          score = 0
        }
    }
   
   //console.log(Math.round(score), acc/count)


  return (
    <div className="App">
      <header className="App-header">
        <p>
        YOU SCORED  
        </p>
        <p>
          {score} points with {acc/count}% accuracy
          
        </p>
        Do you want to play again? 
        <Button 
            onclick={() => Redirect("/annotate_start")}
            text={"Click Here to return to the game start page"}
            />

      </header>
    </div>
  );
}

export default Scoring;
