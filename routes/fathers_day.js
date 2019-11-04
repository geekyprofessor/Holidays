var express = require('express');
var router = express.Router();
var moment = require('moment');

//set holiday metadate here
var metadata = {
  Name: "Father's Day",
  FederalHoliday: false,
  Religion: undefined, //could be "Christian", "Jewish", "Orthodox", "Muslim", "Hindu" or undefined
  AlternateNames: [] //may contain alternate names for the holiday - for example for Mardi Gras, altername names would be ["Fat Tuesday", "Shrove Tuesday"]
};

//this function is the same for all holidays
router.get('/', function(req, res, next){
  res.json(metadata);
});

router.get('/:year', function(req, res, next) {
  //calculate holiday date here
  var date = moment(new Date(req.params.year, 5, 1)); //set date to 1st of June
  //Target Thursday on 3rd Week
  var weekOfMonth = 3;	// 3rd Week 
  var dayOfWeek = 7;	// Sunday
      
  var first = date.day() <= dayOfWeek ? date.day(dayOfWeek) : date.add(1,"weeks").day(dayOfWeek); //Find first dayOfWeek in month
  var dt = first.add(weekOfMonth - 1, "weeks").toDate();  //skip forward weekOfMonth - 1 weeks 
  
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