const cors = require("cors");
require("./mongoDB/mongoose");
const express = require("express");
const userRouter = require("./routers/user.router");

const app = express();

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`App Running On Port ${port}`);
});
