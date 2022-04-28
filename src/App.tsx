import { BrowserRouter as Router } from "react-router-dom";

import Titlebar from "./App/Titlebar";
import DashboardView from "./Views/DashboardView";

function App() {
  return (
    <Router>
      <Titlebar />
      <DashboardView />
    </Router>
  );
}

export default App;
