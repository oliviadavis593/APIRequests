import React, { Component } from "react";
import "./AddBookMark.css";

class AddBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      description: "",
      rating: 1
    };
  }

  titleChanged(title) {
    this.setState({
      title
    });
  }

  urlChanged(url) {
    this.setState({
      url
    });
  }

  descriptionChanged(description) {
    this.setState({
      description
    });
  }

  ratingChanged(rating) {
    this.setState({
      rating
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const bookmark = (({ title, url, description, rating }) => ({
      title,
      url,
      description,
      rating
    }))(this.state);
    const url = "https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks";
    const options = {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer $2a$10$ZhdeJefcb.5sx/DCmO/n8u5sJLcARAdbHw9tfm1mevGRq3s1.5DpW"
      }
    };

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          title: "",
          url: "",
          description: "",
          rating: 1
        });
        this.props.handleAdd(bookmark);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  render() {
    const error = this.state.error ? (
      <div className="error">{this.state.error}</div>
    ) : (
      ""
    );

    return (
      <div className="addbookmark">
        <h2>Add Bookmark</h2>
        {error}
        <form
          className="addbookmark__form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={this.state.title}
            onChange={e => this.titleChanged(e.target.value)}
          />
          <label htmlFor="url">Url:</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="url"
            value={this.state.url}
            onChange={e => this.urlChanged(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="description"
            value={this.state.description}
            onChange={e => this.descriptionChanged(e.target.value)}
          />
          <label htmlFor="rating">Rating: </label>
          <input
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="5"
            value={this.state.rating}
            onChange={e => this.ratingChanged(e.target.value)}
          />

          <div className="addbookmark__buttons">
            <button onClick={e => this.props.showForm(false)}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddBookmark;

/*======== Build static app (#1) =========== */
//This component consists of another form with 4 widgets to capture the 4 properties of a bookmark
//AddBookMark.js ===> Bookmark.js + continues respectively through each folder

/*============================ */

/*========== Interactivity (#5) ============ */
//Dealing with the AddBookmark form:
//We'll now add an event handler to the onClick event of the cancel button
//This handler will invoke the callback thus setting the showAddForm state back to false

/*================================ */

/*========== Bookmark Interactivity (#2) ============ */
//Making a controlled form & use event handlers:
//Before invoking a callback into the form we can make a controlled form
//When a form component is managed by React = controlled component
//We'll refactor AddBookmarkk form to use controlled components
//The state of the form can be stored directly in this file by adding a constructor()
//Then we add a value prop to each form input so that the input always displays whatever value is in the state
//Now we can write methods to update the state when each of these inputs changes
//The onChange callback accepts a single parameter (e)
//The target is the component that triggered the event
//Noe: it's possible to use a single method to handle all onchange event but this is more simplistic
//Now all the values entered by the user are in the state of the AddBookMark component

/*========== Bookmark Interactivity (#3) ============ */
//Creating a new bookmark on the server using POST:
// To create one we will have to make a POST request
//Sending the data along with the API key in the header
//How to do this:
// We will use the options object of the fetch API again
//In particular, we can use the body option which sets some data in the body of the request
//The JSON.stringify() method takes a JS object & renders a JSON string
