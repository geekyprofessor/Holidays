var express = require('express');
var router = express.Router();
var moment = require('moment-hijri');
moment().format('iYYYY/iM/iD');

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

//$ lsof -i tcp:3000
//$ kill -9 PID

router.get('/:year', function(req, res, next) {
  //calculate holiday date here
  m = moment('1441/1/1', 'iYYYY/iM/iD')
  //m.format('iYYYY/iM/iD')
  date="";
  
 
  console.log("ldld "+m.iYear()+"  "+m.iMonth()+"   "+m.iDate()+' is the year')
  var dt = new Date("2019", 7, 31); //set date to 26th of April
  var num=parseInt(req.params.year,10)-2019;
  if(num<0){
num*=-1;
  }
  if(2019>parseInt(req.params.year,10)){
    m.subtract(num, 'iYear');
    
    dt.setDate(dt.getDate()-(num*354))
    console.log(dt.getDate())

    console.log(dt.getFullYear())
    //add
  }else if(2019<parseInt(req.params.year)){
    m.add(num, 'iYear');
    dt.setDate(dt.getDate()+(num*354))
    console.log(dt.getDate())
    //subtract
  }
  word= m.format('iYYYY/iM/iD [is] YYYY/M/D');
  for(i=0;i<word.length;i++){
    console.log("loop")
    if(word[i]==" "){
      word[i]=" "
      date=date.concat(" ")
      
    }
    else if(word[i]=="/"){
      word[i]="/"
      date=date.concat("/")
      
    }
      else if(word[i]=="٠"){
        word[i]="0"
        date=date.concat("0")
       
      }
      else if(word[i]=="١"){
        word[i]="1"
        console.log(word[i])
        date=date.concat("1")
       
      }
      else if(word[i]=="٢"){
        word[i]="2"
        date=date.concat("2")
        
      }
     else if(word[i]=="٣"){
        word[i]="3"
        date=date.concat("3")
        
      }
      else if(word[i]=="٤"){
        word[i]="4"
        date=date.concat("4")
       
      }
      else if(word[i]=="٥"){
        word[i]="5"
        date=date.concat("5")
        
      }
      else if(word[i]=="٦"){
        word[i]="6"
        date=date.concat("6")
        
      }
      else if(word[i]=="٧"){
        word[i]="7"
        date=date.concat("7")
       
      }
      else if(word[i]=="٨"){
        word[i]="8"
        date=date.concat("8")
        
      }
      else if(word[i]=="٩"){
        word[i]="9"
        date=date.concat("9")
        
      }
  }
  console.log(date)
  for(i=0;i<19;i++){
    if(date[i]==" "){
      console.log(date[i])
      date=date.substring(4);
      
      break;
    }
    console.log(date[i])
    date=date.substring(2);
    
  }
  ryear="";
   console.log(date)
   for(i=0;i<date.length;i++){
      if(date[i]=="/"){
        date=date.substring(i+1);
        break;
      }
      ryear=ryear.concat(date[i]);
   }
   console.log(date)
   console.log(ryear)

   rmonth="";

for(i=0;i<date.length;i++){
      if(date[i]=="/"){
        date=date.substring(i+1);
        break;
      }
      rmonth=rmonth.concat(date[i]);
   }
   console.log(date)
   console.log(rmonth)
   rdate=date
   console.log(rdate)
  dt = new Date(ryear, rmonth-1, rdate);
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