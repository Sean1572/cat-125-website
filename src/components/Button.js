import React from "react";

class Button extends React.Component {
    render() {
      return  (
        <button onClick={this.props.onclick} className="App-Button"> 
            {this.props.text}
        </button>
      );
    }
}

export default Button;
