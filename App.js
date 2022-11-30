const express = require("express");
const app = express();
require("./db/conn");
const User = require("./model/Auth");
const cors = require("cors");
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());

// create the student api using post method
app.post("/signup", async (req, res) => {
    try {
      const user = new User(req.body);
      const createUser = await user.save();
      res.status(201).send(createUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });

// login the student api using post method
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await User.findOne({email:email});
        if(useremail.password === password){
            res.status(201).send("Login Successful");
        }else{
            res.status(400).send("Invalid Login Details");
        }
    } catch (err) {
        res.status(400).send("Invalid Login Details");
    }
});

  

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
