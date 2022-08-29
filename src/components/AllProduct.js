import { Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Menwomen from './Menwomen';
import clsx from 'clsx';
import {makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import ReactCircleColorPicker from 'react-circle-color-picker'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
function AllProduct() {
    const [img, setimg] = useState([]);
    const [ban, setban] = useState([]);
    const [ban1, setban1] = useState([]);
    const classes = useStyles();
    const [state, setState] = React.useState({right: false});
    const [value, setValue] = React.useState('');
    const [allpro, setallpro] = useState([])
    const [modal, setmodal] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [age1, setAge1] = React.useState('');
    const [quantity, setquantity] = useState("")
    const [size, setsize] = useState("")
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [dat, setdat] = useState([]);
    const handleChange = (event) => {
        setValue(event.target.value);
        var f=allpro.filter(menu=>{
            var t=(menu.name);
            return (t.toLowerCase().includes(event.target.value));
        });
        setimg(f);
        console.log(f);
      };
      const handleClose = () => {
        setOpen(false);
      };
        const handleSlide=(mini,maxi) => {
          var array=[];
          for(var i=0;i<allpro.length;i++){
                var val=parseInt(allpro[i].price);
                if(val>=mini && val<=maxi){
                    array.push(allpro[i]);
                }
          }
        setimg(array);
      }
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
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
          <div style={{paddingLeft:"10%",paddingTop:"10%"}}><div><span style={{fontSize:"20px",fontWeight:"700"}}>CHARACTERISTICS</span></div><br/>
        <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="" control={<Radio/>} label="All" />
                    <FormControlLabel value="shirt" control={<Radio/>} label="Shirt" />
                    <FormControlLabel value="t-shirt" control={<Radio />} label="T-shirt" />
                    <FormControlLabel value="hoody" control={<Radio/>} label="Hoody" />
                    <FormControlLabel value="jacket" control={<Radio />} label="Jacket" />
                    <FormControlLabel value="short" control={<Radio/>} label="Shorts" />
                    <FormControlLabel value="jean" control={<Radio/>} label="Jeans" />
                </RadioGroup>
                </FormControl><br/>
                <div style={{paddingTop:"5%",paddingBottom:"3%"}}><span style={{fontSize:"20px",fontWeight:"700"}}>PRICE</span></div>
                <div style={{lineHeight:"2.2"}}>
                <Link to="#" style={{textDecoration:"none",color:"black"}}><span onClick={()=>handleSlide(0,20)}>20$</span></Link><br/>
                <Link to="#" style={{textDecoration:"none",color:"black"}}><span onClick={()=>handleSlide(20,50)}>50$</span></Link><br/>
                <Link to="#" style={{textDecoration:"none",color:"black"}}><span onClick={()=>handleSlide(50,90)}>90$</span></Link><br/>
                <Link to="#" style={{textDecoration:"none",color:"black"}}><span onClick={()=>handleSlide(90,120)}>120$</span></Link><br/>
                <Link to="#" style={{textDecoration:"none",color:"black"}}><span onClick={()=>handleSlide(120,150)}>150$</span></Link><br/>
                <Link to="#" style={{textDecoration:"none",color:"black"}}><span onClick={()=>handleSlide(150,190)}>190$</span></Link><br/>
                <Link to="#" style={{textDecoration:"none",color:"black"}}><span onClick={()=>handleSlide(190,250)}>250$</span></Link>
                </div>
            </div>
      </div>
    );
    useEffect(() => {
        async function fun(){
            const val=Menwomen;
            setimg(val);
            setallpro(val);
        }
        fun();
        async function banner(){
            const arr1={
                "folder":"ban",
                "image_1":"5755165512_2_2_1.jpg",
                "image_2":"5755165512_2_1_1.jpg",
                "image_3":"5755165512_1_1_1.jpg",
                "image_4":"5755165512_6_1_1.jpg",
                "description":"Cardigan made of a wool blend. Featuring a round neckline, long sleeves and front button fastening.",
                "name":"WOOL BLEND KNIT CARDIGAN",
                "price":"35"
              }
              setban1(arr1);
        const arr={
            "folder":"ban1",
            "image_1":"5070350704_1_1_1.jpg",
            "image_2":"5070350704_2_1_1.jpg",
            "image_3":"5070350704_2_2_1.jpg",
            "image_4":"5070350704_2_3_1.jpg",
            "description":"Coat made of bi-stretch fabric. Lapel collar, long sleeves, hip welt pockets and an inside pocket. Central back vent and front button fastening.",
            "name":"COMFORT FIT SYNTHETIC WOOL COAT",
            "price":"55"
          }
          setban(arr);
        }
        banner();
      }, []);
      const ProductDetail=(pos)=>{
        setmodal(pos);
        setOpen(true);
      }
    return (
        <div>
            <span style={{fontSize:"120px",fontFamily:`'Playfair Display', serif`}}>ALL PRODUCTS</span>
            <div>
                <React.Fragment key="right">
                <Button style={{float:"right"}} onClick={toggleDrawer("right", true)}>+FILTERS</Button>
                <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
                    {list("right")}
                </Drawer>
                </React.Fragment>
            </div>
            <div style={{textAlign:"center",paddingBottom:"5%",paddingTop:"3%"}}>
                <Grid container>
                    <Grid item xs={12} lg={6}>
                        <img style={{width:"600px",height:"800px"}} src={process.env.PUBLIC_URL + `/image/${ban.folder}/${ban.image_1}`} onClick={()=>ProductDetail(ban)}/><br/>
                        <span style={{fontSize:"20px",fontWeight:"700"}}>NEW</span><br/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                            <img style={{width:"600px",height:"800px"}} src={process.env.PUBLIC_URL + `/image/${ban1.folder}/${ban1.image_1}`} onClick={()=>ProductDetail(ban1)}/><br/>
                            <span style={{fontSize:"20px",fontWeight:"700"}}>NEW</span><br/>
                    </Grid>
                </Grid>
            <h1 style={{paddingTop:"5%"}}>SHOP THE LATEST TRENDS WITH OUR NEW IN COLLECTION</h1>
            <p>Shop the latest clothing trends with our weekly edit of what’s new at Store. From our latest Woman collection and TRF lines, we have dresses, jeans, shoes, bags and more to suit every woman and every occasion. Explore the latest fashion trends here and now with us.</p>
            </div>
            <Grid container>
            {img.map((pos,idx)=>(<Grid key={pos.folder} item md={6} xs={12} sm={12} lg={6} style={{paddingLeft:"1%",paddingTop:"2%"}} data-aos="flip-right" data-aos-duration="800">
                <img style={{width:"600px",height:"800px"}} src={process.env.PUBLIC_URL + `/image/${pos.folder}/${pos.image_1}`} onClick={()=>ProductDetail(pos)}/><br/>
                            <span style={{fontSize:"17px"}}>{pos.name}</span><br/>
                            <span style={{fontSize:"17px"}}>$ {pos.price}</span>
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

export default AllProduct
