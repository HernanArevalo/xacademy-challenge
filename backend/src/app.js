const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const { clubRouter, nationRouter, playerRouter, userRouter } = require('./routes');

const PORT = 8080

const app = express();
app.use(cors(
  {origin: 'http://localhost:4200'}
));

app.use(bodyParser.json());

app.use("/players", playerRouter);
app.use("/clubs", clubRouter);
app.use("/nations", nationRouter);
app.use("/user", userRouter);

(async () => {
  // await initializeDB();
  app.listen(PORT, () => {
    console.log(`You're on ${PORT} PORT`);  
  });
})();


