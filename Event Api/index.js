import "./db.js";
import express from "express";
import cors from "cors";
import { Users, Events } from "./schema.js";
import GenerateToken from "./utils/generateToken.js";
import router from './routes/events.js'

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/events',router);
// handlers

app.post("/registerUser", async (req, res) => {
  console.log(req.body);
  if(await Users.findOne({email: req.body.email})){
    return res.status(400).send({msg: 'User already exists'})
  }
  try {
    let person = await new Users({
      email: req.body.email,
      password: req.body.password,
    })
      .save()
      .catch((err) => console.log("err", err));
    return res.send({ msg: "Success", person });
  } catch (error) {
    return res.send(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(await Users.find());
  const user = await Users.findOne({ email });
  console.log(user);
  if (!user) return res.status(401).send({ error: "Invalid Credentials" });

  let isPassword = await user.comparePassword(user.password, password);
  console.log(user);
  console.log("isPassword", isPassword);
  if (!isPassword) return res.status(401).send({ error: "Invalid Credentials" });
  const access = GenerateToken(user);
  return res.status(200).send({ msg: "Success", access });
});


app.listen(process.env.PORT || 8080, () => console.log("Server started"));
