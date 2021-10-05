/**
 * An event listener is added to listen to tap events on the map.
 * Clicking on the map displays an alert box containing the latitude and longitude
 * of the location pressed.
 * @param  {H.Map} map      A HERE Map instance within the application
 */

API_KEY = "8q2svJlTuGv1SWAaDVZiKkA6bnxVJNwzqiMMi2NZ_EQ";

//TODO init geo 
var lat = 30.94625288456589;
var lng = -54.10861860580418; 

displayGeo();

function displayGeo() {
    let displayX = Math.abs(lat.toFixed(4)) + (lat > 0 ? "N" : "S");
    let displayY = Math.abs(lng.toFixed(4)) + (lng > 0 ? "E" : "W");
    document.getElementById('world-map-co-ordinate').innerText = displayX + "\n" + displayY
    document.getElementById('moon-map-co-ordinate').innerText = displayX + "\n" + displayY
}

function setUpClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  map.addEventListener("tap", function (evt) {
    var coord = map.screenToGeo(
      evt.currentPointer.viewportX,
      evt.currentPointer.viewportY
    );
    
    lat = coord.lat
    lng = coord.lng
    displayGeo()
  });
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: API_KEY,
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map
var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    center: {lat,lng},
    zoom: 1,
    pixelRatio: window.devicePixelRatio || 1,
  }
);
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

setUpClickListener(map);

function setupWorldTimer(){
  var WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var zone = "Asia/Taipei"
  setInterval(function(){
    //TODO change timezone when you need
    // can use moment.tz.names() show all timezone
    var timestamp = moment().tz(zone)
    var week_day = WEEK[timestamp.date()];
    var year = timestamp.year();
    var month = timestamp.month()+1;
    var day = formatTime(timestamp.date());
    var hours = formatTime(timestamp.hour());
    var minutes = formatTime(timestamp.minutes());
    var seconds = formatTime(timestamp.seconds());
    
    document.querySelector('#earth-container .year .field-content').innerText = year;
    document.querySelector('#earth-container .month .field-content').innerText = month;
    document.querySelector('#earth-container .day .field-content').innerText = day;
    document.querySelector('#earth-container .week-day').innerText = week_day;
    document.querySelector('#earth-container .detail-time').innerText = hours + ':' + minutes  + ':' + seconds;
  }, 1000);
};

//TODO moon timer
function setupMoonTimer() {i
  var timestamp = moment().tz("Asia/Taipei")

}

function formatTime(value){
  return value < 10 ? '0' + value : value;
}

setupWorldTimer();
