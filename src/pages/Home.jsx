import React, { useState } from "react";
import Nav from "../components/Nav";
import science__img from "../assets/science.svg";
import Search from "./Search";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const { id } = useParams;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  const [searchTerm, setSearchTerm] = useState(id || "");

  return (
    <>
      <Nav />
      <header>
        <div className="container header__container">
          <div className="header__description">
            <h1 className="section__title">
              America's most reliable Nobel Prize database
            </h1>
            <h2 className="section__sub-title">
              Find every Nobel Prize winner with{" "}
              <span className="text-color">Atom Data.</span>
            </h2>
            <form className="input__wrapper" onSubmit={handleSubmit}>
              <input
                className="input__search"
                type="text"
                placeholder="Search by name, category, year, etc."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link to={`/search/${encodeURIComponent(searchTerm)}`}>
              <button
                type="submit"
                className="input__text input__text--home"
                id="search-input__home"
              >
                Search
              </button>
              </Link>
            </form>
          </div>
          <div className="figure__wrapper">
            <figure className="header__img--wrapper">
              <img className="header__img" src={science__img} alt="" />
              <i
                id="home__loading--spinner"
                className="fa-solid fa-spinner home--spinner"
              ></i>
            </figure>
          </div>
        </div>
      </header>
    </>
  );
}

export default Home;
