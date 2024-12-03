//Import
import { styled } from "styled-components";
import Lottie from "react-lottie";
import * as animationData from "../CtLottie.json";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

//import Nav from "../Component/Nav";



//Styled Component
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #8080802f;




`;
const Wrapper = styled.div`
  display: flex;
  
  width: 90%;
  justify-content: center;
 
`;
const Left = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
 
  margin-right: 70px;
  border-radius: 5px;
  contain: paint;
  overflow: auto;
  
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
`;
const MiniTitle = styled.p`
  margin-top: 10px;
  font-size: 15px;
  color: #00000084;
`;

const Right = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  border-radius: 5px;
`;
const Qest = styled.h2`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 27px;
`;
const Label = styled.label`
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 500;
`;
const Input = styled.input`
  padding: 7px;
  width: 45vh;
  margin-bottom: 20px;
  border: 1px solid;
  border-color: #00000021;
  border-radius: 5px;

  &:focus {
    outline-color: #009f7f;
  }
`;
const Textarea = styled.textarea`
  margin-bottom: 30px;
  border: 1px solid;
  border-color: #00000021;
  border-radius: 5px;
  padding: 7px;
  &:hover {
    outline-color: #009f7f;
  }
`;
const Button = styled.button`
  padding: 10px;
  width: 15%;
  background-color: #009f7f;
  color: white;
  border: 1px teal;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;
const DivLabel = styled.div`
  display: flex;
`;
const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
const FollowUs = styled.div`
  color: #00000053;
  display: flex;
  justify-content: space-between;
  width: 130px;
  margin-top: 10px;
`;
const ContactUs = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // the animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //Body Of ContactUs
  return (
    <>
      
      <Container>
        <Wrapper>
          <Left>
            <Lottie options={defaultOptions} height={300} width={300} />
            <Div>
              <Title>Adress</Title>
              <MiniTitle>622 Dixie Path , South Tobinchester 98336</MiniTitle>
            </Div>

            <Div>
              <Title>Phone</Title>
              <MiniTitle>+129290122122</MiniTitle>
            </Div>
            <Div>
              <Title>Email Address</Title>
              <MiniTitle>demo@demo.com</MiniTitle>
            </Div>
            <Div>
              <Title>Website</Title>
              <MiniTitle>https://redq.io</MiniTitle>
            </Div>
            <Div>
              <Title>Follow Us</Title>
              <FollowUs>
                <InstagramIcon className="cursor-pointer hover:text-orange-500 "></InstagramIcon>
                <XIcon className="cursor-pointer  hover:text-orange-500 "></XIcon>
                <FacebookIcon className="cursor-pointer  hover:text-orange-500 "></FacebookIcon>
              </FollowUs>
            </Div>
          </Left>

          <Right>
            <Qest>How can we improve your experience?</Qest>
            <DivLabel>
              <DivInput>
                <Label>Name</Label>
                <Input></Input>
              </DivInput>

              <DivInput>
                <Label>Email</Label>
                <Input></Input>
              </DivInput>
            </DivLabel>

            <DivInput>
              <Label>Subject</Label>
              <Input></Input>
            </DivInput>
            <DivInput>
              <Label>Description</Label>
              <Textarea></Textarea>
            </DivInput>

            <Button>Submit</Button>
          </Right>
        </Wrapper>
      </Container>

     
    </>
  );
};

export default ContactUs;
