import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import { searchByPlanet } from "../util/search";

const mapStateToProps = ({ session }) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const Dashboard = ({ logout, session }) => {
  const [planetList, setPlanetList] = useState([]);

  // TODO: handle error properly
  const searchByPlanetName = (e) => {
    e.preventDefault();
    const searchString = e.target.value;
    if (searchString === "") {
      return;
    }
    searchByPlanet(searchString)
      .then((response) => response.json())
      .then((planets) => {
        setPlanetList(planets);
        console.log(planets);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Hi {session.username}!</h1>
      <div className="searchBar">
        <input
          type="text"
          placeholder="search for a planet"
          onChange={searchByPlanetName}
        ></input>
        {/* {Object.keys(this.state.searchResult).map((item, i) => (
          <li key={i}>
            <span>{this.state.searchResult[item].name}</span>
          </li>
        ))} */}
      </div>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
