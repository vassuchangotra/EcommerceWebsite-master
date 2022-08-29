import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Grid } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
function Address() {
    const [info, setinfo] = useState([])
    const [address, setaddress] = useState(false)
    useEffect(() => {
        async function fun(){
            const val=await Axios.get("/cartDetail");
            if(val.data.address===null){
                setaddress(true);
            }
            setinfo(val.data);
        }
        fun();
    }, [])
    return (
        <div>
             <div style={{paddingTop:"3%",paddingLeft:"3%"}}><h1 >My Address</h1><br/><br/>
                <span style={{fontSize:"20px"}}>Delivery Address</span><br/><br/><hr/>
                <Grid container>
                    <Grid item xs={3}>
                        <h1 style={{fontSize:"20px",fontWeight:"lighter"}}>We ask for Address to prevent and detect fraud and abuse in order to protect the security of our customers.</h1>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8}>
                        {address===false && <Grid container>
                            <Grid item xs={5}>
                            <h1 style={{fontSize:"15px"}}>Address</h1>
                    <h1  style={{fontSize:"20px",fontWeight:"lighter"}}>{info.address}</h1>
                            </Grid>
                            <Grid item xs={3}>
                            <h1 style={{fontSize:"15px"}}>State</h1>
                    <h1  style={{fontSize:"20px",fontWeight:"lighter"}}>{info.state}</h1>
                            </Grid>
                        </Grid>}
                        {address===true && <div style={{paddingLeft:"10%",paddingTop:"2%"}}><span style={{fontSize:"40px",fontWeight:"lighter"}}> <ErrorIcon style={{fontSize:"35px"}}/> Save Address first</span></div>}
                    </Grid>
                </Grid>
                </div>
        </div>
    )
}

export default Address
