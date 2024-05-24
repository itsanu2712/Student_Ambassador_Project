import {app} from "./app.js";
import DBConnect from "./db/index.js"


import dotenv from "dotenv"

dotenv.config();

console.log(process.env.DATABASE_URL)

const port = process.env.PORT || 6000;


// check the DB connection
DBConnect().then(() => {
   app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);

   })
   console.log("Db is successfully connected");
}).catch((err) => {
   console.log("Db connection error" + err);
})
