import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@material-ui/core';
function Account() {
    const [info, setinfo] = useState("");
    const [old, setold] = useState("");
    const [update, setupdate] = useState("")
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [success, setsuccess] = useState(false)
    const [error, seterror] = useState(false)
    function handleAddress(e){
        e.preventDefault();
        if(city!=="" && state!==""){
            setsuccess(true);
                setTimeout(() => {
                    setsuccess(false);
                }, 2000);
            Axios.post("/address",{city,state})
            .then(res=>{
                console.log("Done!!");
                console.log(info);
            }).catch(err=>{
                console.log(err);
            })
        }
        else{
            seterror(true);
                setTimeout(() => {
                    seterror(false);
                }, 2000);
        }
    }
    function handleChange(e){
        e.preventDefault();
        if(old!=="" && update!==""){
            setsuccess(true);
                setTimeout(() => {
                    setsuccess(false);
                }, 2000);
            Axios.post("/updatePassword",{old,update})
            .then(res=>{
                console.log("Done!!");
            }).catch(err=>{
                console.log(err);
            })
        }
        else{
            seterror(true);
                setTimeout(() => {
                    seterror(false);
                }, 2000);
        }
    }
    useEffect(() => {
        async function fun(){
            const val=await Axios.get("/cartDetail");
            setinfo(val.data);
        }
        fun();
    }, [])   
     return (
        <div>
             <div style={{paddingTop:"3%",paddingLeft:"3%"}}><h1 >Account Setting</h1><br/>
                <span style={{fontSize:"20px"}}>Update Details</span><br/><br/><hr/>
                <Grid container>
                    <Grid item xs={5}>
                        <h1 style={{fontSize:"25px"}}>Change Password :</h1>
                        <form onSubmit={(e)=>handleChange(e)}>
                        <TextField type="password" id="standard-basic" onChange={(e)=>setold(e.target.value)} value={old} label="Old Password" /><br/><br/>
                        <TextField type="password" id="standard-basic" onChange={(e)=>setupdate(e.target.value)} value={update} label="New Password" /><br/><br/>
                        <Button type="submit" variant="contained" color="secondary">Save</Button>
                        </form>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        <h1 style={{fontSize:"25px"}}>Change Address :</h1>
                            <form onSubmit={(e)=>handleAddress(e)}>
                            <TextField id="standard-basic" style={{width:"400px"}} onChange={(e)=>setcity(e.target.value)} value={city} label="Address" /><br/><br/>
                            <TextField id="standard-basic" style={{width:"400px"}} onChange={(e)=>setstate(e.target.value)} value={state} label="State" /><br/><br/>
                            <Button type="submit" variant="contained" color="secondary">Save</Button>
                            </form>
                    </Grid>
                </Grid>
                {success===true && <Dialog
                style={{textAlign:"center"}}
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title"><span>Updated Successfully</span></DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <div style={{textAlign:"center"}}><img src="https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif" alt="success" style={{width:"250px",height:"200px"}}/></div>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
                {error===true &&<Dialog
                style={{textAlign:"center"}}
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <div style={{textAlign:"center"}}><DialogTitle id="alert-dialog-title"><h1>Empty Field</h1></DialogTitle></div>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <div style={{textAlign:"center"}}><img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/></div>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
                </div>
        </div>
    )
}

export default Account
