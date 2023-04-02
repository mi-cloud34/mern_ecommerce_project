import { useEffect, useState } from "react";
import { Link ,useParams} from "react-router-dom";
import {useQuery} from 'react-query'
import styles from "./styles.module.css";
import {Select,  Button, Image } from "@chakra-ui/react";
import {BellIcon,SearchIcon } from '@chakra-ui/icons'
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

import { fetchSearch } from "../../api";
import Product from "../../pages/Product";
//import en from '../../../public/flag/en.png'
//import tr from "../../../public/flag/tr.png"
function Navbar() {
  const { loggedIn,user } = useAuth();
  const { items } = useBasket();
 const [name,setName]=useState("");
  
  const { i18n, t } = useTranslation(["common"]);

	useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("en");
		}
	}, [name]);
 
 
   function handleChange (e){
   
    // e.preventDefault();
  
     setName(e.target.value)
     console.log("nameee",name);
       return <Product name={name} />
     
    };
	const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};

  return (
   <div className={styles.nv}>
     <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">E-Commerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">{t("product")}</Link>
          </li>
        </ul>
      </div>
     
       <div className= {styles.search}>
              <SearchIcon className={styles.searhicon} />
              <input  placeholder="Search" value={name} onChange={handleChange} />
            </div>
      <div  style={{display:"flex"}}>
   
   <select 
							value={localStorage.getItem("i18nextLng")}
							onChange={handleLanguageChange}
						>
							<option value="en">English</option>
							<option  className={styles.flagtr} value="tr">Turkish</option>
							
						</select>
    <BellIcon alignItems="center" w={12} h={12} color="pink.600"/>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="pink">{t("login")}</Button>
            </Link>
            <Link to="/auth">
              <Button colorScheme="pink">{t("register")}</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Items:({items.length})
                </Button>
              </Link>
            )}
             {user?.role==="admin"&&(
                <Link to="/admin">
                    <Button colorScheme="pink" variant="ghost">Admin</Button>
                </Link>
                )}
            <Link to="/profile">
              <Button colorScheme="pink">Profil</Button>
            </Link>
           
          </>
        )}
      </div>
      </div>
    
      
    </nav>
   </div>
  );
}
export default Navbar;
