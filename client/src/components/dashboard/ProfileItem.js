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
    country
  },
}) => {
  return (
    <div className="profile bg-light">
      {/* <img className="round-img" src={avatar} alt="" /> */}
      <div>
        <h2>{name}</h2>
        <p>
          {city}
          {city && <span> , {country}</span>}
        </p>
        <p>{univ}</p>
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