import { Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Link } from 'react-router-dom';
import Nav from './Nav'
import FlipMove from 'react-flip-move';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
function Cart() {
    const [add, setadd] = useState([]);
    const [total, settotal] = useState(0)
    const [checked, setChecked] = React.useState(true);
    const [box, setbox] = useState(false);
    const [address, setaddress] = useState(false)
    const [success, setsuccess] = useState(false)
    const [al, setal] = useState(false)
    const handleChange = (event) => {
        setChecked(event.target.checked);
        setbox(event.target.checked);
        if(checked){
            console.log("hello");
        }
      };
      function handleSubmit(e){
        e.preventDefault();
        if(address===false){
            Axios.post("/pay",{add,total})
            .then((res)=>{
                window.location.href=res.data;
            }).catch(err=>{
                console.log(err);
            })
        }
        else{
            setsuccess(true);
            setTimeout(() => {
                setsuccess(false);
            }, 2000);
        }
    }
    function handleDelete(movie){
        setal(true);
            setTimeout(() => {
                setal(false);
            }, 2000);
            Axios.post("/dellist",{movie},{timeout:2000})
            .then(res=>{
                console.log("Done!!");
            }).catch(err=>{
                settotal(total-movie.total);
                console.log(err);
            })
        //   window.location.reload(false);      
    }
    useEffect(() => {
        async function fun(){
            const val=await Axios.get("/cartDetail",{timeout:2000});
            if(val.data.address===null){
                setaddress(true);
            }
            var p=val.data.cart;
            var tot=0;
            for(var i=0;i<p.length;i++){
                tot=tot+parseInt(p[i].total);
            }
            settotal(tot);
            console.log(val);
            setadd(val.data.cart);
        }
        fun();
    }, [total])
    return (
        <div>
            <Link style={{textDecoration:"none",color:"black",padding:"1%"}} to="/"><KeyboardBackspaceIcon style={{fontSize:"50px"}}/></Link>
            <div style={{textAlign:"center"}}>
    <div style={{paddingTop:"10%",paddingBottom:"10%"}}>{add.length!==0 && <span style={{fontSize:"40px",fontWeight:"lighter"}}>MY SHOPPING BAG <LocalMallIcon style={{fontSize:"30px"}}/></span>}{add.length===0 && <span style={{fontSize:"40px",fontWeight:"lighter"}}>EMPTY <LocalMallIcon style={{fontSize:"30px"}}/></span>}</div>
            <List>
                <FlipMove>
                {add.map(cart=>
                    <ListItem key={cart.folder} button>
                        <ListItemText style={{position:"relative",paddingLeft:"2%",paddingRight:"2%"}}>
                            <Grid container>
                                <Grid item xs={3}>
                                <img src={process.env.PUBLIC_URL + `/image/${cart.folder}/${cart.img}`} alt={cart.name} style={{width:"250px",height:"300px"}}/>
                                </Grid>
                                <Grid item xs={7}>
                                    <span style={{fontSize:"40px",letterSpacing:"2px",fontWeight:"lighter"}}>{(cart.name).toLowerCase()}</span><br/><br/>
                                    <div style={{lineHeight:"2"}}><span style={{letterSpacing:"2px"}}>Size: {cart.size}</span><br/>
                                    <span>Quantity: {cart.quantity}</span><br/>
                                    <span>$ {cart.price}</span><br/></div><br/><br/><br/>
                                    <span style={{textDecoration:"underline"}} onClick={()=>{handleDelete(cart)}}>Remove item</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <span style={{fontSize:"50px",position:"absolute",top:"40%"}}>${cart.total}</span>
                                </Grid>
                            </Grid>
                        </ListItemText>
                    </ListItem>
                )}
                </FlipMove>
            </List>
            {(total!==0) &&<Grid container style={{paddingTop:"5%",paddingBottom:"7%"}}>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={3}>
                <span style={{fontSize:"40px",letterSpacing:"5px",fontWeight:"lighter",paddingRight:"30%"}}>Subtotal</span>
                <br/><br/>
                <span style={{fontSize:"15px",fontWeight:"lighter"}}>Delivery and taxes calculated in product price</span><br/><br/>
                <Checkbox color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} onChange={(e)=>handleChange(e)}/> <span style={{fontSize:"12px"}}>I have read and accepted the terms and conditions</span><br/><br/>
                <Link to="/home" style={{textDecoration:"none",paddingRight:""}}><Button variant="contained" color="primary" style={{width:"310px"}}>Contine Shopping</Button></Link>
                </Grid>
                <Grid item xs={2}>
                    <span style={{fontSize:"40px",letterSpacing:"5px",fontWeight:"lighter"}}>${total}</span><br/><br/><br/><br/><br/><br/><br/>
                    <form onSubmit={(e)=>handleSubmit(e)}><Button type="submit" disabled={!box} variant="contained" color="secondary">Checkout</Button></form>
                </Grid>
            </Grid>}
            </div>
            {success===true && <Dialog
            style={{textAlign:"center"}}
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <div style={{textAlign:"center"}}><DialogTitle id="alert-dialog-title"><h1>Firstly Save address in "My account" section</h1></DialogTitle></div>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <div style={{textAlign:"center"}}><img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/></div>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
                {al===true && <Dialog
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Deleted from Cart Successfully</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <img src="https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif" alt="success" style={{width:"250px",height:"200px"}}/>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
        </div>
    )
}

export default Cart
