import React, { useEffect, useState } from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 30vw;
  height: 108vh;
  background: #000;
  color: white;
`;

const Menu = ({ open, setOpen, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  return (
    <>
      <StyledMenu
        open={open}
        setOpen={setOpen}
        aria-hidden={!isHidden}
        {...props}
      >
        <Wrapper>아직 미구현</Wrapper>
      </StyledMenu>
    </>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
