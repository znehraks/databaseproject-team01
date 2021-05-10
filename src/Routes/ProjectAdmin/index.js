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
const ProjectAdmin = withRouter(
  ({
    match: {
      params: { mode },
    },
  }) => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const search = useInput();
    useEffect(() => {
      Api.getProjectInfo().then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }, []);
    return (
      <>
        {mode === "main" && (
          <Wrapper>
            <SearchContainer>
              <SearchBar placeholder={"검색어 입력"} {...search}></SearchBar>
              <SearchSpan>검색</SearchSpan>
            </SearchContainer>
            <ListContainer>
              <ListItem>
                <ListItemSpan>번호</ListItemSpan>
                <ListItemSpan flex={3}>프로젝트이름</ListItemSpan>
                <ListItemSpan>발주처번호</ListItemSpan>
                <ListItemSpan flex={2}>발주처이름</ListItemSpan>
                <ListItemSpan>착수일자</ListItemSpan>
                <ListItemSpan>종료일자</ListItemSpan>
                <ListItemSpan>종료여부</ListItemSpan>
              </ListItem>
              {data &&
                data.map((item, index) => {
                  if ((index >= (page - 1) * 8) & (index < page * 8)) {
                    return (
                      <ListItem to={`/ProjectDetailAdmin/${item.project_no}`}>
                        <ListItemSpan>{item.project_no}</ListItemSpan>
                        <ListItemSpan flex={3}>
                          {item.project_name}
                        </ListItemSpan>
                        <ListItemSpan>{item.client_no}</ListItemSpan>
                        <ListItemSpan flex={2}>{item.client_name}</ListItemSpan>
                        <ListItemSpan>
                          {item.project_startdate.split("T")[0]}
                        </ListItemSpan>
                        <ListItemSpan>
                          {item.project_enddate
                            ? `
                            ${item.project_enddate.split("T")[0]}`
                            : ``}
                        </ListItemSpan>
                        <ListItemSpan>
                          {item.project_enddate ? `Y` : `N`}
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
      </>
    );
  }
);

export default ProjectAdmin;
