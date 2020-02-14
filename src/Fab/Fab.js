import React, { Component } from "react";
import "./Fab.css";

class Fab extends Component {
  render() {
    return (
      <div className="fab" onClick={e => this.props.showForm(true)}>
        &#43;
      </div>
    );
  }
}

export default Fab;

/*========== Interactivity (#3) ============ */
//Dealing with the AddBookmark form:
//Finally we'll add an event handler to the Fab component itself
//We'll invoked this callback using onClick
//And we'll set it true - as that was our original intention of the callback
//At this point, clicking on the Fab will switch to the AddForm
//Fab.js ===> App.js
