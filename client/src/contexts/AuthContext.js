import { Flex, Spinner } from '@chakra-ui/react';
import {useContext,createContext,useState,useEffect} from 'react'
import { fetchMe,fetchLogout } from '../api';

const AuthContext=createContext();
const AuthProvider=({children})=>{
 const [user,setUser]=useState(null);
 const [loggedIn,setLoggedIn]=useState(false);
 const [loading,setLoading]=useState(true)
 useEffect(()=>{
    (async()=>{
        try {
            const me=await fetchMe();
            setLoggedIn(true)
            setUser(me)
            setLoading(false)
            console.log("me",me);
        } catch (error) {
            setLoading(false)
        }
    })()
 },[])
 if (loading) {
    return <Flex justifyContent="center" alignItems="center" height="100vh" >
        <Spinner thickness='4px' speed='0.065' emptyColor='grey.200'size="xl" color="red.500"></Spinner>
    </Flex>
 }
 const login=(data)=>{
    setUser(data.user)
    setLoggedIn(true)
    localStorage.setItem("access_token",data.accessToken)
    localStorage.setItem("refresh_token",data.refreshToken)
 }
 const logout=async(callback)=>{
    setUser(null)
    setLoggedIn(false)
    await fetchLogout()
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    callback()
 }
 const values={
    user,
    loggedIn,
    login,logout
 }
 return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
 const useAuth=()=>useContext(AuthContext);

export {AuthProvider,useAuth}