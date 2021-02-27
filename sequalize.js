var Sequelize = require("sequelize-cockroachdb");
var fs = require('fs');

if (!Sequelize.supportsCockroachDB) {
	throw new Error("CockroachDB dialect for Sequelize not installed");
}

const sequelize = new Sequelize('cluster0-959.defaultdb', 'omkar', 'w0lo5hSeimPBUrCD', {
	dialect: "postgres",
	host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
	port: 26257,
	logging: false,
	dialectOptions:{
		ssl: { ca: fs.readFileSync('certs/cc-ca.crt').toString(),}
	 }		
});

sequelize.authenticate();
console.info("INFO: Connection to the database has been established successfully.");


const userModel = require('./models/User')(sequelize);
const profileModel = require('./models/Profile')(sequelize);

if (process.env.DB_INIT === "CREATE-DROP") {
	try {
		console.warn("WARN: Database init process is set to CREATE-DROP. Syncing models...");
		sequelize.sync({ force: true });
		console.info("INFO: Sync successful");
	} catch (err) {
		console.error("ERROR:", err);
	}
}
module.exports = { sequelize, models: { userModel, profileModel } };