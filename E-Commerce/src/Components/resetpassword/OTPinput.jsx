import React, { useContext, useEffect, useState } from "react";
import "./OTPinput.css";
import styled from "styled-components";
import {
  colorAccentDarkTransparent,
  colorAccentMain,
  colorAccentMedium,
  colorAccentMediumTransparent,
  colorAccentMoreTransparent,
  colorBackgroundBlack,
  colorBackgroundGray,
  colorElementBackgroundGray,
  colorPrimaryBlack,
  elementGrayBackground,
  lightMain,
  lightMedMain,
  main,
  secondText,
  softMainTransparent,
  whiteTextColor,
} from "../../Colors";
import { useSelector } from "react-redux";
import { RecoveryContext } from "../../App";
import newRequest from "../../utils/newRequest";

const Container = styled.div`

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme == "light" ? elementGrayBackground : colorBackgroundGray};
`;
const OTPForm = styled.form`
  width: 35%;
  min-width: 200px;
  min-height: 400px;
  height: 60%;
  background-color: ${({ theme }) =>
    theme == "light" ? whiteTextColor : colorBackgroundBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  gap: 20px;
  position: relative;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.082);
  border-radius: 15px;
  color: ${({ theme }) =>
    theme == "light" ? colorPrimaryBlack : elementGrayBackground};

  @media (max-width: 840px) {
    width: 80%;
  }
`;

const MainHeading = styled.h1`
  font-size: 32px;

  font-weight: 500;
`;

const OTPSubheading = styled.p`
  font-size: 0.7em;
  color: ${secondText};
  line-height: 17px;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.input`
  background-color: ${({ theme }) =>
    theme == "light" ? lightMedMain : colorAccentMediumTransparent};
  width: 50px;
  height: 50px;
  text-align: center;
  border: none;
  border-radius: 7px;
  color: ${({ theme }) => (theme == "light" ? main : colorAccentMain)};
  outline: none;
  font-weight: 600;

  &:focus,
  &:valid {
    background-color: ${({ theme }) =>
      theme == "light" ? softMainTransparent : colorAccentMoreTransparent};
    transition-duration: 0.3s;
  }
`;

const VerifyButton = styled.button`
  width: 100%;

  border: none;
  background-color: ${({ theme }) =>
    theme == "light" ? main : colorAccentMedium};
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  transition-duration: 0.2s;

  &:hover {
    background-color: ${({ theme }) =>
      theme == "light" ? lightMain : colorAccentMediumTransparent};
    transition-duration: 0.2s;
  }
`;

const ExitButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.171);
  background-color: ${({ theme }) =>
    theme == "light" ? main : colorAccentMedium};

  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${elementGrayBackground};
  font-size: 1.1em;
  cursor: pointer;
`;

const ResendNote = styled.div`
  font-size: 0.7em;
  color: ${secondText};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ResendButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => (theme == "light" ? main : colorAccentMain)};

  cursor: pointer;
  font-size: 1.1em;
  font-weight: 700;
`;

const OTPinput = () => {
  const { setPage, email, otp } = useContext(RecoveryContext);

  const theme = useSelector((state) => state.theme.mode);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    newRequest
      .post("/users/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

 useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);
  return (
    <Container theme={theme}>
      <OTPForm theme={theme} class="otp-Form">
        <MainHeading>Enter OTP</MainHeading>
        <OTPSubheading theme={theme}>
          We have sent a verification code to your email : {email}{" "}
        </OTPSubheading>
        <InputContainer>
          <InputBox
            theme={theme}
            onChange={(e) =>
              setOTPinput([
                e.target.value,
                OTPinput[1],
                OTPinput[2],
                OTPinput[3],
              ])
            }
            required="required"
            maxlength="1"
            type="text"
            id="otp-input1"
          />
          <InputBox
            theme={theme}
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                e.target.value,
                OTPinput[2],
                OTPinput[3],
              ])
            }
            required="required"
            maxlength="1"
            type="text"
            id="otp-input2"
          />
          <InputBox
            theme={theme}
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                e.target.value,
                OTPinput[3],
              ])
            }
            required="required"
            maxlength="1"
            type="text"
            id="otp-input3"
          />
          <InputBox
            theme={theme}
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                OTPinput[2],
                e.target.value,
              ])
            }
            required="required"
            maxlength="1"
            type="text"
            id="otp-input4"
          />
        </InputContainer>
        <VerifyButton onClick={() => verfiyOTP() } type="submit">Verify</VerifyButton>
        <ExitButton>X</ExitButton>
        <ResendNote>
          Didn't receive the code?
           <ResendButton
            
                      style={{
                        color: disable ? "gray" : theme == "light" ? main : colorAccentMain,
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </ResendButton>
        </ResendNote>
      </OTPForm>
    </Container>
  );
};

export default OTPinput;
