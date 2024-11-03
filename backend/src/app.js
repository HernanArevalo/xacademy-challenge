const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const { logging } = require('./middleware');
const { playersRouter } = require('./routes');
// const { initializeDB } = require('./config/dbConfig');

const PORT = 8080

const app = express();
app.use(cors(
  {origin: 'http://localhost:4200'}
));

app.use(bodyParser.json());
app.use(logging);

app.use("/players", playersRouter);
(async () => {
  // await initializeDB();
  app.listen(PORT, () => {
    console.log(`You're on ${PORT} PORT`);  
  });
})();


