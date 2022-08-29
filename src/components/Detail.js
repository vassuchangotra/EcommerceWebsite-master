import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Grid } from '@material-ui/core';
function Detail() {
    const [info, setinfo] = useState([])
    useEffect(() => {
        async function fun(){
            const val=await Axios.get("/cartDetail");
            setinfo(val.data);
        }
        fun();
    }, [])
    return (
        <div>
             <div style={{paddingTop:"3%",paddingLeft:"3%"}}><h1 >My Details</h1><br/><br/>
                <span style={{fontSize:"20px"}}>Personal Information</span><br/><br/><hr/>
                <Grid container>
                    <Grid item xs={3}>
                        <h1 style={{fontSize:"20px",fontWeight:"lighter"}}>We use personal information to prevent and detect fraud and abuse in order to protect the security of our customers</h1>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={4}>
                            <h1 style={{fontSize:"15px"}}>Name</h1>
                    <h1  style={{fontSize:"20px",fontWeight:"lighter"}}>{info.username}</h1>
                            </Grid>
                            <Grid item xs={4}>
                            <h1 style={{fontSize:"15px"}}>Email</h1>
                    <h1  style={{fontSize:"20px",fontWeight:"lighter"}}>{info.email}</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </div>
        </div>
    )
}

export default Detail
