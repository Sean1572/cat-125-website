 import Button from "../components/Button";
 import Redirect from "../components/Redirct";
 function gameLoad() {
    Redirect("/annotate_start")
 }

  function Landing() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Landing Page For Website?
          </p>
          <Button 
            onclick={() => gameLoad()}
            text={"Ready To Start Playing?"}
            />
        
        </header>
      </div>
    );
  }
  
  export default Landing;
  