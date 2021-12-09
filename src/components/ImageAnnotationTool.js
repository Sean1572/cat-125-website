import React from "react";
import Button from "./Button";
const testimage = require("./1800.jpg");
class reactangle {
    constructor(props) {
        this.x = props.x
        this.y = props.y
        this.width = props.width
        this.height = props.height
    } 

    getData() {
        return [
            this.x,
            this.y,
            this.width,
            this.height
    ]
    }
}

const renderFrame = (iat, r, e) => {
    let newRect;
    if (!document.getElementById("img_annotator" || iat == null)) return
    const ctx = document.getElementById("img_annotator").getContext('2d');


    const a =  document.getElementById("img_annotator").getBoundingClientRect().left;
    const b =  document.getElementById("img_annotator").getBoundingClientRect().top;
    let {height, width, rect} = iat.state;

   
    //ctx.fillStyle = "white";
    //ctx.fillRect(0, 0, height, width); // clear canvas

    const image = document.getElementById('source')
    ctx.drawImage(image, 0, 0, height, width)
    //console.log("render")
    ctx.fillStyle = "red";

    ctx.strokeRect(Math.random()*(-10)+1, -2, -5, -6);
    ctx.strokeRect(Math.random()*(-10)+1, -2, -5, -6);
    ctx.strokeRect(Math.random()*(-10)+1, -2, -5, -6);
    ctx.strokeRect(-10, -2, -5, -6);
    ctx.strokeRect(-1000, -2, -5, -6);
    for (let i =0; i < rect.length; i++) {
        const next = rect[i]
        ctx.fillStyle = "red";
        ctx.strokeRect(next.x, next.y, next.width, next.height);
    }
    
    //ctx.drawImage(image, 0, 0);
    if (r && e != null) {
        ctx.fillStyle = "rgb(255, 0, 0, 0)";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgb(255, 0, 0, 1)";
        const rwidth = e.clientX - a 
        const rheight = e.clientY - b
        if (r.x1  == -1 || r.y1 == -1) {
            ctx.strokeRect(rwidth, rheight, 5, 5);
            //ctx.fillRect(rwidth + 5, rheight + 5, rwidth -5, rheight -5);
            iat.newRect = {
                x1: rwidth,
                y1: rheight,
                width: 5,
                height: 5,
            }
        } else {
            ctx.strokeRect(r.x1, r.y1, rwidth - r.x1, rheight - r.y1);
            //ctx.fillRect(r.x + 5, r.y + 5, rwidth -5, rheight -5);
            iat.newRect = {
                x1: r.x1,
                y1: r.y1,
                width: rwidth - r.x1,
                height: rheight - r.y1,
            }
        }
        
        
    }
    
  };

  const tick = (object, newRectProps, e) => {
     
    renderFrame(object, newRectProps, e);
    //requestAnimationFrame(tick(object));
  };

class ImageAnnotationTool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: props.filename,
            height: 500,
            width: 500,
            x1: -1,
            y1: -1,
            rHeight: -1,
            rWidth: -1,
            currentRect: null,
            rect: [],
            disable_strongly: props.disable_strongly
        }
        this.newRect = {
            x1: -1,
            y1: -1,
            height: -1,
            width: -1,
        }
        this.giveData = props.getDataCallback
    }

   tick() {
    tick(this)
   }

    componentDidMount() {
        const ctx = document.getElementById("img_annotator")
        if (ctx != null)
            ctx.addEventListener('reset', e => this.reset(e), false);
       //console.log("hello", ctx, document.getElementById("img_annotator"))
        /*let timer = setInterval(function(){
            // the function can do whatever you need it to
           //console.log(this)
            
          }, 50);*/
        //ctx.addEventListener("mouseup", () => this.mouseDone(timer));
        //ctx.addEventListener("mouseleave", () =>  this.mouseDone(timer));
          

          
        //set this to state for future use
        
        //window.requestAnimationFrame(this.draw(this))
    }

    reset(e) {
        const {height, width} = this.state
        this.setState({filename: e.detail, rect:[]})
        const image = document.getElementById("source")
        image.src=e.detail

       //ctx.remove()
    }
    
    mouseDone(timer){
        clearInterval(timer);         // Cancel the previously initiated timer function
       //console.log("Mouse is up or outside of box!");  // And, do whatever else you need to
        const {x1, y1, height, width} = this.newRect
        const latestRect = new reactangle({x: x1, y: y1, height: height, width: width})
        this.state.rect.push(latestRect)  
        
    }

    mouseDown(e) {
        const {disable_strongly} = this.state
        if (disable_strongly) {
            return;
        }
        const ctx = document.getElementById("img_annotator");
        const {x1, y1, height, width} = this.newRect
        let us = this
        if (e.buttons > 0) {
            tick(us, us.newRect, e)  
        }
        
    }

    mouseUp() {
        const {disable_strongly} = this.state
        if (disable_strongly) {
            return;
        }
       //console.log("hello")
        const {x1, y1, height, width} = this.newRect
        const latestRect = new reactangle({x: x1, y: y1, height: height, width: width})
        this.state.rect.push(latestRect)
        this.newRect = {
            x1: -1,
            y1: -1,
            height: -1,
            width: -1,
        }
        this.giveData(this.state.rect)
    }

    undo(e) {
        this.state.rect.pop()
        tick(this, this.newRect, null)  
    }

    render() {
    
    const{filename, height, width, x} = this.state
   
    if (filename != null) {
        return  (
            <div >
                <div id="img_storage" style={{display:"none"}}>
                      <img id="source"
                          src={filename}
                          width={width}
                          height={height}
                          onLoad={() => tick(this, this.newRect, null)}
                      />
                  </div>
                    <canvas id="img_annotator" 
                          onMouseMove={e => this.mouseDown(e)} 
                          onMouseUp={e => this.mouseUp(e)} 
                          width={width} 
                          height={height}
                          style={{zIndex: 10}}>
                  </canvas>
                  <div>
                  <Button onclick={e => this.undo(e)} text="undo" />
                  </div>
            </div>
         
        );
        }
        else {
            return null;
        }
    }
      
}
export default ImageAnnotationTool;