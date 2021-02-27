import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import {Row, Col, Button} from 'react-bootstrap'

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
          <DashboardActions />
          <div>
            <h2> Your Information</h2>
            <Row>
              <Col>
                Gender: {profile.gender}
              </Col>
              <Col>
                Age: {profile.age}
              </Col>
              <Col>
                {profile.city}, {profile.country}
              </Col>
            </Row>
            <Row>
              <Col>
              {profile.univ} - {profile.sem}
              </Col>
            </Row>
          </div>
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