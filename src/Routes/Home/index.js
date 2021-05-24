import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 50vw;
  padding: 0 5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Article = styled.div`
  padding-top: 10vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #eee;
`;
const TitleSpan = styled(Link)`
  font-size: 2.2vw;
  font-weight: 700;
  margin-bottom: 1vw;
  color: #000;
`;
const ContentContainer = styled.div`
  width: 90%;
  height: 100%;
  padding-left: 2vw;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: none;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #fff;
`;
const ContentSpan = styled(Link)`
  margin-top: 1vw;
  font-size: 1.2vw;
  font-weight: 500;
  color: #666;
  :hover {
    color: #000;
    font-weight: 800;
    font-style: italic;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Article>
        <TitleSpan to="/EmpAdmin/main">직원관리</TitleSpan>
        <ContentContainer>
          <ContentSpan to="/EmpAdmin/rank">직원권한등급관리</ContentSpan>
          <ContentSpan to="/EmpAdmin/career">직원이력관리</ContentSpan>
          <ContentSpan to="/EmpAdmin/dept">직원부서변동관리</ContentSpan>
          <ContentSpan to="/EmpSalary">직원급여관리(요구사항10번)</ContentSpan>
          <ContentSpan to="/DepartmentAdmin">부서 관리</ContentSpan>
        </ContentContainer>
      </Article>
      <Article>
        <TitleSpan to="/ProjectAdmin/main">프로젝트관리</TitleSpan>
        <ContentContainer>
          <ContentSpan to="/ProjectArrange">
            프로젝트 커스텀 정렬 열람(요구사항8번)
          </ContentSpan>
          <ContentSpan to="/ProjectProceeding">
            프로젝트 별 투입 직원 열람(요구사항7번)
          </ContentSpan>
          <ContentSpan to="/ProjectPMPL">
            프로젝트 별 해당 직원의 PM, PL 열람(요구사항9번)
          </ContentSpan>
        </ContentContainer>
      </Article>
      <Article>
        <TitleSpan to="/ClientAdmin">발주처관리</TitleSpan>
        <ContentContainer>
          <ContentSpan>직원이력관리</ContentSpan>
        </ContentContainer>
      </Article>
      <Article>
        <TitleSpan to="/">포털관리자관리</TitleSpan>
        <ContentContainer>
          <ContentSpan>직원이력관리</ContentSpan>
        </ContentContainer>
      </Article>
    </Wrapper>
  );
};

export default Home;
