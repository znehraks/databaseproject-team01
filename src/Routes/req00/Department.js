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
  const name = useInput();

  useEffect(() => {
    Api.getDepartments_().then((response) => {
      setData(response.data);
      console.log(response);
      console.log(response.data);
    });
    if (mode === "insert") {
      name.setValue("");
    }
  }, [trigger, mode]);

  const insertData = (name) => {
    Api.addDepartment(name).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("?????? ??? ?????? ????????? ?????????");
      }
    });
  };
  const updateData = (name, dept_no) => {
    Api.updateDepartment(name, dept_no).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("?????? ??? ?????? ????????? ?????????");
      }
    });
  };
  const deleteData = (dept_no) => {
    Api.deleteDepartment(dept_no).then((response) => {
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
                        name.setValue(item.dept_name);

                        setCurrent(item);
                      }}
                    >
                      <ListItemSpan>{item.dept_no}</ListItemSpan>
                      <ListItemSpan>{item.dept_name}</ListItemSpan>
                      <ListItemSpan>
                        {item.updated_at.split("T")[0]}-
                        {item.updated_at.split("T")[1].split(".")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        <SubmitButton
                          onClick={() => {
                            deleteData(item.dept_no);
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
              ???????????? <SearchBar {...name}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              updateData(name.value, current.dept_no);
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
              ???????????? <SearchBar {...name}></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              insertData(name.value);
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
