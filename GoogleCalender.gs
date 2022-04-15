function getEvents(){

  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cal = CalendarApp.getCalendarById("rk0ljeesh3gmvob21jhuvkqg54@group.calendar.google.com");
  var events = cal.getEvents(new Date("4/1/2022 12:00 AM"), new Date("4/30/2022 11:59 PM"));

  var lr = ss.getLastRow();
  ss.getRange(2,1,lr-1,6).clearContent();

  for(var i = 0;i<events.length;i++){

    var title = events[i].getTitle();
    var startDate = events[i].getStartTime();
    var endDate = events[i].getEndTime();
    var location = events[i].getLocation();
    var description = events[i].getDescription();

    ss.getRange(i+2,1).setValue(title);
    ss.getRange(i+2,2).setValue(startDate);
    ss.getRange(i+2,2).setNumberFormat("mm/dd/yyyy h:mm:ss AM/PM");
    ss.getRange(i+2,3).setValue(endDate);
    ss.getRange(i+2,3).setNumberFormat("mm/dd/yyyy h:mm:ss AM/PM");
    ss.getRange(i+2,4).setValue(location);
    ss.getRange(i+2,5).setValue(description);

  }
  function onEdit(e) {
  const range = e.range;
  range.setNote('Last modified: ' + new Date());

  }

}

function addEvents() {

  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = ss.getLastRow();
  var cal = CalendarApp.getCalendarById("rk0ljeesh3gmvob21jhuvkqg54@group.calendar.google.com");

  var data = ss.getRange("A2:E" + lr).getValues();

  for(var i = 0;i<data.length;i++){

  cal.createEvent(data[i][0], data[i][1], data[i][2], {location: data[i][3], description: data[i][4]});
  
  }

  function onEdit(e) {
  const range = e.range;
  range.setNote('Last modified: ' + new Date());

  }


}
