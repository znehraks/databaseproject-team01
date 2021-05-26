import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Burger, Menu } from "./HamburgerMenu";
import logo from "../components/Styles/images/logo.PNG";

const Wrapper = styled.div`
  width: 100vw;
  height: 6vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: #000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
`;

const LogoContainer = styled(Link)`
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 10vw;
  height: auto;
`;

const MenuContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const HamburgerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5vw;
`;

const MenuSpan = styled(Link)`
  font-size: 1.1vw;
  color: #fff;
  :hover {
    color: #888;
  }
`;

const BurgerComponent = styled(Burger)``;

const MenuComponent = styled(Menu)``;
const Header = () => {
  const [open, setOpen] = useState(false);
  const Logout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };
  // useOnClickOutside(node, () => setOpen(false));
  return (
    <Wrapper>
      <LogoContainer to="/">
        <LogoImage src={logo}></LogoImage>
      </LogoContainer>
      {localStorage.getItem("userId") ? (
        <MenuSpan to="/">
          {localStorage.getItem("userId")}님 안녕하세요!
        </MenuSpan>
      ) : (
        <></>
      )}
      <MenuContainer>
        <MenuSpan to="/AboutUs">직원관리</MenuSpan>
      </MenuContainer>
      <MenuContainer>
        <MenuSpan to="/RecommendationIntro">프로젝트관리</MenuSpan>
      </MenuContainer>
      <MenuContainer>
        <MenuSpan to="/ResultHistory">발주처관리</MenuSpan>
      </MenuContainer>
      <MenuContainer>
        <MenuSpan to="/ResultHistory">직원평가</MenuSpan>
      </MenuContainer>
      {localStorage.getItem("userId") ? (
        <MenuContainer>
          <MenuSpan
            onClick={() => {
              Logout();
            }}
          >
            로그아웃
          </MenuSpan>
        </MenuContainer>
      ) : (
        <MenuContainer>
          <MenuSpan to="/Auth">로그인</MenuSpan>
        </MenuContainer>
      )}
      <MenuContainer>
        {/* <MenuSpan to="/ResultHistory">직원평가</MenuSpan> */}
      </MenuContainer>
      {/* <HamburgerContainer>
        <BurgerComponent open={open} setOpen={setOpen} />
        <MenuComponent open={open} setOpen={setOpen} />
      </HamburgerContainer> */}
    </Wrapper>
  );
};

export default Header;
