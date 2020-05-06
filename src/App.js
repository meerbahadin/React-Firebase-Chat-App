import React, { useState , useEffect ,Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import "./App.css";
import {PrivateRoute , PublicRoute}from "./components/Route";
import Navbar from './components/Navbar';

function App() {
  const [state, setState] = useState({
    authenticated : false,
  });

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setState({...state,
          authenticated : true,
        })
      } else {
        setState({...state,
          authenticated : false,
        });
      }
    })
  }, [])
  const user =  auth().currentUser;
  return (
    <Fragment>
    <Router>
    <Navbar user={user}/>
    <div className='container mt-5'>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <PrivateRoute
        path="/chat"
        authenticated={state.authenticated}
        component={Chat}
      ></PrivateRoute>
      <PublicRoute
        path="/signup"
        authenticated={state.authenticated}
        component={Signup}
      ></PublicRoute>
      <PublicRoute
        path="/login"
        authenticated={state.authenticated}
        component={Login}
      ></PublicRoute>
    </Switch>
    </div>
    </Router>
    </Fragment>
    
  );
}

export default App;
