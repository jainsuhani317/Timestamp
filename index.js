// index.js
// where your node app starts

// init project
var moment = require('moment'); // require
moment().format();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  let unix = Date.now();
  let date = new Date();

  //var date = new Date(unix * 1000);
  console.log('date :' + date);
  var day = daysOfWeek[date.getUTCDay()];

  var date_today = date.getUTCDate();

  var month = monthsOfYear[date.getUTCMonth()];

  var year = date.getUTCFullYear();

  var hours = date.getUTCHours();

  var minutes = date.getUTCMinutes();

  var seconds = date.getUTCSeconds();
  console.log('test ' + seconds);

  var time_now = day + ", " + date_today + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds + " GMT";
  res.send({
    unix: parseInt(unix),
    utc: time_now
  });
})

// app.get("/api/:date_string", (req, res) => {
//   let dateString = req.params.date_string;

//   //A 4 digit number is a valid ISO-8601 for the beginning of that year
//   //5 digits or more must be a unix time, until we reach a year 10,000 problem
//   if (/\d{5,}/.test(dateString)) {
//     let dateInt = parseInt(dateString);
//     //Date regards numbers as unix timestamps, strings are processed differently
//     res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
//   } else {
//     let dateObject = new Date(dateString);

//     if (dateObject.toString() === "Invalid Date") {
//       res.json({ error: "Invalid Date" });
//     } else {
//       res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
//     }
//   }
// // });
// app.get("/api/:date", (req, res) => {
//   let strn = req.params['date'];
// // if date is in unix format
//   if ( (/\d{5,}/.test(strn))) {
//     let unix = strn;
//     var date_unix = new Date(+unix);
// console.log(date_unix);
// let day = daysOfWeek[date_unix.getUTCDay()] ;
// let date_today = date_unix.getUTCDate();
// let month= monthsOfYear[date_unix.getUTCMonth()] ;
// let year= (date_unix.getUTCFullYear());
// let hours= ('0'+date_unix.getUTCHours());
// let minutes= ('0'+ date_unix.getUTCMinutes());
// let seconds= ('0'+ date_unix.getUTCSeconds());
// console.log(unix);
// var time_now = day + ", " + date_today + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds + " GMT";
//     res.json({
//       unix: parseInt(unix),
//       utc: time_now
//     })


//   }
//   //if date is in normal format
  
//   else {
//     // var strn1 =  strn.replace(".","-");
//     // var strn2 = strn1.replace(".","-");
//     // var strn3= strn2.replace(".","-");
//     let date_object = new Date(strn);
//     console.log('test', date_object);
//     console.log(strn);
//    let unix = Date.parse((strn));
//     console.log(unix);
//     //var inix= parseInt(unix);
//     //console.log(inix);
//     // if invalid date format
//     if (Number.isNaN(unix)) {
//       console.log('test')
//       res.send({ error: "Invalid Date" })
//     }
// //NB: use + before variable name
// var date_unix = new Date(+unix);
// console.log(date_unix);
// let day = daysOfWeek[date_unix.getUTCDay()] ;
// let date_today = date_unix.getUTCDate();
// let month= monthsOfYear[date_unix.getUTCMonth()] ;
// let year= (date_unix.getUTCFullYear());
// let hours= ('0'+date_unix.getUTCHours());
// let minutes= ('0'+ date_unix.getUTCMinutes());
// let seconds= ('0'+ date_unix.getUTCSeconds());

// var time_now = day + ", " + date_today + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds + " GMT";
//     res.json({
//       "unix": parseInt(unix),
//       "utc": time_now
//     })

// // let dateObject = new Date(strn);

// //     if (dateObject.toString() === "Invalid Date") {
// //       res.json({ error: "Invalid Date" });
// //     } else {
// //       res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
// //     }
//     //res.send('normal date format working')

//   }
  
// })
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  if(dateString==undefined){
    const now = new Date();
    res.json({ unix: now.valueOf(), utc: now.toUTCString() });
  }else if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);
    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
  
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' }); z
});



// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});