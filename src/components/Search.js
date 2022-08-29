import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import all from "./Menwomen"
import { Link } from 'react-router-dom';
import Main from './Main';
import { Carousel } from 'react-responsive-carousel';
import ReactCircleColorPicker from 'react-circle-color-picker'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      boxShadow:"0px 10px 30px -5px rgba(0, 0, 0, 0.5)"
    },
    media: {
      height: 200,
      paddingTop: '56.25%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));
function Search() {
    const classes = useStyles();
    const [allpro, setallpro] = useState([]);
    const [search, setsearch] = useState("");
    const [img, setimg] = useState([]);
    const [modal, setmodal] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [age1, setAge1] = React.useState('');
    const [quantity, setquantity] = useState("")
    const [size, setsize] = useState("")
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [dat, setdat] = useState([]);
    const handleClose = () => {
      setOpen(false);
    };
    const handleChangee = (event) => {
      setAge(event.target.value);
      setsize(event.target.value);
    };
    const handleChange1 = (event) => {
      setAge1(event.target.value);
      setquantity(event.target.value);
    };
    function handleCart(pos){
      var total=parseInt(pos.price);
      var q=1;
      var fit="L";
        if(quantity!==""){
          total=quantity*parseInt(pos.price);
          q=quantity;
        }
        if(size!==""){
            fit=size;
        }
        var arr=[{
            "name":pos.name,
            "sku":pos.name,
            "total":total,
            "price":parseInt(pos.price),
            "currency":"USD",
            "folder":pos.folder,
            "size":fit,
            "img":pos.image_1,
            "quantity":q
        }]
        setquantity("");
        var array=[];
        for(var i=0;i<dat.length;i++){
            array[i]=dat[i].folder;
        }
      if(!array.includes(pos.folder)){
          Axios.post("/cart",{arr},{timeout:2000})
          .then(res=>{
              console.log("Done!!");
          }).catch(err=>{
              console.log(err);
          })
          setsuccess(true);
          setTimeout(() => {
              setsuccess(false);
          }, 2000);
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
            const val=all;
            setallpro(val);
            setimg(val);
        }
        fun();
      }, [])
    const handlesearch=(event)=>{
        var f=allpro.filter(menu=>{
            var t=(menu.name);
            return (t.toLowerCase().includes(event.target.value));
        });
        setimg(f);
        setsearch(event.target.value);
    }
    const ProductDetail=(pos)=>{
      setmodal(pos);
      setOpen(true);
    }
    return (
        <div>
            <Grid container>
            <Grid item xs={2} style={{paddingTop:"1%"}}>
              <img  src={process.env.PUBLIC_URL + `/image/logogo.png`}/>
                </Grid>
                <Grid item xs={9} style={{paddingTop:"7%"}}>
                    <TextField id="standard-basic" style={{width:"1050px",fontSize:"40px",textTransform:"uppercase"}} value={search} autoComplete="off" onChange={(e)=>handlesearch(e)} label="Search" InputProps={{style:{color:"black",fontSize:"40px",textTransform:"uppercase"}}} InputLabelProps={{style:{color:"transparent"}}} />
                </Grid>
                <Grid item xs={1} style={{paddingTop:"7%"}}>
                  {search===""?<Link to="/"><ClearIcon style={{fontSize:"40px",paddingTop:"10%"}}/></Link>:<div></div>}
                </Grid>
            </Grid>
            <Grid container>
            {img.map(pos=>(<Grid key={pos.folder} item xs={3} style={{paddingLeft:"1%",paddingTop:"2%"}} data-aos="flip-right" data-aos-duration="800">
                <img style={{width:"300px",height:"400px"}} src={process.env.PUBLIC_URL + `/image/${pos.folder}/${pos.image_1}`} onClick={()=>ProductDetail(pos)}/><br/>
                            <span style={{fontSize:"15px"}}>{pos.name}</span><br/>
                            <span style={{fontSize:"15px"}}>$ {pos.price}</span>
                        </Grid>))}
            </Grid>
            <Dialog fullScreen open={open} onClose={handleClose}>
                          <Link style={{textDecoration:"none",color:"black",padding:"1%"}} to="#" onClick={()=>setOpen(false)}><KeyboardBackspaceIcon style={{fontSize:"50px"}}/></Link>
                         <div>
                         <Grid container>
                             <Grid item xs={6} >
                             <Carousel showThumbs={false} infiniteLoop={true} autoPlay>
                                <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_1}` } alt={modal.name} style={{width:"800px"}}/>
                                </div>
                                <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_2}` } alt={modal.name} style={{width:"800px"}}/>
                                 </div>
                                 <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_3}` } alt={modal.name} style={{width:"800px"}}/>
                                 </div>
                                 <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_4}` } alt={modal.name} style={{width:"800px"}}/>
                                 </div>
                             </Carousel>
                             </Grid>
                             <Grid item xs={4}>
                                 <div style={{padding:"10%", position:"relative"}}>
                                    <span style={{color:"grey"}}>Home/{modal.name}</span><br/>
                                    <h1>{modal.name}</h1><br/>
                                    <span style={{fontSize:"40px"}}>Colour</span><br/><br/>
                                    <ReactCircleColorPicker colors={[{ hex: '#3266a8', selected: false }, { hex: '#e01616', selected: false },{ hex: '#D3D3D3', selected: false },{ hex: '#e8e195', selected: false },{ hex: '#111', selected: false },{ hex: '#d9973b', selected: false },{ hex: '#1d79bf', selected: false },{ hex: '#916616', selected: false },{ hex: '#1f335c', selected: false }]} /><br/><br/>
                                    <span style={{fontSize:"40px"}}>Size</span><br/><br/>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">SIZE</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        style={{width:"80px"}}
                                        value={age}
                                        onChange={handleChangee}
                                        label="SIZE"
                                        >
                                        <MenuItem value="L">L</MenuItem>
                                        <MenuItem value="XL">XL</MenuItem>
                                        <MenuItem value="XXL">XXL</MenuItem>
                                        </Select>
                                    </FormControl><br/><br/>
                                    <span style={{fontSize:"40px"}}>Quantity</span><br/><br/>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Quantity</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={age1}
                                        style={{width:"100px"}}
                                        onChange={handleChange1}
                                        label="Quantity"
                                        >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        </Select>
                                    </FormControl><br/><br/>
                                    <span style={{fontSize:"40px"}}>Product Description</span><br/><br/>
                                    <span style={{letterSpacing:"1.5px",lineHeight:"1.5",fontSize:"20px"}}>{modal.description}</span><br/><br/>
                                    <Button variant="contained"
                                        style={{ backgroundColor: "#111",color:"white",textAlign:"center",width:"600px",position:"absolute",bottom:"0" }}
                                        startIcon={<ShoppingCartIcon />} onClick={()=>handleCart(modal)}
                                    >
                                        ADD TO CART
                                    </Button>
                                 </div>
                             </Grid>
                             <Grid item xs={2}>
                                 <div style={{width:"200px",height:"250px",backgroundColor:"#111",textAlign:"center",position:"absolute"}}>
                                    <span style={{color:"white",fontSize:"80px",position:"relative",top:"25%"}}>${modal.price}</span>
                                 </div>
                             </Grid>
                         </Grid>
                         </div>
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
                          <DialogTitle id="alert-dialog-title"><span>Already present in cart</span></DialogTitle>
                          <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          <img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/>
                          </DialogContentText>
                          </DialogContent>
                      </Dialog>}
                       </Dialog>
                       {success===true && <Dialog
                       style={{textAlign:"center"}}
                          open={true}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description">
                          <DialogTitle id="alert-dialog-title"><span>Updated Successfully</span></DialogTitle>
                          <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          <img src="https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif" alt="success" style={{width:"250px",height:"200px"}}/>
                          </DialogContentText>
                          </DialogContent>
                      </Dialog>}
                      {error===true &&<Dialog
                      style={{textAlign:"center"}}
                          open={true}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description">
                          <DialogTitle id="alert-dialog-title"><span>Already present in cart</span></DialogTitle>
                          <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          <img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/>
                          </DialogContentText>
                          </DialogContent>
                      </Dialog>}
        </div>
    )
}

export default Search
