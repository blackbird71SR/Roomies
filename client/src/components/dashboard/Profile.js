import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import {Container, Row, Col, Button} from 'react-bootstrap'

import ProfileItem from "./ProfileItem";
// import ProfileTop from "./ProfileTop";
// import ProfileAbout from "./ProfileAbout";
// import ProfileExperience from "./ProfileExperience";
// import ProfileEducation from "./ProfileEducation";
// import ProfileGithub from "./ProfileGithub";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.id === profile.id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <Container>
            <Row>
              <Col md={8}>
              <div className="profile bg-light">
                <img className="round-img" src={profile.avatar} alt="" />
                <div>
                  <h2>{profile.name}</h2>
                  <p>{profile.city} <span> , {profile.country}</span></p>
                  <p>
                    <span className="font-weight-bold">Age: </span>{profile.age}<br/>
                    <span className="font-weight-bold">Gender: </span>{profile.gender}<br/>
                  </p>
                  <p>
                    <span className="font-weight-bold">University: </span>{profile.univ}<br/>
                    <span className="font-weight-bold">Course: </span>{profile.course}<br/>
                    <span className="font-weight-bold">Semster: </span>{profile.sem}<br/>
                  </p>
                  <p>
                    <span className="font-weight-bold">Food: </span>{profile.food}<br/>
                    <span className="font-weight-bold">Smoking: </span>{profile.smoke}<br/>
                    <span className="font-weight-bold">Drinking: </span>{profile.drink}<br/>
                    <span className="font-weight-bold">Cooking: </span>{profile.cook}<br/>
                  </p>
                  <p>
                    <a href={profile.linkedin}>LinkedIn</a><br/>
                    {profile.notes}
                  </p>
                    {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user.id === profile.id && (
                        <Link to={`/edit-profile`} className="btn btn-primary">
                        Edit Profile
                    </Link>
                    )}
                </div>
              </div>
              </Col>
              <Col md={4}>
              <div className="bg-light p-2">
                <div>
                  <h3>Roomate Preferences</h3>
                  <p><span className="font-weight-bold">Country: </span>{profile.roomieCountry}</p>
                  <p>
                    <span className="font-weight-bold">Age: </span>{profile.roomieAge}<br/>
                    <span className="font-weight-bold">Gender: </span>{profile.roomieGender}<br/>
                  </p>
                  <p>
                    <span className="font-weight-bold">University: </span>{profile.roomieUniv}<br/>
                    <span className="font-weight-bold">Course: </span>{profile.roomieCourse}<br/>
                    <span className="font-weight-bold">Semster: </span>{profile.roomieSem}<br/>
                  </p>
                  <p>
                    <span className="font-weight-bold">Food: </span>{profile.roomieFood}<br/>
                    <span className="font-weight-bold">Smoking: </span>{profile.roomieSmoke}<br/>
                    <span className="font-weight-bold">Drinking: </span>{profile.roomieDrink}<br/>
                    <span className="font-weight-bold">Cooking: </span>{profile.roomieCook}<br/>
                  </p>

                  {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user.id === profile.id && (
                        <Link to={`/edit-profile`} className="btn btn-primary">
                    Edit Roomie Preferences
                  </Link>
                    )}
                </div>
              </div>
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);