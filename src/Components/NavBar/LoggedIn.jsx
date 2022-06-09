import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/slice";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem",display: "contents",fontSize:"25px"}}><strong>Welcome {user?.name}🐕</strong></Nav.Item>
      <button className="links pixel-borders pixel-box--primary" onClick={() => dispatch(logOut())}>Logout</button>
    </>
  );
}
