const express = require("express");

const app = express();

let items = ["Buy Food", "Make Food", "Eat Food"];
let workList = [];

app.set('view engine', 'ejs');

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//current day page logic
app.get("/", function (req, res) {

    let currentDay = new Date().toLocaleString("en", { weekday: "long", day: "numeric", month: "long" });

    res.render("list", { listTitle: currentDay, newItemLists: items });
});

app.post("/", (req, res) => {
    console.log(req.body);
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workList.push(item); res.redirect("/work")
    } else items.push(item);
    res.redirect("/");
});

app.get("/about", (req,res) => res.render("about"));


//work page
app.get("/work", (req, res) => res.render("list", { listTitle: "Work List", newItemLists: workList }));


app.listen(3000, () => console.log("initialized port 3000"));