import { Box,Button,InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useStyles} from './Utils'


const labelStyle={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}
const Addblogs = () => {
  const navigate=useNavigate();
  const classes =useStyles();
  const [inputs,setInputs]=useState({
    title:" ",description:"",imageURL:""
  });

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  };
 const sendRequest =async()=>{
  const res= await axios.post("http://localhost:5000/api/blog/add",{
    title:inputs.title,
    description:inputs.description,
    image:inputs.imageURL,
    user:localStorage.getItem('userId')
  }).catch(err=>console.log(err))
  const data =await res.data;
  return data;
 }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={2} borderColor="skyblue"
         borderRadius={5} boxShadow="10px 10px 20px #ccc" 
         padding={3} margin={"auto"}
         marginTop={3} display="flex" 
         flexDirection={'column' } width={'80%'}>

          <Typography className={classes.font}
          fontWeight={'bold'} padding={3} 
          color="grey" variant='h2' textAlign={'center'}>
            Post your blog</Typography>

          <InputLabel  className={classes.font} sx={labelStyle}>Title</InputLabel>
          <TextField className={classes.font} name='title' value={inputs.title} onChange={handleChange}
           margin='normal' variant='outlined'/>

            <InputLabel className={classes.font} sx={labelStyle}>Descriptions</InputLabel>
          <TextField className={classes.font} name='description' value={inputs.description} onChange={handleChange}
          margin='normal' variant='outlined'/>

          <InputLabel className={classes.font} sx={labelStyle}>image Url</InputLabel>
          <TextField className={classes.font} name='imageURL' value={inputs.image} onChange={handleChange}
          margin='normal' variant='outlined'/>

          <Button sx={{mt:2,borderRadius:2}} variant="contained" color='primary' type='submit'>Submit </Button>
        </Box>
      </form>
    </div>
  )
}

export default Addblogs
