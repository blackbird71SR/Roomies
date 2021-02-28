import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfileItem = ({
  profile: {
    id,
    name,
    gender,
    age,
    univ,
    city,
    country,
    avatar,
    course,
    sem
  },
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="" />
      <div>
        <h2>{name}</h2>
        <p>{city} <span> , {country}</span></p>
        <p>
        <span className="font-weight-bold">University: </span>{univ}<br/>
        <span className="font-weight-bold">Course: </span>{course}<br/>
        <span className="font-weight-bold">Semster: </span>{sem}<br/>
        </p>
        <Link to={`/profile/${id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );    
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default connect()(ProfileItem);