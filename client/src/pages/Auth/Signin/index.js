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
import { useTranslation } from "react-i18next";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import validationSchema from "./validation";
function SignIn() {
  const { t } = useTranslation(["common"]);

    const {login}=useAuth();
  const formik = useFormik({
    initialValues: {
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit: async (value, bag) => {
    try {
        const loginResponse=await fetchLogin({email:value.email,password:value.password});
        console.log(loginResponse);
        login(loginResponse)
        //history.push("/profile")
       //  redirect("/profile")
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
            <Heading>{t("singin")}</Heading>
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
             
            <Button colorScheme="pink" mt={4} type="submit" width="full">
            {t("login")}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}
export default SignIn;
