import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonProduct from './MonProduct';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
const useStyles = makeStyles({
    list: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    },
  });
function Mon() {
    const classes = useStyles();
      const [state, setState] = React.useState({
        left: false,
      });
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
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
                <div style={{position:"fixed"}}>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button style={{height:"100vh"}} onMouseOver={toggleDrawer(anchor, true)} ><ClearAllIcon style={{fontSize:"30px",color:"black"}}/></Button>
                <Drawer anchor={anchor}  open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
                </React.Fragment>
            ))}</div>
            <div style={{paddingLeft:"5%"}}>
            <MonProduct/></div>
            <div></div>
            </div>
        </div>
    )
}

export default Mon;
