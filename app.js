const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const http=require('http');
const socketIO=require('socket.io');
const {generateMessage} = require('./util/message.js');
const {Users}=require('./util/users.js');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static("public"));
let server=http.createServer(app);
let io=socketIO(server);
let users= new Users();
app.get("/",function(req,res){
  res.render('chat');
});



app.get("/index",function(req,res){
  res.render('index');
});


app.get("/:name",function(req,res){
  res.redirect('index');
});


io.on('connection',function(socket){



socket.on('join',(ob,callback)=>{
  if(ob!=null){
    if(ob.room!='undefined'||ob.name!='undefined'){


    socket.join(ob.room[0].split(' ').join(''));
    users.removeUser(socket.id);

    users.addUser(socket.id,ob.username[0],ob.room[0].split(' ').join(''));


    io.to(ob.room[0].split(' ').join('')).emit('updateUsersList',users.getUserList(ob.room[0].split(' ').join('')));
    socket.emit('newMessage',generateMessage('Admin',"Welcome to the chat app"));

    let user=users.getUser(socket.id);
    if(user){
      socket.broadcast.to(user.room).emit('newMessage',generateMessage('Admin', ob.username + " joined the chat"));

    }
    }
  }

});

  socket.on('createMessage',function(message){
    let user=users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
  });


  socket.on('disconnect',()=>{
let user=users.removeUser(socket.id);
 if(user){
   io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
   io.to(user.room).emit('newMessage',generateMessage("Admin", user.name + " has left the chat"));
 }


  });

});

