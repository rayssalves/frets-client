import React from "react";
import NavBar from "../../Components/NavBar";
import Chat from '../../Components/Chat'
import UserCard from '../../Components/UserCard'
import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { selectAllUsers, selectUser } from "../../store/user/selectors";
import { fetchUsers } from "../../store/user/thunk";
import "./style.css";


export default function HomePage() {

const dispatch = useDispatch();
const currentUser = useSelector(selectUser);
const users = useSelector(selectAllUsers);

useEffect(() => {
  dispatch(fetchUsers);
}, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="hero">
        <div >
          <h1 className="branding">
            A community to help pet owners to connect with pet lovers
          </h1>
        </div>
        </div>
  
        <div className="dog-running">
          <img className="gif" src="/assets/dog.gif" alt="dog running gif" />
        </div>
       <div className="userList">
       {users.map((user) => {
         if (!currentUser || user.id !== currentUser.id) {
          return (
              <UserCard
                key={user.id}
                id={user.id}
                imageUrl={user.imageUrl}
                name={user.name}
                city={user.city}
                description={user.description}
                rating={user.rating}
                owners={user.owners}
                isFromProfile={false}
              />
          );
         }
         return "";
        })}
       </div>
        {currentUser && <Chat userId={currentUser.id}/>}
      </div>
    </div>
  );
}
