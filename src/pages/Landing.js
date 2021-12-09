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
            Ready to start your citizen science career?
          </p>
          <Button 
            onclick={() => gameLoad()}
            text={"Click here to Start!"}
            />
        
        </header>
      </div>
    );
  }
  
  export default Landing;
  