// const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');

// const connectDB = async () => {
// 	try {
// 		await mongoose.connect(db, {
// 			useNewUrlParser: true,
// 			useCreateIndex: true,
// 			useFindAndModify: false,
// 			useUnifiedTopology: true
// 		});

// 		console.log('MongoDB Connected...');
// 	} catch (err) {
// 		console.error(err.message);
// 		// Exit process with failure
// 		process.exit(1);
// 	}
// };

// module.exports = connectDB;

// var async = require('async');
var fs = require('fs');
// var pg = require('pg');
const cockdb = require('cockroachdb');


// Connect to the "bank" database.
var config = {
    user: 'omkar',
	password:'w0lo5hSeimPBUrCD',
    host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    database: 'cluster0-959.defaultdb',
    port: 26257,
    ssl: {
        ca: fs.readFileSync('certs/cc-ca.crt').toString(),
    }
};

var pool = new cockdb.Pool(config);

const getUsers = (request, response) => {
	pool.query('SELECT * FROM users', (error, results) =>{
		if(error){
			throw error
		}
		console.log(results.rows);
		response.status(200).json(results.rows)
	})
}

pool.connect(function (err, client, done) {
    if (err) {
        console.log(err);
        done();
    } else {
        if (err) {
            console.error('could not connect to cockroachdb', err);
            done();
        } else {
            client.query('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, firstName STRING(100), lastName STRING(100), email STRING(100), password STRING(100));', (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });

            client.query('INSERT INTO users (id, firstName, lastName, email, password) VALUES (5, "Omkar", "Ajnadkar", "omkarajnadkar@gmail.com", "vajcbadjcvadj");', (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
        }
    }
})

module.exports = {
	getUsers
}