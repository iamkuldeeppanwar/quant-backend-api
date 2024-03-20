const mongoose = require("mongoose");

const DB = process.env.MONGODB_URL;

mongoose
  .connect(
    "mongodb://kuldeep:IGmVp66li2FzqqqN@cluster0-shard-00-00.ghllh.mongodb.net:27017,cluster0-shard-00-01.ghllh.mongodb.net:27017,cluster0-shard-00-02.ghllh.mongodb.net:27017/quantum-user?ssl=true&replicaSet=atlas-pujsxy-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connection successfull !");
  })
  .catch((err) => {
    console.log(err);
  });
