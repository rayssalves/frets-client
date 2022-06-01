import React from "react";
import NavBar from "../../Components/NavBar";
import Chat from '../../Components/Chat'
import "./style.css";


export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="hero">
          <h1 className="branding">
            A community to help pet owners to connect with pet lovers
          </h1>
        </div>
        <div className="dog-running">
          <img className="gif" src="/assets/dog.gif" alt="dog running gif" />
        </div>
        <Chat />
      </div>
    </div>
  );
}
