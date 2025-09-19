import React, { useState } from "react";
import atom__img from "../assets/atom__logo.webp";
import bars from "../assets/bars__icon.png";
import exit from "../assets/exit.png";
import "../index";
import { Link } from "react-router-dom";

const Nav = () => {

    const [open, setOpen] = useState(false);

  function notAFeature() {
    closeMenu();
    alert("This feature has not been implemented.");
  }

  function openMenu() {
    document.body.classList += " menu--open";
    setOpen(true);
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
    setOpen(false);
  }

  return (
    <nav>
      <div className="container nav__container">
        <Link to={'/'}>
        <img className="nav__logo" src={atom__img} alt="" />
        </Link>
        <ul>
          <div className="nav__links">
            <li>
              <Link
                to={"/"}
                className="nav__link text-color link__hover-effect"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to={"/search"} className="nav__link link__hover-effect">
                Search Nobel Prizes
              </Link>
            </li>
            <li>
              <a
                href=""
                className="nav__link nav__link--contact no-clicker"
                onClick={() => notAFeature()}
              >
                Contact
              </a>
            </li>
          </div>
        </ul>

        <button className={`${!open ? "btn__menu" : "no__display"}`} onClick={() => openMenu()}>
          <img className="bars clicker" src={bars} alt="" />
        </button>
        <div className="menu__backdrop">
          <button
            className="btn__menu btn__menu--close"
            onClick={() => closeMenu()}
          >
            <img
              onClick={() => closeMenu()}
              className="exit bars clicker"
              src={exit}
              alt=""
            />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to={"/"} className="menu__link" onClick={() => closeMenu()}>
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link
                to={"/search"}
                className="menu__link"
                onClick={() => closeMenu()}
              >
                Search Nobel Prizes
              </Link>
            </li>
            <li className="menu__list">
              <a
                className="menu__link no-cursor no-clicker"
                onClick={() => notAFeature()}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
