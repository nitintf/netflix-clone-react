import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./styles/index.scss";
import FirebaseContext from "./context/firebase";
import ScrollToTop from "./helpers/scroll-to-top";
import { firebase, FieldValue } from "./lib/firebase";
require('dotenv').config()

ReactDOM.render(
  <Router>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <ScrollToTop />
      <App />
    </FirebaseContext.Provider>
  </Router>,
  document.getElementById("root")
);

