import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router";
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
const SearchContainerColumn = styled.div`
  width: 100%;
  height: 30vw;
  display: flex;
  flex-direction: column;
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

const SubmitButton = styled.div`
  font-size: 2vw;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 5vw;
`;
const Req08 = () => {
  const [data, setData] = useState();
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState();
  const [trigger, setTrigger] = useState(false);
  const emp_name = useInput();
  const emp_rrn = useInput();
  const emp_final_edu = useInput();
  const emp_rank_no = useInput();
  const dept_no = useInput();
  const hr_score_history_no = useInput();
  const emp_manager_no = useInput();
  const salary = useInput();

  useEffect(() => {
    Api.getEmpInfo().then((response) => {
      setData(response.data);
      console.log(response);
      console.log(response.data);
    });
    if (mode === "insert") {
      emp_name.setValue("");
      emp_rrn.setValue("");
      emp_final_edu.setValue("");
      emp_rank_no.setValue("");
      dept_no.setValue("");
      hr_score_history_no.setValue("");
      emp_manager_no.setValue("");
      salary.setValue("");
    }
  }, [trigger, mode]);

  const insertData = (
    emp_name,
    emp_rrn,
    emp_final_edu,
    emp_rank_no,
    dept_no,
    emp_manager_no,
    salary
  ) => {
    Api.addEmp(
      emp_name,
      emp_rrn,
      emp_final_edu,
      emp_rank_no,
      dept_no,
      emp_manager_no,
      salary
    ).then((response) => {
      setTrigger(!trigger);
      if (response.status === 200) {
        console.log("no err");
      } else {
        alert("?????? ??? ?????? ????????? ?????????");
      }
    });
  };
  const updateData = (
    emp_name,
    emp_final_edu,
    emp_rank_no,
    dept_no,
    hr_score_history_no,
    emp_manager_no,
    salary,
    emp_no
  ) => {
    Api.updateEmp(
      emp_name,
      emp_final_edu,
      emp_rank_no,
      dept_no,
      hr_score_history_no,
      emp_manager_no,
      salary,
      emp_no
    ).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("?????? ??? ?????? ????????? ?????????");
      }
    });
  };
  const deleteData = (emp_no) => {
    Api.deleteEmp(emp_no).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
        setMode("read");
      } else {
        alert("?????? ??? ?????? ????????? ?????????");
      }
    });
  };
  return (
    <>
      {mode === "read" && (
        <Wrapper>
          <SearchContainer>
            <SearchSpan
              onClick={() => {
                setMode("read");
              }}
            >
              ??????
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setMode("insert");
              }}
            >
              ??????
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <ListItem>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>??????????????????</ListItemSpan>
              <ListItemSpan>??????????????????</ListItemSpan>
              <ListItemSpan>??????????????????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>????????????????????????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>??????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>??????</ListItemSpan>
            </ListItem>
            {data &&
              data.map((item, index) => {
                if ((index >= (page - 1) * 8) & (index < page * 8)) {
                  return (
                    <ListItem
                      onClick={() => {
                        setMode("update");
                        emp_name.setValue(item.emp_name);
                        emp_rrn.setValue(item.emp_rrn);
                        emp_final_edu.setValue(item.emp_final_edu);
                        emp_rank_no.setValue(item.emp_rank_no);
                        dept_no.setValue(item.dept_no);
                        hr_score_history_no.setValue(item.hr_score_history_no);
                        emp_manager_no.setValue(item.emp_manager_no);
                        salary.setValue(item.salary);
                        setCurrent(item);
                      }}
                    >
                      <ListItemSpan>{item.emp_no}</ListItemSpan>
                      <ListItemSpan>{item.emp_name}</ListItemSpan>
                      <ListItemSpan>{item.emp_rrn}</ListItemSpan>
                      <ListItemSpan>{item.emp_final_edu}</ListItemSpan>
                      <ListItemSpan>{item.emp_rank_no}</ListItemSpan>
                      <ListItemSpan>{item.dept_no}</ListItemSpan>
                      <ListItemSpan>{item.hr_score_history_no}</ListItemSpan>
                      <ListItemSpan>{item.emp_manager_no}</ListItemSpan>
                      <ListItemSpan>{item.salary}</ListItemSpan>
                      <ListItemSpan>
                        {item.updated_at.split("T")[0]}-
                        {item.updated_at.split("T")[1].split(".")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        <SubmitButton
                          onClick={() => {
                            deleteData(item.emp_no);
                          }}
                        >
                          ????????????
                        </SubmitButton>
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

      {mode === "update" && (
        <Wrapper>
          <SearchContainer>
            <SearchSpan
              onClick={() => {
                setMode("read");
              }}
            >
              ??????
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setMode("insert");
              }}
            >
              ??????
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <SearchContainerColumn>
              ???????????? <SearchBar {...emp_name}></SearchBar>
              ?????????????????? <SearchBar {...emp_rrn}></SearchBar>
              ?????????????????? <SearchBar {...emp_final_edu}></SearchBar>
              ?????????????????? <SearchBar {...emp_rank_no}></SearchBar>
              ???????????? <SearchBar {...dept_no}></SearchBar>
              ?????????????????? <SearchBar {...hr_score_history_no}></SearchBar>
              ?????????????????? <SearchBar {...emp_manager_no}></SearchBar>
              ?????? <SearchBar {...salary}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              updateData(
                emp_name.value,
                emp_final_edu.value,
                emp_rank_no.value,
                dept_no.value,
                hr_score_history_no.value,
                emp_manager_no.value,
                salary.value,
                current.emp_no
              );
              setMode("read");
            }}
          >
            ??????
          </SubmitButton>
        </Wrapper>
      )}

      {mode === "insert" && (
        <Wrapper>
          <SearchContainer>
            <SearchSpan
              onClick={() => {
                setMode("read");
              }}
            >
              ??????
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setMode("insert");
              }}
            >
              ??????
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <SearchContainerColumn>
              ???????????? <SearchBar {...emp_name}></SearchBar>
              ?????????????????? <SearchBar {...emp_rrn}></SearchBar>
              ?????????????????? <SearchBar {...emp_final_edu}></SearchBar>
              ?????????????????? <SearchBar {...emp_rank_no}></SearchBar>
              ???????????? <SearchBar {...dept_no}></SearchBar>
              ?????????????????? <SearchBar {...emp_manager_no}></SearchBar>
              ?????? <SearchBar {...salary}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              insertData(
                emp_name.value,
                emp_rrn.value,
                emp_final_edu.value,
                emp_rank_no.value,
                dept_no.value,
                emp_manager_no.value,
                salary.value
              );
              setMode("read");
            }}
          >
            ??????
          </SubmitButton>
        </Wrapper>
      )}
    </>
  );
};

export default Req08;
