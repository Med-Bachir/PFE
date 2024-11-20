import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";


const Container = styled.div`
  height: 60vh;
  background-color: #f1f1f122;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h1`
font-size: 85px;
margin-bottom: 20px;


`;

const Desc = styled.p`
font-size: 30px;
font-weight: 300;
margin-bottom: 20px;
`;
const InputContainer = styled.div`
width: 50%;
height: 40px;
display: flex;
justify-content: space-between;
background-color: white;
border: 1px solid lightgray;

`;

const Input = styled.input`
border: none;
flex: 8;
padding-left: 10px;
`;
const Button = styled.button`
flex: 1;
background-color: teal;
color: white;
cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>

      <Desc>Get Timely updates from your favorite products</Desc>
      <InputContainer>
        <Input placeholder="Write your Email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
