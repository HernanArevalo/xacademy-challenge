const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const { logging } = require('./middleware');
const { playersRouter, clubsRouter, nationsRouter } = require('./routes');
// const { initializeDB } = require('./config/dbConfig');

const PORT = 8080

const app = express();
app.use(cors(
  {origin: 'http://localhost:4200'}
));

app.use(bodyParser.json());
app.use(logging);

app.use("/players", playersRouter);
app.use("/clubs", clubsRouter);
app.use("/nations", nationsRouter);

(async () => {
  // await initializeDB();
  app.listen(PORT, () => {
    console.log(`You're on ${PORT} PORT`);  
  });
})();


