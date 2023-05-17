import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { FaFolderPlus } from "react-icons/fa";

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  padding: 0 2rem;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: royalblue;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const GridItem = styled.div`
  background-color: white;
  /* box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1); */
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  /* overflow: hidden; */
  border-radius: 1rem;

  button {
    border: none;
    background-color: inherit;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 1rem;

    &:hover:not(:disabled) {
      /* background-color: #eef4ff; */
      box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
      cursor: pointer;
    }
    &:disabled {
      border: 0.15rem solid royalblue;
      color: royalblue;
      background-color: #eef4ff;
      font-weight: 700;
    }
  }

  svg {
    font-size: 1rem;
    color: royalblue;
  }
`;

export default function ToDoList() {
  // const allToDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState); // 현재 선택한 카테고리
  const [categories, setCategories] = useRecoilState<string[]>(categoriesState); // 모든 카테고리

  const onCateClick = (category: string) => {
    setCategory(category);
  };

  const onAddClick = () => {
    const newCategory = prompt("새로운 카테고리의 이름은 무엇인가요?");
    if (newCategory) {
      if (categories.includes(newCategory)) {
        alert("같은 이름의 카테고리는 추가할 수 없습니다.");
        return;
      }
      setCategories((prev) => [...prev, newCategory]);
      setCategory(newCategory);
    }
  };

  return (
    <Container>
      <Header>
        <Title>To Do</Title>
      </Header>

      <GridContainer>
        {categories?.map((availableCategory) => (
          <GridItem key={availableCategory}>
            <button
              onClick={() => onCateClick(availableCategory)}
              disabled={availableCategory === category}
            >
              {availableCategory}
            </button>
          </GridItem>
        ))}
        <GridItem>
          <button onClick={onAddClick}>
            <FaFolderPlus />
          </button>
        </GridItem>
      </GridContainer>

      <hr />

      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}
