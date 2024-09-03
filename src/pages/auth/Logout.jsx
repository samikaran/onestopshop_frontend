import { useEffect } from "react";
import { logout } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);
  return (
    <div>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default Logout;
