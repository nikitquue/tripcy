const express = require('express');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const {promisify} = require('util');
const mongoose = require('mongoose');
const mailer = require('./mailer');
const Guide = require('./models/guide');
const Tour = require('./models/tour');
const Sight = require('./models/sight');
const Event = require('./models/event');
const Group = require('./models/group');
const User = require('./models/registeredUser');
const Handlebars =  require('handlebars');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const app = express();
const jsonParser = express.json();

const MONGODB_URI = "mongodb+srv://admin:admin@kharkivtours-o4qaw.mongodb.net/tripcy?retryWrites=true&w=majority"

/*const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
app.use(bodyParser.json())

const sessionHandler = require(./public/JS/session_handler.js)

app.use(cookieParser())

app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret'
}))

//app.get('/', (req, res)=>{
  //  res.sendFile(path.join(__dirname, 'index.html'))
//})

app.post('/user/login/vali', async (req, res)=>{
    
    const userEmail = req.body.email
    const userPwd = req.body.password
    const user = await User.findOne({email: userEmail, password: userPwd})

    let user_name = null
    if(user!=null){
        req.session.username = user.name
        user_name = user.name
        let result = {name: user_name}
        res.send(result)
    } else{
        res.status(401).send('Login or password error')'
    }
});

app.get('/check', (req, res)=>{
    if(req.session.username){
        res.set('Content-Type', 'text/html')
        res.send('<h2>User ' + req.session.username + ' is logged in! </h2>')
    } else {
        res.send('not logged in')
    }
})

*/
const session = require('express-session')
const mongo_store = require('connect-mongo')(session)

app.use(session({
    secret: "ilove&water!",
    resave: false,
    saveUninitialized: false,
    store: new mongo_store({
        url: "mongodb+srv://admin:admin@kharkivtours-o4qaw.mongodb.net/tripcy"
    })
}))

app.post("/login", jsonParser, async (req, res)=>{
    if(req.session.user)
        res.redirect("/")
    
    const user = await User.findOne({email: req.body.email, password: req.body.password})
    if(user){
        req.session.user = {email: user.email, name: user.name}
        res.redirect("/")
    }
})

app.post("/signup", jsonParser, (req, res)=>{
    const user = User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.passw,
        phone: req.body.phone
    })

    req.session.user = {email: user.email, name: user.name}
    res.redirect("/")
})

app.post("/logout", (req, res)=>{
    if(req.session.user)
        delete req.session.user
    res.redirect("/")
})

app.get("/logged", (req, res)=>{
    if(req.session.user)
        res.send("User is logged!")
})

const sight_img_dir = "./public/Images/sights";
const tour_img_dir = "./public/Images/tours";
const guide_img_dir = "./public/Images/guides";

