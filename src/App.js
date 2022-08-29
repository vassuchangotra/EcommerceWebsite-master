import React from 'react';
import './App.css';
import Main from "./components/Main"
import Login from "./components/Login"
import Cart from "./components/Cart"
import {Switch,Route} from 'react-router-dom'
import ProductMen from "./components/ProductMen";
import ProductWomen from "./components/ProductWomen";
import Suc from "./components/Suc";
import Profile from "./components/Profile";
import Try from './components/Try';
import Search from './components/Search';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Allnav from './components/Allnav';
import Wom from './components/Wom';
import Mon from './components/Mon';
import Allin from './components/Allin';
const theme=createMuiTheme({
	palette:{
		primary:{
      main:"rgb(0,0,0);"
		}
	}
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      {/* <Wom/> */}
      {/* <Mon/> */}
      {/* <Try/> */}
      {/* <Search/> */}
      {/* <Allnav/> */}
      {/* <Main/> */}
    <Switch>
      <Route exact path="/" component={()=><Login/>}/>
      <Route exact path="/home" component={()=><Try/>}/>
      <Route exact path="/men" component={()=><Mon/>}/>
      <Route exact path="/women" component={()=><Wom/>}/>
      <Route exact path="/allproduct" component={()=><Allin/>}/>
      <Route exact path="/productwomen" component={()=><ProductWomen/>}/>
      <Route exact path="/cart" component={()=><Cart/>}/>
      <Route exact path="/invoice" component={()=><Suc/>}/>
      <Route exact path="/profile" component={()=><Profile/>}/>
      <Route exact path="/detail" component={()=><Profile/>}/>
      <Route exact path="/address" component={()=><Profile/>}/>
      <Route exact path="/setting" component={()=><Profile/>}/>
      <Route exact path="/search" component={()=><Allnav/>}/>
    </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
