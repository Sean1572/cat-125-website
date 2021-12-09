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
    if (label != 1) {
      ground_truth = ground_strongly;
    } else {
      ground_truth = ground_weakly;
    }
  
   //console.log(props)
    let score = 0
    let acc = 0
    let count = 0
    console.log(props.old_labels)
    for(const item in props.old_labels) {
        count++;
        const data = props.old_labels[item]
        const ground_truth_item_all = ground_truth[item]["data"]
        if (label == 1) {
            score = data["data"] == ground_truth_item_all ? score + 1 : score
            acc = data["data"] == ground_truth_item_all ? acc + 100 : acc
        }
        else if (label != 1){
          if (data == null || data["data"] == null) {
            if (ground_truth[item] == null || ground_truth_item_all[item]["data"] == null) {
                score += 1
                acc += 100
            }
          } else {
           //console.log(data["data"])
            const strong_data_all = data["data"]
            const annotation_count = data["count"]
            if (ground_truth[item]["count"] == null || annotation_count == null) {
              if (ground_truth[item]["count"] == null && annotation_count == null) {
                score++
                acc += 100
               
              }
              continue;
            }
            if ( ground_truth[item]["count"] != null) {
              count--;
              count += ground_truth[item]["count"];
            }
            for(let i = 0; i < annotation_count; i++) {
              if (i > ground_truth[item]["count"]) break;
                const strong_data = strong_data_all[i]
                const ground_truth_item = ground_truth_item_all[i]
                let acc_incrment = 50
                if (strong_data.bot != null && strong_data.top != null) {
                  console.log( ground_truth[item], strong_data, ground_truth_item)
                  console.log(strong_data.bot, strong_data.top, ground_truth_item.bot, ground_truth_item.top)
                  acc_incrment = 25
                  if (Math.abs(strong_data.top - ground_truth_item.top)  < threshold) {
                    score += 1
                      acc += acc_incrment
                  }
                      
                  if (Math.abs(strong_data.bot - ground_truth_item.bot)  < threshold) {
                    score += 1
                    acc += acc_incrment
                  }
                }
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
            
          
                
        }

        //score -= data["time"] / 500
        if (score < 0) {
          score = 0
        }
    }
   
   //console.log(Math.round(score), acc/count)

    console.log(count)
  return (
    <div className="App">
      <header className="App-header">
        <p>
        YOU SCORED  
        </p>
        <p>
          {score} points with {Math.round(acc/count)}% accuracy
          
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
