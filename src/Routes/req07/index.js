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
  width: 90%;
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
  flex: 1;
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
const ProjectProceeding = () => {
  const [data, setData] = useState();
  const [mode, setMode] = useState("main");
  const [projectNo, setProjectNo] = useState();
  const [page, setPage] = useState(1);
  const search = useInput();
  useEffect(() => {
    if (mode === "main") {
      localStorage.getItem("emp_rank_no") &&
        Number(localStorage.getItem("emp_rank_no")) <= 2 &&
        Api.getProceedingProjectWithCount().then((response) => {
          setData(response.data);
          console.log(response.data);
        });
    } else if (mode === "detail") {
      localStorage.getItem("emp_rank_no") &&
        Number(localStorage.getItem("emp_rank_no")) <= 2 &&
        Api.getProceedingProjectByProjectNo(projectNo).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
    }
  }, [mode, projectNo]);
  return (
    <>
      {localStorage.getItem("emp_rank_no") &&
      Number(localStorage.getItem("emp_rank_no")) <= 2 ? (
        <>
          {mode === "main" && (
            <Wrapper>
              <SearchContainer>
                <SearchSpan
                  onClick={() => {
                    setMode("main");
                  }}
                >
                  ???????????? ???????????? ??????
                </SearchSpan>
                <SearchSpan
                  onClick={() => {
                    setMode("detail");
                  }}
                >
                  ?????? ???????????? ???????????? ??? ???????????? ????????? ???????????????.
                </SearchSpan>
              </SearchContainer>
              <ListContainer>
                <ListItem>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan>???????????? ???</ListItemSpan>
                  <ListItemSpan>????????????</ListItemSpan>
                </ListItem>
                {data &&
                  data.map((item, index) => {
                    if ((index >= (page - 1) * 8) & (index < page * 8)) {
                      return (
                        <ListItem
                          onClick={() => {
                            setMode("detail");
                            setProjectNo(item.project_no);
                          }}
                        >
                          <ListItemSpan>{item.project_no}</ListItemSpan>
                          <ListItemSpan>{item.project_name}</ListItemSpan>
                          <ListItemSpan>{item.count}</ListItemSpan>
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
          )}
          {mode === "detail" && (
            <Wrapper>
              <SearchContainer>
                <SearchSpan
                  onClick={() => {
                    setMode("main");
                  }}
                >
                  ???????????? ???????????? ??????
                </SearchSpan>
                <SearchSpan
                  onClick={() => {
                    setMode("detail");
                  }}
                >
                  ???????????? ??? ???????????? ??????
                </SearchSpan>
              </SearchContainer>
              <ListContainer>
                <ListItem>
                  <ListItemSpan>??????????????????</ListItemSpan>
                  <ListItemSpan>????????????</ListItemSpan>
                  <ListItemSpan>????????????</ListItemSpan>
                  <ListItemSpan>????????????</ListItemSpan>
                  {/* <ListItemSpan>??????????????????</ListItemSpan> */}
                  <ListItemSpan>????????????</ListItemSpan>
                  <ListItemSpan>????????????</ListItemSpan>
                </ListItem>
                {data &&
                  data.map((item, index) => {
                    if ((index >= (page - 1) * 8) & (index < page * 8)) {
                      return (
                        <ListItem>
                          <ListItemSpan>{projectNo}</ListItemSpan>
                          <ListItemSpan>{item.dept_no}</ListItemSpan>
                          <ListItemSpan>{item.dept_name}</ListItemSpan>
                          {/* <ListItemSpan>{item.emp_rrn}</ListItemSpan> */}
                          <ListItemSpan>{item.emp_no}</ListItemSpan>
                          <ListItemSpan>{item.emp_name}</ListItemSpan>
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
          )}
        </>
      ) : (
        <NotAllowed />
      )}
    </>
  );
};

export default ProjectProceeding;
