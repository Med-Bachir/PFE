import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Container = styled.div`
  height: 45vh;
  background-color: #ffffff;
  display: flex;
  color: black;
`;
const SocialContainer = styled.div`
  display: flex;

  width: 200px;
`;
const Left = styled.div`
  flex: 1;
  padding: 20px;
  color: #000000b5;
  display: flex;
  flex-direction: column;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.h3`
  margin-bottom: 30px;
  color: teal;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  list-style: none;
  color: black;
  width: 50%;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: orange;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Desc = styled.p`
  font-size: 18px;
  line-height: 25px;
  margin: 20px 0px;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #${(props) => props.color};
  border-radius: 50%;
  align-items: center;
  margin-right: 20px;
`;
const ContactItems = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`;
const Payment = styled.img`
  width: 15%;
  cursor: pointer;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo className="text-teal-700	">LOGO.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which dont look even slightly believable.
        </Desc>
        <SocialContainer>
          <IconContainer color="ffffff">
            <FacebookIcon className="text-teal-700 cursor-pointer  hover:text-orange-500 " />
          </IconContainer>
          <IconContainer color="ffffff">
            <InstagramIcon className="text-teal-700 cursor-pointer  hover:text-orange-500 " />
          </IconContainer>
          <IconContainer color="ffffff">
            <XIcon className="text-teal-700 cursor-pointer  hover:text-orange-500 " />
          </IconContainer>{" "}
          <IconContainer color="ffffff">
            <PinterestIcon className="text-teal-700 cursor-pointer  hover:text-orange-500 transition-all	" />
          </IconContainer>
        </SocialContainer>
      </Left>

      <Center>
        <Title className="text-teal-700	font-semibold">Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>closthes Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title className="text-black	font-semibold">Contact</Title>
        <ContactItems>
          <RoomIcon style={{ marginRight: "10px", color: "teal" }} /> 622 Dixie
          Path , South Tobinchester 98336
        </ContactItems>
        <ContactItems>
          <PhoneIcon style={{ marginRight: "10px", color: "teal" }} /> +1 234 56
          78
        </ContactItems>
        <ContactItems>
          <EmailIcon style={{ marginRight: "10px", color: "teal" }} />{" "}
          demo@demo.com
        </ContactItems>
        <Payment src="https://www.poste.dz/cache/news_article_show/uploads/medias/0f0d0ea60b6f9b66cdcd395747b5182be26d6e27.jpg" />
      </Right>
    </Container>
  );
};

export default Footer;
