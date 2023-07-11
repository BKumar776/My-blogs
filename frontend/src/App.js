import Header from "./components/Header";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Routes,Route} from 'react-router-dom';
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogsDetails";
import AddBolg from "./components/Addblogs";
import { authActions } from "./store";

function App(){

  const dispath=useDispatch();

  const isLoggedIn= useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispath(authActions.login())
    }
  },[dispath]);
 return (
 <React.Fragment>
   <header>
    <Header/>
  </header>
  <main>
    <Routes>
      { 
      !isLoggedIn ? <Route path="/auth" element={<Auth/>}/>:
      <>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blogs/add" element={<AddBolg/>}/>
      <Route path="/myblogs" element={<UserBlogs/>}/>
      <Route path="/myblogs/:id" element={<BlogDetails/>}/> </>}
        
    </Routes> 
  </main>
 </React.Fragment>
 )
}

export default App;
