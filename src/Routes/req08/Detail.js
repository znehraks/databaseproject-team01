import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../../api";
import useInput from "../../components/Hooks/useInput";

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
const Req08 = withRouter(
  ({
    match: {
      params: { emp_no },
    },
  }) => {
    const [data, setData] = useState();
    const [empNo, setEmpNo] = useState(emp_no);
    const [orderBy, setOrderBy] = useState("recent");
    const [page, setPage] = useState(1);
    const search = useInput();
    useEffect(() => {
      if (orderBy === "recent") {
        Api.getProjectOrderRecent(empNo).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      } else if (orderBy === "ago") {
        Api.getProjectOrderAgo(empNo).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      } else if (orderBy === "imminent") {
        Api.getProjectImminent(empNo).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      } else if (orderBy === "longtime") {
        Api.getProjectLongtime(empNo).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      }
    }, [orderBy]);
    return (
      <>
        <Wrapper>
          <SearchContainer>
            <SearchSpan
              onClick={() => {
                setOrderBy("longtime");
              }}
            >
              오랜 기간 참여 순
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setOrderBy("recent");
              }}
            >
              최근 참여 순
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setOrderBy("ago");
              }}
            >
              오래 전 참여 순
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setOrderBy("imminent");
              }}
            >
              종료 임박 순
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <ListItem>
              <ListItemSpan>직원번호</ListItemSpan>
              <ListItemSpan>프로젝트번호</ListItemSpan>
              <ListItemSpan flex={2}>프로젝트이름</ListItemSpan>
              <ListItemSpan>착수일자</ListItemSpan>
              <ListItemSpan>직원투입일자</ListItemSpan>
              <ListItemSpan>직원철수일자</ListItemSpan>
              <ListItemSpan>철수사유코드</ListItemSpan>
              <ListItemSpan>발주처번호</ListItemSpan>
              <ListItemSpan>열람가능기한</ListItemSpan>
              <ListItemSpan>수정일자</ListItemSpan>
            </ListItem>
            {data &&
              data.map((item, index) => {
                if ((index >= (page - 1) * 8) & (index < page * 8)) {
                  return (
                    <ListItem to={`/EmpDetailAdmin/${item.emp_no}`}>
                      <ListItemSpan>{item.emp_no}</ListItemSpan>
                      <ListItemSpan>{item.project_no}</ListItemSpan>
                      <ListItemSpan flex={2}>{item.project_name}</ListItemSpan>
                      <ListItemSpan>
                        {item.project_startdate.split("T")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        {item.enter_date.split("T")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        {item.finish_date
                          ? `${item.finish_date.split("T")[0]}`
                          : ``}
                      </ListItemSpan>
                      <ListItemSpan>{item.finish_reason}</ListItemSpan>
                      <ListItemSpan>{item.client_no}</ListItemSpan>
                      <ListItemSpan>
                        {item.storage_period.split("T")[0]}
                      </ListItemSpan>
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
        )
      </>
    );
  }
);
export default Req08;
