import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid, Menu, MenuItem, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    list: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    },
  });
function Navnav() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
      const [state, setState] = React.useState({
        left: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          style={{textAlign:"start",paddingTop:"30%",fontSize:"40px",fontFamily: `'Roboto Mono', monospace`}}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{paddingLeft:"5%",fontWeight:"900",letterSpacing:"-1px"}}>
            <Link to="/" style={{textDecoration:"none",color:"black"}}><span>HOME</span></Link><br/>
            <Link to="/women" style={{textDecoration:"none",color:"black"}}><span>WOMAN</span></Link><br/>
            <Link to="/men" style={{textDecoration:"none",color:"black"}}><span>MAN</span></Link><br/>
            <Link to="/search" style={{textDecoration:"none",color:"black"}}><span>SEARCH</span></Link><br/>
            <Link to="/allproduct" style={{textDecoration:"none",color:"black"}}><span>ALL PRODUCTS</span></Link><br/><br/>
            <Link to="/cart" style={{textDecoration:"none",color:"black"}}><span>CART</span></Link><br/>
            <Link to="/profile" style={{textDecoration:"none",color:"black"}}><span>PROFILE</span></Link><br/>
            <Link to="/" style={{textDecoration:"none",color:"black"}}><span>LOG-OUT</span></Link><br/>
         </div>
        </div>
      );
    return (
        <div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button style={{height:"100vh"}} onMouseOver={toggleDrawer(anchor, true)} ><ClearAllIcon style={{fontSize:"30px",color:"white"}}/></Button>
                <Drawer anchor={anchor}  open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
                </React.Fragment>
            ))}
            <div style={{height:"500px",paddingTop:"1%",textAlign:"center",flexDirection:"column",display:"flex",justifyContent:"space-between"}}>
            <Link to="/search" style={{textDecoration:"none"}}><Grid container>
                <Grid item xs={1} style={{paddingTop:"3%"}}>
                    <span style={{fontSize:"30px",color:"white"}}>SEARCH</span>
                </Grid>
                <Grid item xs={11}>
                    <TextField id="standard-basic" autoComplete="off" label="Search" InputProps={{style:{color:"white"} }} InputLabelProps={{style:{color:"transparent"}}} />
                </Grid>
            </Grid></Link>
            <div style={{width:"400px"}}>
            <span style={{fontFamily: `'Roboto Mono', monospace`,fontWeight:"bolder",fontSize:"100px",color:"white"}}>NEW IN</span><br/>
            <p style={{color:"white"}}>Explore this week's latest menswear pieces of the season curated for you</p>
            <Link to="/allproduct" style={{color:"black",textDecoration:"none"}}><Button className="btn1" style={{color:"white",fontWeight:"lighter",fontSize:"20px",border:"1px solid white",width:"150px"}}>VIEW</Button></Link>
            </div></div>
            <div style={{width:"80px",paddingRight:"2%", paddingTop:"2%",color:"white",display:"flex",justifyContent:"space-between"}}><AccountCircleIcon style={{fontSize:"30px"}}  onClick={handleClick}/><Link to="/cart" style={{textDecoration:"none",color:"white"}}><LocalMallIcon style={{fontSize:"30px"}}/></Link>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/profile" style={{textDecoration:"none",color:"black"}}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
            <Link to="/" style={{textDecoration:"none",color:"black"}}><MenuItem onClick={()=>localStorage.clear()}>Logout</MenuItem></Link>
          </Menu></div>
            </div>
        </div>
    )
}

export default Navnav
