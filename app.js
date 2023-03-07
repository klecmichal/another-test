const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

const app = express()
const port = 3000
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "It Food"];
const workItems = [];

app.get('/', (req, res) => {

 let day = date.getDate();
 
  res.render("list", {listTitle: day, newListItems: items
  
});

});


app.post("/", function(req, res) {
  
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
  items.push(item);

  res.redirect("/");
  }
  
  
})

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})