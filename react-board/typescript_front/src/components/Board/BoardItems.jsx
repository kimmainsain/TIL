const Board = ({ idx, title, contents, createdBy }) => {
	return (
		<div>
			<h1>게시판 상세</h1>
			<div>번호: {idx}</div>
			<div>제목: {title}</div>
			<div>내용: {contents}</div>
			<div>작성자: {createdBy}</div>
		</div>
	);
};

export default Board;
