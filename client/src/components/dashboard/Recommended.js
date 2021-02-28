import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {getProfiles, getRecommendations } from '../../actions/profile';
import RecommendItem from "./RecommendItem";
import {Form, Col, Button} from 'react-bootstrap'

const Profiles = ({
  getRecommendations,
  profile: { recommendations, loading },
}) => {
  useEffect(() => {
    getRecommendations()
  }, [getRecommendations]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-center display-3'>Your Recommendations</h1>
      <div className="profiles">
              {recommendations.length > 0 ? (
                recommendations.map((profile) => (
                  <RecommendItem key={profile.id} profile={profile} />
                ))
              ) : (
                <h4>No recommendations found...Please update your profile</h4>
              )}
            </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getRecommendations: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {getRecommendations}
)(Profiles);
