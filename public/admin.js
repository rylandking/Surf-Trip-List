//Initalize Cloud Firestore through Firebase
const db = firebase.firestore();
let surfSpotRef;
let name;
let city;
let state;
let nation;
let continent;
let airportName;
let airportCode;
let board;
let qualityScore;
let waveSize;
let wind;
let swellDir;
let tide;
let waveDir;
let waveType;
let bottom;
let barrel;
let localism;
let beach;
let jan;
let feb;
let mar;
let apr;
let may;
let jun;
let jul;
let aug;
let sep;
let oct;
let nov;
let dec;
let forecast;
let description;
let powerful;
let ripCurrents;
let shallow;
let longPaddle;
let farFromShore;
let sharky;
let crowded;
let uncrowded;
let competitive;
let easyToGetWaves;
let beginnerFriendly;
let walkability;
let nature;
let views;
let nightlife;
let partyScene;
let healthcareFarAway;
let healthcareNearby;
let goodInternet;
let badInternet;
let touristy;
let themePark;
let pier;
let culturalSights;
let shopping;
let theftCommon;
let unsafeArea;
let goodEats;
let bars;
let fastFood;
let casualEats;
let sitDownRestaurants;
let english;
let spanish;
let french;
let portugese;
let indonesian;
let map;
let marker;
let markers = [];
let lat;
let lng;
let parkingMarkers = [];
let parkingLat;
let parkingLng;




////FUNCTION TO GET EACH FORM VALUE
function getInputValue(id) {
  return document.getElementById(id).value;
}

////STORE TAGS FROM FORM SUBMITS
function storeTags() {
  //WAVE TAGS
  if ($("#powerful").hasClass("active")) {
    powerful = $("#powerful").text();
  } else { powerful = "" }
  if ($("#rip-currents").hasClass("active")) {
    ripCurrents = $("#rip-currents").text();
  }  else { ripCurrents = "" }
  if ($("#shallow").hasClass("active")) {
    shallow = $("#shallow").text();
  } else { shallow = "" }
  if ($("#long-paddle").hasClass("active")) {
    longPaddle = $('#long-paddle').text();
  } else { longPaddle = "" }
  if ($("#far-from-shore").hasClass("active")) {
    farFromShore = $('#far-from-shore').text();
  } else { farFromShore = "" }
  if ($("#sharky").hasClass("active")) {
    sharky = $('#sharky').text();
  } else { sharky = "" }

  //CROWD TAGS
  if ($("#crowded").hasClass("active")) {
    crowded = $("#crowded").text();
  } else { crowded = "" }
  if ($("#uncrowded").hasClass("active")) {
    uncrowded = $("#uncrowded").text();
  } else { uncrowded = "" }
  if ($("#competitive").hasClass("active")) {
    competitive = $("#competitive").text();
  } else { competitive = "" }
  if ($("#easy-to-get-waves").hasClass("active")) {
    easyToGetWaves = $("#easy-to-get-waves").text();
  } else { easyToGetWaves = "" }
  if ($("#beginner-friendly").hasClass("active")) {
    beginnerFriendly = $("#beginner-friendly").text();
  } else { beginnerFriendly = "" }

  //ACCESS TAGS
  if ($("#parking-nearby").hasClass("active")) {
    parkingNearby = $("#parking-nearby").text();
  } else { parkingNearby = "" }
  if ($("#park-and-walk").hasClass("active")) {
    parkWalk = $("#park-and-walk").text();
  } else { parkWalk = "" }
  if ($("#park-and-hike").hasClass("active")) {
    parkHike = $("#park-and-hike").text();
  } else { parkHike = "" }
  if ($("#park-and-long-hike").hasClass("active")) {
    parkLongHike = $("#park-and-long-hike").text();
  } else { parkLongHike = "" }
  if ($("#boat-access").hasClass("active")) {
    boatAccess = $("#boat-access").text();
  } else { boatAccess = "" }

  //NEARBY TAGS
  if ($("#good-walkability").hasClass("active")) {
    walkability = $("#good-walkability").text();
  } else { walkability = "" }
  if ($("#nature").hasClass("active")) {
    nature = $("#nature").text();
  } else { nature = "" }
  if ($("#views").hasClass("active")) {
    views = $("#views").text();
  } else { views = "" }
  if ($("#nightlife").hasClass("active")) {
    nightlife = $("#nightlife").text();
  } else { nightlife = "" }
  if ($("#party-scene").hasClass("active")) {
    partyScene = $("#party-scene").text();
  } else { partyScene = "" }
  if ($("#healthcare-far-away").hasClass("active")) {
    healthcareFarAway = $("#healthcare-far-away").text();
  } else { healthcareFarAway = "" }
  if ($("#healthcare-nearby").hasClass("active")) {
    healthcareNearby = $("#healthcare-nearby").text();
  } else { healthcareNearby = "" }
  if ($("#good-internet").hasClass("active")) {
    goodInternet = $("#good-internet").text();
  } else { goodInternet = "" }
  if ($("#bad-internet").hasClass("active")) {
    badInternet = $("#bad-internet").text();
  } else { badInternet = "" }
  if ($("#touristy").hasClass("active")) {
    touristy = $("#touristy").text();
  } else { touristy = "" }
  if ($("#theme-park").hasClass("active")) {
    themePark = $("#theme-park").text();
  } else { themePark = "" }
  if ($("#pier").hasClass("active")) {
    pier = $("#pier").text();
  } else { pier = "" }
  if ($("#cultural-sights").hasClass("active")) {
    culturalSights = $("#cultural-sights").text();
  } else { culturalSights = "" }
  if ($("#shopping").hasClass("active")) {
    shopping = $("#shopping").text();
  } else { shopping = "" }
  if ($("#theft-common").hasClass("active")) {
    theftCommon = $("#theft-common").text();
  } else { theftCommon = "" }
  if ($("#unsafe-area").hasClass("active")) {
    unsafeArea = $("#unsafe-area").text();
  } else { unsafeArea = "" }

  //EATS TAGS
  if ($("#unsafe-tap-water").hasClass("active")) {
    unsafeTapWater = $("#unsafe-tap-water").text();
  } else { unsafeTapWater = "" }
  if ($("#good-eats").hasClass("active")) {
    goodEats = $("#good-eats").text();
  } else { goodEats = "" }
  if ($("#bars").hasClass("active")) {
    bars = $("#bars").text();
  } else { bars = "" }
  if ($("#fast-food").hasClass("active")) {
    fastFood = $("#fast-food").text();
  } else { fastFood = "" }
  if ($("#casual-eats").hasClass("active")) {
    casualEats = $("#casual-eats").text();
  } else { casualEats = "" }
  if ($("#sit-down-restaurants").hasClass("active")) {
    sitDownRestaurants = $("#sit-down-restaurants").text();
  } else { sitDownRestaurants = "" }

  //LANGUAGE TAGS
  if ($("#english").hasClass("active")) {
    english = $("#english").text();
  } else { english = "" }
  if ($("#spanish").hasClass("active")) {
    spanish = $("#spanish").text();
  } else { spanish = "" }
  if ($("#french").hasClass("active")) {
    french = $("#french").text();
  } else { french = "" }
  if ($("#portugese").hasClass("active")) {
    portugese = $("#portugese").text();
  } else { portugese = "" }
  if ($("#indonesian").hasClass("active")) {
    indonesian = $("#indonesian").text();
  } else { indonesian = "" }

}//END -- STORE TAGS FROM FORM SUBMITS




