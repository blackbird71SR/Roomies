import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, createProfile } from '../../actions/profile';
import {Form, Col, Button} from 'react-bootstrap'

const Dashboard = ({
  getCurrentProfile,
  createProfile,
  auth: { user },
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age:'',
    city: '',
    country: '',
    univ: '',
    sem: ''
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      name: loading || !profile.name ? '':profile.name,
      gender: loading || !profile.gender ? '':profile.gender,
      age: loading || !profile.age ? '':profile.age,
      city: loading || !profile.city ? '':profile.city,
      country: loading || !profile.country ? '':profile.country,
      univ: loading || !profile.univ ? '':profile.univ,
      sem: loading || !profile.sem ? '' : profile.sem
    })
  }, [loading, getCurrentProfile]);

  const { name, gender, age, city, country, univ, sem } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    formData.id = profile.id
    createProfile(formData, history, true);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Welcome to the DashBoard!</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && profile.name}
      </p>
      <h2>Your Prefernces</h2>
      <div>
      <Form onSubmit={onSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter name" name='name' value={name} onChange={onChange}/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name='gender' value={gender} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbin">Non-Binary</option>
                <option value="trans">Transgender</option>
                <option value="inter">Intersex</option>
                <option value="notprefer">I prefer not to say</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control as="select" name='age' value={age} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="11">11 or below</option>
                <option value="12">12-17</option>
                <option value="18">18-24</option>
                <option value="25">25-29</option>
                <option value="30">30-34</option>
                <option value="35">35-39</option>
                <option value="40">40-44</option>
                <option value="45">45-49</option>
                <option value="50">50 or above</option>
                <option value="notprefer">I prefer not to say</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control name='city' value={city} placeholder="Enter city" onChange={onChange}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control name='country' value={country} placeholder="Enter country" onChange={onChange}/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formUniv">
              <Form.Label>University</Form.Label>
              <Form.Control as="select" name='univ' value={univ} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="UTD">The University of Texas at Dallas</option>
                <option value="NCSU">North Carolina State University</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formSemester">
              <Form.Label>Starting Semester</Form.Label>
              <Form.Control as="select" name='sem' value={sem} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="S21">Spring 2021</option>
                <option value="F21">Fall 2021</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, createProfile }
)(Dashboard);
