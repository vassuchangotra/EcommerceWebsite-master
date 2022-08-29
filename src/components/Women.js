import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../women.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import women from "./reqwomen"
import Nav from './Nav'
import { Button, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactCircleColorPicker from 'react-circle-color-picker'
import FlipMove from 'react-flip-move';
function Women() {
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
  const handleChange1 = (event) => {
    setAge1(event.target.value);
    setquantity(event.target.value);
  };
  const handleChange = (event) => {
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
      setsize("");
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
        }
        async function parashan(){
            await Axios.get("/cartDetail",{timeout:2000})
            .then(res=>{
                setdat(res.data.cart);
            }).catch(err=>{
                console.log(err);
            })
            
        }
        fun();
        parashan();
    }, [success])
    return (
        <div className="row"  style={{paddingBottom:"8%"}}>
            <div className="row_posters">
            <FlipMove>
            {img.map(pos=>(
                <div key={pos.folder} className="row_large">
                    <figure className="product">
                        <div className="product__herro">
                            <img src={process.env.PUBLIC_URL + `/image/${pos.folder}/${pos.image_1}`} alt={pos.name} className="product__img" style={{height:"600px",width:"600px"}} onClick={()=>handleClickOpen(pos)}/>
                        </div>
                        <div className="product__content">
                            <div className="product__title">
                            <h1 className="product__heading">{pos.name}</h1>
                            <div className="product__tag product__tag--1">Bestseller</div>
                            <div className="product__tag product__tag--2">Trending</div>
                            </div>
                            <p className="product__description">{pos.description}</p>
                            <div className="product__details">
                            <Button variant="contained"
                                style={{ backgroundColor: "#a62c14",color:"white",textAlign:"center",width:"300px" }}
                                startIcon={<ShoppingCartIcon />} onClick={()=>handleCart(pos)}
                            >
                                ADD TO CART
                            </Button>
                            </div>
                        </div>
                            <div className="product__price" style={{paddingRight:"1%"}}>${pos.price}</div>
                        </figure>
                   </div>
            ))}
            </FlipMove>
            </div>
            <Dialog fullScreen open={open} onClose={handleClose}>
                         <Nav check={true}/>
                         <div style={{paddingTop:"60px"}}>
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
                                        onChange={handleChange}
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
                            <div style={{textAlign:"center"}}><DialogTitle id="alert-dialog-title"><span>Updated Successfully</span></DialogTitle></div>
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
                            <div style={{textAlign:"center"}}><DialogTitle id="alert-dialog-title"><span>Already Exist</span></DialogTitle></div>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            <span><img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/></span>
                            </DialogContentText>
                            </DialogContent>
                        </Dialog>}
                       </Dialog>
                       {success===true && <Dialog
                       style={{textAlign:"center"}}
                            open={true}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <div style={{textAlign:"center"}}><DialogTitle id="alert-dialog-title"><span>Updated Successfully</span></DialogTitle></div>
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
                            <div style={{textAlign:"center"}}><DialogTitle id="alert-dialog-title"><span>Already Exist</span></DialogTitle></div>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            <span><img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/></span>
                            </DialogContentText>
                            </DialogContent>
                        </Dialog>}
        </div>
    )
}

export default Women

