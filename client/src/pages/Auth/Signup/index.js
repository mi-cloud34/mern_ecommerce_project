import {
    Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, redirect } from "react-router-dom";
import { fetchRegister } from "../../../api";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contexts/AuthContext";
import validationSchema from "./validation";

import styles from "./styles.module.css";
function SignUp() {
  const { t } = useTranslation(["common"]);
  const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
    const {login}=useAuth();
  const formik = useFormik({
    initialValues: {
      email:"",
      password:"",
      passwordConfirm:"",
    },
    validationSchema,
    onSubmit: async (value, bag) => {
    try {
        const registerResponse=await fetchRegister({email:value.email,password:value.password});
        console.log(registerResponse);
        login(registerResponse)
        //history.push("/profile")
        // redirect("/profile")
        window.location="/"
    } catch (error) {
        
        bag.setErrors({general:error.response.data.message})
        console.log("err",error.response.data.message);
    }
    },
  });
  return (
    <div style={{ marginTop: 100}}>
      <Flex align="center" width="full" justifyContent="center">
        <Box>
          <Box pt={10} textAlign="center">
            <Heading>{t("signup")}</Heading>
          </Box>
          <Box my={4}> {formik.errors.general && (<Alert status="error">{formik.errors.general}</Alert>)}</Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>{t("email")}</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email&&formik.errors.email}
                ></Input>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>{t("password")}</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password&&formik.errors.password}
                ></Input>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>{t("confirmpassword")}</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.passwordConfirm&&formik.errors.passwordConfirm}
                ></Input>
              </FormControl>
              <p className={styles.text}>{t("or")}</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>{t("signupgoogle")}</span>
					</button>
            <Button colorScheme="pink" mt={4} type="submit" width="full">
               {t("signup")}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}
export default SignUp;
