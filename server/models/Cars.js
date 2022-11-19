let mongoose = require("mongoose");
// create a car model
let carModel = mongoose.Schema({
    name: String,
    speed: String,
    horsepower: String,
    transmission: String,
    weight: String,
    price: String,
    }, 
    {
        collection: "FastCars"
    } 
);
module.exports = mongoose.model('Car', carModel)






