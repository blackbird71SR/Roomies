import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import {Container, Row, Col, Button} from 'react-bootstrap'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Welcome {user && profile.name}
      </p>
      {profile !== null ? (
        <Fragment>
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
                  <Link to={`/edit-profile`} className="btn btn-primary">
                    Edit Profile
                  </Link>
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

                  <Link to={`/edit-profile`} className="btn btn-primary">
                    Edit Roomie Preferences
                  </Link>
                </div>
              </div>
              </Col>
            </Row>
          </Container>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info...</p>
          <Link to="/edit-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  Dashboard
);