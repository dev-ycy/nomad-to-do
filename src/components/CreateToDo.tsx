import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const CreateToDoForm = styled.form`
  display: flex;
  margin-top: 2rem;
  position: relative;
  align-items: center;
  width: 100%;
  input:placeholder-shown + button {
    // 입력했을 때만 추가버튼 보임!
    display: none;
  }

  input {
    width: 100%;
    padding: 0.75rem 2.75rem 0.75rem 0.75rem;
    border-radius: 1rem;
    border: none;
    box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);

    &:focus {
      outline: 0.2rem solid royalblue;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    position: absolute;
    right: 0.5rem;
    font-size: 1.2rem;
    color: royalblue;
  }
`;

export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category as any },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <CreateToDoForm onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "할 일을 입력해 주세요",
        })}
        placeholder={`${category} 리스트에 새 할 일을 추가하세요.`}
      />
      <button>
        <FaPlusCircle />
      </button>
    </CreateToDoForm>
  );
}
