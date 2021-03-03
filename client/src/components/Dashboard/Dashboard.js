import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { logout } from "../../actions/session";
import Planet from "../Planet/Planet";

import "./Dashboard.css";

const mapStateToProps = ({ session }) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const Dashboard = ({ logout, session }) => {
  const [planetList, setPlanetList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let planets;

  useEffect(() => {
    setPlanetList([]);
    let cancelToken;
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    cancelToken = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        if (searchQuery === "") {
          return;
        }
        const response = await axios.get(
          "search/planets?searchStr=" + searchQuery,
          { cancelToken: cancelToken.token } //Pass the cancel token to the current request
        );

        if (response.status === 200) {
          setPlanetList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    console.log("i am called");
    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, [searchQuery]);

  planets = planetList.map((planet) => (
    <Planet key={planet.name} name={planet.name} />
  ));

  return (
    <>
      <div className="dashboard-header">
        <h1>Hi {session.username}!</h1>
        <button className="Button Danger" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="search for a planet"
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <div className="planet-wrapper">{planets}</div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
