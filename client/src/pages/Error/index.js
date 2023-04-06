import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
function Error404(){
    return (<Alert status='error'>
        <h1 style={{textAlign:"center",margin:"auto" ,fontSize:100,textTransform:"uppercase"}}>404 NOT PAGE</h1>
    {/* <AlertIcon />
    <AlertTitle>Your browser is outdated!</AlertTitle>
    <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
  </Alert>)
}
export default Error404