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
  font-size: 2vw;
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
      params: { project_no },
    },
  }) => {
    const [data, setData] = useState();
    const search = useInput();
    useEffect(() => {
      Api.getEmployeeInProjectInfo(project_no).then((response) => {
        setData(response.data);
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
                <TitleSpan>프로젝트정보</TitleSpan>
                {data.map((item) => {
                  if (item.project_no) {
                    return (
                      <>
                        <LineItem>
                          <ContentSpan>프로젝트번호: </ContentSpan>
                          <ContentSpan>{item.project_no}</ContentSpan>
                        </LineItem>
                        <LineItem>
                          <ContentSpan>프로젝트이름</ContentSpan>
                          <ContentSpan>{item.project_name}</ContentSpan>
                        </LineItem>
                        <LineItem>
                          <ContentSpan>착수일자</ContentSpan>
                          <ContentSpan>{item.project_startdate}</ContentSpan>
                        </LineItem>
                        <LineItem>
                          <ContentSpan>종료일자</ContentSpan>
                          <ContentSpan>{item.project_enddate}</ContentSpan>
                        </LineItem>
                        <LineItem>
                          <ContentSpan>종료여부</ContentSpan>
                          <ContentSpan>
                            {item.project_enddate ? `Y` : `N`}
                          </ContentSpan>
                        </LineItem>
                      </>
                    );
                  }
                })}
              </UpperLeftContainer>
              <UpperRightContainer>
                <TitleSpan>투입직원정보</TitleSpan>
                {data.map((item) => {
                  return (
                    <>
                      <LineItem>
                        <ContentSpan>번호: </ContentSpan>
                        <ContentSpan>{item.emp_no}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>이름</ContentSpan>
                        <ContentSpan>{item.emp_name}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>부서번호</ContentSpan>
                        <ContentSpan>{item.dept_no}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>경력번호</ContentSpan>
                        <ContentSpan>{item.career_no}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>투입일자</ContentSpan>
                        <ContentSpan>{item.enter_date}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>철수일자</ContentSpan>
                        <ContentSpan>{item.finish_date}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>철수사유코드</ContentSpan>
                        <ContentSpan>{item.finish_reason}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>철수여부</ContentSpan>
                        <ContentSpan>
                          {item.finish_date ? `Y` : `N`}
                        </ContentSpan>
                      </LineItem>
                    </>
                  );
                })}
              </UpperRightContainer>
            </UpperContainer>
            <LowerContainer>
              <LowerLeftContainer>
                {data.map((item) => {
                  return (
                    <>
                      <LineItem>
                        <ContentSpan>프로젝트번호: </ContentSpan>
                        <ContentSpan>{item.project_no}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>프로젝트이름</ContentSpan>
                        <ContentSpan>{item.project_name}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>착수일자</ContentSpan>
                        <ContentSpan>{item.project_startdate}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>종료일자</ContentSpan>
                        <ContentSpan>{item.project_enddate}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>종료여부</ContentSpan>
                        <ContentSpan>
                          {item.project_enddate ? `Y` : `N`}
                        </ContentSpan>
                      </LineItem>
                    </>
                  );
                })}
              </LowerLeftContainer>
              <LowerRightContainer>
                {data.map((item) => {
                  return (
                    <>
                      <LineItem>
                        <ContentSpan>프로젝트번호: </ContentSpan>
                        <ContentSpan>{item.project_no}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>프로젝트이름</ContentSpan>
                        <ContentSpan>{item.project_name}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>착수일자</ContentSpan>
                        <ContentSpan>{item.project_startdate}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>종료일자</ContentSpan>
                        <ContentSpan>{item.project_enddate}</ContentSpan>
                      </LineItem>
                      <LineItem>
                        <ContentSpan>종료여부</ContentSpan>
                        <ContentSpan>
                          {item.project_enddate ? `Y` : `N`}
                        </ContentSpan>
                      </LineItem>
                    </>
                  );
                })}
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
