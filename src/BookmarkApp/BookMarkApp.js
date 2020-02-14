import React, { Component } from "react";
import "./BookMarkApp";
import BookMarkList from "../BookMarkList/BookMarkList";
import Fab from "../Fab/Fab";

class BookmarkApp extends Component {
  render() {
    return (
      <div className="bookmarkApp">
        <h2>Bookmarks</h2>
        <BookMarkList bookmarks={this.props.bookmarks} />
        <Fab showForm={this.props.showForm} />
      </div>
    );
  }
}

export default BookmarkApp;

/*========== Interactivity (#2) ============ */
//Dealing with the AddBookmark form:
//We've passed the callback prop to the Fab component instance
//Bookmark.js ===> Fab.js
