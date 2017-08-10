import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(routes, document.getElementById("root"));
registerServiceWorker();
