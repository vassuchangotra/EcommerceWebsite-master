import { Grid, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import Nav from './Nav'
import SettingsIcon from '@material-ui/icons/Settings';
import Detail from './Detail'
import Address from './Address'
import Account from './Account'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
function Profile() {
    return (
        <div>
            <Link style={{textDecoration:"none",color:"black",padding:"1%"}} to="/"><KeyboardBackspaceIcon style={{fontSize:"50px"}}/></Link>
            <Grid container>
                <Grid item xs={2} style={{height:"660px"}}>
                    <div style={{position:"fixed"}}>
                        <AccountCircleIcon style={{fontSize:"220px"}}/><br/><br/>
                        <List component="nav" style={{color:"white"}}>
                            <Link to="/detail" style={{color:"black",textDecoration:"none"}}><ListItem button>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="My Details" />
                            </ListItem></Link>
                            <Link to="/address" style={{color:"black",textDecoration:"none"}}><ListItem button>
                            <ListItemIcon>
                                <LocationOnIcon/>
                            </ListItemIcon>
                            <ListItemText primary="My Address" />
                            </ListItem></Link>
                            <Link to="/setting" style={{color:"black",textDecoration:"none"}}><ListItem button>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Account Setting" />
                            </ListItem></Link>
                        </List>
                    </div>
                </Grid>
                <Grid item xs={10}>
                <div style={{paddingTop:"3%",paddingBottom:"3%",textAlign:"center"}}><h1 style={{fontSize:"40px",fontWeight:"lighter"}}>MY ACCOUNT</h1></div><br/>
                <Switch >
                    <Route exact path="/detail" component={()=><Detail/>}/>
                    <Route exact path="/address" component={()=><Address/>}/>
                    <Route exact path="/setting" component={()=><Account/>}/>
                    <Redirect to="/detail"/>
                </Switch>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Profile
