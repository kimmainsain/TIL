import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardButton from "../Button/BoardButton";
import axios from "axios";

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const [board, setBoard] = useState({
    idx: 0,
    title: "",
    contents: "",
    createdBy: "",
  });

  const { title, createdBy, contents } = board; //비구조화 할당

  console.log(idx);
  const onChange = (e) => {
    const { value, id } = e.target;
    setBoard({
      ...board,
      [id]: value,
    });
    console.log(idx);
    console.log(board);
  };

  const getBoard = async () => {
    const response = await (
      await axios.get(`http://localhost:8080/board/${idx}`)
    ).data;
    setBoard(response.data);
  };

  useEffect(() => {
    getBoard();
  }, []);

  const moveToBoard = () => {
    navigate("/board");
  };

  const update = async () => {
    if (window.confirm("수정하시겠습니까?")) {
      let response = await axios.put(`http://localhost:8080/board`, board);
      if (response.status === 200) {
        alert("수정되었습니다.");
        navigate(`/board/${idx}`);
      } else {
        alert("수정에 실패했습니다.");
      }
    }
  };

  const reset = () => {
    setBoard({
      idx: 0,
      title: "",
      contents: "",
    });
  };

  return (
    <div>
      <div class="text-xl">게시판 글 수정</div>
      <div>
        <label htmlFor="contents">제목</label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="제목을 입력하세요."
          required
          value={title}
          onChange={onChange}
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
          readOnly={true}
        />
      </div>
      <div>
        <label htmlFor="contents">내용</label>
        <textarea
          id="contents"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="내용을 입력하세요."
          required
          value={contents}
          onChange={onChange}
        ></textarea>
      </div>
      <br></br>
      <BoardButton onClick={update} text="수정" color="green" />
      <BoardButton onClick={reset} text="리셋" color="red" />
      <BoardButton onClick={moveToBoard} text="목록" color="blue" />
    </div>
  );
};

export default BoardUpdate;
