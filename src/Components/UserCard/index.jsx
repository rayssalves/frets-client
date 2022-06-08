import React from "react";
import PetCard from '../../Components/PetCard';
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import MuiRating from "../../Components/MuiRating"
import {joinRoom, setReceiver, resetChat} from "../../store/chat/slice"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as uuid from "uuid"
import "./style.css";

// import { Link } from "react-router-dom";


export default function UserCard ({ id, name, city, imageUrl, description,rating,owners, isFromProfile}) {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const openChat = (userId) => {
        const id = uuid.v4();
        dispatch(joinRoom(id));
        dispatch(setReceiver(userId));
        dispatch(resetChat());
    }

    return (
        <div className="userCard">
        <img className="details-img" src={imageUrl} alt="user" />
        <h2>{owners.length > 0 ? "Owner:" : "Frets:"} {name}</h2>
        <p>{city}</p>
        <a href={`https://www.google.com/maps/place/${city}`} target="_blank" rel="noreferrer"><LocationOnIcon/></a> 
        
        <p>{description}</p> 
        <MuiRating ratingValue={rating}/>
        {/* <p>Rating: {rating}</p> */}
        {/* see more content */}
            {owners ? owners.map((owner) => {
            return (owner.pets ? owner.pets.map((pet, index) => {
                return (
                    <div className="petCards">
                        {index === 0 &&
                            <h2>
                            Pets
                            </h2>
                        }
                        <PetCard
                        name={pet.name}
                        description={pet.description}
                        age={pet.age}
                        available={pet.available}
                        species={pet.species.name}
                        />
                    </div>
                );
            }) : (""))
            }) : ("")}
        {token && !isFromProfile ?
            <button className="pixel-borders pixel-borders--2-inset" onClick={() => openChat(id)}>
                Chat
                {/* <Link to={`/details/${id}`}>See Details</Link> */}
            </button> : ""
        }

        {token && isFromProfile ?
            <button className="pixel-borders pixel-borders--2-inset" onClick={() => openChat(id)}>
                Edit
                {/* <Link to={`/details/${id}`}>See Details</Link> */}
            </button> : ""
        }
        </div>
    );
};

