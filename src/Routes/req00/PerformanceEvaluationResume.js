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
  const emp_no = useInput();
  const hr_score = useInput();
  const hr_change = useInput();
  const updated_at = useInput();
  const is_deleted = useInput();

  useEffect(() => {
    Api.getPerformanceEvaluationResumes().then((response) => {
      setData(response.data);
      console.log(response);
      console.log(response.data);
    });
    if (mode === "insert") {
      emp_no.setValue("");
      hr_score.setValue("");
      hr_change.setValue("");
      updated_at.setValue("");
      is_deleted.setValue("");
    }
  }, [trigger, mode]);

  const insertData = (emp_no, hr_score, hr_change) => {
    Api.addPerformanceEvaluationResume(emp_no, hr_score, hr_change).then(
      (response) => {
        if (response.status === 200) {
          console.log("no err");
          setTrigger(!trigger);
        } else {
          alert("?????? ??? ?????? ????????? ?????????");
        }
      }
    );
  };
  const updateData = (hr_score, hr_change, hr_score_history_no) => {
    Api.updatePerformanceEvaluationResume(
      hr_score,
      hr_change,
      hr_score_history_no
    ).then((response) => {
      if (response.status === 200) {
        console.log("no err");
        setTrigger(!trigger);
      } else {
        alert("?????? ??? ?????? ????????? ?????????");
      }
    });
  };
  const deleteData = (hr_score_history_no) => {
    Api.deletePerformanceEvaluationResume(hr_score_history_no).then(
      (response) => {
        if (response.status === 200) {
          console.log("no err");
          setTrigger(!trigger);
          setMode("read");
        } else {
          alert("?????? ??? ?????? ????????? ?????????");
        }
      }
    );
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
          {/* emp_no: 1
hr_change: 98
hr_score: 98
hr_score_history_no: 1
is_deleted: 0
updated_at: "2021-05-07T05:39:53.000Z" */}
          <ListContainer>
            <ListItem>
              <ListItemSpan>????????????????????????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>??????????????????</ListItemSpan>
              <ListItemSpan>??????????????????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
              <ListItemSpan>????????????</ListItemSpan>
            </ListItem>
            {data &&
              data.map((item, index) => {
                if ((index >= (page - 1) * 8) & (index < page * 8)) {
                  return (
                    <ListItem
                      onClick={() => {
                        setMode("update");
                        emp_no.setValue(item.emp_no);
                        hr_score.setValue(item.hr_score);
                        hr_change.setValue(0);
                        updated_at.setValue(item.updated_at);
                        is_deleted.setValue(item.is_deleted);
                        setCurrent(item);
                      }}
                    >
                      <ListItemSpan>{item.hr_score_history_no}</ListItemSpan>
                      <ListItemSpan>{item.emp_no}</ListItemSpan>
                      <ListItemSpan>{item.hr_change}</ListItemSpan>
                      <ListItemSpan>{item.hr_score}</ListItemSpan>
                      <ListItemSpan>{item.is_deleted}</ListItemSpan>
                      <ListItemSpan>
                        {item.updated_at.split("T")[0]}-
                        {item.updated_at.split("T")[1].split(".")[0]}
                      </ListItemSpan>
                      <ListItemSpan>
                        <SubmitButton
                          onClick={() => {
                            deleteData(item.hr_score_history_no);
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
          {/* emp_no: 1
hr_change: 98
hr_score: 98
hr_score_history_no: 1
is_deleted: 0
updated_at: "2021-05-07T05:39:53.000Z" */}
          <ListContainer>
            <SearchContainerColumn>
              ????????????<SearchBar {...emp_no}></SearchBar>
              ??????????????????{" "}
              <SearchBar
                value={
                  isNaN(Number(hr_score.value) + Number(hr_change.value))
                    ? `${hr_score.value}`
                    : `${Number(hr_score.value) + Number(hr_change.value)}`
                }
                disabled
              ></SearchBar>
              ???????????????????????? <SearchBar {...hr_change}></SearchBar>
              ???????????? <SearchBar value={updated_at.value} disabled></SearchBar>
              ???????????? <SearchBar {...is_deleted} disabled></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              updateData(
                isNaN(Number(hr_score.value) + Number(hr_change.value))
                  ? hr_score.value
                  : Number(hr_score.value) + Number(hr_change.value),
                hr_change.value,
                current.hr_score_history_no
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
          {/* emp_no: 1
hr_change: 98
hr_score: 98
hr_score_history_no: 1
is_deleted: 0
updated_at: "2021-05-07T05:39:53.000Z" */}
          <ListContainer>
            <SearchContainerColumn>
              ????????????<SearchBar {...emp_no}></SearchBar>
              ???????????????????????? <SearchBar {...hr_change}></SearchBar>
              ???????????? <SearchBar value={updated_at.value} disabled></SearchBar>
              ???????????? <SearchBar {...is_deleted} disabled></SearchBar>
            </SearchContainerColumn>
          </ListContainer>
          <SubmitButton
            onClick={() => {
              insertData(emp_no.value, hr_change.value, hr_change.value);
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
