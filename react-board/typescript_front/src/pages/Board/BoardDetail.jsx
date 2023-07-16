import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardItems from "../../components/Board/BoardItems";
import BoardButton from "../../components/Button/BoardButton";

const BoardDetail = () => {
  const { idx } = useParams();
  const [board, setBoard] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateContents = () => {
    navigate(`/update/${idx}`);
  };

  const deleteContents = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      let response = await axios.delete(`http://localhost:8080/board/${idx}`);
      if (response.status === 200) {
        alert("삭제되었습니다.");
        navigate("/board");
      } else {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const moveToBoard = () => {
    navigate("/board");
  };

  const getBoard = async () => {
    try {
      setLoading(true);
      const response = await (
        await axios.get(`http://localhost:8080/board/${idx}`)
      ).data;
      setBoard(response.data);
    } catch (error) {
      setError("에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      {loading && <div>로딩중입니다.</div>}
      {error && <div>{error.message}</div>}
      <BoardItems
        idx={board.idx}
        title={board.title}
        contents={board.contents}
        createdBy={board.createdBy}
      />
      <BoardButton onClick={updateContents} text="수정" color="green" />
      <BoardButton onClick={deleteContents} text="삭제" color="red" />
      <BoardButton onClick={moveToBoard} text="목록" color="blue" />
    </div>
  );
};

export default BoardDetail;
