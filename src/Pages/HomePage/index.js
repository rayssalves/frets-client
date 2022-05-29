import React from "react";
import "./style.css";

export default function HomePage() {
  return (
    <div>
      <header className="header-container">
        <input
          className="searchfield text"
          type="search"
          placeholder="Search..."
        ></input>
      </header>
      <div className="container">
        <div className="hero">
          <div>
            <img
              className="logo"
              src="/assets/logo frets.png"
              alt="frets logo"
            />
          </div>
          <h1 className="branding">
            A community to help pet owners to connect with pet lovers
          </h1>
        </div>
        <div>
          <img className="gif" src="/assets/dog.gif" alt="dog running gif" />
        </div>
      </div>
    </div>
  );
}
