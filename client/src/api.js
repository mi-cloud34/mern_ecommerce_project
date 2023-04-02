import axios from 'axios'
axios.interceptors.request.use(
  function(config){
    const {origin}=new URL(config.url);
    const allowedOrigins=[process.env.REACT_APP_BASE_ENDPOINT];
    const token=localStorage.getItem('access_token')
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization=token;
    }
   return config;
  },
  function (error) {
    return  Promise.reject(error)
  }
)
export const axiosProductList=async({pageParams=1})=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParams}`)
  
  return data;
}; 
export const fetchProduct=async(id)=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`)
  
  return data;
}; 
export const fetchRegister=async(input)=>{
  const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,input)
  
  return data;
}; 
export const fetchLogin=async(input)=>{
  const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,input)
  
  return data;
};
export const fetchMe=async()=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`)
  
  return data;
};
export const fetchLogout=async()=>{
  const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,{
    refresh_token:localStorage.getItem("refresh_token")
  })
  
  return data;
};  
export const fetchOrder=async(input)=>{
  const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order`,input)
  
  return data;
};  
export const fetchGetOrder=async()=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/order`)
  
  return data;
};
export const deleteProduct=async(product_id)=>{
  const {data} = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`)
  
  return data;
};
export const fetchOneCategory=async(category_id)=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/category/${category_id}`)
  return data;
};
export const fetchSearch=async(name)=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/search/${name}`)
  
  return data;
};
export const fetchCategory=async()=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/category`)
  
  return data;
};
export const fetcSubCategory=async(id1,id2)=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/subcategory/${id1}/${id2}`)
  
  return data;
};