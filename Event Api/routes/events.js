import "../db.js";
import express from "express";
import cors from "cors";
import { Users, Events } from "../schema.js";
import Auth from "../utils/auth.js";
import paginate from "paginate-middleware";
import { AfterToday, first2, InThisMonth, InThisWeek, lessThanDate } from "../utils/Helperfunctions.js";

const router = express.Router();

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

router.get("/", Auth, async (req, res) => {
  const bearer = req.user;
  if (!bearer) {
    return res.send("login to continue.");
  }
  try {
    console.log("bearer", bearer);
    let userEvents = await Events.find(bearer);
    res.send(userEvents);
  } catch (error) {
    return res.send({ error });
  }
});

router.get("/public", Auth, paginate(Events), async (req, res) => {
  let { next, results } = res.paginatedResult;
  results = results.filter((el) => el.public === true && el.owner !== req.user._id);
  res.json({ next, results });
});


router.post("/new", Auth, async (req, res) => {
  try {
    let data = {
      name: req.body.name,
      description: req.body.description,
      public: req.body.public,
      owner: req.user._id,
      image: req.body.image,
      parent: req.body.parent,
      stime: req.body.stime,
      etime: req.body.etime,
    };
    const event = await new Events({ ...data }).save();
    return res.status(200).send({ event });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.put("/:eventId", Auth, (req, res) => {
  Events.findByIdAndUpdate(req.params.eventId, { ...req.body })
    .then((event) => res.status(200).send({ event }))
    .catch((err) => res.status(500).send({ err }));
});

router.delete("/:eventId", Auth, (req, res) => {
  Events.findByIdAndDelete(req.params.eventId, { ...req.body })
    .then((event) => res.status(200).send({ msg: 'Deleted' }))
    .catch((err) => res.status(500).send({ err }));
});

router.get('/today',Auth, async (req,res) => {
  let yourEvents = await Events.find({owner: req.user._id})
  let dateToday = `${new Date().getFullYear()}-${first2(new Date().getMonth() + 1)}-${first2(new Date().getDate())}`
  console.log('dateToday', dateToday)
  let today = yourEvents.filter(event => event.stime.split('T')[0] == dateToday)
  return res.send({msg: 'Success', data: today})
})

router.get('/previous',Auth, async (req,res) => {
  let yourEvents = await Events.find({owner: req.user._id})
  let dateToday = `${new Date().getFullYear()}-${first2(new Date().getMonth() + 1)}-${first2(new Date().getDate())}`
  let previous = yourEvents.filter(event => lessThanDate(event.stime.split('T')[0],dateToday))
  return res.send({msg: 'Success', data: previous})
})

router.get('/thisweek',Auth, async (req,res) => {
  let yourEvents = await Events.find({owner: req.user._id})
  let thisweek = yourEvents.filter(event => InThisWeek(event.stime.split('T')[0]))
  console.log(thisweek)
  return res.send({msg: 'Success', data: thisweek})
})

router.get('/thismonth',Auth, async (req,res) => {
  let yourEvents = await Events.find({owner: req.user._id})
  let thismonth = yourEvents.filter(event => InThisMonth(event.stime.split('T')[0]))
  console.log(thismonth)
  return res.send({msg: 'Success', data: thismonth})
})

router.get('/future',Auth, async (req,res) => {
  let yourEvents = await Events.find({owner: req.user._id})
  let later = yourEvents.filter(event => AfterToday(event.stime.split('T')[0]))
  console.log(later)
  return res.send({msg: 'Success', data: later})
})

router.post("/attend/:eventId", Auth, async (req, res) => {
  Events.findByIdAndUpdate(req.params.eventId, {
    $push: {
      attendees: req.user._id,
    },
  })
    .then((event) => {
        Users.findOneByIdAndUpdate(event.owner,{
            $push: {
                notifications: req.user._id
            }
        })
        res.status(200).send({ event })
    })
    .catch((err) => res.status(500).send({ err }));
});


export default router