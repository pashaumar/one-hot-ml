import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/main/Main";
import CountryInfo from "./components/countryInfo/CountryInfo";
import EditDetails from "./components/editDetails/EditDetails";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/country" exact component={CountryInfo} />
          <Route path="/edit-details" exact component={EditDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
