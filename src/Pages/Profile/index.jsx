import React from "react";
import NavBar from "../../Components/NavBar";
import UserCard from "../../Components/UserCard";
import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { fetchProfile } from "../../store/user/thunk";

export default function Profile(){
const dispatch = useDispatch();
const user = useSelector(selectUser);


useEffect(() => {
    dispatch(fetchProfile);
  }, [dispatch]);
  

return(
    <div>
    <NavBar/>
    <h1>to na profile</h1>
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
       </div>
    </div>
   
)
}