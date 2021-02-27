const express = require('express');
const path = require('path');
const helmet = require('helmet');


// if (process.env.DB_INIT === "CREATE-DROP") {
// 	try {
// 		console.warn("WARN: Database init process is set to CREATE-DROP. Syncing models...");
// 		sequelize.sync({ force: true });
// 		console.info("INFO: Sync successful");
// 	} catch (err) {
// 		console.error("ERROR:", err);
// 	}
// }


// var pool = new Pool({
//     user: 'omkar',
// 	password:'w0lo5hSeimPBUrCD',
//     host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
//     database: 'cluster0-959.defaultdb',
//     port: 26257,
//     ssl: {
//         ca: fs.readFileSync('certs/cc-ca.crt').toString(),
//     }
// });


// pool.connect(function (err, client, done) {
//     if (err) {
//       console.log(err);
//       done();
//     } else {
//         if (err) {
//             console.error('could not connect to cockroachdb', err);
//             done();
//         } else {
//             client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstName STRING(100), lastName STRING(100), email STRING(100), password STRING(100));', (err, res) => {
//                 if (err) {
//                     throw err
//                 } else {
//                 }
//             });

//             client.query(';', (err, res) => {
//               if (err) {
//                   throw err
//               } else {
//               }
//           });
//         }
//     }
// })

const app = express();

app.use(express.json({ extended: false }));
app.use(helmet());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};