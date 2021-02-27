import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, createProfile } from '../../actions/profile';
import {Form, Col, Button} from 'react-bootstrap'

const EditProfile = ({
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
    sem: '',
    course:'',
    food:'',
    smoke:'',
    drink:'',
    cook:'',
    notes:'',
    linkedin:'',
    roomieGender:'',
    roomieAge:'',
    roomieCountry:'',
    roomieUniv:'',
    roomieSem:'',
    roomieCourse:'',
    roomieFood:'',
    roomieSmoke:'',
    roomieDrink:'',
    roomieCook:''
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
      sem: loading || !profile.sem ? '' : profile.sem,
      course: loading || !profile.course ? '':profile.course,
      food: loading || !profile.food ? '':profile.food,
      smoke: loading || !profile.smoke ? '':profile.smoke,
      drink: loading || !profile.drink ? '':profile.drink,
      cook: loading || !profile.cook ? '':profile.cook,
      notes: loading || !profile.notes ? '':profile.notes,
      linkedin: loading || !profile.linkedin ? '':profile.linkedin,
      roomieGender: loading || !profile.roomieGender ? '':profile.roomieGender,
      roomieAge: loading || !profile.roomieAge ? '':profile.roomieAge,
      roomieCountry: loading || !profile.roomieCountry ? '':profile.roomieCountry,
      roomieUniv: loading || !profile.roomieUniv ? '':profile.roomieUniv,
      roomieSem: loading || !profile.roomieSem ? '':profile.roomieSem,
      roomieCourse: loading || !profile.roomieCourse ? '':profile.roomieCourse,
      roomieFood: loading || !profile.roomieFood ? '':profile.roomieFood,
      roomieSmoke: loading || !profile.roomieSmoke ? '':profile.roomieSmoke,
      roomieDrink: loading || !profile.roomieDrink ? '':profile.roomieDrink,
      roomieCook:loading || !profile.roomieCook ? '':profile.roomieCook
    })
  }, [loading, getCurrentProfile]);

  const { name, gender, age, city, country, univ, sem, course,food,smoke,drink,cook,notes,linkedin,roomieGender,roomieAge,roomieCountry,roomieUniv,roomieSem,roomieCourse,roomieFood,roomieSmoke,roomieDrink,roomieCook } = formData;

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
      <h1 className='large text-primary'>Update Profile!</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && profile.name}
      </p>
      <div>
      <Form onSubmit={onSubmit}>
          <h2>Your Prefernces</h2>
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Transgender">Transgender</option>
                <option value="Intersex">Intersex</option>
                <option value="I prefer not to say">I prefer not to say</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control as="select" name='age' value={age} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="11 or below">11 or below</option>
                <option value="12-17">12-17</option>
                <option value="18-24">18-24</option>
                <option value="25-29">25-29</option>
                <option value="30-34">30-34</option>
                <option value="35-39">35-39</option>
                <option value="40-44">40-44</option>
                <option value="45-49">45-49</option>
                <option value="50 or above">50 or above</option>
                <option value="I prefer not to say">I prefer not to say</option>
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
                <option value="The University of Texas at Dallas">The University of Texas at Dallas</option>
                <option value="North Carolina State University">North Carolina State University</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formSemester">
              <Form.Label>Starting Semester</Form.Label>
              <Form.Control as="select" name='sem' value={sem} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Spring 2021">Spring 2021</option>
                <option value="Fall 2021">Fall 2021</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formCourse">
              <Form.Label>Course</Form.Label>
              <Form.Control as="select" name='course' value={course} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="MS CS">MS CS</option>
                <option value="MS BA">MS BA</option>
                <option value="MS ITM">MS ITM</option>
                <option value="MS Management Science">MS Management Science</option>
                <option value="PhD">PhD</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formFood">
              <Form.Label>Food</Form.Label>
              <Form.Control as="select" name='food' value={food} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegetarian + Egg">Vegetarian + Egg</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Jain">Jain</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formSmoke">
              <Form.Label>Smoke?</Form.Label>
              <Form.Control as="select" name='smoke' value={smoke} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Smoker">Smoker</option>
                <option value="Non-Smoker">Non-Smoker</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formDrink">
              <Form.Label>Drink?</Form.Label>
              <Form.Control as="select" name='drink' value={drink} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Non-Drinker">Non-Drinker</option>
                <option value="Occasional Drinker">Occasional Drinker</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formCook">
              <Form.Label>Know Cooking?</Form.Label>
              <Form.Control as="select" name='cook' value={cook} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Yes">Yes</option>
                <option value="Learning">Learning</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>

            <Form.Group as={Col} controlId="formLinkedin">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control name='linkedin' value={linkedin} placeholder="Enter Linkedin URL" onChange={onChange}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control name='notes' value={notes} placeholder="Enter notes" onChange={onChange}/>
            </Form.Group>
          </Form.Row>

          <h2>Roommate Prefernces</h2>

          <Form.Row>
            <Form.Group as={Col} controlId="formRoomieGender">
              <Form.Label>Roomie Gender</Form.Label>
              <Form.Control as="select" name='roomieGender' value={roomieGender} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Transgender">Transgender</option>
                <option value="Intersex">Intersex</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formRoomieAge">
              <Form.Label>Roomie Age</Form.Label>
              <Form.Control as="select" name='roomieAge' value={roomieAge} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="11 or below">11 or below</option>
                <option value="12-17">12-17</option>
                <option value="18-24">18-24</option>
                <option value="25-29">25-29</option>
                <option value="30-34">30-34</option>
                <option value="35-39">35-39</option>
                <option value="40-44">40-44</option>
                <option value="45-49">45-49</option>
                <option value="50 or above">50 or above</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formRoomieCountry">
              <Form.Label>Roomie Country</Form.Label>
              <Form.Control name='roomieCountry' value={roomieCountry} placeholder="Enter country" onChange={onChange}/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formRoomieUniv">
              <Form.Label>Roomie University</Form.Label>
              <Form.Control as="select" name='roomieUniv' value={roomieUniv} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="The University of Texas at Dallas">The University of Texas at Dallas</option>
                <option value="North Carolina State University">North Carolina State University</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formRoomieSemester">
              <Form.Label>Roomie Starting Semester</Form.Label>
              <Form.Control as="select" name='roomieSem' value={roomieSem} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Spring 2021">Spring 2021</option>
                <option value="Fall 2021">Fall 2021</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formRoomieCourse">
              <Form.Label>Roomie Course</Form.Label>
              <Form.Control as="select" name='roomieCourse' value={roomieCourse} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="MS CS">MS CS</option>
                <option value="MS BA">MS BA</option>
                <option value="MS ITM">MS ITM</option>
                <option value="MS Management Science">MS Management Science</option>
                <option value="PhD">PhD</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formRoomieFood">
              <Form.Label>Roomie Food</Form.Label>
              <Form.Control as="select" name='roomieFood' value={roomieFood} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegetarian + Egg">Vegetarian + Egg</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Jain">Jain</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formRoomieSmoke">
              <Form.Label>Roomie Smoke?</Form.Label>
              <Form.Control as="select" name='roomieSmoke' value={roomieSmoke} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Smoker">Smoker</option>
                <option value="Non-Smoker">Non-Smoker</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formRoomieDrink">
              <Form.Label>Roomie Drink?</Form.Label>
              <Form.Control as="select" name='roomieDrink' value={roomieDrink} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Non-Drinker">Non-Drinker</option>
                <option value="Occasional Drinker">Occasional Drinker</option>
                <option value="Don't Care">Don't Care</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formRoomieCook">
              <Form.Label>Roomie Know Cooking?</Form.Label>
              <Form.Control as="select" name='roomieCook' value={roomieCook} onChange={onChange}>
                <option value="">Choose...</option>
                <option value="Yes">Yes</option>
                <option value="Learning">Learning</option>
                <option value="No">No</option>
                <option value="Don't Care">Don't Care</option>
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

EditProfile.propTypes = {
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
)(EditProfile);
