import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useParams, Link } from "react-router-dom";
import background from "../assets/science__background.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState(id || "");
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [showTopSix, setShowTopSix] = useState(false);

  // Fetch winners from Nobel Prize API
  const fetchWinners = async () => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      const { data } = await axios.get(
        "https://api.nobelprize.org/v1/laureate.json?gender=All"
      );

      let filteredArr = data.laureates.filter((element) =>
        [
          element.prizes?.[0]?.year,
          element.prizes?.[0]?.affiliations?.[0]?.name,
          element.prizes?.[0]?.category,
          element.prizes?.[0]?.motivation,
          element.firstname,
          element.surname,
          element.bornCountry,
        ]
          .filter(Boolean)
          .some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );

      setWinners(filteredArr);
    } catch (err) {
      console.error("Error fetching winners:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWinners();
  };

  useEffect(() => {
    if (winners.length === 0) return;

    let sorted = [...winners];

    if (filter === "YEAR-ASCENDING") {
      sorted.sort((a, b) => a.prizes[0].year - b.prizes[0].year);
    } else if (filter === "YEAR-DESCENDING") {
      sorted.sort((a, b) => b.prizes[0].year - a.prizes[0].year);
    } else if (filter === "FIRST NAME") {
      sorted.sort((a, b) => a.firstname.localeCompare(b.firstname));
    } else if (filter === "LAST NAME") {
      sorted.sort((a, b) => a.surname.localeCompare(b.surname));
    } else if (filter === "SUBJECT") {
      sorted.sort((a, b) =>
        a.prizes[0].category.localeCompare(b.prizes[0].category)
      );
    }

    setWinners(sorted);
  }, [filter]);

  useEffect(() => {
    if (id) {
      setSearchTerm(id);
      fetchWinners();
    }
  }, [id]);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const displayedWinners = showTopSix ? winners.slice(0, 6) : winners;

  return (
    <>
      <header className="hero">
        <div className="sports__img--wrapper">
          <img className="sports__img" src={background} alt="" />
        </div>

        <Nav />

        <div className="hero-content">
          <h2 className="title__search">Browse our data</h2>

          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, award year, or subject"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to={`/search/${encodeURIComponent(searchTerm)}`}>
              <button type="submit" className="search-button">
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                )}
              </button>
            </Link>
          </form>
        </div>
      </header>

      <div className="container">
        <div className="body__header--wrapper">
          <h2 className="section__sub-title section__search">
            Search Results:
          </h2>

          <div className="toggle__wrapper">
            <button type="button" onClick={() => setShowTopSix(true)}>
              Top Six Results
            </button>
            <button type="button" onClick={() => setShowTopSix(false)}>
              All Results
            </button>
          </div>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">Sort By</option>
            <option value="YEAR-ASCENDING">Year, Ascending</option>
            <option value="YEAR-DESCENDING">Year, Descending</option>
            <option value="FIRST NAME">Alphabetical, First Name</option>
            <option value="LAST NAME">Alphabetical, Last Name</option>
            <option value="SUBJECT">Alphabetical, Subject Matter</option>
          </select>
        </div>

        <div className="prize-list">
          {loading && <p>Loading...</p>}
          {!loading && winners.length === 0 && (
            <p>
              Refine search words.{" "}
              <span className="italics">
                Try typing "Einstein", "physics", or "nuclei"...
              </span>
            </p>
          )}

          {displayedWinners.map((prize) => (
            <Link to={`/awardee/${prize.id}`} state={{ searchTerm }}>
              <div key={prize.id} className="prize-card">
                <div className="prize-card__container">
                  <h3>
                    {prize.firstname} {prize.surname}
                  </h3>
                  <p>
                    <b>Category:</b> {capitalize(prize.prizes[0].category)}
                  </p>
                  <p>
                    <b>Year:</b> {prize.prizes[0].year}
                  </p>
                  <p>
                    <b>University:</b>{" "}
                    {prize.prizes[0].affiliations?.[0]?.name || "N/A"}
                  </p>
                  <p>
                    <b>Country:</b> {prize.bornCountry}
                  </p>
                  <p>
                    <b>Description:</b> {prize.prizes[0].motivation}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
