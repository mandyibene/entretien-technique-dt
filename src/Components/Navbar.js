import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
      <nav>
        <NavLink activeclassname="active"  to="/login">Connexion</NavLink>
        <NavLink activeclassname="active" to="/gauge">Compteur</NavLink>
      </nav>
    )
}

export default Navbar;