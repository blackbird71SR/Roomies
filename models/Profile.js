var Sequelize = require("sequelize-cockroachdb");
module.exports = (sequelize) => {
	return sequelize.define("profile", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
      		uniqe: true
		},
		avatar: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		gender: {
			type: Sequelize.STRING,
			allowNull: true,
		},
    	age: {
			type: Sequelize.STRING,
			allowNull: true,
		},
    	city: {
			type: Sequelize.STRING,
			allowNull: true,
		},
    	country: {
			type: Sequelize.STRING,
			allowNull: true,
		},
    	univ: {
			type: Sequelize.STRING,
			allowNull: true,
		},
    	sem: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		course: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		food:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		smoke:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		drink:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		cook:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		notes:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		linkedin:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieGender:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieAge:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieCountry:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieUniv:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieSem:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieCourse:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieFood:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieSmoke:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieDrink:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		roomieCook:{
			type: Sequelize.STRING,
			allowNull: true,
		},
		accepted:{
			type: Sequelize.ARRAY(Sequelize.INTEGER),
			allowNull: true,
			defaultValue: []
		},
		rejected:{
			type: Sequelize.ARRAY(Sequelize.INTEGER),
			allowNull: true,
			defaultValue: []
		}
	});
};