////ADD NAME TO FIRESTORE, MOVE TO NEXT FORMQUESTION
function submitName(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  name = getInputValue("name-input").toLowerCase().replace(/\s+/g, "-");
  surfSpotRef = db.doc(`surf-spots-test/${name}`);

  //ADD DOCUMENT TO "surf-spots-test" COLLECTION
  surfSpotRef.set({
    name: name,
  }, { merge: true }).then(function(docRef) {
    $("#one").hide();
    $("#two").show();
  }).catch(function(error) {
    console.log(error);
  });//END -- ADD DOCUMENT TO "surf-spots-test" COLLECTION

}//END -- ADD NAME TO FIRESTORE, MOVE TO NEXT FORMQUESTION

//LISTEN FOR one FORM SUBMIT
document.getElementById('one').addEventListener('submit', submitName);




////ADD LOCATION DATA TO FIRESTORE, MOVE TO NEXT FORM QUESTION
function submitLocation(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  city = getInputValue("city-select").toLowerCase().replace(/\s+/g, "-");
  state = getInputValue("state-select").toLowerCase().replace(/\s+/g, "-");
  nation = getInputValue("nation-select").toLowerCase().replace(/\s+/g, "-");
  continent = getInputValue("continent-select").toLowerCase().replace(/\s+/g, "-");
  airportName = getInputValue("airport-name-input");
  airportCode = getInputValue("airport-code-input").toUpperCase();

  //ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION
  surfSpotRef.set({
    city: city,
    state: state,
    region: nation,
    continent: continent,
    airportName: airportName,
    airportCode: airportCode,
  }, { merge: true }).then(function(docRef) {
    $("#two").hide();
    $("#three").show();
  }).catch(function(error) {
    console.log(error);
  });
  //END -- ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION

}//END -- ADD LOCATION DATA TO FIRESTORE, MOVE TO NEXT FORM QUESTION

//LISTEN FOR two FORM SUBMIT
document.getElementById('two').addEventListener('submit', submitLocation);




