import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../../api";
import useInput from "../../components/Hooks/useInput";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 45vw;
  margin-top: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const Article = styled.div`
  width: 100%;
  height: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleSpan = styled.span`
  font-size: 3vw;
  margin-bottom: 3vw;
`;
const InputContainer = styled.div`
  width: 50vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
`;
const InputItemContainer = styled.div`
  width: 60%;
  height: 3vw;
  margin-bottom: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const InputDesc = styled.span`
  width: 40%;
  font-size: 1.5vw;
`;

const InputBox = styled.input`
  width: 100%;
  height: 3vw;
  background: transparent;
  border: none;
  border-bottom: 2px solid black;
  font-size: 2vw;
  :focus {
    border-bottom: 2px solid white;
    transition-duration: 0.5s;
  }
`;
const Button = styled(Link)`
  font-size: 1.2vw;
  border: 2px solid black;
  padding: 0.6vw 1vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
  :hover {
    color: white;
    background: black;
  }
  cursor: pointer;
`;

const SmallSpan = styled.span`
  font-size: 1.2vw;
  cursor: pointer;
`;

const Auth = () => {
  const [mode, setMode] = useState("login");

  const no = useInput("");
  const id = useInput("");
  const pwd = useInput("");
  const email = useInput("");
  const Login = (emp_auth_id, emp_auth_pwd) => {
    Api.Login(emp_auth_id, emp_auth_pwd).then((response) => {
      if (response.data) {
        console.log(response.data);
        localStorage.setItem("emp_name", response.data[0].emp_name);
        localStorage.setItem("emp_rank_no", response.data[0].emp_rank_no);
        window.location.href = "/";
      }
    });
  };

  const Signup = (emp_no, emp_auth_id, emp_auth_pwd) => {
    Api.Signup(emp_no, emp_auth_id, emp_auth_pwd).then((response) => {
      // if (response.status === 200) {
      setMode("complete");
      console.log(response);
      // }
    });
  };
  return (
    <Wrapper>
      {mode === "login" && (
        <Article>
          <InputContainer>
            <TitleSpan>??????????????????</TitleSpan>
            <InputItemContainer>
              <InputDesc>?????????: </InputDesc>
              <InputBox placeholder={""} {...id}></InputBox>
            </InputItemContainer>
            <InputItemContainer>
              <InputDesc>????????????:</InputDesc>
              <InputBox placeholder={""} type={"password"} {...pwd}></InputBox>
            </InputItemContainer>
            <Button
              onClick={() => {
                Login(id.value, pwd.value);
              }}
            >
              ??????
            </Button>
            <SmallSpan
              onClick={() => {
                setMode("registration");
              }}
            >
              ?????? ?????? ????????? ?????????
            </SmallSpan>
          </InputContainer>
        </Article>
      )}
      {mode === "registration" && (
        <Article>
          <InputContainer>
            <TitleSpan>????????????</TitleSpan>
            <InputItemContainer>
              <InputDesc>????????????: </InputDesc>
              <InputBox placeholder={""} {...no}></InputBox>
              <InputDesc>?????????: </InputDesc>
              <InputBox placeholder={""} {...id}></InputBox>
            </InputItemContainer>
            <InputItemContainer>
              <InputDesc>????????????:</InputDesc>
              <InputBox placeholder={""} type={"password"} {...pwd}></InputBox>
            </InputItemContainer>
            <Button
              onClick={() => {
                Signup(no.value, id.value, pwd.value);
              }}
            >
              ????????????
            </Button>
            <SmallSpan
              onClick={() => {
                setMode("login");
              }}
            >
              ?????? ???????????????????
            </SmallSpan>
          </InputContainer>
        </Article>
      )}
      {mode === "complete" && (
        <Article>
          <InputContainer>
            <TitleSpan>????????? ??????????????????.</TitleSpan>
            <Button to="/">????????????</Button>
          </InputContainer>
        </Article>
      )}
    </Wrapper>
  );
};

export default Auth;
