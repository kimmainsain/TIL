import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BoardButton from "../Button/BoardButton";

const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [createdBy, setCreatedBy] = useState("admin"); // 추후에 로그인 기능 구현 후 변경 예정
  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const onChangeCreatedBy = (e) => {
    setCreatedBy(e.target.value);
  };

  const save = async () => {
    try {
      await axios.post("http://localhost:8080/board", {
        title: title,
        contents: contents,
        createdBy: createdBy,
      });
      navigate("/board");
    } catch (error) {
      console.log(error);
    }
  };

  const moveToBoard = () => {
    navigate("/board");
  };

  const reset = () => {
    // 초기화
    setTitle("");
    setContents("");
    setCreatedBy("");
  };

  return (
    <div>
      <div class="text-xl">게시판 글 쓰기</div>
      <div>
        <label htmlFor="contents">제목</label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="제목을 입력하세요."
          required
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div>
        <label htmlFor="contents">작성자</label>
        <input
          type="text"
          id="createdBy"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="작성자를 적어주세요."
          required
          value={createdBy}
          onChange={onChangeCreatedBy}
        />
      </div>
      <div>
        <label htmlFor="contents">내용</label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="내용을 입력하세요."
          required
          value={contents}
          onChange={onChangeContents}
        ></textarea>
      </div>
      <br></br>
      <BoardButton onClick={save} text="저장" color="green" />
      <BoardButton onClick={reset} text="리셋" color="red" />
      <BoardButton onClick={moveToBoard} text="목록" color="blue" />
    </div>
  );
};

export default BoardWrite;
