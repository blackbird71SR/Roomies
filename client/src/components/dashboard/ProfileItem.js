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
    sem,
    score
  },
}) => {
  let color = 'dark'
  if(score >= 75){
    color = 'success'
  }else if(score >= 50){
    color = 'info'
  }else if(score >= 25){
    color = 'warning'
  }else{
    color = 'red'
  }
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="" />
      <div>
        <h2 className="display-5">{name} &nbsp;<span className={`text-${color} border rounded-circle p-1 border-${color}`}>{score}</span></h2>
        <p>{city} <span> , {country}</span></p>
        <p>
        <span className="font-weight-bold">University: </span>{univ}<br/>
        <span className="font-weight-bold">Course: </span>{course}<br/>
        <span className="font-weight-bold">Semster: </span>{sem}<br/>
        </p>
        <Link to={`/profile/${id}`} className="btn btn-secondary">
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