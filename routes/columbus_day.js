var express = require('express');
var router = express.Router();

//set holiday metadate here
var metadata = {
  Name: "Columbus Day",
  FederalHoliday: true,
  Religion: undefined, //could be "Christian", "Jewish", "Orthodox", "Muslim", "Hindu" or undefined
  AlternateNames: ["Indigenous Day" ] //may contain alternate names for the holiday - for example for Mardi Gras, altername names would be ["Fat Tuesday", "Shrove Tuesday"]
};

//This function is the same for all holidays
router.get('/', function(req, res, next){
  res.send('respond with metadata for holiday - i.e. name(s), religion, etc.');
  res.json(metadata);
});

router.get('/:year', function(req, res, next) {
    res.send('respond with holiday for ' + req.params.year);
});
    //calculate the holiday date here
    var dt = new Date(req.params.year, 9, 14); 

    //is the same
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
  ;

module.exports = router;