// import logo from './logo.svg';
import "./App.css"
import Sidebar from './sidebar';
import Chat from './chat';
// import { useEffect ,useState} from 'react';
// import { Router } from "@material-ui/icons";
// import { Switch } from "@ma/'terial-ui/core";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Login from "./login";
import { useStateValue } from "./StateProvider";
function App() {
  const [{user}]=useStateValue()
  return (
    <div className="App">
    {!user?(
      <Login/>
    ):(
      <div className="app_body">
        <Router>
        <Sidebar/>
          <Switch>
          <Route path="/rooms/:roomId">
            <Chat/>
          </Route>
          <Route path="/">
            <Chat/>
          </Route>
          </Switch>
        </Router>
      </div>)}
    </div>
  );
}

export default App;
