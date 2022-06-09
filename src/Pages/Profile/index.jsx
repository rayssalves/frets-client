import React from "react";
import NavBar from "../../Components/NavBar";
import UserCard from "../../Components/UserCard";
import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { fetchProfile } from "../../store/user/thunk";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "./style.css";

export default function Profile(){
const dispatch = useDispatch();
const user = useSelector(selectUser);


useEffect(() => {
    dispatch(fetchProfile);
  }, [dispatch]);
  

return(
    <div>
    <NavBar/>

       <div className="userList">
      {user && <UserCard
                key={user.id}
                id={user.id}
                imageUrl={user.imageUrl}
                name={user.name}
                city={user.city}
                description={user.description}
                rating={user.rating}
                owners={user.owners}
                isFromProfile={true}
              />
      }
      <Calendar />
       </div>
    </div>
   
)
}