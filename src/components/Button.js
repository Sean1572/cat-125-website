import React from "react";

class Button extends React.Component {
    constructor(props)
    render() {
      return  (
        <button onclick={this.props.onClick}>
            {this.props.text}
        </button>
      );
    }
  }
class Button {

  
}

export default Button;
