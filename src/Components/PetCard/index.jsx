import React from "react";

export default function PetCard ({ name, description,age,available,species}) {
  return (
    <div className="petCard">
      <h3>{species} {name}</h3>
      <p>{description}</p>
      <p>Age: {age}</p>
      <p>Available: {available ? " ✅" : "⛔"}</p>
    </div>
  );
};

