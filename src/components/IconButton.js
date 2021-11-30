import React from "react";
class IconButton extends React.Component {
    render() {
      return  (
        <button onClick={this.props.onclick} className="App-Button"> 
            {this.props.icon}
        </button>
      );
    }
}
export default IconButton;