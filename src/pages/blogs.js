import { useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeData = (e) => {
    dispatch(
      logout({
        email: null,
        passwrd: null,
      })
    );
    navigate("/checkout");
  };

  const user = useSelector(selectUser);
  console.log(user);
  return (
    <>
      {user && (
        <div>
          This is Blogs page.
          <h5>email is {user.email}</h5>
          <h5>password is {user.passwrd}</h5>
          <button onClick={removeData}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Blogs;
