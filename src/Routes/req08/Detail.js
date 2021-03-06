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
        localStorage.getItem("emp_rank_no") &&
          Number(localStorage.getItem("emp_rank_no")) <= 2 &&
          Api.getProjectOrderRecent(empNo).then((response) => {
            setData(response.data);
            console.log(response.data);
          });
      } else if (orderBy === "ago") {
        localStorage.getItem("emp_rank_no") &&
          Number(localStorage.getItem("emp_rank_no")) <= 2 &&
          Api.getProjectOrderAgo(empNo).then((response) => {
            setData(response.data);
            console.log(response.data);
          });
      } else if (orderBy === "imminent") {
        localStorage.getItem("emp_rank_no") &&
          Number(localStorage.getItem("emp_rank_no")) <= 2 &&
          Api.getProjectImminent(empNo).then((response) => {
            setData(response.data);
            console.log(response.data);
          });
      } else if (orderBy === "longtime") {
        localStorage.getItem("emp_rank_no") &&
          Number(localStorage.getItem("emp_rank_no")) <= 2 &&
          Api.getProjectLongtime(empNo).then((response) => {
            setData(response.data);
            console.log(response.data);
          });
      }
    }, [orderBy]);
    return (
      <>
        {localStorage.getItem("emp_rank_no") &&
        Number(localStorage.getItem("emp_rank_no")) <= 2 ? (
          <>
            <Wrapper>
              <SearchContainer>
                <SearchSpan
                  onClick={() => {
                    setOrderBy("longtime");
                  }}
                >
                  ?????? ?????? ?????? ???
                </SearchSpan>
                <SearchSpan
                  onClick={() => {
                    setOrderBy("recent");
                  }}
                >
                  ?????? ?????? ???
                </SearchSpan>
                <SearchSpan
                  onClick={() => {
                    setOrderBy("ago");
                  }}
                >
                  ?????? ??? ?????? ???
                </SearchSpan>
                <SearchSpan
                  onClick={() => {
                    setOrderBy("imminent");
                  }}
                >
                  ?????? ?????? ???
                </SearchSpan>
              </SearchContainer>
              <ListContainer>
                <ListItem>
                  <ListItemSpan>????????????</ListItemSpan>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan flex={2}>??????????????????</ListItemSpan>
                  <ListItemSpan>????????????</ListItemSpan>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan>???????????????</ListItemSpan>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan>????????????</ListItemSpan>
                </ListItem>
                {data &&
                  data.map((item, index) => {
                    if ((index >= (page - 1) * 8) & (index < page * 8)) {
                      return (
                        <ListItem to={`/EmpDetailAdmin/${item.emp_no}`}>
                          <ListItemSpan>{item.emp_no}</ListItemSpan>
                          <ListItemSpan>{item.project_no}</ListItemSpan>
                          <ListItemSpan flex={2}>
                            {item.project_name}
                          </ListItemSpan>
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
                      alert("??? ?????? ????????? ?????????.");
                      return;
                    }
                    setPage(page - 1);
                  }}
                >
                  ??????
                </Prev>
                <CurrentPage>{page}</CurrentPage>
                <Next
                  onClick={() => {
                    if (Math.floor(data.length / 8) + 1 === page) {
                      alert("????????? ????????? ?????????.");
                      return;
                    }
                    setPage(page + 1);
                  }}
                >
                  ??????
                </Next>
              </ButtonContainer>
            </Wrapper>
          </>
        ) : (
          <NotAllowed />
        )}
        )
      </>
    );
  }
);
export default Req08;
