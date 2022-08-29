import React, { useEffect, useState } from 'react'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Nav from "./Nav"
import women from "./reqwomen"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import '../productwomen.css'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios';
import { Button, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactCircleColorPicker from 'react-circle-color-picker'
import ValueLabel from "@material-ui/core/Slider/ValueLabel";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import FlipMove from 'react-flip-move';
const StyledValueLabel = withStyles({
    label: {
      color:"black"
    }
  })(ValueLabel);
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      boxShadow:"0px 10px 30px -5px rgba(0, 0, 0, 0.5)"
    },
    media: {
      height: 200,
      paddingTop: '56.25%', // 16:9
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
function ProductWomen() {
    const [img, setimg] = useState([]);
    const [modal, setmodal] = useState([]);
    const [allpro, setallpro] = useState([])
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [age1, setAge1] = React.useState('');
    const [quantity, setquantity] = useState("")
    const [size, setsize] = useState("")
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [dat, setdat] = useState([]);
    const [search, setsearch] = useState("")
    const [volume, setvolume] = useState([25,219]);
      const [value, setValue] = React.useState('');

      const handleChange = (event) => {
        setValue(event.target.value);
        var f=allpro.filter(menu=>{
            var t=(menu.name);
            return (t.toLowerCase().includes(event.target.value));
        });
        setimg(f);
        console.log(f);
      };
const handlesearch=(event)=>{
    var f=allpro.filter(menu=>{
        var t=(menu.name);
        return (t.toLowerCase().includes(event.target.value));
    });
    setimg(f);
    console.log(img);
    setsearch(event.target.value);
}
  const handleChange1 = (event) => {
    setAge1(event.target.value);
    setquantity(event.target.value);
  };
  const handleChangee = (event) => {
    setAge(event.target.value);
    setsize(event.target.value);
  };
  function handleClickOpen(pos){
      setmodal(pos);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleSlide=(event, newValue) => {
      var mini=newValue[0];
      var maxi=newValue[1];
      
      var array=[];
      for(var i=0;i<allpro.length;i++){
            var val=parseInt(allpro[i].price);
            if(val>=mini && val<=maxi){
                array.push(allpro[i]);
            }
      }
    //   console.log(array);
    setvolume(newValue);
    setimg(array);
  }
  const classes = useStyles();
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
          "img":pos.image_3,
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
        const val=women;
        setimg(val);
        setallpro(val);
    }
    async function parashan(){
        const u= await Axios.get("/cartDetail",{timeout:2000});
        setdat(u.data.cart);
    }
    fun();
    parashan();
  }, [success])
    return (
        <div>
            <Nav check={true}/>
            <div style={{paddingTop:"64px"}}>
            <Grid container style={{height:"100%"}}>
            <Grid item xs={3}></Grid>
                <Grid item xs={3} style={{backgroundColor:"#a62c14",width:"800px",height:"660px",paddingLeft:"2%",position:"fixed"}}>
                    <div ></div>
                    <h1 style={{color:"white",fontWeight:"lighter",fontSize:"30px"}}>Categories :</h1>
                    <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="" style={{color:"white"}} control={<Radio style={{color:"white"}}/>} label="All" />
                    <FormControlLabel value="shirt" style={{color:"white"}} control={<Radio style={{color:"white"}}/>} label="Shirt" />
                        <FormControlLabel value="tee" style={{color:"white"}} control={<Radio style={{color:"white"}} />} label="T-shirt" />
                        <FormControlLabel value="blazer" style={{color:"white"}} control={<Radio style={{color:"white"}} />} label="Blazer" />
                        <FormControlLabel value="jacket"  style={{color:"white"}} control={<Radio style={{color:"white"}} />} label="Jacket" />
                        <FormControlLabel value="short"  style={{color:"white"}} control={<Radio style={{color:"white"}} />} label="Shorts" />
                        <FormControlLabel value="pant"  style={{color:"white"}} control={<Radio style={{color:"white"}} />} label="Pant" />
                    </RadioGroup>
                    </FormControl>
                    <h1 style={{color:"white",fontWeight:"lighter",fontSize:"30px"}}>Search :</h1>
                    <TextField id="standard-basic" value={search} autoComplete="off" onChange={(e)=>handlesearch(e)} label="Search" InputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"white"}}} /><br/><br/>
                    <h1 style={{color:"white",fontWeight:"lighter",fontSize:"30px"}}>Prize Range :</h1>
                     <Slider value={volume} min={25} step={5} max={219} onChange={handleSlide} style={{color:"white",width:"300px"}} ValueLabelComponent={StyledValueLabel} valueLabelDisplay="auto" aria-labelledby="range-slider"/>
                </Grid>
                <Grid item xs={9}>
                <div style={{paddingTop:"5%",paddingBottom:"5%",textAlign:"center"}}><span style={{fontSize:"40px",fontWeight:"lighter"}}>WOMEN <LocalMallIcon style={{fontSize:"30px"}}/></span></div>
                    <Grid container className="prowomen">
                    <FlipMove>
                    {img.map(pos=>(<Grid key={pos.folder} item xs={3} style={{paddingLeft:"1%",paddingTop:"2%"}} data-aos="flip-right" data-aos-duration="800">
                        <Card className="cardwomen" style={{ maxWidth:"345",boxShadow:"0px 10px 30px -5px rgba(0, 0, 0, 0.5)"}}>
                            <CardMedia
                                className={classes.media}
                                image={process.env.PUBLIC_URL + `/image/${pos.folder}/${pos.image_1}`} alt={pos.name} onClick={()=>handleClickOpen(pos)}
                            />
                            <CardContent>
                                <span>{pos.name}</span>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="Price">
                                <span style={{color:"black"}}>${pos.price}</span>
                                </IconButton>
                                <IconButton aria-label="Add to cart" onClick={()=>handleCart(pos)}>
                                <AddShoppingCartIcon style={{fontSize:"25px",color:"black"}} />
                                </IconButton>
                            </CardActions>
                            </Card>
                        </Grid>))}
                        </FlipMove>
                        {img.length===0 && <h1 style={{fontWeight:"lighter",fontSize:"40px",paddingLeft:"39%",paddingTop:"13%"}}>Not Available <SentimentVeryDissatisfiedIcon style={{fontSize:"30px"}}/></h1>}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog fullScreen open={open} onClose={handleClose}>
                         <Nav check={true}/>
                         <div style={{paddingTop:"60px"}}>
                         <Grid container>
                             <Grid item xs={6} >
                             <Carousel showThumbs={false} infiniteLoop={true} autoPlay>
                                <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_1}` } alt={modal.name}style={{width:"800px"}}/>
                                </div>
                                <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_2}` } alt={modal.name}style={{width:"800px"}}/>
                                 </div>
                                 <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_3}` } alt={modal.name}style={{width:"800px"}}/>
                                 </div>
                                 <div>
                                    <img src={process.env.PUBLIC_URL + `/image/${modal.folder}/${modal.image_4}` } alt={modal.name}style={{width:"800px"}}/>
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
                                        style={{ backgroundColor: "#a62c14",color:"white",textAlign:"center",width:"600px",position:"absolute",bottom:"0" }}
                                        startIcon={<ShoppingCartIcon />} onClick={()=>handleCart(modal)}
                                    >
                                        ADD TO CART
                                    </Button>
                                 </div>
                             </Grid>
                             <Grid item xs={2}>
                                 <div style={{width:"200px",height:"250px",backgroundColor:"#a62c14",textAlign:"center",position:"absolute"}}>
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
        </div>
    )
}

export default ProductWomen
