import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav role="navigation" className="py-12">
      <div className="container">
        <Link to="/" className="text-3xl font-bold">
          Workout Buddy
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
