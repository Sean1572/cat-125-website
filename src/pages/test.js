import WaveSurfer from 'wavesurfer.js';
import Redirect from '../components/Redirct';
import Button from '../components/Button';
import ImageAnnotationTool from '../components/ImageAnnotationTool';




function Test() {

  return (
    <div className="App">
      <header className="App-header">
      <ImageAnnotationTool filename={'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/173621671/1200'}
        getDataCallback={data => console.log (data)}
      />
      </header>
    </div>
  );
}

export default Test;