let sight_storage = multer.diskStorage({
    destination: (req, file, cb)=>{
    cb(null, sight_img_dir);
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

let tour_storage;

let guide_storage = multer.diskStorage({
    destination: (req, file, cb)=>{
    cb(null, guide_img_dir);
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

let upload_sight = multer({storage: sight_storage})

let upload_guide = multer({storage: guide_storage})

app.set("view engine", "hbs")

app.engine("hbs", expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

hbs.registerPartials(__dirname + "/views/partials")
app.use(express.static(__dirname + "/public"))

app.post("/admin/add/sight", upload_sight.single('image'), (req, res)=>{
    const file = req.file
    const s = Sight({
        title: req.body.title,  
        description: req.body.desc,   
        image: file.originalname.substring(0, file.originalname.length-4)
    })
    s.save()
    res.redirect('/admin')
})

app.post("/admin/add/guide", upload_guide.single('image'), (req, res)=>{
    const file = req.file
    const g = Guide({
    name: req.body.name,   
    surname: req.body.surname,
    description: req.body.desc,
    password:req.body.password,
    email:req.body.email,
    phone:req.body.phone,    
    image: file.originalname
    })
    console.log(g)
    g.save()
    res.redirect('/admin')
})


app.post("/admin/add/sight/vali", jsonParser, async(req, res)=>{

    const nameS = req.body.title
    const nameF = req.body.fileName
    const sight = await Sight.findOne({title: nameS})
    const files = await Sight.findOne({image: nameF})

    let sight_title = null
    let sight_image = null
    if(sight!=null)
        sight_title = sight.title
    if(files!=null)
        sight_image = files.image
    let result = {
        title: sight_title,
        img: sight_image
    }
    console.log(result)
    res.send(result)

})

app.post("/admin/add/tour", jsonParser, async(req,res)=>{

    let new_tour = Tour({
        title: req.body.title,
        description: req.body.description,
        distance: req.body.distance,
        duration: req.body.duration,
        sights: req.body.sights,
        meetPoint: req.body.meeting,
        adress: req.body.adress,
        image: "",
        image360: req.body.image360
    })

    const image_to_tour = await Sight.findOne({title: new_tour.sights[0]}, {_id:0, image: 1})

    new_tour.image = image_to_tour.image
    new_tour.save()
})

app.post("/admin/add/event", jsonParser, async (req, res)=>{


    let new_event = Event({
        tour: req.body.title,
        guide: req.body.guide,
        date: req.body.date,
        time: req.body.time,
        group: req.body.group,
        counter: 0
    })

    new_event.save()
    res.redirect("/admin")
})

app.delete("/admin/delete/sight/:title", async (req, res)=>{
    const title = req.params.title
    const sight = await Sight.findOne({title: title}, {_id:0, image:1})
    await Sight.findOneAndDelete({title: title})
    fs.unlink(sight_img_dir + "/" + sight.image + ".jpg", (err)=> {
        if (!err)
            console.log('file deleted')
    })
})

app.delete("/admin/delete/guide/:id", async (req, res)=>{
    const id = req.params.id
    const g = await Guide.findOne({_id: id}, {_id: 0, image: 1})
    await Guide.findOneAndDelete({_id: id})
    fs.unlink(guide_img_dir + "/" + g.image, (err)=> {
        if (!err)
            console.log('file deleted')
    })
})

app.get("/admin/data/sight/:title", async (req, res)=>{
    const name = req.params.title
    const sight = await Sight.findOne({title: name})
    res.send({title: sight.title, description: sight.description})
})

app.post("/admin/update/sight/:sight_to_update", jsonParser, async (req,res)=>{
    const name = req.params.sight_to_update
    if(!JSON.stringify(req.body.image) == "{}"){
        const old_sight = await Sight.findOne({title: name})
        fs.unlink(sight_img_dir + "/" + old_sight.image + ".jpg", (err)=> {
            if (!err)
                console.log('file deleted')
            else{
                console.log("File didnt deleted")
            }
        })
        //await Sight.findOneAndUpdate({title: name}, {image: req.file.originalname.substring(0, req.file.originalname.length-4)})
    }

    //const sight = await Sight.findOneAndUpdate({title: name}, {title: req.body.new_title, description: req.body.new_desc}, {new: true})
    //res.send({title: sight.title, description: sight.description})
    
})


app.post("/user/register",jsonParser, async (req, res)=>{
    const user = User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.passw,
        phone: req.body.phone
    })

    console.log(req.body.userName)
    console.log(req.body.userEmail)

    user.save()
})

app.post("/user/register/vali", jsonParser, async(req, res)=>{

    const userEmail = req.body.email
    const user = await User.findOne({email: userEmail})

    let user_email = null
    if(user!=null)
        user_email = user.email
    let result = {email: user_email}
    res.send(result)
})


app.post("/feedback", jsonParser, (req, res)=>{
    if(req.body){
        mailer.send(req.body.name, req.body.mail, req.body.text)
    }
    else
        console.log("Error!")
})


app.use("/admin", async (req, res)=>{

    const tours = await Tour.find({})
    const guides = await Guide.find({})
    const sights = await Sight.find({})
    const groups = await Group.find({})

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
        events,
        groups
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

mongoose.connect(MONGODB_URI || "mongodb+srv://admin:admin@kharkivtours-o4qaw.mongodb.net/tripcy", { 
    useNewUrlParser: true, 
    useFindAndModify: false 
}, ()=>{
    app.listen(process.env.PORT || 3000, (err)=>{
        if(!err)
            console.log("Server has been started!")
    })
})

