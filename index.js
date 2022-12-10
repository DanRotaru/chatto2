const fs = require('fs')
const express = require('express')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
    console.log('\x1b[32m%s\x1b[0m', `» http://localhost:${port}`);
    // console.log('\x1b[32m%s\x1b[0m', `Done..`);
})

//Allow access to all cors
let cors = {}, all = true;
if(all){
    cors = {
        cors: {
            origin: '*',
        }
    };
}

const io = require('socket.io')(server, cors);
const path = require('path')
const cookieSession = require('cookie-session')
app.use(cookieSession({
    name: 'chatto',
    keys: ['DAN_CHATTO_KEY'],
    secret: 'DAN_CHATTO_SECRET',
    httpOnly: false,
    SameSite: 'None',
    // secure: true,
    // domain: ['localhost', 'youtube.com'],
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
}))


// ejs engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', true);

// app.use(express.static('public'));
app.use(express.static('public', {
    setHeaders: function (res, path) {
        if(path.indexOf('public\\assets\\garage\\viewer.js') == -1){
            res.set("Cache-Control", "public, max-age=86400");
        }
    }
}))
// app.use(function (req, res, next) {
//     res.header("content-type", 'text/html; charset=UTF-8');
//     next();
// });


var preventMultiRequest = 0;
app.use('/api/', async (req, res, next) => {
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    if(req.method == "POST"){
        if(preventMultiRequest > Date.now()){
            res.end();
            return false;    
        }
        preventMultiRequest = Date.now() + 200;
    }
    next();
});



//database connection
const db_connection = require('./src/db/connection.js')
const Users = require('./src/models/Users');
const Session = require('./src/models/Session.js');

//Routing
const AuthRoute = require('./src/routes/auth')
const RegRoute = require('./src/routes/reg')
const LogoutRoute = require('./src/routes/logout')
const DB_Route = require('./src/routes/db_route')
const Garage_Route = require('./src/routes/garage')
const OnlineRoute = require('./src/routes/online')
const RatingsRoute = require('./src/routes/ratings')
const ShopRoute = require('./src/routes/shop')
const ClansRoute = require('./src/routes/clans')
const SettingsRoute = require('./src/routes/settings')
const TasksRoutes = require('./src/routes/tasks')
const PromoRoutes = require('./src/routes/promocode')
const ProfileRoute = require('./src/routes/profile')
const DonationRoute = require('./src/routes/donation')


LogoutRoute.logout(io);
RegRoute.register(io);
Garage_Route.buyItem(io);
Garage_Route.install_route(io);
Garage_Route.send_gift(io);
Garage_Route.openCase(io);
ShopRoute.buy(io);
ClansRoute.create(io);
ClansRoute.donate(io);
ClansRoute.leave(io);
PromoRoutes.activate(io);
TasksRoutes.getReward(io);

app.use(
    AuthRoute, 
    RegRoute.router, 
    LogoutRoute.router,
    DB_Route, 
    Garage_Route.router, 
    OnlineRoute, 
    RatingsRoute, 
    ShopRoute.router, 
    ClansRoute.router,
    SettingsRoute,
    TasksRoutes.router,
    PromoRoutes.router,
    ProfileRoute,
    DonationRoute
);

// Запрещаю заходить другим пользователям кроме списка
// const ipWhiteList = ['::1', '::ffff:127.0.0.1', '185.64.236.180', '54.77.11.85', '54.246.246.223'];
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    // let ip = req.ip?.toString();
    // if(!ipWhiteList.includes(ip)){
    //     res.end(`Denied for ${ip}`);
    //     return;
    // }
    next();
});

var dbConnectionOK = false;
db_connection(async () => {
    dbConnectionOK = true;
    // Создаём конфиг если нет
    const Config = require('./src/models/Config');
    let check = await Config.findOne({created: 1}, {created: 1});
    if(!check){
        let config = new Config({});
        await config.save();
        return true;
    }
})

const getRank = require('./src/data/Ranks')
const {number_format} = require('./src/helpers')
const { userExists, getUserInfo } = require('./src/db/index')

var auth = false;

