const express = require('express')
const fs = require('fs')
const {promisify} = require('util')
const mongoose = require('mongoose')
const mailer = require('./mailer')
const Guide = require('./models/guide')
const Tour = require('./models/tour')
const Sight = require('./models/sight')
const Event = require('./models/event')
const Group = require('./models/group')
const Handlebars =  require('handlebars')
const expressHbs = require('express-handlebars')
const hbs = require('hbs')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const jsonParser = express.json()


app.set("view engine", "hbs")

app.engine("hbs", expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

hbs.registerPartials(__dirname + "/views/partials")
app.use(express.static(__dirname + "/public"))



app.post("/feedback", jsonParser, (req, res)=>{
    if(req.body){
        mailer.send(req.body.name, req.body.mail, req.body.text)
        console.log("Message has been sent!")
    }
    else
        console.log("Error!")
})

app.use("/admin", async (req, res)=>{

    const tours = await Tour.find({})
    const guides = await Guide.find({})
    const sights = await Sight.find({})
    let events = await Event.find({})
    let buff, gr
    for(i=0; i<events.length; i++){
         buff = await Tour.findOne({title: events[i].tour}, {_id: 0, sights: 1, adress: 1, description: 1, image: 1})
         gr = await Group.findOne({title: events[i].group}, {_id: 0, title: 1, cost: 1})
         events[i]['sights'] = buff.sights
         events[i]['adress'] = buff.adress
         events[i]['description'] = buff.description
         events[i]['image'] = buff.image
         switch (gr.title){
            case 'Індивідуальна':
                events[i]['groupType'] = gr.title + ' (1-5)'
                break;
            case 'Маленька':
                events[i]['groupType'] = gr.title + ' (6-20)'
                break;
            case 'Велика':
                events[i]['groupType'] = gr.title + ' (21-40)'
                break;
         }
         events[i]['cost'] = gr.cost
    }
    
    res.render("admin",{
        title: "Tripcy - admin page",
        tours,
        guides,
        sights,
        events
    })
})

app.use("/tours", async (req, res)=>{      
    let name = req.query.title
   
    const tour = await Tour.findOne({title: name})
    let _sights = tour.sights
    let sights = []
    for(i=0; i<_sights.length; i++){
        sights[i] = await Sight.findOne({title: _sights[i]})
    }

    
    res.render("tour",{
        title: "Tripcy - " + tour.title,
        tour,
        sights
    })
})


app.use("/map", (req, res)=>{
    res.render("map",{
        title: "Tripcy - map",
        activeM: "active"
    })
})

app.use("/schedule", (req, res)=>{
    res.render("schedule",{
        title: "Tripcy - schedule",
        activeS: "active"
    })
})

app.use("/guides", async (req, res)=>{
    const guides = await Guide.find({})
    res.render("guides",{
        title: "Tripcy - guides",
        activeG: "active",
        guides
    })
})

app.use("/", (req, res)=>{
    res.render("home",{
        title: "Tripcy - grand tour guides"
    })
})

/*app.get("/", (req, res)=>{
    const g = Tour({
        title:"Без чого Харків – не Харків",

        description:"Кожне місто має свої головні визначні пам'ятки, які створюють образ цього міста, за якими люди уявляють собі це місто. Ця екскурсія як раз про це. На ній ви пройдете шлях за всіма основними місцями Харкова.",

        distance:1.6,

        duration:1,

        sights:[0,1,2,3],

        meetPoint:"https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2564.282413474863!2d36.22770156510478!3d50.00606167941652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LTQtdGA0LbQv9GA0L7QvA!5e0!3m2!1sru!2sua!4v1590744467417!5m2!1sru!2sua"
    })

    g.save()
})*/


mongoose.connect("mongodb+srv://admin:admin@kharkivtours-o4qaw.mongodb.net/tripcy", { useNewUrlParser: true }, (err)=>{
    app.listen(3000, ()=>{
        console.log("Server has been started...")
    })
})