////ADD DIRECTION DATA TO FIRESTORE, MOVE TO NEXT QUESTION
function submitDirections(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  //ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION
  surfSpotRef.set({
    surfspot: {lat: lat, lng: lng},
    parkingLat: parkingLat,
    parkingLng: parkingLng,
  }, { merge: true }).then(function(docRef) {
    $("#three").hide();
    $("#four").show();
  }).catch(function(error) {
    console.log(error);
  });
  //END -- ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION

}
//END -- ADD DIRECTION DATA TO FIRESTORE, MOVE TO NEXT QUESTION

//LISTEN FOR two FORM SUBMIT
document.getElementById('three').addEventListener('submit', submitDirections);




////ADD CHARACTERISTICS DATA TO FIRESTORE, MOVE TO NEXT QUESTION
function submitCharacteristics(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  skill = getInputValue("skill-select");
  board = getInputValue("board-select");
  quality = getInputValue("quality-select");
  waveSize = getInputValue("wave-size-select");
  wind = getInputValue("wind-select");
  swellDir = getInputValue("swell-direction-select");
  tide = getInputValue("tide-select");
  waveDir = getInputValue("wave-direction-select");
  waveType = getInputValue("wave-type-select");
  bottom = getInputValue("bottom-select");
  barrel = getInputValue("barrel-select");
  localism = getInputValue("localism-select");
  beach = getInputValue("beach-select");
  period = getInputValue("period-select");

  //ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION
  surfSpotRef.set({
    skill: skill,
    board: board,
    quality: quality,
    size: waveSize,
    wind: wind,
    swellDir: swellDir,
    tide: tide,
    direction: waveDir,
    type: waveType,
    bottom: bottom,
    barrel: barrel,
    localism: localism,
    beach: beach,
    period: period,
  }, { merge: true }).then(function(docRef) {
    $("#four").hide();
    $("#five").show();
  }).catch(function(error) {
    console.log(error);
  });
  //END -- ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION

}
//END -- ADD CHARACTERISTICS DATA TO FIRESTORE, MOVE TO NEXT QUESTION

//LISTEN FOR four FORM SUBMIT
document.getElementById('four').addEventListener('submit', submitCharacteristics);




////ADD SEASONALITY DATA TO FIRESTORE, MOVE TO NEXT QUESTION
function submitSeasonality(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  jan = getInputValue("jan-select");
  feb = getInputValue("feb-select");
  mar = getInputValue("mar-select");
  apr = getInputValue("apr-select");
  may = getInputValue("may-select");
  jun = getInputValue("jun-select");
  jul = getInputValue("jul-select");
  aug = getInputValue("aug-select");
  sep = getInputValue("sep-select");
  oct = getInputValue("oct-select");
  nov = getInputValue("nov-select");
  dec = getInputValue("dec-select");

  //ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION
  surfSpotRef.set({
    jan: jan,
    feb: feb,
    mar: mar,
    apr: apr,
    may: may,
    jun: jun,
    jul: jul,
    aug: aug,
    sep: sep,
    oct: oct,
    nov: nov,
    dec: dec,
  }, { merge: true }).then(function(docRef) {
    $("#five").hide();
    $("#six").show();
  }).catch(function(error) {
    console.log(error);
  });
  //END -- ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION

}
//END -- ADD SEASONALITY DATA TO FIRESTORE, MOVE TO NEXT QUESTION

//LISTEN FOR two FORM SUBMIT
document.getElementById('five').addEventListener('submit', submitSeasonality);



////ADD DESCRIPTION DATA TO FIRESTORE, MOVE TO NEXT QUESTION
function submitDescription(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  forecast = getInputValue("forecast-input");
  description = getInputValue("description-input");

  //ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION
  surfSpotRef.set({
    forecast: forecast,
    spotNote: description,
  }, { merge: true }).then(function(docRef) {
    $("#six").hide();
    $("#seven").show();
  }).catch(function(error) {
    console.log(error);
  });
  //END -- ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION

}
//END -- ADD DESCRIPTION DATA TO FIRESTORE, MOVE TO NEXT QUESTION

//LISTEN FOR two FORM SUBMIT
document.getElementById('six').addEventListener('submit', submitDescription);




