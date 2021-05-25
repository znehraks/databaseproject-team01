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
  const project_name = useInput();
  const project_startdate = useInput();
  const project_enddate = useInput();
  const client_no = useInput();
  const storage_period = useInput();

  useEffect(() => {
    Api.getProjectInfo().then((response) => {
      setData(response.data);
      console.log(response);
      console.log(response.data);
    });
    if (mode === "insert") {
      project_name.setValue("");
      project_startdate.setValue("");
      project_enddate.setValue("");
      client_no.setValue("");
      storage_period.setValue("");
    }
  }, [trigger, mode]);

  const insertData = (project_name, client_no) => {
    Api.addProject(project_name, client_no).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("잠시 후 다시 시도해 주세요");
      }
    });
  };
  const updateData = (
    project_no,
    project_name,
    project_startdate,
    project_enddate,
    client_no,
    storage_period
  ) => {
    Api.updateProject(
      project_no,
      project_name,
      project_startdate,
      project_enddate,
      client_no,
      storage_period
    ).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("잠시 후 다시 시도해 주세요");
      }
    });
  };
  const deleteData = (project_no) => {
    Api.deleteProject(project_no).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
        setMode("read");
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
              <ListItemSpan>프로젝트이름</ListItemSpan>
              <ListItemSpan>프로젝트착수일자</ListItemSpan>
              <ListItemSpan>프로젝트종료일자</ListItemSpan>
              <ListItemSpan>발주처번호</ListItemSpan>
              <ListItemSpan>열람가능기간</ListItemSpan>
              <ListItemSpan>수정일자</ListItemSpan>
              <ListItemSpan>삭제</ListItemSpan>
            </ListItem>
            {data &&
              data.map((item, index) => {
                if ((index >= (page - 1) * 8) & (index < page * 8)) {
                  return (
                    <ListItem
                      onClick={() => {
                        setMode("update");
                        project_name.setValue(item.project_name);
                        project_startdate.setValue(item.project_startdate);
                        project_enddate.setValue(item.project_enddate);
                        client_no.setValue(item.client_no);
                        storage_period.setValue(item.storage_period);

                        setCurrent(item);
                      }}
                    >
                      <ListItemSpan>{item.project_no}</ListItemSpan>
                      <ListItemSpan>{item.project_name}</ListItemSpan>
                      <ListItemSpan>
                        {item.project_startdate.split("T")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        {item.project_enddate
                          ? `
                            ${item.project_enddate.split("T")[0]}`
                          : ``}
                      </ListItemSpan>
                      <ListItemSpan>{item.client_no}</ListItemSpan>
                      <ListItemSpan>
                        {item.storage_period
                          ? `
                            ${item.storage_period.split("T")[0]}`
                          : ``}
                      </ListItemSpan>
                      <ListItemSpan>
                        {item.updated_at.split("T")[0]}-
                        {item.updated_at.split("T")[1].split(".")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        <SubmitButton
                          onClick={() => {
                            deleteData(item.project_no);
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
              프로젝트이름 <SearchBar {...project_name}></SearchBar>
              프로젝트착수일자 <SearchBar {...project_startdate}></SearchBar>
              프로젝트종료일자 <SearchBar {...project_enddate}></SearchBar>
              발주처번호 <SearchBar {...client_no}></SearchBar>
              보관기간 <SearchBar {...storage_period}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              updateData(
                current.project_no,
                project_name.value,
                project_startdate.value,
                project_enddate.value,
                client_no.value,
                storage_period.value
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
              프로젝트이름 <SearchBar {...project_name}></SearchBar>
              발주처번호 <SearchBar {...client_no}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              insertData(project_name.value, client_no.value);
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
