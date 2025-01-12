
import Login from "./authUI/login";
import {  Route, Routes, Navigate } from "react-router-dom";
import Register from "./authUI/register";
import Profile from "./authUI/profile";
import Home from "./Home/home";


import  { setUser } from "./redux/reducer/userSlice";
import { useDispatch , useSelector} from "react-redux";
import Projects from "./Projects/ProjectListing";

import Feed from './SocialMediaApp/Feed'
const Routers = () => {
  let user = useSelector((state) => state?.user)
  let dispatch = useDispatch()
  let token = localStorage.getItem("accessToken")
  let userdata = localStorage.getItem("user")

  if(!user.token && !user?.user?.name && token && userdata){
    
         
        let data = JSON.parse(userdata)
        dispatch(setUser({ user: data, token: token }));
  }
  
  return (
    <>
        
        <Routes>
         {token ? <Route path="/profile" element={<Profile />} />  
           : <Route path="/login" element={<Login />} /> }
          
        
         <Route path="/account" element={<Register />} />
         <Route path="/projects" element={<Projects />} />
         <Route path="/feed" element={<Feed />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Navigate to="/home" replace />}  />
        </Routes>
        
      
    </>
  )
}

export default Routers