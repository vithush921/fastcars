let express = require("express")
let router = express.Router();
let mongoose = require("mongoose");
const { create } = require("../models/Cars");


// connect with car model

let Car = require("../models/Cars")

/* CRUD Operation */
/* Read Operation */
/* Get route for the car list */

router.get("/",(req,res,next)=>{
    Car.find((err, carlist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render("car/list",{
                title:" Fast Cars", 
                Carlist: carlist
            })
        }
    });
});

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get("/add",(req,res,next)=> {
    res.render("car/add", {title:"Add Car"})

});
/* Post route for processing the Add-Page -- Create Operation */
router.post("/add",(req,res,next)=> {
    let newCar = Car ({
        "name": req.body.name,
        "speed": req.body.speed,
        "horsepower": req.body.horsepower,
        "transmission": req.body.transmission,
        "weight": req.body.weight,
        "price": req.body.price,
    });
    Car:create(newCar,(err,Car) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect("/car-list");
        }
    });
});

/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation */
router.get("/edit/:id",(req,res,next)=> {
    let id= req.params.id;
    Car.findById(id,(err,bookToEdit) => {
    if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render("car-edit", {title:"Edit Car", car: carToEdit});
        }
    });
});
/* Post route for processing the Edit Operation -- Update Operation */
router.post("/edit/:id",(req,res,next)=> {
    let id = req.params.id;
    let updateCar = Car({
        "_id":id,
        "name": req.body.name,
        "speed": req.body.speed,
        "horsepower": req.body.horsepower,
        "transmission": req.body.transmission,
        "weight": req.body.weight,
        "price": req.body.price
    })
    Car.updateOne({_id:id}, updateCar, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect("/car-list");
        }
    });
});
/* Delete Operation */
/* Get to perform Delete Operation -- Deletion */
router.get("/delete/:id",(req,res,next)=> {
    let id = req.params.id;
    Car.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect("/car-list");
        }
    });
});





module.exports=router;