////ADD TAGS DATA TO FIRESTORE, MOVE TO COMPLETION SCREEN
function submitTags(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  storeTags();

  //ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION
  surfSpotRef.set({
    powerful: powerful,
    ripCurrents: ripCurrents,
    shallow: shallow,
    longPaddle: longPaddle,
    farFromShore: farFromShore,
    sharky: sharky,
    crowded: crowded,
    uncrowded: uncrowded,
    competitive: competitive,
    easyToGetWaves: easyToGetWaves,
    beginnerFriendly: beginnerFriendly,
    parkingNearby: parkingNearby,
    parkWalk: parkWalk,
    parkHike: parkHike,
    parkLongHike: parkLongHike,
    boatAccess: boatAccess,
    walkability: walkability,
    nature: nature,
    views: views,
    nightlife: nightlife,
    partyScene: partyScene,
    healthcareFarAway: healthcareFarAway,
    healthcareNearby: healthcareNearby,
    goodInternet: goodInternet,
    badInternet: badInternet,
    touristy: touristy,
    themePark: themePark,
    pier: pier,
    culturalSights: culturalSights,
    shopping: shopping,
    theftCommon: theftCommon,
    unsafeArea: unsafeArea,
    unsafeTapWater: unsafeTapWater,
    goodEats: goodEats,
    bars: bars,
    fastFood: fastFood,
    casualEats: casualEats,
    sitDownRestaurants: sitDownRestaurants,
    english: english,
    spanish: spanish,
    french: french,
    portugese: portugese,
    indonesian: indonesian,

  }, { merge: true }).then(function(docRef) {
    $("#seven").hide();
    $("#restart").show();
  }).catch(function(error) {
    console.log(error);
  });
  //END -- ADD FIELDS TO DOCUMENT IN "surf-spots-test" COLLECTION

}
//END -- ADD TAGS DATA TO FIRESTORE, MOVE TO COMPLETION SCREEN

//LISTEN FOR two FORM SUBMIT
document.getElementById('seven').addEventListener('submit', submitTags);



////ADD SURF SPOT COORDS
function initMap() {
  //map OBJECT
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.032682, lng: -118.679710},
    zoom: 2,

    zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  });//END -- map OBJECT

  function addMarker(props) {
    marker = new google.maps.Marker({
      position: props.coords,
      map: map,
    });

    markers.push(marker);

  }//END -- addMarker FUNCTION

  //ADD LISTENER TO GOOGLE MAP
  google.maps.event.addListener(map, "click", function(event) {
    addMarker({coords: event.latLng})
    lat = event.latLng.lat();
    lng = event.latLng.lng();
    console.log("lat: " + lat + " | lng: " + lng);
  });//END -- ADD LISTENER TO GOOGLE MAP

}//END -- initMap();

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
  lat = "";
  lng = "";
}

initMap();

//END -- ADD SURF SPOT COORDS


////ADD PARKING COORDS
function initParkingMap() {
  //map OBJECT
  map2 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: 34.032682, lng: -118.679710},
    zoom: 2,

    zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  });//END -- map OBJECT

  function addParkingMarker(props) {
    parkingMarker = new google.maps.Marker({
      position: props.coords,
      map: map2,
    });

    parkingMarkers.push(parkingMarker);

  }//END -- addParkingMarker()

  //ADD LISTENER TO GOOGLE MAP2
  google.maps.event.addListener(map2, "click", function(event) {
    addParkingMarker({coords: event.latLng})
    parkingLat = event.latLng.lat();
    parkingLng = event.latLng.lng();
    console.log("parkingLat: " + parkingLat + " | parkingLng: " + parkingLng);
  });//END -- ADD LISTENER TO GOOGLE MAP2

}//END -- initParkingMap()

// Sets the map on all markers in the array.
function setMapOnParkingMarkers(map2) {
  for (var i = 0; i < parkingMarkers.length; i++) {
    parkingMarkers[i].setMap(map2);
  }
}

function deleteParkingMarkers() {
  setMapOnParkingMarkers(null);
  parkingMarkers = [];
  parkingLat = "";
  parkingLng = "";
}

initParkingMap();

//END -- ADD PARKING COORDS




////NAVIGATE QUESTIONS FORWARD
function hideOneShowTwo() {
  $("#one").hide();
  $("#two").show();
}

function hideTwoShowThree() {
  $("#two").hide();
  $("#three").show();
}

function hideThreeShowFour() {
  $("#three").hide();
  $("#four").show();
}

function hideFourShowFive() {
  $("#four").hide();
  $("#five").show();
}

function hideFiveShowSix() {
  $("#five").hide();
  $("#six").show();
}

function hideSixShowSeven() {
  $("#six").hide();
  $("#seven").show();
}

function hideSevenShowRestart() {
  $("#seven").hide();
  $("#restart").show();
}


//// NAVIGATE QUESTIONS BACKWARD
function hideTwoShowOne() {
  $("#two").hide();
  $("#one").show();
}

function hideThreeShowTwo() {
  $("#three").hide();
  $("#two").show();
}

function hideFourShowThree() {
  $("#four").hide();
  $("#three").show();
}

function hideFiveShowFour() {
  $("#five").hide();
  $("#four").show();
}

function hideSixShowFive() {
  $("#six").hide();
  $("#five").show();
}

function hideSevenShowSix() {
  $("#seven").hide();
  $("#six").show();
}
