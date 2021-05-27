import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../../api";
import useInput from "../../components/Hooks/useInput";
import NotAllowed from "../../components/NotAllowed";

const Wrapper = styled.div`
  width: 100vw;
  height: 50vw;
  margin-top: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;
const SearchBar = styled.input`
  width: 20vw;
  height: 3vw;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background: transparent;
  font-size: 2vw;
  :hover,
  :focus {
    border-bottom: 2px solid #000;
  }
`;

const SearchSpan = styled.span`
  font-size: 1.5vw;
  margin-left: 1vw;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 0.8vw 1vw;
  cursor: pointer;
  :hover {
    color: #fff;
    background: #000;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0.8vw;
`;
const ListItem = styled(Link)`
  width: 90%;
  height: 3vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
const ListItemSpan = styled.span`
  text-align: center;
  font-size: 1.2vw;
  flex: ${(props) => (props.flex ? `${props.flex}` : `1`)};
`;

const ButtonContainer = styled.div`
  width: 30%;
  height: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Prev = styled.span`
  width: 5vw;
  height: 3vw;
  font-size: 1.2vw;
  flex: 1;
  text-align: center;
  cursor: pointer;
`;
const CurrentPage = styled.span`
  width: 5vw;
  height: 3vw;
  font-size: 1.2vw;
  flex: 1;
  text-align: center;
`;
const Next = styled.span`
  width: 5vw;
  height: 3vw;
  font-size: 1.2vw;
  flex: 1;
  text-align: center;
  cursor: pointer;
`;

const Blank = styled.div`
  flex: 1;
`;
const Req08 = () => {
  const [data, setData] = useState();
  const [orderBy, setOrderBy] = useState("recent");
  const [empNo, setEmpNo] = useState();
  const [page, setPage] = useState(1);
  const search = useInput();
  useEffect(() => {
    localStorage.getItem("emp_rank_no") &&
      Number(localStorage.getItem("emp_rank_no")) <= 2 &&
      Api.getEmpInfo().then((response) => {
        setData(response.data);
        console.log(response);
        console.log(response.data);
      });
  }, [orderBy]);
  //   useEffect(() => {
  //     Api.getEmpInfo().then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //     });
  //   }, []);
  return (
    <>
      {localStorage.getItem("emp_rank_no") &&
      Number(localStorage.getItem("emp_rank_no")) <= 2 ? (
        <Wrapper>
          <SearchContainer>
            <SearchSpan>
              행을 누르면 해당 직원이 투입된 프로젝트의 PM,PL 열람이 가능합니다.
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <ListItem>
              <ListItemSpan>직원번호</ListItemSpan>
              <ListItemSpan>직원이름</ListItemSpan>
              {/* <ListItemSpan>주민등록번호</ListItemSpan> */}
              <ListItemSpan>최종학력</ListItemSpan>
              <ListItemSpan>권한등급</ListItemSpan>
              <ListItemSpan>부서</ListItemSpan>
              <ListItemSpan>인사점수</ListItemSpan>
              <ListItemSpan>관리직원번호</ListItemSpan>
              <ListItemSpan>연봉</ListItemSpan>
              <ListItemSpan>수정일자</ListItemSpan>
            </ListItem>
            {data &&
              data.map((item, index) => {
                if ((index >= (page - 1) * 8) & (index < page * 8)) {
                  return (
                    <ListItem to={`/ProjectPMPLDetail/${item.emp_no}`}>
                      <ListItemSpan>{item.emp_no}</ListItemSpan>
                      <ListItemSpan>{item.emp_name}</ListItemSpan>
                      {/* <ListItemSpan>{item.emp_rrn}</ListItemSpan> */}
                      <ListItemSpan>{item.emp_final_edu}</ListItemSpan>
                      <ListItemSpan>{item.emp_rank_name}</ListItemSpan>
                      <ListItemSpan>{item.dept_name}</ListItemSpan>
                      <ListItemSpan>{item.hr_score}</ListItemSpan>
                      <ListItemSpan>{item.emp_manager_no}</ListItemSpan>
                      <ListItemSpan>{item.salary}</ListItemSpan>
                      <ListItemSpan>
                        {item.updated_at.split("T")[0]}-
                        {item.updated_at.split("T")[1].split(".")[0]}
                      </ListItemSpan>
                    </ListItem>
                  );
                }
              })}
          </ListContainer>
          <ButtonContainer>
            <Prev
              onClick={() => {
                if (page < 2) {
                  alert("첫 번째 페이지 입니다.");
                  return;
                }
                setPage(page - 1);
              }}
            >
              이전
            </Prev>
            <CurrentPage>{page}</CurrentPage>
            <Next
              onClick={() => {
                if (Math.floor(data.length / 8) + 1 === page) {
                  alert("마지막 페이지 입니다.");
                  return;
                }
                setPage(page + 1);
              }}
            >
              다음
            </Next>
          </ButtonContainer>
        </Wrapper>
      ) : (
        <NotAllowed />
      )}
    </>
  );
};

export default Req08;
