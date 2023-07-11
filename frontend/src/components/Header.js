import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppBar, Button, Toolbar, Typography,Box,Tabs,Tab} from '@mui/material';
import { Link } from 'react-router-dom';
import { authActions } from '../store';
import { useStyles } from './Utils';

const Header = () => {
    const classes= useStyles();
    const dispath=useDispatch();
    const isLoggedIn= useSelector((state)=>state.isLoggedIn);

    const [value,setValue]=useState();
  return (
    <AppBar position="sticky" sx={{background:"linear-gradient(90deg, rgba(6,0,97,1) 0%, rgba(25,25,189,1) 51%, rgba(3,211,254,1) 100%)"}}>
        <Toolbar>
            <Typography className={classes.font} variant='h4'>BlogsApp</Typography>
          {
          isLoggedIn && <Box display="flex" marginLeft={"auto"}       marginRight="auto">
                <Tabs textColor="inherit" value={value} 
                onChange={(e,val)=>setValue(val)}>
                    <Tab className={classes.font} LinkComponent={Link} to ="/blogs" label="All Blogs"/>
                    <Tab className={classes.font} LinkComponent={Link} to ="/myBlogs" label="My Blogs"/>
                    <Tab className={classes.font} LinkComponent={Link} to ="/blogs/add" label="Add Blogs"/>
                </Tabs>

            </Box>}
            <Box display="flex" marginLeft="auto">
                {
                    !isLoggedIn && <>
                    <Button LinkComponent={Link} to ="/auth" variant='contained' sx={{margin:1,borderRadius:2}} color='primary'>Login</Button>
                    <Button LinkComponent={Link} to ="/auth" variant='contained' sx={{margin:1,borderRadius:2}} color='primary'>Signup</Button>
                </>}
                { 
                isLoggedIn &&
                 <Button 
                 onClick={()=>dispath(authActions.logout())}
                 LinkComponent={Link} 
                 to ="/auth" 
                 variant='contained' 
                 sx={{margin:1,borderRadius:2}} 
                 color='primary'>logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
    );
}

export default Header

