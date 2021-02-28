const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

// const Profile = require('../../models/Profile');
// const User = require('../../models/User');

const { models } = require('../../sequalize');


router.get('/', function(req, res){
	models.profileModel.findAll().then((data) => {
		if (data) res.send(data);
		else throw Error("Data not received");
	}).catch(() => res.sendStatus(500));
})


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await models.profileModel.findOne({ where: { id: req.user.id } });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/recommended', auth, async (req, res) => {
  try {
    const profile = await models.profileModel.findOne({ where: { id: req.user.id } });
    const userProps = profile.dataValues

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    let otherprofiles = await models.profileModel.findAll();
    otherprofiles = otherprofiles.filter(profile => profile.dataValues.id !== userProps.id)

    // if(userProps.roomieUniv !== "Don't Care"){
    //   otherprofiles = otherprofiles.filter(profile => profile.dataValues.univ === userProps.roomieUniv)
    // }

    const scoredProfiles = otherprofiles.map((profile)=>{
      const otherProps = profile.dataValues
      let score = 0

      //country
      if(userProps.roomieCountry === "Don't Care" || userProps.roomieCountry === otherProps.country){
        score += 50
      }
      if(otherProps.roomieCountry === "Don't Care" || otherProps.roomieCountry === userProps.country){
        score += 50
      }

      //gender
      if(userProps.roomieGender === "Don't Care" || userProps.roomieGender === otherProps.gender){
        score += 50
      }
      if(otherProps.roomieGender === "Don't Care" || otherProps.roomieGender === userProps.gender){
        score += 50
      }
      
      //age
      if(userProps.roomieAge === "Don't Care" || userProps.roomieAge === otherProps.age){
        score += 50
      }
      if(otherProps.roomieAge === "Don't Care" || otherProps.roomieAge === userProps.age){
        score += 50
      }
      
      //univ
      if(userProps.roomieUniv === "Don't Care" || userProps.roomieUniv === otherProps.univ){
        score += 50
      }
      if(otherProps.roomieUniv === "Don't Care" || otherProps.roomieUniv === userProps.univ){
        score += 50
      }
      
      //course
      if(userProps.roomieCourse === "Don't Care" || userProps.roomieCourse === otherProps.course){
        score += 50
      }
      if(otherProps.roomieCourse === "Don't Care" || otherProps.roomieCourse === userProps.course){
        score += 50
      }

      //semester
      if(userProps.roomieSem === "Don't Care" || userProps.roomieSem === otherProps.sem){
        score += 50
      }
      if(otherProps.roomieSem === "Don't Care" || otherProps.roomieSem === userProps.sem){
        score += 50
      }

      //food
      if(userProps.roomieFood === "Don't Care" || userProps.roomieFood === otherProps.food){
        score += 50
      }
      if(otherProps.roomieFood === "Don't Care" || otherProps.roomieFood === userProps.food){
        score += 50
      }

      //smoking
      if(userProps.roomieSmoke === "Don't Care" || userProps.roomieSmoke === otherProps.smoke){
        score += 50
      }
      if(otherProps.roomieSmoke === "Don't Care" || otherProps.roomieSmoke === userProps.smoke){
        score += 50
      }

      //drinking
      if(userProps.roomieDrink === "Don't Care" || userProps.roomieDrink === otherProps.drink){
        score += 50
      }
      if(otherProps.roomieDrink === "Don't Care" || otherProps.roomieDrink === userProps.drink){
        score += 50
      }

      //cooking
      if(userProps.roomieCook === "Don't Care" || userProps.roomieCook === otherProps.cook){
        score += 50
      }
      if(otherProps.roomieCook === "Don't Care" || otherProps.roomieCook === userProps.cook){
        score += 50
      }

      profile.dataValues.score = score * 100/ 1000
    })

    function compare( a, b ) {
      if ( a.dataValues.score < b.dataValues.score ){
        return 1;
      }
      if ( a.dataValues.score > b.dataValues.score ){
        return -1;
      }
      return 0;
    }
    
    otherprofiles = otherprofiles.sort( compare );

    console.log(otherprofiles);
    res.status(200).json(otherprofiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth,  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const profileFields = {
    //   user: req.user.id,
    // };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await models.profileModel.update(
        { name: req.body.name, avatar:req.body.avatar, gender: req.body.gender, age:req.body.age, city: req.body.city, country: req.body.country, univ: req.body.univ, sem: req.body.sem, course: req.body.course,food: req.body.food,smoke: req.body.smoke,drink: req.body.drink,cook: req.body.cook,notes: req.body.notes,linkedin: req.body.linkedin,roomieGender: req.body.roomieGender,roomieAge: req.body.roomieAge,roomieCountry: req.body.roomieCountry,roomieUniv: req.body.roomieUniv,roomieSem: req.body.roomieSem,roomieCourse: req.body.roomieCourse,roomieFood: req.body.roomieFood,roomieSmoke: req.body.roomieSmoke,roomieDrink: req.body.roomieDrink,roomieCook: req.body.roomieCook}, 
        { where: { id: req.user.id }}
      );

      res.status(201).json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await models.profileModel.findOne({ where: { id: req.params.user_id } })

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
