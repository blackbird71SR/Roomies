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
		}
	});
};
