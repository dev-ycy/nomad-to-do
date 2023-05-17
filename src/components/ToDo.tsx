import { categoriesState, IToDo, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ToDoComponent = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  margin-top: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  overflow-wrap: break-word;
  &:last-child {
    margin-bottom: 5rem;
  }
`;

const Text = styled.div`
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  button {
    background-color: #ededed;
    border: none;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    transition: background-color 0.3s;

    &:disabled {
      opacity: 0.5;
    }
    &:hover:not(:disabled) {
      background-color: #e3e3e3;
      cursor: pointer;
    }
    &:last-child {
      background-color: #ffe0e6;
      color: #f3214f;
      &:hover {
        background-color: #fed5dd;
      }
    }
  }
`;

export default function ToDo({ text, id, category: currCategory }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  // const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const { name } = e.currentTarget;
  //   setToDos((oldToDos) => {
  //     // 1. index 찾기
  //     const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
  //     // const oldToDo = oldToDos[targetIndex];
  //     const newToDo = { text, id, category: name };
  //     // 2. replace oldToDo to newToDo
  //     const newToDos = [...oldToDos];
  //     newToDos.splice(targetIndex, 1, newToDo as any);

  //     return newToDos;
  //   });
  // };

  const changeCategory = (category: string) => {
    setToDos((oldToDos) => {
      // 1. index 찾기
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category };
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1, newToDo);
      return newToDos;
    });
  };

  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1);
      return newToDos;
    });
  };

  return (
    <ToDoComponent>
      <Text>{text}</Text>
      <ButtonContainer>
        {Object.values(categories).map((category) => (
          <button
            disabled={category === currCategory}
            key={category}
            onClick={() => changeCategory(category)}
          >
            {category}
          </button>
        ))}
        <button onClick={deleteToDo}>지우기</button>
      </ButtonContainer>
    </ToDoComponent>
  );
}
