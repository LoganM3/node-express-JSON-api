const express = require("express");
const cors = require("cors");
const data = require("./restaurants.json");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(4000, () => console.log("Our API running on 4000"));

app.get("/", (req, res) => {
  res.send("hello class");
});
app.get("/all-restaurants", (req, res) => {
  res.send(data);
});

//add new restaurant
app.post("/add-restaurant", (req, res) => {
data.push(req.body)
const dataJson = JSON.stringify(data)

fs.writeFile('restaurants.json', dataJson, err => console.error(err))
res.send(data)
})

//find and update a restaurant
app.put('/update-restaurant',(req,res) => {
    console.log(req.query)
    const {name} = req.query
    console.log(name)
    // find item to update req.query
    const itemFound = data.find((eachRestaurant) => eachRestaurant.name === name)
   
    const indexOfItem = data.indexOf(itemFound)
   data[indexOfItem] = req.body // overwriting the item with the req.body
    
   
   console.log(itemFound)
   const dataJson = JSON.stringify(data)

   fs.writeFile('restaurants.json', dataJson, err => console.error(err))
   res.send(data)
    //then modify the info

})


//find and delete a restaurant
