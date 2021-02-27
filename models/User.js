var Sequelize = require("sequelize-cockroachdb");
module.exports = (sequelize) => {
	return sequelize.define("users", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
    lastName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
      uniqe: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
};