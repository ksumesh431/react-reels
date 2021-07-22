import AuthProvider from "./Context/AuthProvider";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
// import SignInM from './Material/SignInM';
import SigninC from "./Chakra/SigninC";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Feed from './Components/Feed'
import FeedC from './Chakra/FeedC'
import PrivateRoute from "./Components/PrivateRoute";




// import Main from "./MaterialUI/Main";

import './App.scss'
import Ioa from "./Intersection/Ioa";
// import { createTheme, Paper, ThemeProvider } from "@material-ui/core";

function App() {
  
  return (
    
        <Router>
          {/* enclosing signup inside auth provider to give it context value */}
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={FeedC} />
              <Route path='/login' component={SigninC} />
              <Route path='/signup' component={Signup} />
            </Switch>
          </AuthProvider>
          {/* <Ioa/> */}
        </Router>
      

  );
}

export default App;