// index page
app.get('/', async function (req, res) {
    if(!dbConnectionOK){
        res.status(500).send("Database error!");
        return;
    }
    if (typeof req.session.auth == "undefined") res.render('pages/login');
    else {
        if(await userExists(req.session.auth)){
            auth = await req.session.auth;
            let info = await getUserInfo(auth, {id: 1, login: 1, score: 1, vip: 1, howmuch: 1, group: 1, kry: 1, coin: 1, tasks: 1, settings: 1}, 1);
            
            let rank = getRank(info.score, 4, info.vip);
            let rank_id = rank.idV;

            let cssModified = Math.floor(fs.statSync("./public/css/index.css").mtimeMs);
            let jsModified = Math.floor(fs.statSync("./public/js/index.js").mtimeMs);

            let Garages = require('./src/models/Garages');

            let getTurret = require('./src/data/Turrets').getTurret
            let getHull = require('./src/data/Hulls').getHull
            let getPaint = require('./src/data/Paints').getPaint


            let myGarage = await Garages.findOne({login: info.login});
            let installed_turret = myGarage.turret,
                installed_hull = myGarage.hull,
                installed_paint = myGarage.paint;
            
            let turret_m = myGarage[installed_turret] || 0;
            let hull_m = myGarage[installed_hull] || 0;

            installed_turret = getTurret(turret_m, installed_turret, 'img');
            installed_hull = getHull(hull_m, installed_hull, 'img');
            let paint = getPaint(installed_paint);
            let paintV = '../' + paint.imageV;
            installed_paint = paint.image;

            let p = JSON.parse(JSON.stringify(paint));
            let animated = {
                animated: 0,
                frameWidth: 0,
                frameHeight: 0,
                fps: 0,
                numFrames: 0
            }
            if(p.d){
                let d = p.d.split(",");
                animated.animated = 1;
                animated.frameWidth = d[0];
                animated.frameHeight = d[1];
                animated.fps = d[2];
                animated.numFrames = d[3];
            }

            // delete installed_hull['have'];
            // delete installed_hull['price'];
            // delete installed_hull['name1'];
            // delete installed_hull['description'];

            // let installed_Turret = aGarages.

            // Turrets.getTurret(Turret)

            // const userGarage = await Garages.findOne({login: info.login});
            // console.log(userGarage);

            let earning = info.howmuch.split("|").map(Number);
            let earning_sys = {
                kry: 100,
                score: 5
            }
            let earning_cry = earning_sys.kry + earning[0] + earning[1];
            let earning_score = earning_sys.score + earning[2];

            let online = await Session.distinct('id_session');
            online = online.length;

            let shop = require("./src/data/Shop-items");
        
            let settings = '';
            if(info.settings){
                settings = JSON.parse(JSON.stringify(info.settings));
                delete settings._id;
            }
            
            res.render('pages/index', {
                info: {
                    id: info.id,
                    group: info.group,
                    kry: info.kry,
                    coin: info.coin,
                    login: info.login,
                    earning: {
                        system_kry: earning_sys.kry,
                        system_score: earning_sys.score,
                        score: earning_score,
                        cry: earning_cry,
                        turrets: earning[0],
                        hulls: earning[1],
                        paints: earning[3],
                        drones: earning[2]
                    },
                    hasTasks: +(typeof info.tasks != "undefined" && info.tasks.length > 0),
                    settings: settings,
                },
                rank: {
                    id: rank.id,
                    _id: rank_id,
                    score: rank.score,
                    name: rank.name,
                    next: rank.needle,
                    prev: rank.prev,
                    vip: info.vip,
                    progress: rank.progress
                },
                installed: {
                    turret: installed_turret,
                    hull: installed_hull,
                    paint: installed_paint,
                    paintV: paintV,
                    animated: animated
                },
                fstime: {
                    css: cssModified,
                    js: jsModified
                },
                online: online,
                // garage: {
                //     Turrets: Turrets,
                //     Hulls: Hulls,
                //     Paints: Paints,
                //     me: myGarage
                // },
                token: auth,
                shop: shop
            });
        }
        else res.render('pages/login');
    }
});


const resp = require('./src/routes/resp')
app.use((req, res, next) => {
    resp(res, 404);
    next();
});


const socketInstance = require('./src/socket/socketInstance');
io.on('connection', async (socket) => socketInstance(socket, io));