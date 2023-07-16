import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/board">Board</Link>
      <hr></hr>
    </header>
  );
};

export default Header;
