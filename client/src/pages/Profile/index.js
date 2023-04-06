import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"

function Profile({history}){
    const { t } = useTranslation(["common"]);
    const {user,logout}=useAuth()
    const handleLogout=async()=>{
         logout(()=>{
            //history.push("/")
            window.location="/signin"
            console.log("mesut");
        });
    }
    return (
        <div style={{marginTop:150}}>
            <Box mt={10} >
  <code> {JSON.stringify(user)}</code>
        
      <Link to="/">  <Button colorScheme="pink" variant="solid" onClick={handleLogout}>{t("logout")}</Button></Link>
     {/* <Button colorScheme="pink" variant="solid" onClick={handleLogout}>Logout</Button> */}
        </Box>
        </div>
    )
}
export default Profile;