var jsonobj=[
  {
    "Timestamp": "5/1/2020 18:38:49",
    "Name:": "Abhirup Datta",
    "Roll No.:": 1705004,
    "What describes you the best?": "Creative",
    "What is house DENVER to you?": "Gold",
    "Picture:": "https://drive.google.com/open?id=1BDKXWIkl1vnxxtQ6P-KEqsbKTPPC0fP7"
  },
  {
    "Timestamp": "5/1/2020 18:39:13",
    "Name:": "Gurdeep Singh Bhambra",
    "Roll No.:": 1728185,
    "What describes you the best?": "Guruji",
    "What is house DENVER to you?": "Professor",
    "Picture:": "https://drive.google.com/open?id=1M-XrXkHhBIXL4Lz5ToRfFvJimp27TdyW"
  },
  {
    "Timestamp": "5/1/2020 18:39:20",
    "Name:": "Kuntalika Banerjee",
    "Roll No.:": 1704437,
    "What describes you the best?": "Loyal",
    "What is house DENVER to you?": "A book of experiences with good leadership.",
    "Picture:": "https://drive.google.com/open?id=1YZFB31n1kLony7wzXj7JaeWhPzqtS2Y8"
  },
  {
    "Timestamp": "5/1/2020 18:41:38",
    "Name:": "Reetam Nandi",
    "Roll No.:": 1706348,
    "What describes you the best?": "Lazy Bum",
    "What is house DENVER to you?": "House Denver is a fucking Maserati, and everyone wants a Maserati.",
    "Picture:": "https://drive.google.com/open?id=1BfqNtnGjPCJ5WLuV_H8BRMmD2IgBsTQD"
  },
  {
    "Timestamp": "5/1/2020 18:41:42",
    "Name:": "Subhrojyoti Narayan Roy",
    "Roll No.:": 1728175,
    "What describes you the best?": "Ambivert",
    "What is house DENVER to you?": "Currently the best house to be in, since it has a great moderator and a bunch of people who really want to learn and expand their knowledge.",
    "Picture:": "https://drive.google.com/open?id=1noOTvNeIpcQmsZwdiZiEIogDapJX5JUL"
  },
  {
    "Timestamp": "5/1/2020 18:42:00",
    "Name:": "Pragnadeep Bera",
    "Roll No.:": 1705713,
    "What describes you the best?": "Lazy Panda",
    "What is house DENVER to you?": "A car in the ROLLER COASTER.",
    "Picture:": "https://drive.google.com/open?id=1htjT-pYj2J7kEfeLXQRRGGArRWrDY0cJ"
  },
  {
    "Timestamp": "5/1/2020 18:42:17",
    "Name:": "Nandita",
    "Roll No.:": 1705884,
    "What describes you the best?": "introverted phoebe",
    "What is house DENVER to you?": "Sweet sour candy",
    "Picture:": "https://drive.google.com/open?id=1xSVqSLM8ku-YvnQ5FxKD3EhrLw8ujCpE"
  },
  {
    "Timestamp": "5/1/2020 18:42:39",
    "Name:": "Manish Kumar Mathur",
    "Roll No.:": 1705046,
    "What describes you the best?": "Realistic",
    "What is house DENVER to you?": "Opportunity",
    "Picture:": "https://drive.google.com/open?id=1_gc4ck29FObxW8Fn6_kF7_KpH-pdz__S"
  },
  {
    "Timestamp": "5/1/2020 18:42:43",
    "Name:": "Debjit Ghosh",
    "Roll No.:": 1705693,
    "What describes you the best?": "DashinGhost",
    "What is house DENVER to you?": "Denver, the capital of Colorado, is an American metropolis dating to the Old West era.",
    "Picture:": "https://drive.google.com/open?id=1zvzK1WkEfcqDp0p_M5vNxgtIZh_CWaKm"
  },
  {
    "Timestamp": "5/1/2020 18:43:06",
    "Name:": "Nabanita Saha",
    "Roll No.:": 1705801,
    "What describes you the best?": "Kuala bear",
    "What is house DENVER to you?": "Fun learning hub",
    "Picture:": "https://drive.google.com/open?id=1GZGedV5kknDyayatWb9nlbEeguhhEeBo"
  },
  {
    "Timestamp": "5/1/2020 18:43:26",
    "Name:": "Soumya Pramanik",
    "Roll No.:": 1730192,
    "What describes you the best?": "Luke Skywalker",
    "What is house DENVER to you?": "Obi-Wan Kenobi",
    "Picture:": "https://drive.google.com/open?id=1SRHRp5u6rmHLJ2g3_82qzRFDOLrs8br4"
  },
  {
    "Timestamp": "5/1/2020 18:43:43",
    "Name:": "Deep Gaurav Singh",
    "Roll No.:": 1729123,
    "What describes you the best?": "Passionate",
    "What is house DENVER to you?": "New family",
    "Picture:": "https://drive.google.com/open?id=107kit0lZM33PBkmoxG8bgbJ80cbXtEjM"
  },
  {
    "Timestamp": "5/1/2020 18:43:45",
    "Name:": "Ritwik Das",
    "Roll No.:": 1729054,
    "What describes you the best?": "Sarcasm and Humour",
    "What is house DENVER to you?": "Family",
    "Picture:": "https://drive.google.com/open?id=1WKVGVlY_jLC2PuJSjT-hgdLW90XA1e1W"
  },
  {
    "Timestamp": "5/1/2020 18:43:46",
    "Name:": "SURJYODAY KHANRA",
    "Roll No.:": 1704395,
    "What describes you the best?": "I am a fun enthusiast workaholic",
    "What is house DENVER to you?": "My new family",
    "Picture:": "https://drive.google.com/open?id=1el5EggVMGJdoErPDpthwsz0bxCxl5NxA"
  },
  {
    "Timestamp": "5/1/2020 18:43:47",
    "Name:": "Udjapana Mahapatra",
    "Roll No.:": 1729184,
    "What describes you the best?": "Uniqueness",
    "What is house DENVER to you?": "Learning hub",
    "Picture:": "https://drive.google.com/open?id=1uGd-Cus37dzn7P4ova-txaRqaiS8keDT"
  },
  {
    "Timestamp": "5/1/2020 18:43:58",
    "Name:": "Prasheel",
    "Roll No.:": 1705346,
    "What describes you the best?": "PRO",
    "What is house DENVER to you?": "Learn with Interest",
    "Picture:": "https://drive.google.com/open?id=1v1ra3lxZNxDPW90hTYXs-p26u9n7MNfK"
  },
  {
    "Timestamp": "5/1/2020 18:44:04",
    "Name:": "Soubhik Chaki",
    "Roll No.:": 1704225,
    "What describes you the best?": "Bong",
    "What is house DENVER to you?": "Heartbeat",
    "Picture:": "https://drive.google.com/open?id=1klYfuSDEPvB7sGRLpt7iwaaAE_2ObN80"
  },
  {
    "Timestamp": "5/1/2020 18:44:11",
    "Name:": "ANJALI PAUL",
    "Roll No.:": 1704251,
    "What describes you the best?": "hardworking",
    "What is house DENVER to you?": "my supporting group in every problem",
    "Picture:": "https://drive.google.com/open?id=1_s2laoxRZBidrEts_M2pOx4McIV_7820"
  },
  {
    "Timestamp": "5/1/2020 18:44:12",
    "Name:": "Mrutunjoy Mohapatra",
    "Roll No.:": 1704119,
    "What describes you the best?": "Aswathama",
    "What is house DENVER to you?": "It is now second family to me. As we spend alot of hours together. Solving each other doubts and learning is fun with them.",
    "Picture:": "https://drive.google.com/open?id=1Y8djisQRGIlKmdw78UeKlJLJVXjdo7gD"
  },
  {
    "Timestamp": "5/1/2020 18:44:19",
    "Name:": "Aman Kumar",
    "Roll No.:": 1706014,
    "What describes you the best?": "Easy Going",
    "What is house DENVER to you?": "Baseline",
    "Picture:": "https://drive.google.com/open?id=1luPGg5kObHB5U9Erq3jTJ91Y4AJ1oqpB"
  },
  {
    "Timestamp": "5/1/2020 18:44:37",
    "Name:": "Ch Arvind Kumar",
    "Roll No.:": 1728055,
    "What describes you the best?": "Diplomatic",
    "What is house DENVER to you?": "Family",
    "Picture:": "https://drive.google.com/open?id=1ZY0e-ltiTKRfw8ECdi9V3IRYr4P4CbK_"
  },
  {
    "Timestamp": "5/1/2020 18:46:46",
    "Name:": "Piyush Kumar Singh",
    "Roll No.:": 1705150,
    "What describes you the best?": "SantaBanta",
    "What is house DENVER to you?": "Dil de diya hai jan bhi denge",
    "Picture:": "https://drive.google.com/open?id=1MoiGT-hnKSuwaOJ1GejWMg9EG9w5ImRa"
  },
  {
    "Timestamp": "5/1/2020 18:47:00",
    "Name:": "Muskan Gupta",
    "Roll No.:": 1705706,
    "What describes you the best?": "Tenacious",
    "What is house DENVER to you?": "Roller Coaster",
    "Picture:": "https://drive.google.com/open?id=1iVI_VNIHZIjDlXBcxJtPgL88atJCQ18a"
  },
  {
    "Timestamp": "5/1/2020 18:47:55",
    "Name:": "Somya Vardhan",
    "Roll No.:": 1705080,
    "What describes you the best?": "Being genuine",
    "What is house DENVER to you?": "A place for learning.",
    "Picture:": "https://drive.google.com/open?id=1aLWkMLeVhmfKRnngNJbc7FVvxWugaAYk"
  },
  {
    "Timestamp": "5/1/2020 18:48:33",
    "Name:": "Vishal Lala",
    "Roll No.:": 1704484,
    "What describes you the best?": "Ninja Hatori",
    "What is house DENVER to you?": "Hogwarts",
    "Picture:": "https://drive.google.com/open?id=1Fg-ajMrUhSKBqnfp_Dy1cetAezAeAYC_"
  },
  {
    "Timestamp": "5/1/2020 18:49:22",
    "Name:": "Soumava Basu",
    "Roll No.:": 1704638,
    "What describes you the best?": "Mr. Perfection",
    "What is house DENVER to you?": "Family",
    "Picture:": "https://drive.google.com/open?id=1L27HqL8H5XdB1rL1hr8i18Gu0VEPMumt"
  },
  {
    "Timestamp": "5/1/2020 18:57:44",
    "Name:": "Rajarshi Paul",
    "Roll No.:": 1707386,
    "What describes you the best?": "Napoleon",
    "What is house DENVER to you?": "World-Class",
    "Picture:": "https://drive.google.com/open?id=11UG_VDHMkWRDzlRaVFU3ElNKE2E959wg"
  },
  {
    "Timestamp": "5/1/2020 18:58:52",
    "Name:": "Madhurima Majumder",
    "Roll No.:": 1704439,
    "What describes you the best?": "Cuttlefish",
    "What is house DENVER to you?": "Regiment",
    "Picture:": "https://drive.google.com/open?id=1XJQ0IN27Ms4HK08HkO1JTQ4QNK0Aiq5J"
  },
  {
    "Timestamp": "5/1/2020 18:59:35",
    "Name:": "Srinjan Roy",
    "Roll No.:": 1730130,
    "What describes you the best?": "Dependable",
    "What is house DENVER to you?": "Helpline Number",
    "Picture:": "https://drive.google.com/open?id=15AoAtHqP1hz4NNooWjN1RHDKqyaI0kBz"
  },
  {
    "Timestamp": "5/1/2020 19:00:49",
    "Name:": "Mallika",
    "Roll No.:": 1706420,
    "What describes you the best?": "Bubbly",
    "What is house DENVER to you?": "A group of enthusiasts.",
    "Picture:": "https://drive.google.com/open?id=18AqexhGFcJh0kyUUDHxjplt-0lOsdTaK"
  },
  {
    "Timestamp": "5/1/2020 19:01:19",
    "Name:": "Aditya Singh",
    "Roll No.:": 1705009,
    "What describes you the best?": "Potterhead",
    "What is house DENVER to you?": "Interns'  Lair",
    "Picture:": "https://drive.google.com/open?id=1A7YzVWenJutwHo25bLnwNzJVXpxvi7ml"
  },
  {
    "Timestamp": "5/1/2020 19:03:05",
    "Name:": "Ayush Tandon",
    "Roll No.:": 1707020,
    "What describes you the best?": "Upbeat",
    "What is house DENVER to you?": "A home where i am virtually present  with people full of knowledge",
    "Picture:": "https://drive.google.com/open?id=1-SWQGS2_NY5po9oWJtwNFckAWJmkDSzg"
  },
  {
    "Timestamp": "5/1/2020 19:04:48",
    "Name:": "Megha Debnath",
    "Roll No.:": 1705244,
    "What describes you the best?": "Enthusiastic",
    "What is house DENVER to you?": "A place filled with opportunities!",
    "Picture:": "https://drive.google.com/open?id=1W3HhUKGFloOs5t8SoZNmXN3IkjOHUTeF"
  },
  {
    "Timestamp": "5/1/2020 19:05:13",
    "Name:": "Shiwangi Sinha",
    "Roll No.:": 1730121,
    "What describes you the best?": "Eclectic",
    "What is house DENVER to you?": "Most helpful Maven.",
    "Picture:": "https://drive.google.com/open?id=1R4OZaOD1foK5YaOrtLlVJxE4tiDSHORF"
  },
  {
    "Timestamp": "5/1/2020 19:06:53",
    "Name:": "Akash Kumar",
    "Roll No.:": 1706105,
    "What describes you the best?": "The Professor character from the money heist.",
    "What is house DENVER to you?": "Everything",
    "Picture:": "https://drive.google.com/open?id=1DBzk1R7rkGpEpqdjIGn3Iasxj3e0-O7c"
  },
  {
    "Timestamp": "5/1/2020 19:07:11",
    "Name:": "Sneha Chakraborty",
    "Roll No.:": 1728172,
    "What describes you the best?": "Punctuality",
    "What is house DENVER to you?": "A Great new experience",
    "Picture:": "https://drive.google.com/open?id=1QEcmBKoxjwn-Rlvb5_wL8OQCM0SOwt6y"
  },
  {
    "Timestamp": "5/1/2020 19:07:38",
    "Name:": "Ujjwal Kumar",
    "Roll No.:": 1706376,
    "What describes you the best?": "Mortiest Morty",
    "What is house DENVER to you?": "Work and fun space",
    "Picture:": "https://drive.google.com/open?id=1EC0aL5vIxrZvU9xstNMws3nxqzzsM8Ss"
  },
  {
    "Timestamp": "5/1/2020 19:08:34",
    "Name:": "SAMARTH JAJODIA",
    "Roll No.:": 1728178,
    "What describes you the best?": "Let's Talk Design",
    "What is house DENVER to you?": "A house that keeps the family together. Meetings! Lot of good meetings!",
    "Picture:": "https://drive.google.com/open?id=1aaXle8E66GEf7rKUcCVRtMk32yKRUOXF"
  },
  {
    "Timestamp": "5/1/2020 19:09:43",
    "Name:": "Bhoomi",
    "Roll No.:": 1706497,
    "What describes you the best?": "Blissful",
    "What is house DENVER to you?": "House denver is like piecing together a jigsaw puzzle",
    "Picture:": "https://drive.google.com/open?id=1B1EQSs0gxO4KuvGGhznFnl1mD3WLtCiQ"
  },
  {
    "Timestamp": "5/1/2020 19:11:17",
    "Name:": "Upasana Dey",
    "Roll No.:": 1729249,
    "What describes you the best?": "Eccentric",
    "What is house DENVER to you?": "My present and future work space",
    "Picture:": "https://drive.google.com/open?id=1vCAdRDZ5Os8kuDe1LnkB8H8-rsm_6Jwx"
  },
  {
    "Timestamp": "5/1/2020 19:12:45",
    "Name:": "Somesh Manna",
    "Roll No.:": 1705745,
    "What describes you the best?": "Passionate coder always inclined towards learning new things",
    "What is house DENVER to you?": "A journey to Mars",
    "Picture:": "https://drive.google.com/open?id=1aJc2O8eEd8qxRZzeduSP-WNuUo7OiSUu"
  },
  {
    "Timestamp": "5/1/2020 19:12:58",
    "Name:": "Rajanya Lahiri",
    "Roll No.:": 1728081,
    "What describes you the best?": "Hardworking",
    "What is house DENVER to you?": "Solution to my problems",
    "Picture:": "https://drive.google.com/open?id=1yhKNWkFNstocIn1Q5V0Du6i9Qu9nCIKr"
  },
  {
    "Timestamp": "5/1/2020 19:13:04",
    "Name:": "Chhaya",
    "Roll No.:": 1706127,
    "What describes you the best?": "I am result oriented and I strive hard to accomplish the milestone I set for myself with not give up attutude.",
    "What is house DENVER to you?": "Virtual house away from college is Denver. We don't feel like we are really not in college together,just the medium has changed.we have conversations together ,discuss end number of topics,daily updates and our moderator Shreyansh has big role in making this place happening.",
    "Picture:": "https://drive.google.com/open?id=1vlzVR81oOdC_cH4ZdoM0bqPlADZ8PvIN"
  },
  {
    "Timestamp": "5/1/2020 19:14:40",
    "Name:": "VIKASH KUMAR BHUSHAN",
    "Roll No.:": 1705093,
    "What describes you the best?": "Friendly",
    "What is house DENVER to you?": "A House to enter in new World.",
    "Picture:": "https://drive.google.com/open?id=17nP6PowSqO_U7IpFS4t9oHm-mHr4Sh0v"
  },
  {
    "Timestamp": "5/1/2020 19:15:12",
    "Name:": "Saurav Sinha",
    "Roll No.:": 1705266,
    "What describes you the best?": "StraightForward as Denver!",
    "What is house DENVER to you?": "Heart<3",
    "Picture:": "https://drive.google.com/open?id=1K1NoVmfOaH2hmjiCVi5lepPpv4mI7LDC"
  },
  {
    "Timestamp": "5/1/2020 19:16:21",
    "Name:": "Rahul Ghosh",
    "Roll No.:": 1706523,
    "What describes you the best?": "Righteous",
    "What is house DENVER to you?": "The only source of duty and distraction from the lockdown",
    "Picture:": "https://drive.google.com/open?id=1So0wwEzOjtCp-irnacDKzaZWZ7fjLw_C"
  },
  {
    "Timestamp": "5/1/2020 19:17:40",
    "Name:": "Anirban Dutta",
    "Roll No.:": 1706111,
    "What describes you the best?": "Inquisitive, shy",
    "What is house DENVER to you?": "House Denver when I first joined the group was just a group but now they are friends.Everyone is so helpful the seniors, my fellow goup mates all are so hard working and helpful",
    "Picture:": "https://drive.google.com/open?id=1h5VBlSzMSkeEZHr6-Vdb-emeCa3Im7VE"
  },
  {
    "Timestamp": "5/1/2020 19:18:09",
    "Name:": "Amit Gupta",
    "Roll No.:": 1705766,
    "What describes you the best?": "I am the one which shines in dark",
    "What is house DENVER to you?": "Everything",
    "Picture:": "https://drive.google.com/open?id=1lbaV5dlNV4IMe8hfYx5FTCutGuzf_ZDP"
  },
  {
    "Timestamp": "5/1/2020 19:18:13",
    "Name:": "Pronoto Datta",
    "Roll No.:": 1706247,
    "What describes you the best?": "Netflix and food. Change my mind",
    "What is house DENVER to you?": "It's my hypothetical incubator",
    "Picture:": "https://drive.google.com/open?id=1-wN3tYGXfQwkicnWKS8LQDDBnycOmQPF"
  },
  {
    "Timestamp": "5/1/2020 19:20:00",
    "Name:": "Prashant Kumar Sinha",
    "Roll No.:": 1706066,
    "What describes you the best?": "Inquisitive",
    "What is house DENVER to you?": "Cordial",
    "Picture:": "https://drive.google.com/open?id=1smnX_ToYq9yIUUnMu1J6heHw8yikHmeY"
  },
  {
    "Timestamp": "5/1/2020 19:20:18",
    "Name:": "Amit Gupta",
    "Roll No.:": 1705766,
    "What describes you the best?": "I am the one who shines in dark..",
    "What is house DENVER to you?": "A place where  we can entertain ourselve",
    "Picture:": "https://drive.google.com/open?id=1Srb29xDWS7_pKzIdIWJvRsZrL2eCPQJe"
  },
  {
    "Timestamp": "5/1/2020 19:22:51",
    "Name:": "Biplav Adhikary",
    "Roll No.:": 1706124,
    "What describes you the best?": "I love anime",
    "What is house DENVER to you?": "A flight to the destination",
    "Picture:": "https://drive.google.com/open?id=13pOYeFKBlGR-oeILp-FJKpVJIyEAPIYT"
  },
  {
    "Timestamp": "5/1/2020 19:26:21",
    "Name:": "Abhishek Agarwal",
    "Roll No.:": 1705895,
    "What describes you the best?": "Captain America",
    "What is house DENVER to you?": "It's has become my breakfast, lunch and dinner.",
    "Picture:": "https://drive.google.com/open?id=1egOge7AG-PV04fpgcr6JAhia6oxLo92d"
  },
  {
    "Timestamp": "5/1/2020 19:27:31",
    "Name:": "Ayush Jaipuriar",
    "Roll No.:": 1705225,
    "What describes you the best?": "Calm",
    "What is house DENVER to you?": "A lot.",
    "Picture:": "https://drive.google.com/open?id=1MmQE4VFQkyNLegP0mO6qdZr7DufEot6R"
  },
  {
    "Timestamp": "5/1/2020 19:33:29",
    "Name:": "Jashim",
    "Roll No.:": 1704685,
    "What describes you the best?": "Cheerful and trustworthy",
    "What is house DENVER to you?": "Family",
    "Picture:": "https://drive.google.com/open?id=1hDARglMS3hzJdkcb3e3-2LEgnDvYWWEO"
  },
  {
    "Timestamp": "5/1/2020 19:34:22",
    "Name:": "MOHIT KUMAR",
    "Roll No.:": 1706595,
    "What describes you the best?": "Dr. strange",
    "What is house DENVER to you?": "Addiction- Even if i want skip any moment, but i can't",
    "Picture:": "https://drive.google.com/open?id=1Yx9goFJG6rmO05XuU1ID8I_fuKyKqjyS"
  },
  {
    "Timestamp": "5/1/2020 19:37:58",
    "Name:": "Lakshmi Srivastava",
    "Roll No.:": 1705412,
    "What describes you the best?": "Lion",
    "What is house DENVER to you?": "Haasy Paasy",
    "Picture:": "https://drive.google.com/open?id=1hVtmPLJuf24cGP8cnxK3iv5h-RB-qOT6"
  },
  {
    "Timestamp": "5/1/2020 19:39:26",
    "Name:": "Bhavya Mishra",
    "Roll No.:": 1805959,
    "What describes you the best?": "obedient and athletic",
    "What is house DENVER to you?": "Learning and having fun",
    "Picture:": "https://drive.google.com/open?id=1zgbEl1HnWr1GbA4iOpNrfzHVL2mEMxST"
  },
  {
    "Timestamp": "5/1/2020 19:39:47",
    "Name:": "Abhishek Kumar",
    "Roll No.:": 1705287,
    "What describes you the best?": "Done",
    "What is house DENVER to you?": "My Internship group",
    "Picture:": "https://drive.google.com/open?id=12QG0xExXlZev6_1M9kKR8y9J8gtcOTLp"
  },
  {
    "Timestamp": "5/1/2020 19:40:09",
    "Name:": "Ashish Gupta",
    "Roll No.:": 1705739,
    "What describes you the best?": "I would describe myself as some one who is calm , motivated , oriented towards technology or tech savy , organised and a team player and a guy who is often found clicking random pictures of objects of my interest.",
    "What is house DENVER to you?": ".",
    "Picture:": "https://drive.google.com/open?id=1f3c0jt9HUeHrJMusrDVU_xx5UFr8DOLa"
  },
  {
    "Timestamp": "5/1/2020 19:41:48",
    "Name:": "Karuna Kumari",
    "Roll No.:": 1705604,
    "What describes you the best?": "Dedicated Kind Disciplined",
    "What is house DENVER to you?": "Something which has got a lot in store to teach me.",
    "Picture:": "https://drive.google.com/open?id=1V17xNZkDxv-bcKvQMGjTQbJw54wLOJWq"
  },
  {
    "Timestamp": "5/1/2020 20:16:39",
    "Name:": "Ashish Gupta",
    "Roll No.:": 1705739,
    "What describes you the best?": "I would describe myself as some one who is calm , motivated , oriented towards technology or tech savy , organised and a team player and a guy who is often found clicking random pictures of objects of my interest.",
    "What is house DENVER to you?": "Family ❤",
    "Picture:": "https://drive.google.com/open?id=1Nzxp-78FeIorlBtHrAfhrXDVm0P65-yF"
  },
  {
    "Timestamp": "",
    "Name:": "Anukriti Chatterjee",
    "Roll No.:": 1705116,
    "What describes you the best?": "Memes",
    "What is house DENVER to you?": "Lockdown buddy",
    "Picture:": "https://drive.google.com/open?id=1anDbEm-JnBtKXudwRpGAteGXpi-dmvpr"
  }
];
app.get('/getjson',function(req,res){
  res.send(jsonobj);
});
server.listen(process.env.PORT||3000,function(){
  console.log("server is started on port 3000");
});
