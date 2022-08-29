import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, makeStyles } from '@material-ui/core';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
function Suc() {
    const classes = useStyles();
    const [add, setadd] = useState([]);
    const [total, settotal] = useState(0);
    var arr=[];
    function del(){
        Axios.post("/history",{arr})
        .then(res=>{
            console.log("DOne!!")
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(() => {
        async function fun(){
            const val=await Axios.get("/cartDetail");
            console.log(val.data.cart);
            var p=val.data.cart;
            var tot=0;
            for(var i=0;i<p.length;i++){
                tot=tot+parseInt(p[i].total);
            }
            settotal(tot);
            setadd(val.data.cart);
        }
        fun();
    }, [total])
    return (
        <div>
            <div style={{paddingTop:"5%",paddingBottom:"5%",textAlign:"center"}}><h1 style={{fontSize:"40px",fontWeight:"lighter"}}>INVOICE</h1></div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{fontWeight:"bold"}}>
            <TableCell style={{fontWeight:"bold"}}>Product</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Quantity</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Size&nbsp;</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Gross Amount&nbsp;</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Total&nbsp;</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Currency&nbsp;</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Payment&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {add.map((row) => (
            <TableRow key={row.folder}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">${row.price}</TableCell>
              <TableCell align="right">${row.total}</TableCell>
              <TableCell align="right">{row.currency}</TableCell>
              <TableCell align="right">Paid</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          <div style={{paddingTop:"2%",paddingRight:"1%",textAlign:"end"}}><span style={{fontSize:"40px",letterSpacing:"5px",fontWeight:"lighter"}}>Subtotal : ${total}</span><br/><br/>
          <Link to="/home" style={{textDecoration:"none"}}><Button variant="contained" color="primary" style={{width:"310px"}} onClick={()=>{del()}}>Contine Shopping</Button></Link>
          </div>
        </div>
    )
}

export default Suc
