import React from "react";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import Banner from "./Banner"
import Men from "./Men"
import Women from "./Women"
import {Switch,Route, Redirect, NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'
import '../main.css'
import { Button, Grid } from "@material-ui/core";
import CopyrightIcon from '@material-ui/icons/Copyright';
// import AOS from 'aos';
// import '../../node_modules/aos/dist/aos.css';
function Main() {
//   AOS.init({
//     duration: 800,
//     easing: 'slide',
//     once: true
//   });
  return (
      <div>
          <Banner/>
          <Grid container style={{paddingTop:"5%",paddingBottom:"5%"}}>
            <Grid item xs={4}>
            <h1 style={{color:"black",fontWeight:"lighter",letterSpacing:"8px",fontSize:"80px",paddingLeft:"5%"}}  >NEW<br/> ARRIVAL</h1>
            <h1 style={{fontWeight:"500",paddingLeft:"5%"}}>SHIRTS & TEES</h1>
            </Grid>
            <Grid item xs={8} style={{paddingTop:"2%"}}>
            <h1 style={{color:"black",fontWeight:"lighter",letterSpacing:"8px",fontSize:"60px",paddingLeft:"5%"}}><BubbleChartIcon style={{color:"#a62c14",fontSize:"30px"}}/> 100% cotton <BubbleChartIcon style={{color:"#a62c14",fontSize:"30px"}}/> Made in USA</h1>
            <p style={{fontSize:"20px",letterSpacing:"5px",paddingLeft:"5%",lineHeight:"2.2"}}>Most comfortable shirts known to mankind. Free Shipping & Orders are processed in 24h-48h. These shirts are extremely buttery soft and stretchy. It is just like wearing t-shirt. Sale. Shop Now. Brands: 6-way stretch collection, New Arrivals, Sale.</p>
            </Grid>
          </Grid>
          
          <div style={{paddingTop:"5%",paddingBottom:"3%",textAlign:"center",fontSize:"20px"}} className="navbar">
          <NavLink exact activeClassName="navbar__link--active" style={{textDecoration:"none"}} className="navbar__link" to="/men">Men's</NavLink>
          <NavLink exact activeClassName="navbar__link--active" style={{textDecoration:"none"}} className="navbar__link" to="/women">Women's</NavLink>
          </div>
          <Switch >
            <Route path="/women" component={()=><Women/>}/>
            <Route path="/men" component={()=><Men/>}/>
            <Redirect to="/men"/>
        </Switch>
  <Link to="/productwomen" ><div style={{backgroundImage:`url("${process.env.PUBLIC_URL}/image/backback.jpg")`,backgroundSize:"cover",height:"500px", paddingBottom:"5%",backgroundAttachment:"fixed", backgroundPosition:"fixed"}}></div></Link>
        <div style={{position:"relative",paddingLeft:"2%",paddingBottom:"5%",paddingTop:"7%"}}>
        <Grid container>
          <Grid item xs={5}>
          <div className="card" style={{backgroundImage:`url("${process.env.PUBLIC_URL}/image/women.jpg")`}}>
            <Link to="/productwomen" className="card-text" style={{textDecoration:"none",position:"absolute"}}><Button className="btn1" style={{color:"white",fontWeight:"lighter",fontSize:"20px"}}>DISCOVER MORE</Button></Link>
          </div>
            
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            
          <div className="card" style={{backgroundImage:`url("${process.env.PUBLIC_URL}/image/men.jpg")`}}>
            <Link to="/productmen" className="card-text" style={{textDecoration:"none",position:"absolute"}}><Button className="btn1" style={{color:"white",fontWeight:"lighter",fontSize:"20px"}}>DISCOVER MORE</Button></Link>
          </div>
          </Grid>
        </Grid>
       
          </div>
        <div style={{backgroundColor:"#a62c14",width:"100%",height:"100%",color:"white",textAlign:"center",fontSize:"18px",fontWeight:"lighter",paddingTop:"5%",paddingBottom:"5%"}}><CopyrightIcon style={{fontSize:"15px"}}/>2020 ecommerce website</div>
    </div>
  );
}
// #312c2b
export default Main
