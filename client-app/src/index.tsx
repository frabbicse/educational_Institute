import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../src/layout/style.css";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./layout/ScrollToTop";
import { createMemoryHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter } from "react-router-dom";

// export const history = createMemoryHistory();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <BrowserRouter>
    {/* <Router history={history} navigator={history}></Router> */}
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>
);

// ReactDOM.render(
//   <BrowserRouter>
//     {/* <Router history={history} navigator={history}></Router> */}
//     <ScrollToTop>
//       <App />
//     </ScrollToTop>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
