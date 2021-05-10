import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Api } from "../../api";
import useInput from "../../components/Hooks/useInput";

const Wrapper = styled.div`
  width: 100vw;
  height: 50vw;
  margin-top: 6vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UpperContainer = styled.div`
  width: 60%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const UpperLeftContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: none;
  border-right: none;
`;
const UpperRightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;
const LineItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const TitleSpan = styled.span`
  font-size: 1.2vw;
`;
const ContentSpan = styled.span`
  font-size: 1.2vw;
`;
const LowerContainer = styled.div`
  width: 60%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LowerLeftContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;
const LowerRightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-top: none;
  border-left: none;
`;
const EmpDetail = withRouter(
  ({
    match: {
      params: { emp_no },
    },
  }) => {
    const [data, setData] = useState();
    const search = useInput();
    useEffect(() => {
      Api.getEmpDetailInfo(emp_no).then((response) => {
        setData(response.data[0]);
        console.log(response.data);
      });
    }, []);
    return (
      <Wrapper>
        {data ? (
          <>
            {" "}
            <UpperContainer>
              <UpperLeftContainer>
                <LineItem>
                  <TitleSpan>직원번호</TitleSpan>
                  <ContentSpan>{data.emp_no}</ContentSpan>
                </LineItem>
                <LineItem>
                  <TitleSpan>직원이름</TitleSpan>
                  <ContentSpan>{data.emp_name}</ContentSpan>
                </LineItem>
              </UpperLeftContainer>
              <UpperRightContainer>
                <LineItem>
                  <TitleSpan>프로젝트 투입 현황</TitleSpan>
                  <ContentSpan>{data.project_no}</ContentSpan>
                </LineItem>
                <LineItem>
                  <TitleSpan>프로젝트 최근 투입 일자</TitleSpan>
                  <ContentSpan>{data.enter_date}</ContentSpan>
                </LineItem>
                <LineItem>
                  <TitleSpan>프로젝트 투입 현황</TitleSpan>
                  <ContentSpan>{data.project_no}</ContentSpan>
                </LineItem>
                <LineItem>
                  <TitleSpan>프로젝트 투입 현황</TitleSpan>
                  <ContentSpan>{data.project_no}</ContentSpan>
                </LineItem>
              </UpperRightContainer>
            </UpperContainer>
            <LowerContainer>
              <LowerLeftContainer>
                <LineItem>
                  <TitleSpan></TitleSpan>
                  <ContentSpan></ContentSpan>
                </LineItem>
              </LowerLeftContainer>
              <LowerRightContainer>
                <LineItem>
                  <TitleSpan></TitleSpan>
                  <ContentSpan></ContentSpan>
                </LineItem>
              </LowerRightContainer>
            </LowerContainer>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    );
  }
);

export default EmpDetail;
