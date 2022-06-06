import React from "react";
import "./style.css";

export default function PetCard ({ name, description,age,available,species}) {
  return (
    <div className="petCard">
      <h3>{species} {name}</h3>
      <p>{description}</p>
      <p>Age: {age}</p> 
      <p>Available: {available ? "Yes" : "No"}</p>
    </div>
  );
};

