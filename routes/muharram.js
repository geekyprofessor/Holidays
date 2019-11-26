var express = require('express');
var router = express.Router();
var moment = require('moment');

//set holiday metadate here
var metadata = {
  Name: "Muharram",
  FederalHoliday: false,
  Religion: "Muslim", //could be "Christian", "Jewish", "Orthodox", "Muslim", "Hindu" or undefined
  AlternateNames: [] //may contain alternate names for the holiday - for example for Mardi Gras, altername names would be ["Fat Tuesday", "Shrove Tuesday"]
};

//this function is the same for all holidays
router.get('/', function(req, res, next){
  res.json(metadata);
});

router.get('/:year', function(req, res, next) {
  //calculate holiday date here
  var dt = new Date("2019", 7, 31); //set date to 26th of April
  var num=parseInt(req.params.year,10)-2019;
  if(num<0){
num*=-1;
  }
  if(2019>parseInt(req.params.year,10)){
    dt.setDate(dt.getDate()-(num*354))
    console.log(dt.getDate())

    console.log(dt.getFullYear())
  }else if(2019<parseInt(req.params.year)){
    dt.setDate(dt.getDate()+(num*354))
    console.log(dt.getDate())
  }
  //console.log(moment().date())
  //Target Thursday on 4th Week
  var weekOfMonth = dt.getMonth()%7;	// 4th Week 
 // var dayOfWeek = 5;	// Friday
      
 //var first = date.day() <= dayOfWeek ? date.day(dayOfWeek) : date.add(1,"weeks").day(dayOfWeek); //Find first dayOfWeek in month
 // var dt = first.add(weekOfMonth - 1, "weeks").toDate();  //skip forward weekOfMonth - 1 weeks 
 //var dt = new Date(req.params.year, 7, 2); //note: when setting month, 0 = January, 11 = December. 
  //this part of the function should be the same for all holidays 
  var rtrn = { 
    Name: metadata.Name,
    FederalHoliday: metadata.FederalHoliday,
    Religion: metadata.Religion,
    AlternateNames: metadata.AlternateNames,
    ISODate : dt.toISOString().substring(0,10), 
    Month : dt.getMonth() + 1, //returns 1-12
    Day: dt.getDate(), 
    Year: dt.getFullYear(), 
    DayOfWeek: dt.getDay(), //returns 0-6
    DayOfWeekLong: dt.toLocaleDateString('en-US',{ weekday: 'long'}),  
    MonthLong: dt.toLocaleDateString('en-US', { month: 'long'}),
    DayOfWeekShort: dt.toLocaleDateString('en-US',{ weekday: 'short'}),  
    MonthShort: dt.toLocaleDateString('en-US', { month: 'short'})
  };
  res.json(rtrn);
});

module.exports = router;