import React, { Component } from "react";

export class Loading extends Component {
  render() {
    return (
      <div
        className="input-wrapper"
        style={{
          alignItems: "center",
          fontSize: "x-large",
          textAlign: "center",
          width:"50%",
          marginTop:"20vh"
        }}
      >
        <span>Fetching please wait ....</span>
        <br />
        <i className="fas fa-spinner fa-pulse" />
      </div>
    );
  }
}

export default Loading;
