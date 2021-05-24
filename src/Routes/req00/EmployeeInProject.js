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
  const project_no = useInput();
  const emp_no = useInput();
  const enter_date = useInput();
  const finish_date = useInput();
  const finish_reason = useInput();

  useEffect(() => {
    Api.getEmployeeInProjects().then((response) => {
      setData(response.data);
      console.log(response);
      console.log(response.data);
    });
    if (mode === "insert") {
      project_no.setValue("");
      emp_no.setValue("");
      enter_date.setValue("");
      finish_date.setValue("");
      finish_reason.setValue("");
    }
  }, [trigger, mode]);

  const insertData = (
    project_no,
    emp_no,
    enter_date,
    finish_date,
    finish_reason
  ) => {
    Api.addEmpInProject(
      project_no,
      emp_no,
      enter_date,
      finish_date,
      finish_reason
    ).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("잠시 후 다시 시도해 주세요");
      }
    });
  };
  const updateData = (finish_date, finish_reason, emp_no, project_no) => {
    Api.updateEmpInProject(finish_date, finish_reason, emp_no, project_no).then(
      (response) => {
        if (response.status === 200) {
          console.log("no err");
          setTrigger(!trigger);
        } else {
          alert("잠시 후 다시 시도해 주세요");
        }
      }
    );
  };
  const deleteData = (emp_no, project_no) => {
    Api.deleteEmpInProject(emp_no, project_no).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("잠시 후 다시 시도해 주세요");
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
              조회
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setMode("insert");
              }}
            >
              추가
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <ListItem>
              <ListItemSpan>프로젝트번호</ListItemSpan>
              <ListItemSpan>직원번호</ListItemSpan>
              <ListItemSpan>직원투입일자</ListItemSpan>
              <ListItemSpan>직원철수일자</ListItemSpan>
              <ListItemSpan>직원철수사유</ListItemSpan>
              <ListItemSpan>수정일자</ListItemSpan>
              <ListItemSpan>삭제</ListItemSpan>
            </ListItem>
            {data &&
              data.map((item, index) => {
                if ((index >= (page - 1) * 8) & (index < page * 8)) {
                  return (
                    <ListItem>
                      <ListItemSpan
                        onClick={() => {
                          setMode("update");
                          project_no.setValue(item.project_no);
                          emp_no.setValue(item.emp_no);
                          enter_date.setValue(item.enter_date);
                          finish_date.setValue(item.finish_date);
                          finish_reason.setValue(item.finish_reason);

                          setCurrent(item);
                        }}
                      >
                        {item.project_no}
                      </ListItemSpan>
                      <ListItemSpan>{item.emp_no}</ListItemSpan>
                      <ListItemSpan>{item.enter_date}</ListItemSpan>
                      <ListItemSpan>{item.finish_date}</ListItemSpan>
                      <ListItemSpan>{item.finish_reason}</ListItemSpan>
                      <ListItemSpan>
                        {item.updated_at.split("T")[0]}-
                        {item.updated_at.split("T")[1].split(".")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        <SubmitButton
                          onClick={() => {
                            deleteData(item.emp_no, item.project_no);
                          }}
                        >
                          삭제하기
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
      )}

      {mode === "update" && (
        <Wrapper>
          <SearchContainer>
            <SearchSpan
              onClick={() => {
                setMode("read");
              }}
            >
              조회
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setMode("insert");
              }}
            >
              추가
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <SearchContainerColumn>
              직원철수일자{" "}
              <SearchBar
                {...finish_date}
                placeholder={("ex:", current.enter_date)}
              ></SearchBar>
              직원철수사유코드 <SearchBar {...finish_reason}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              updateData(
                finish_date.value,
                finish_reason.value,
                current.emp_no,
                current.project_no
              );
              setMode("read");
            }}
          >
            완료
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
              조회
            </SearchSpan>
            <SearchSpan
              onClick={() => {
                setMode("insert");
              }}
            >
              추가
            </SearchSpan>
          </SearchContainer>
          <ListContainer>
            <SearchContainerColumn>
              프로젝트번호 <SearchBar {...project_no}></SearchBar>
              직원번호 <SearchBar {...emp_no}></SearchBar>
              직원투입일자 <SearchBar {...enter_date}></SearchBar>
              직원종료일자 <SearchBar {...finish_date}></SearchBar>
              직원종료사유 <SearchBar {...finish_reason}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              insertData(
                project_no.value,
                emp_no.value,
                enter_date.value,
                finish_date.value,
                finish_reason.value
              );
              setMode("read");
            }}
          >
            완료
          </SubmitButton>
        </Wrapper>
      )}
    </>
  );
};

export default Req08;
