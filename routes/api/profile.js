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

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth,  async (req, res) => {
  console.log(req);
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
        { name: req.body.name, gender: req.body.gender, age:req.body.age, city: req.body.city, country: req.body.country, univ: req.body.univ, sem: req.body.sem, course: req.body.course,food: req.body.food,smoke: req.body.smoke,drink: req.body.drink,cook: req.body.cook,notes: req.body.notes,linkedin: req.body.linkedin,roomieGender: req.body.roomieGender,roomieAge: req.body.roomieAge,roomieCountry: req.body.roomieCountry,roomieUniv: req.body.roomieUniv,roomieSem: req.body.roomieSem,roomieCourse: req.body.roomieCourse,roomieFood: req.body.roomieFood,roomieSmoke: req.body.roomieSmoke,roomieDrink: req.body.roomieDrink,roomieCook: req.body.roomieCook}, 
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
