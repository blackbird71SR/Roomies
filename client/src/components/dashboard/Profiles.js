import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {getProfiles } from '../../actions/profile';
import ProfileItem from "./ProfileItem";
import {Form, Col, Button} from 'react-bootstrap'

const Profiles = ({
  getProfiles,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>All Users!</h1>
      <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No Profiles found...</h4>
              )}
            </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {getProfiles}
)(Profiles);
