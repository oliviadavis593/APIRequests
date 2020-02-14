import React, { Component } from "react";
import "./styles.css";
import AddBookmark from "./AddBookMark/AddBookMark";
import BookmarkApp from "./BookmarkApp/BookMarkApp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }

  componentDidMount() {
    const url = "https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks";
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer $2a$10$npqmlojI9T4K.TCFrzE0Zew2j.UFXTSkHI94XdYu4h6XzrDCZKmva",
        "Content-type": "application/json"
      }
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    });
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false
    });
  }

  render() {
    const page = this.state.showAddForm ? (
      <AddBookmark
        showForm={show => this.setShowAddForm(show)}
        addBookmark={bookmark => this.addBookmark(bookmark)}
      />
    ) : (
      <BookmarkApp
        bookmarks={this.state.bookmarks}
        showForm={show => this.setShowAddForm(show)}
      />
    );
    return <div className="App">{page}</div>;
  }
}

export default App;

/*======== Identifying State (#1) ======= */
//The list will be displayed on the BookmarkList comp
//The AddBookMark will aslo need to upadte this list when user adds a new bookmark
//The common ancestor = App component
//We'll initialize state inside App.js
//We passed the bookmarklist from state to BookmarkApp
//Then we added a conditional display if showAddForm is true then display the AddBookMark component
//...otherwise display BookmarkApp

/*======== Identifying State (#2) ======= */
//There's another aspect of state that we need to deal with
//Right now, our bookmarks list is an empty array in state - but we want that list to reflect the data from our server
//We should automatically load the current list of bookmarks from the server
//How to do this:
// Fetch the data from our server & add it to the bookmarks array in state
//For this particular API we need a username & password to retrieve the key
//We'll also use the endpoint /v3/bookmarks (provides a list of bookmarks belonging to the user identified by the API key)
//The API key is provided to the endpoint via an HTTP header

/*======== Identifying State (#3) ======= */
//What we'll implement in App.js:
//We'll add a componentDidMount()
//Inside will be a const url for our endpoint
//The fetch method may also take a 2nd parameter (an object representing some options for the HTTP call)
//The name of the header is Authorization & the value is Bearer <Key> (key is the API key that was requested earlier)
//We then check the response to ensure that everything went well
//After, get the returned JSON via the json() method & catch any errors for display

/*============================================== */

/*========== Interactivity (#1) ============ */
//Dealing with the AddBookmark form:
//Now we need to add interactivity by writing methods to update the state
//There are 2 properties showAddForm & bookmarks
//We can add method that simply sets the showAddForm property - then add this along to the Fab component
//When Fab button is clicked it should set showAddForm to true
//Since Fab is a child component of BookmarkApp - we'll pass the callback along via that component
//App.js ===> BookmarkApp.js

/*========== Interactivity (#4) ============ */
//Dealing with the AddBookmark form:
//We can also pass this callback to the AddForm
//And the onClick of the cancel button we will want to switch back to the BookmarkList view
//App.js ===> AddBookMark.js

/*============================================== */

/*========== Bookmark Interactivity (#1) ============ */
//We can write a method to add a new bookmark to the list of bookmarks already in state
//We then pass this method as a callback to AddBookmark component instance
//Note:
//We did NOT simply push() the new bookmark into the state
//That would have mutated the state
//Instead, we've used the spread operator which is used to copy the bookmarks array into a new array
//Then the new bookmark is added to the end of that new array
//App.js ===> AddBookMark.js
