import React from "react";
import PetCard from '../../Components/PetCard';
import { selectToken } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import MuiRating from "../../Components/MuiRating"
import "./style.css";

// import { Link } from "react-router-dom";

export default function UserCard ({ name, city, imageUrl, description,rating,owners}) {
    const token = useSelector(selectToken);
    return (
        <div className="userCard">
        <img className="details-img" src={imageUrl} alt="user" />
        <h2>{owners.length > 0 ? "Owner:" : "Frets:"} {name}</h2>
        <p>{city}</p>
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
        {token && 
            <button className="pixel-borders pixel-borders--2-inset">
                Chat
                {/* <Link to={`/details/${id}`}>See Details</Link> */}
            </button>
        }
        </div>
    );
};

