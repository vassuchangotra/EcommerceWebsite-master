import { Grid } from '@material-ui/core';
import React from 'react'
import '../banner.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Nav from './Nav';
function Banner() {

    return (
        <div><Grid container>
            <Nav/>
        <Grid item xs={5} style={{backgroundColor:"#a62c14"}}>
        <h1 style={{color:"white",fontWeight:"lighter",letterSpacing:"8px",fontSize:"80px",paddingTop:"30%",paddingLeft:"5%"}}>CUSTOM<br/> FIT DENIM</h1>
            <div style={{paddingTop:"15%",paddingLeft:"1%",lineHeight:"2"}}>   
            <FacebookIcon style={{color:"white"}}/><br/>
            <InstagramIcon style={{color:"white"}}/><br/>
            <TwitterIcon style={{color:"white"}}/></div>
        </Grid>
        <Grid item xs={7}>
        <header className="banner"  style={{
                backgroundImage:`url(${process.env.PUBLIC_URL + `/image/back.jpg`})`,
                }}>
                    
                {/* <div className="banner_content">
                    
                    </div> */}
            </header>
        </Grid>
        </Grid>
            </div>
    )
}

export default Banner
