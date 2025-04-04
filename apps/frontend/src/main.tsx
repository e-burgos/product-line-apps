import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
