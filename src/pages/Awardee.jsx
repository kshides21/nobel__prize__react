import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import btn__back from "../assets/back.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import physics from "../assets/physics.avif";
import medicine from "../assets/medicine.jpg";
import literature from "../assets/literature.jpg";
import economics from "../assets/economics.png";
import peace from "../assets/peace.png";
import chemistry from "../assets/chemistry.png";
import science from "../assets/other__science.png";

const Awardee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";
  const [related, setRelated] = useState([]);

  const [awardee, setAwardee] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAwardee(userId) {
    setLoading(true);

    try {
      const { data } = await axios.get(
        "https://api.nobelprize.org/v1/laureate.json?gender=All"
      );

      const found = data.laureates.find((person) => person.id === userId);
      setAwardee(found || null);

      if (searchTerm) {
        const filtered = data.laureates.filter((element) =>
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

        setRelated(filtered.filter((p) => p.id !== userId));
      }
    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setTimeout ( () => {
        setLoading(false);

      }, 200);
    }
  }

  useEffect(() => {
    if (id) fetchAwardee(id);
  }, [id]);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="btn__back--wrapper">
          <button className="btn__back--btn" onClick={() => navigate(-1)}>
            <img className="btn__back" src={btn__back} alt="" />
          </button>
        </div>

        <div className="main__container">
          <div className="awardee__img--wrapper">
            {loading ? (
              <div className="skeleton__loading--wrapper">
                <div className="skeleton__loading--img"></div>
                <div className="skeleton__loading--box"></div>
              </div> 
            ) : awardee && awardee.prizes?.[0]?.category === "physics" ? (
              <img className="awardee__img" src={physics} alt="" />
            ) : awardee && awardee.prizes?.[0]?.category === "medicine" ? (
              <img className="awardee__img" src={medicine} alt="" />
            ) : awardee && awardee.prizes?.[0]?.category === "literature" ? (
              <img className="awardee__img" src={literature} alt="" />
            ) : awardee && awardee.prizes?.[0]?.category === "peace" ? (
              <img className="awardee__img" src={peace} alt="" />
            ) : awardee && awardee.prizes?.[0]?.category === "chemistry" ? (
              <img className="awardee__img" src={chemistry} alt="" />
            ) : awardee && awardee.prizes?.[0]?.category === "economics" ? (
              <img className="awardee__img" src={economics} alt="" />
            ) : (
              awardee && <img className="awardee__img" src={science} alt="" />
            )}
          </div>
          {loading ? ( <></>
          ) : awardee ? (
            <div className="awardee__info--container">
              <div className="awardee__name">
                <h3>
                  {awardee.firstname} {awardee.surname}
                </h3>
              </div>
              <div className="awardee__description">
                <p>
                  <b>Year Awarded:</b> {awardee.prizes?.[0]?.year}
                </p>
                <p>
                  <b>Category:</b> {capitalize(awardee.prizes?.[0]?.category)}
                </p>
                <p>
                  <b>Affiliated University:</b>{" "}
                  {awardee.prizes?.[0]?.affiliations?.[0]?.name || "N/A"}
                </p>
                <p>
                  <b>Home Country:</b> {awardee.bornCountry}
                </p>
                <p>
                  <b>Project Description:</b> {awardee.prizes?.[0]?.motivation}
                </p>
              </div>
            </div>
          ) : (
            <p>No awardee found.</p>
          )}
        </div>

        <div className="rec__list--related">
          <h2>Related recipients:</h2>
        </div>
        <div className="rec__list">
          {related.length === 0 ? (
            <p>No related recipients found.</p>
          ) : (
            related.slice(0, 4).map((person) => (
              <div key={person.id} className="rec__img--wrapper">
                <Link to={`/awardee/${person.id}`} state={{ searchTerm }}>
                  {person && person.prizes?.[0]?.category === "physics" ? (
                    <img className="rec__img" src={physics} alt="" />
                  ) : person && person.prizes?.[0]?.category === "medicine" ? (
                    <img className="rec__img" src={medicine} alt="" />
                  ) : person &&
                    person.prizes?.[0]?.category === "literature" ? (
                    <img className="rec__img" src={literature} alt="" />
                  ) : person && person.prizes?.[0]?.category === "peace" ? (
                    <img className="rec__img" src={peace} alt="" />
                  ) : person && person.prizes?.[0]?.category === "chemistry" ? (
                    <img className="rec__img" src={chemistry} alt="" />
                  ) : person && person.prizes?.[0]?.category === "economics" ? (
                    <img className="rec__img" src={economics} alt="" />
                  ) : (
                    person && <img className="rec__img" src={science} alt="" />
                  )}
                  <h3 className="rec__name">
                    {person.firstname} {person.surname}
                  </h3>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Awardee;
