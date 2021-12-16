import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "antd/dist/antd.css";

import rootReducer from "./reducers";
//store
const store = createStore(rootReducer, composeWithDevTools());

// <BrowserRouter> is required bcoz we are using switch and route
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {" "}
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// // import * as serviceWorker from "./serviceWorker";
// import { BrowserRouter } from "react-router-dom";
// import "antd/dist/antd.css";
//
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./reducers";
//
// // store
// const store = createStore(rootReducer, composeWithDevTools());
//
// ReactDOM.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   // </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
