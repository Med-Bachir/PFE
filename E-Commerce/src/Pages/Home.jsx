
import styled from 'styled-components'
import Header from '../Components/Header'
import me from "../Home.json"
import Lottie from 'lottie-react'
import { Flex } from 'antd'



const Container = styled.div`
height: calc(100vh - 80px);
width: 100%;


`
const Wrapper = styled.div`
display: flex;


width: 100%;
height: 100%;
align-items: center;
`


const DescriptionContainer = styled.div`
flex: 1;



`

const Title = styled.h1`



`

const Desc = styled.p`



`

const Button = styled.button`

color: white;
padding:  10px 15px;
font-size: 20px;
border: none;
transition: 200ms;



background: rgb(208,63,243);
background: -moz-linear-gradient(90deg, rgba(208,63,243,1) 1%, rgba(138,45,237,1) 49%, rgba(68,28,231,1) 100%);
background: -webkit-linear-gradient(90deg, rgba(208,63,243,1) 1%, rgba(138,45,237,1) 49%, rgba(68,28,231,1) 100%);
background: linear-gradient(90deg, rgba(208,63,243,1) 1%, rgba(138,45,237,1) 49%, rgba(68,28,231,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d03ff3",endColorstr="#441ce7",GradientType=1);
&:hover {
    /* Option 1: Separate border color for hover (clear visibility) */
    border: 1px solid rgba(208, 63, 243, 0.7);
    border: 1px solid linear-gradient(90deg, rgba(208, 63, 243, 1) 1%, rgba(138, 45, 237, 1) 49%, rgba(68, 28, 231, 1) 100%); 

    /* Option 2: Increased border opacity for better visibility (subtle gradient) */
    
    color: transparent;  /* Make text transparent for background-clip */
  background-clip: text;  /* Clip background to the text content */
  background: linear-gradient(
    to right,
    rgba(208, 63, 243, 1) 0%,
    rgba(138, 45, 237, 1) 50%,
    rgba(68, 28, 231, 1) 100%
  );
    background: transparent;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d03ff3", endColorstr="#441ce7", GradientType=1);
    scale: 1.02;
  }

`
const Home = () => {
  return (
    <Container>
    
    <Wrapper>
    <Lottie style={{flex:1}} animationData={me}/>
<DescriptionContainer>
    <Title >Name</Title>
    <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, labore natus exercitationem, possimus at rerum eveniet ex quo cumque voluptatum dicta vel doloremque cum. Mollitia minima quaerat officiis ipsam assumenda.</Desc>
    <Button> Show more</Button>
</DescriptionContainer>
    </Wrapper>
    
       
    </Container>

  )
}

export default Home
