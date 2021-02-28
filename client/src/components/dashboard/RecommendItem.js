import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {ButtonGroup, Button} from 'react-bootstrap'
import { rejectUser, acceptUser } from "../../actions/profile";


const RecommendItem = ({
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
    score,
    status
  },rejectUser, acceptUser
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
      <div>
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
                <p>
                  <span className="font-weight-bold">Current Status: </span>{status}<br/>
                </p>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="danger" onClick={() => rejectUser(id)}>Reject</Button>
                    <Link to={`/profile/${id}`}><Button variant="secondary">View Profile</Button></Link>
                    <Button variant="success" onClick={() => acceptUser(id)}>Accept</Button>
                </ButtonGroup>
            </div>
        </div>
      </div>
  );    
};

RecommendItem.propTypes = {
  profile: PropTypes.object.isRequired,
  rejectUser: PropTypes.func.isRequired,
  acceptUser: PropTypes.func.isRequired
};

export default connect(null, {rejectUser, acceptUser})(RecommendItem);