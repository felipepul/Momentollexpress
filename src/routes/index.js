//#region atributos
const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Car = require("../models/car");
const Rent = require("../models/rent");
const user = require("../models/user");

let userLogin = false;

let users;
let cars;
let rents;

//#endregion
//#region function
async function getData() {
  users = await User.find();
  cars = await Car.find();
  rents = await Rent.find();
}
//#endregion
//#region raiz
router.get("/", async (req, res) => {
  try {
    getData();
    if (userLogin) {
      res.render("car", { cars: cars });
    } else if (users != 0){
        res.redirect("/login");
    }else{
      res.render("/register");
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
//#endregion

//#region users
router.get("/login", async (req, res) => {
  try {
    getData();
    userLogin = false;
    res.render("login", { users: users, userLogin: userLogin });
  } catch (error) {
    console.error(error);
    //res.status(400).json({error.error})
  }
});

router.get("/register", async (req, res) => {
  try {
    getData();
    userLogin = false;
    res.render("login", { users: false, userLogin: userLogin });
  } catch (error) {
    console.error(error);
    //res.status(400).json({error})
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const validUser = await User.findOne({ username: req.body.username });

    if (validUser) {
      const validPass = req.body.password === validUser.password;

      if (validUser) {
        userLogin = true;
        res.redirect("/car");
      } else {
        res.status(400).json({ error: "incorrect password" });
      }
    } else {
      res.redirect("/register");
    }
  } catch (error) {
    console.error(error);
  }
});



router.post("/user/register", async (req, res,next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = req.body.name === user.name;
      if (!result) {
        const user = new User(req.body);
        await user.save();
        userLogin = false
        res.redirect("/");
      }

    } else {
      const user = new User(req.body);
      await user.save();
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
     //res.status(400).json({error:"no se pudo guardar"})
  }
});

router.get("/user/logout", async (req, res) => {
  try {
    userLogin = false;
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    //res.status(400).json({error})
  }
});
//#endregion

//#region rent
router.get("/rent", async (req, res) => {
  try {
    getData();
    res.render("rentacar", { users: users, cars: cars, rents: rents });
  } catch (error) {
    console.error(error);
  }
});

router.post("/rent/register", async (req, res) => {
  try {
    const rent = await Rent.findOne({numberRent: req.body.numberRent });
    if (rent) {
      const result = req.body.plateNumber === Rent.plateNumber;
      if (!result) {
        const rent = new Rent(req.body);
        await rent.save();
        await Car.updateOne(
          { placa: req.body.plateNumber },
          { estado: false }
        );
        setTimeout(() => {
          res.redirect("/rent");
        }, 1500);
      }
    } else {
      const rent = new Rent(req.body);
      await rent.save();
      await Car.updateOne(
        { placa: req.body.plateNumber },
        { estado: false }
      );
      setTimeout(() => {
        res.redirect("/rent");
      }, 1500);
    }
  }catch(error){
    console.log(error);
  }
});
//#endregion

//#region car
router.get("/car", async (req, res) => {
  try {
    getData();
    if (userLogin) {
      res.render("car", { cars: cars });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/car/register", async (req, res,next) => {
  try {
    const car = await Car.findOne({placa: req.body.placa });
    if (car) {
      const result = req.body.placa === user.placa;
      if (!result) {
        const car = new Car(req.body);
        await car.save();
        setTimeout(() =>{
          res.redirect("/car");
        },1500)
      }
    } else {
      const car = new Car(req.body);
      await car.save();
      setTimeout(() =>{
        res.redirect("/car");
      },1500)
    }
  }catch(error){
    console.log(error);
  }
});
//#endregion

module.exports = router;
