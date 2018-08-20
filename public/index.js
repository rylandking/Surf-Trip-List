//Initalize Cloud Firestore through Firebase
const db = firebase.firestore();
const storage = firebase.storage();
let pathReference;
let map;
let service;
let infowindow;
let surfSpotMarker;
let accommMarker;
let lessonMarker;
let rentalMarker;
let name;
let rating;
let website;
let phone;
let address;
let review;
let coords;
let surfSpotMarkers = [];
let accommMarkers = [];
let lessonMarkers = [];
let rentalMarkers = [];
let data;
let spotName;
let skill;
let note;
let parkingLat;
let parkingLng;
let accommURL;
let photo;
let accommType;
let bedAmount;
let bedWord;
let guestAmount;
let guestWord;
let title;
let price;
let view;
let proximity;
let city;
let cityParam;
let mapCenter;
let zoom;
let spotID;
let id;
let lat;
let lng;
let swBounds;
let neBounds;
let review1;
let review2;
let review3;
let icon;
let accommDefaultMarker;
let accommMarkerRef;
let nearbySurfSpot;
let accommImageRef;
let accommImage;
let accommPhoto;
let beach;
let waveDir;
let localism;
let waveType;
let email;
let message;
let neLat;
let neLng;
let swLat;
let swLng;
let lngArray = [];
let latArray = [];
let largerLng;
let smallerLng;
let largerLat;
let smallerLat;
let currentZoom;
let surfSpotMarkerClick;
let accommMarkerClick;




////POPULATE CARDS ON HOME PAGE
db.collection("city").where("beta", "==", true).get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    data = doc.data();
    cityID = doc.id;
    city = doc.id.replace(/-/g,' ');
    region = data.region.replace(/-/g,' ');
    photo = data.cityimage;

    buildCityCards();

  });
});//END -- POPULATE CARDS ON HOME PAGE


//BUILD CITY CARDS
function buildCityCards() {
  $("#city-cards").append(
    `<div id="city-card" class="card city-card bright-hover text-white p-1 pt-0 mb-2 col-xs-12 col-sm-6 col-md-4 col-lg-3" data-id="${cityID}">
      <img class="card-img tinted" src="${photo}" alt="${city}">
      <a class="white-link" href="city.html">
        <div class="card-img-overlay">
          <h4 class="card-title position-relative">${city}</h4>
          <p class="card-subtitle position-relative">${region}</p>
        </div>
      </a>
    </div>`
  );
}//END -- BUILD CITY CARDS



////PUT CITY IN QUERY PARAMS AFTER CLICKING ON CARD
//Click city card on homepage
$('body').on('click','#city-card',function(e){
  //Stores data-id=${city} in variable cityPage
  window.city = $(this).data('id');
  city = window.city;
  //Returns redirectPage function
  return redirectPage(city)
});

//Opens new window with newCityPage in the query perams
function redirectPage(city) {
  window.location = `city.html?city=${city}`;
  window.city = city;
  return false;
}

//Gets query perams by name
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//Store the query perams in a constant
cityParam = getParameterByName('city');
//END -- PUT CITY IN QUERY PARAMS AFTER CLICKING ON CARD




////TRIM CARD NOTE LENGTH TO 200 CHARACTERS
function trimNote() {
  if (note.length > 180) {
    note = note.substr(0, 180);
    //re-trim if we are in the middle of a word
    note = note.substr(0, Math.min(note.length, note.lastIndexOf(" "))) + '...';
  }
}
//END -- TRIM CARD NOTE LENGTH TO 200 CHARACTERS

////TRIM CARD TITLE LENGTH TO 40 CHARACTERS
function trimHeader() {
  if (title.length > 40) {
    title = title.substr(0,40);
    //re-trim if we are in the middle of a word
    title = title.substr(0, Math.min(title.length, title.lastIndexOf(" "))) + '...';
    }
  }
//END -- TRIM CARD TITLE LENGTH TO 40 CHARACTERS

////TRIM CARD TITLE LENGTH TO 40 CHARACTERS
function trimName() {
  if (name.length > 40) {
    name = name.substr(0,40);
    //re-trim if we are in the middle of a word
    name = name.substr(0, Math.min(name.length, name.lastIndexOf(" "))) + '...';
    }
  }
//END -- TRIM CARD TITLE LENGTH TO 40 CHARACTERS




////SETS MAP ON ALL surfSpotMarkers IN THE ARRAY. (KEEPS THEM STORED IN ARRAY SO TOGGLE WORKS.)
function setMapOnSurfSpotMarkers(map) {
 for (var i = 0; i < surfSpotMarkers.length; i++) {
   surfSpotMarkers[i].setMap(map);
 }
}

////SETS MAP ON ALL lessonMarkers IN THE ARRAY. (KEEPS THEM STORED IN ARRAY SO TOGGLE WORKS.)
function setMapOnLessonMarkers(map) {
  for (var i = 0; i < lessonMarkers.length; i++) {
    lessonMarkers[i].setMap(map);
  }
}

////SETS MAP ON ALL accommMarkers IN THE ARRAY. (KEEPS THEM STORED IN ARRAY SO TOGGLE WORKS.)
function setMapOnAccommMarkers(map) {
 for (var i = 0; i < accommMarkers.length; i++) {
   accommMarkers[i].setMap(map);
 }
}




////HIDE AND SHOW CARDS IN SPOT-CARD LIST ON CLICK OF TOGGLE BUTTONS
function toggleSurfSpotCards() {
  $("#toggleSurfSpotCards").click(function() {
    //IF BUTTON IS OFF (.cards-hidden) AND CLICKED
    if ($("#toggleSurfSpotCards").hasClass("cards-hidden")) {
      //Remove .card-showing from others and add .cards-hidden
      $("#toggleLessonCards").removeClass("cards-showing");
      $("#toggleAccommCards").removeClass("cards-showing");
      $("#toggleLessonCards").addClass("cards-hidden");
      $("#toggleAccommCards").addClass("cards-hidden");
      //Remove .cards-hidden and add .card-showing
      $("#toggleSurfSpotCards").removeClass("cards-hidden");
      $("#toggleSurfSpotCards").addClass("cards-showing");
      //Show cards and hide others
      hideAndShowCards();
      //If markers are hidden (.markers-hidden) add markers to map
      if ($("#toggleSurfSpotMarkers").hasClass("markers-hidden")) {
        //Remove markers-hidden and close icon
        $("#toggleSurfSpotMarkers").removeClass("markers-hidden");
        $("#toggleSurfSpotMarkerIcon").removeClass("fa-times");
        //Add markers-showing and marker icon
        $("#toggleSurfSpotMarkers").addClass("markers-showing");
        $("#toggleSurfSpotMarkerIcon").addClass("fa-map-marker-alt");
        addSurfSpotMarkersWrapper();
        hideAndShowCards();
      }
    }
  });//END -- click function
}//END - toggleSurfSpotCards

function toggleLessonCards() {
  $("#toggleLessonCards").click(function() {
    //IF BUTTON IS OFF (.cards-hidden) AND CLICKED ON
    if ($("#toggleLessonCards").hasClass("cards-hidden")) {
      //Remove .card-showing from others and add .cards-hidden
      $("#toggleSurfSpotCards").removeClass("cards-showing");
      $("#toggleAccommCards").removeClass("cards-showing");
      $("#toggleSurfSpotCards").addClass("cards-hidden");
      $("#toggleAccommCards").addClass("cards-hidden");
      //Remove .cards-hidden and add .card-showing
      $("#toggleLessonCards").removeClass("cards-hidden");
      $("#toggleLessonCards").addClass("cards-showing");
      //Show cards and hide others
      hideAndShowCards();
      //If markers are hidden (.markers-hidden) add markers to map
      if ($("#toggleLessonMarkers").hasClass("markers-hidden")) {
        //Remove markers-hidden and close icon
        $("#toggleLessonMarkers").removeClass("markers-hidden");
        $("#toggleLessonMarkerIcon").removeClass("fa-times");
        //Add markers-showing and marker icon
        $("#toggleLessonMarkers").addClass("markers-showing");
        $("#toggleLessonMarkerIcon").addClass("fa-map-marker-alt");
        callLessons();
        hideAndShowCards();
      }
    }
  });//END -- click function
}//END -- toggleLessonCards()

function toggleAccommCards() {
  $("#toggleAccommCards").click(function() {
    //IF BUTTON IS OFF (.cards-hidden) AND CLICKED ON
    if ($("#toggleAccommCards").hasClass("cards-hidden")) {
      //Remove .card-showing from others and add .cards-hidden
      $("#toggleSurfSpotCards").removeClass("cards-showing");
      $("#toggleLessonCards").removeClass("cards-showing");
      $("#toggleSurfSpotCards").addClass("cards-hidden");
      $("#toggleLessonCards").addClass("cards-hidden");
      //Remove .cards-hidden and add .card-showing
      $("#toggleAccommCards").removeClass("cards-hidden");
      $("#toggleAccommCards").addClass("cards-showing");
      //Show cards and hide others
      hideAndShowCards();
      //If markers are hidden (.markers-hidden) add markers to map
      if ($("#toggleAccommMarkers").hasClass("markers-hidden")) {
        //Remove markers-hidden and close icon
        $("#toggleAccommMarkers").removeClass("markers-hidden");
        $("#toggleAccommMarkerIcon").removeClass("fa-times");
        //Add markers-showing and marker icon
        $("#toggleAccommMarkers").addClass("markers-showing");
        $("#toggleAccommMarkerIcon").addClass("fa-map-marker-alt");
        addAccommMarkersWrapper();
        hideAndShowCards();
      }
    }
  });//END -- click function
}//END -- toggleAccommCards()




//Hide or show cards based on which has .cards-showing
function hideAndShowCards() {
  //Hide cards if .cards-hidden
  if ($("#toggleSurfSpotCards").hasClass("cards-hidden")) {
    $(".surf-spot-card").hide();
  }
  if ($("#toggleLessonCards").hasClass("cards-hidden")) {
    $(".lesson-spot-card").hide();
  }
  if ($("#toggleAccommCards").hasClass("cards-hidden")) {
    $(".accomm-spot-card").hide();
  }

  //Remove old all-cards-off from the card list
  $("#spot-cards").find('#all-cards-off').remove();

  //If all .cards-hidden show all cards off card
  if ($("#toggleSurfSpotCards").hasClass("cards-hidden") && $("#toggleLessonCards").hasClass("cards-hidden") && $("#toggleAccommCards").hasClass("cards-hidden")) {
    //Build the card
    $("#spot-cards").prepend(`
      <div id="all-cards-off" class="card bright-hover" data-id="loading">
        <img class="card-img tinted-spot-cards" src="images/city-images/salina-cruz.jpg" alt="no-surf-spots-in-map-view">
        <div class="card-img-overlay">
          <div class="card-body text-white p-0">
            <h5 class="card-title2">All lists are off</h5>
            <h5 class="card-text2 note mt-2">Click any button above or refresh the page to discover more surf trip information.</h6>
          </div>
        </div>
      </div>
    `);
  }

  //Show cards if .cards-showing
  if ($("#toggleSurfSpotCards").hasClass("cards-showing")) {
    $(".surf-spot-card").show();
    $(".lesson-spot-card").hide();
    $(".accomm-spot-card").hide();
  } else if ($("#toggleLessonCards").hasClass("cards-showing")) {
    $(".surf-spot-card").hide();
    $(".lesson-spot-card").show();
    $(".accomm-spot-card").hide();
  } else if ($("#toggleAccommCards").hasClass("cards-showing")) {
    $(".surf-spot-card").hide();
    $(".lesson-spot-card").hide();
    $(".accomm-spot-card").show();
  }
}





function toggleSurfSpotMarkers() {
  $("#toggleSurfSpotMarkers").click(function() {
    //IF MARKER BUTTON IS ON (.markers-showing) AND CARD BUTTON IS ON (.cards-showing), hide markers and hide cards
    if ($("#toggleSurfSpotMarkers").hasClass("markers-showing") && $("#toggleSurfSpotCards").hasClass("cards-showing") ) {
      //Remove .markers-showing and .cards-showing
      $("#toggleSurfSpotMarkers").removeClass("markers-showing");
      $("#toggleSurfSpotMarkerIcon").removeClass("fa-map-marker-alt");
      $("#toggleSurfSpotCards").removeClass("cards-showing");
      //Add .markers-hidden and .cards-hidden
      $("#toggleSurfSpotMarkers").addClass("markers-hidden");
      $("#toggleSurfSpotMarkerIcon").addClass("fa-times");
      $("#toggleSurfSpotCards").addClass("cards-hidden");
      //Remove markers from map
      setMapOnSurfSpotMarkers(null);
      surfSpotMarkers =[];
      //Hide the cards in the card list
      hideAndShowCards();
    //IF MARKER BUTTON IS OFF (.markers-hidden) AND CARD BUTTON IS OFF (.cards-off), show markers and show cards
    } else if ($("#toggleSurfSpotMarkers").hasClass("markers-hidden") && $("#toggleSurfSpotCards").hasClass("cards-hidden")) {
      //Remove .cards-showing from others
      $("#toggleLessonCards").removeClass("cards-showing");
      $("#toggleAccommCards").removeClass("cards-showing");
      //Add .cards-hidden to others
      $("#toggleLessonCards").addClass("cards-hidden");
      $("#toggleAccommCards").addClass("cards-hidden");
      //Remove .markers-hidden and cards-hidden
      $("#toggleSurfSpotMarkers").removeClass("markers-hidden");
      $("#toggleSurfSpotMarkerIcon").removeClass("fa-times");
      $("#toggleSurfSpotCards").removeClass("cards-hidden");
      //Add .markers-showing and .cards-showing
      $("#toggleSurfSpotMarkers").addClass("markers-showing");
      $("#toggleSurfSpotMarkerIcon").addClass("fa-map-marker-alt");
      $("#toggleSurfSpotCards").addClass("cards-showing");
      //Add markers on map and show cards
      addSurfSpotMarkersWrapper();
      hideAndShowCards();
    //IF MARKER BUTTON IS ON (.markers-showing) (when another card tab is .cards-showing), REMOVE MARKERS FROM MAP
    } else if ($("#toggleSurfSpotMarkers").hasClass("markers-showing")) {
      //Remove markers-showing and marker icon
      $("#toggleSurfSpotMarkers").removeClass("markers-showing");
      $("#toggleSurfSpotMarkerIcon").removeClass("fa-map-marker-alt");
      //Add markers-hidden and close icon
      $("#toggleSurfSpotMarkers").addClass("markers-hidden");
      $("#toggleSurfSpotMarkerIcon").addClass("fa-times");
      //Remove markers from map
      setMapOnSurfSpotMarkers(null);
      surfSpotMarkers =[];
    }
  });//END -- click function
}

function toggleLessonMarkers() {
  $("#toggleLessonMarkers").click(function() {
    //IF MARKER BUTTON IS ON (.markers-showing) AND CARD BUTTON IS ON (.cards-showing), hide markers and hide cards
    if ($("#toggleLessonMarkers").hasClass("markers-showing") && $("#toggleLessonCards").hasClass("cards-showing") ) {
      //Remove .markers-showing and .cards-showing
      $("#toggleLessonMarkers").removeClass("markers-showing");
      $("#toggleLessonMarkerIcon").removeClass("fa-map-marker-alt");
      $("#toggleLessonCards").removeClass("cards-showing");
      //Add .markers-hidden and .cards-hidden
      $("#toggleLessonMarkers").addClass("markers-hidden");
      $("#toggleLessonMarkerIcon").addClass("fa-times");
      $("#toggleLessonCards").addClass("cards-hidden");
      //Remove markers from map
      setMapOnLessonMarkers(null);
      lessonMarkers = [];
      //Hide the cards in the card list
      hideAndShowCards();
    //IF MARKER BUTTON IS OFF (.markers-hidden) AND CARD BUTTON IS OFF (.cards-off), show markers and show cards
    } else if ($("#toggleLessonMarkers").hasClass("markers-hidden") && $("#toggleLessonCards").hasClass("cards-hidden")) {
      //Remove .cards-showing from others
      $("#toggleSurfSpotCards").removeClass("cards-showing");
      $("#toggleAccommCards").removeClass("cards-showing");
      //Add .cards-hidden to all others
      $("#toggleSurfSpotCards").addClass("cards-hidden");
      $("#toggleAccommCards").addClass("cards-hidden");
      //Remove .markers-hidden and cards-hidden
      $("#toggleLessonMarkers").removeClass("markers-hidden");
      $("#toggleLessonMarkerIcon").removeClass("fa-times");
      $("#toggleLessonCards").removeClass("cards-hidden");
      //Add .markers-showing and .cards-showing
      $("#toggleLessonMarkers").addClass("markers-showing");
      $("#toggleLessonMarkerIcon").addClass("fa-map-marker-alt");
      $("#toggleLessonCards").addClass("cards-showing");
      //Add markers on map and show cards
      callLessons();
      hideAndShowCards();
    //IF MARKER BUTTON IS ON (.markers-showing) (when another card tab is .cards-showing), REMOVE MARKERS FROM MAP
    } else if ($("#toggleLessonMarkers").hasClass("markers-showing")) {
      //Remove markers-showing and marker icon
      $("#toggleLessonMarkers").removeClass("markers-showing");
      $("#toggleLessonMarkerIcon").removeClass("fa-map-marker-alt");
      //Add markers-hidden and close icon
      $("#toggleLessonMarkers").addClass("markers-hidden");
      $("#toggleLessonMarkerIcon").addClass("fa-times");
      //Remove markers from map
      setMapOnLessonMarkers(null);
      lessonMarkers = [];
    }
  });//END -- click function
}

function toggleAccommMarkers() {
  $("#toggleAccommMarkers").click(function() {
    //IF MARKER BUTTON IS ON (.markers-showing) AND CARD BUTTON IS ON (.cards-showing), hide markers and hide cards
    if ($("#toggleAccommMarkers").hasClass("markers-showing") && $("#toggleAccommCards").hasClass("cards-showing")) {
      //Remove .markers-showing and .cards-showing
      $("#toggleAccommMarkers").removeClass("markers-showing");
      $("#toggleAccommMarkerIcon").removeClass("fa-map-marker-alt");
      $("#toggleAccommCards").removeClass("cards-showing");
      //Add .markers-hidden and .cards-hidden
      $("#toggleAccommMarkers").addClass("markers-hidden");
      $("#toggleAccommMarkerIcon").addClass("fa-times");
      $("#toggleAccommCards").addClass("cards-hidden");
      //Remove markers from map
      setMapOnAccommMarkers(null);
      accommMarkers = [];
      //Hide the cards in the card list
      hideAndShowCards();
    //IF MARKER BUTTON IS OFF (.markers-hidden) AND CARD BUTTON IS OFF (.cards-off), show markers and show cards
    } else if ($("#toggleAccommMarkers").hasClass("markers-hidden") && $("#toggleAccommCards").hasClass("cards-hidden")) {
      //Remove .cards-showing from others
      $("#toggleSurfSpotCards").removeClass("cards-showing");
      $("#toggleLessonCards").removeClass("cards-showing");
      //Add .cards-hidden to all others
      $("#toggleSurfSpotCards").addClass("cards-hidden");
      $("#toggleLessonCards").addClass("cards-hidden");
      //Remove .markers-hidden and cards-hidden
      $("#toggleAccommMarkers").removeClass("markers-hidden");
      $("#toggleAccommMarkerIcon").removeClass("fa-times");
      $("#toggleAccommCards").removeClass("cards-hidden");
      //Add .markers-showing and .cards-showing
      $("#toggleAccommMarkers").addClass("markers-showing");
      $("#toggleAccommMarkerIcon").addClass("fa-map-marker-alt");
      $("#toggleAccommCards").addClass("cards-showing");
      //Add markers on map
      addAccommMarkersWrapper();
      hideAndShowCards();
    //IF MARKER BUTTON IS ON (.markers-showing), REMOVE MARKERS FROM MAP
    } else if ($("#toggleAccommMarkers").hasClass("markers-showing")) {
      //Remove markers-showing and marker icon
      $("#toggleAccommMarkers").removeClass("markers-showing");
      $("#toggleAccommMarkerIcon").removeClass("fa-map-marker-alt");
      //Add markers-hidden and close icon
      $("#toggleAccommMarkers").addClass("markers-hidden");
      $("#toggleAccommMarkerIcon").addClass("fa-times");
      //Remove markers from map
      setMapOnAccommMarkers(null);
      accommMarkers = [];
    }
  });//END -- click function
}


toggleSurfSpotCards();
toggleLessonCards();
toggleAccommCards();

toggleSurfSpotMarkers();
toggleLessonMarkers();
toggleAccommMarkers();




//SHOW MAP ON MOBILE
function showMapMobile() {
  $("#show-map-mobile").click(function() {
    //Hide list
    $("#spot-cards").hide();
    $("#card-button-menu").hide();
    $("#card-button-menu-bottom").hide();
    //Show map
    $("#map-wrapper").removeClass("d-none");
    $("#map-wrapper").show();
    //Replace 'Map' with 'List'
    $("#show-list-mobile").show();
    $("#show-map-mobile").hide();
  });
}//END -- SHOW MAP ON MOBILE

//SHOW LIST ON MOBILE
function showListMobile() {
  $("#show-list-mobile").click(function() {
    //Hide map
    $("#map-wrapper").addClass("d-none");
    $("#map-wrapper").hide();
    //Show list
    $("#spot-cards").show();
    $("#card-button-menu").show();
    $("#card-button-menu-bottom").show();
    //Replace 'List' with 'Map'
    $("#show-list-mobile").hide();
    $("#show-map-mobile").show();
  });
}//END -- SHOW LIST ON MOBILE


showMapMobile();
showListMobile();



////HOVER OVER CARD, CHANGE THE SURF SPOT MARKER ON THE MAP
function highlightSurfSpotMarker(id) {
  for (i in surfSpotMarkers){
    if(surfSpotMarkers[i].id == id) {
      surfSpotMarkers[i].setIcon('public/icon-images/'+surfSpotMarkers[i].skill+'-large.png');
      surfSpotMarkers[i].setOptions({zIndex:9999999});
    }
  }
}

function normalSurfSpotMarker(id) {
  for (i in surfSpotMarkers){
    if(surfSpotMarkers[i].id == id) {
      surfSpotMarkers[i].setIcon('public/icon-images/'+surfSpotMarkers[i].skill+'.png');
      surfSpotMarkers[i].setOptions({zIndex:2});
    }
  }
}//END -- HOVER OVER CARD, CHANGE THE SURF SPOT MARKER ON THE MAP


////HOVER OVER LESSON CARD, CHANGE THE MARKER ON THE MAP
function highlightMarker(id) {
  for (i in lessonMarkers){
    if(lessonMarkers[i].id == id) {
      lessonMarkers[i].setIcon('public/icon-images/surfLesson-large.png');
      lessonMarkers[i].setOptions({zIndex:9999999});
    }
  }
}

function normalMarker(id) {
  for (i in lessonMarkers){
    if(lessonMarkers[i].id == id) {
      lessonMarkers[i].setIcon('public/icon-images/surfLesson.png');
      lessonMarkers[i].setOptions({zIndex:2});
    }
  }
}//END -- HOVER OVER LESSON CARD, CHANGE THE MARKER ON THE MAP


////HOVER OVER ACCOMM CARD, CHANGE THE MARKER ON THE MAP
function highlightAccommMarker(id) {
  for (i in accommMarkers){
    if(accommMarkers[i].id == id) {
      accommMarkers[i].setIcon('images/pm/' + accommMarkers[i].price + '-large.png');
      accommMarkers[i].setOptions({zIndex:9999999});
    }
  }
}

function normalAccommMarker(id) {
  for (i in accommMarkers){
    if(accommMarkers[i].id == id) {
      accommMarkers[i].setIcon('images/pm/' + accommMarkers[i].price + '.png');
      accommMarkers[i].setOptions({zIndex:2});
    }
  }
}//END -- HOVER OVER ACCOMM CARD, CHANGE THE MARKER ON THE MAP




////ADD SURF SPOT MARKERS TO THE CITY PAGE
function addSurfSpotMarkers() {
  //Remove old surf spot cards from the card list
  $("#spot-cards").find('.surf-spot-card').remove();
  //Remove surf spot markers
  setMapOnSurfSpotMarkers(null);
  surfSpotMarkers = [];
  //Show loading surf spot card if surf spots has .cards-showing
  if ($("#toggleSurfSpotCards").hasClass("cards-showing")) {
    $("#spot-cards").prepend(`
      <div class="card bright-hover loading-surf-spot-card" data-id="loading">
        <img class="card-img tinted-spot-cards" src="images/surf-spot-default-photo.png" alt="loading-surf-spots">
        <div class="card-img-overlay">
          <div class="card-body text-white p-0">
            <h5 class="card-title2">LOADING SURF SPOTS...</h5>
          </div>
        </div>
      </div>
    `);
  }

  //Query surf-spot collection to add surfSpotMarkers within Map bounds. IMPORTANT: THIS IS QUERYING ALL SPOTS WITHIN THE greaterLat & smallerLat VARIABLES NO MATTER THERE LNG. The Lng bounds can't be set in the the query as Firestore doesn't support queries on two different fields. Lng bounds are set in a conditional below, which then runs the addSurfSpotMarker() function.
  db.collection("surf-spot").where("surfspot.lat", "<=", greaterLat).where("surfspot.lat", ">=", smallerLat).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data = doc.data();
        spotID = doc.id;
        spotName = doc.id.replace(/-/g,' ');
        coords = data.surfspot;
        skill = data.skill;
        fullNote = data.spotNote
        note = data.spotNote;
        parkingLat = data.parkingLat;
        parkingLng = data.parkingLng;
        beach = data.beach;
        waveDir = data.direction;
        localism = data.localism;
        waveType = data.type;

        //If the surf-spot is within the lat/lng map bounds, run addSurfSpotMarker().
        if (coords.lng <= greaterLng && coords.lng >= smallerLng) {
          addSurfSpotMarker(surfSpotMarker, map);
        }

    });//END -- surf-spot querySnapshot
  }).then(function() {
    //If surfSpotMarkers array holds 0 values, show card that tells user there are no surf spots in this map view.
    if (surfSpotMarkers.length == 0) {
      //Make sure surf spot cards are showing (.cards-showing)
      if ($("#toggleSurfSpotCards").hasClass("cards-showing")) {
        //Remove old no-surf-spot-cards from the card list
        $("#spot-cards").find('#no-surf-spots-card').remove();
        $(".loading-surf-spot-card").hide();

        $("#spot-cards").append(`
          <div id="no-surf-spots-card" class="card surf-spot-card bright-hover" data-id="loading">
            <img class="card-img tinted-spot-cards" src="images/surf-spot-default-photo.png" alt="no-surf-spots-in-map-view">
            <div class="card-img-overlay">
              <div class="card-body text-white p-0">
                <h5 class="card-title2">No surf spots here.</h5>
                <h5 class="card-text2 note mt-2">To discover more surf spots, move the map somewhere else or refresh the page.</h6>
              </div>
            </div>
          </div>
        `);
      }
    }//END -- spotMarkers.length CONDITIONAL

  });//END -- surf-spot FIRESTORE QUERY

}//END -- addSurfSpotMarkers


////ADDS A SURF SPOT MARKER TO THE MAP
function addSurfSpotMarker(props, map) {

  //Add surfSpotMarkers to map
  surfSpotMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: 'public/icon-images/' + skill + '.png',
    id: spotID,
    skill: skill,
    optimized: false,
  });

  //Add each surfSpotMarker to the array to allow for hide/show of surfSpotMarkers
  surfSpotMarkers.push(surfSpotMarker);

  //Create the surfSpotMarker infowindow
  infowindow = new google.maps.InfoWindow ({
  });

  trimNote();

  //Set the surf spot infowindow html
  surfSpotMarker.html = `
    <div class="infoWindow">
      <h5 class="mb-1">
        <span class="text-uppercase">${spotName}</span> - <img class="iwSkillIcon" src="public/icon-images/${skill}.png" alt="${spotName}">
      </h5>
      <h6><span class="text-capitalize">${skill}</span> wave</h6>
        <p>${note}</p>
        <button type="button" class="btn btn-sm btn-danger font-weight-bold mr-1" data-toggle="modal" data-target="#${spotID}">MORE INFO</button>
        <a class="btn btn-sm btn-danger font-weight-bold white-link" href="https://maps.google.com/?saddr=Current+Location&daddr=${parkingLat},${parkingLng}&driving" target="_blank">DIRECTIONS</a>
    </div>
  `;

  surfSpotMarker.addListener('click', function() {
    //Set surfSpotMarkerClick to true so 'idle' listener doesn't run addSurfSpotMarkersWrapper when infowindow pans map
    surfSpotMarkerClick = true;
    //Open & close the surfSpotMarker infowindow
    infowindow.setContent(this.html);
    infowindow.open(map, this);
    google.maps.event.addListener(map, "click", function(event) {
      infowindow.close();
    });
  });//END -- surfSpotMarker LISTENER

  buildSurfSpotCards();

  hideAndShowCards();

  //MOUSEENTER OR LEAVE A SPOT CARD, SHOW THE RELEVANT MARKER ON THE MAP
  $(document).on('mouseenter', '.surf-spot-card', function(){
    let id = $(this).attr('data-id');
    highlightSurfSpotMarker(id);
  })//END Surf Spot Card mouseenter function
  .on('mouseleave', '.surf-spot-card', function(){
    let id = $(this).attr('data-id');
    normalSurfSpotMarker(id);
  });//END Surf Spot Card mouseleave function

}//END -- addSpotMarker FUNCTION

////BUILDS SURF SPOT CARDS AND MODAL
function buildSurfSpotCards() {
  //Hide the loading card
  $(".loading-surf-spot-card").hide();

  //Build the surf spots found within the map bounds
  $("#spot-cards").prepend(`
    <div class="card surf-spot-card bright-hover" data-id="${spotID}">
      <img class="card-img tinted-spot-cards" src="images/surf-spot-default-photo.png" alt="${spotName}">
      <div class="card-img-overlay">
        <div class="card-body text-white p-0">
          <a class="white-link" data-toggle="modal" data-target="#${spotID}">
          <h5 class="card-title2">${spotName} - <img id="spot-card-skill-icon" src="public/icon-images/${skill}.png"></h5>
          <h6 class="card-subtitle2 mb-2 text-light"><span class="capitalize">${skill}</span> wave</h6>
          <p class="card-text2 note">${note}</p>
          <button type="button" class="btn btn-sm btn-danger font-weight-bold mr-1" data-toggle="modal" data-target="#${spotID}">
            MORE INFO
          </button>
          </a>
        </div>
      </div>
    </div>

    <div class="modal fade" id="${spotID}" tabindex="-1" role="dialog" aria-labelledby="${spotID}-label" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="surf-spot-title">${spotName} - <img src="public/icon-images/${skill}.png"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>${fullNote}</p>
          </div>
          <div class="modal-footer bg-secondary">
            <a class="btn btn-sm btn-danger mr-auto font-weight-bold" href="https://maps.google.com/?saddr=Current+Location&daddr=${parkingLat},${parkingLng}&driving" target="_blank">DIRECTIONS TO PARKING</a>
          </div>
        </div>
      </div>
    </div>
  `);

}//END -- BUILDS SURF SPOT CARDS AND MODAL


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: zoom,

    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  });//END -- map OBJECT


  //UPDATE MAP AS BOUNDS CHANGE
  google.maps.event.addListener(map, 'idle', function() {
    //Clear array
    latArray = [];
    lngArray = [];

    //Get lat of NE and SW corners of map at current state
    neLat = map.getBounds().getNorthEast().lat();
    swLat = map.getBounds().getSouthWest().lat();
    neLng = map.getBounds().getNorthEast().lng();
    swLng = map.getBounds().getSouthWest().lng();

    //Push lats and lngs into arrays
    latArray.push(neLat, swLat);
    lngArray.push(neLng, swLng);

    //Find the largest and smallest lat and lng
    greaterLat = latArray.sort()[latArray.length - 1];
    smallerLat = latArray.sort()[latArray.length - 2];
    greaterLng = lngArray.sort()[lngArray.length - 2];
    smallerLng = lngArray.sort()[lngArray.length - 1];

    addSurfSpotMarkersWrapper();

    addAccommMarkersWrapper();

    hideAndShowCards();

    //Return surfSpotMarkerClick to false to allow addSurfSpotMarkers() to run on future map 'idle's
    surfSpotMarkerClick = false;
    accommMarkerClick = false;

  });//END -- UPDATE MAP AS BOUNDS CHANGE

  //Listener toggles on/off a checkbox that controls the ability to add markers to map
  toggleMapSearch();

}//END -- initMap() FUNCTION


//Runs through all the conditionals before add
function addSurfSpotMarkersWrapper() {
  //If toggleSurfSpotMarkers button is on, let surfSpotMarkers be added to the map on 'idle' event
  if ($("#toggleSurfSpotMarkers").hasClass("markers-showing")) {
    //If search-toggle button is checked, let markers refresh when map moves
    if ($("#floating-search-toggle").hasClass("map-search-on")) {
      //Dont add markers to the map when an accommMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
      if (!accommMarkerClick) {
        //Don't add markers to the map when a marker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
        if (!surfSpotMarkerClick) {
          //ADD SURF SPOT MARKERS WITHIN MAP BOUNDS
          addSurfSpotMarkers();
        }
      }
    }
  }
}//END -- addSurfSpotMarkersWrapper()


function addAccommMarkersWrapper() {
  //If toggleAccommMarkers button is on, let accommMarkers be added to the map on 'idle' event
  if ($("#toggleAccommMarkers").hasClass("markers-showing")) {
    //If search-toggle button is checked, let markers refresh when map moves
    if ($("#floating-search-toggle").hasClass("map-search-on")) {
      //Don't add markers to the map when a surfSpotMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
      if (!surfSpotMarkerClick) {
        //Don't add markers to the map when an accomMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
        if (!accommMarkerClick) {
          addAccommMarkers();
        }
      }
    }
  }
}//END -- addAccommMarkersWrapper


//On click of #floating-search-toggle (a checkbox), turn OFF ability to add markers to the map (aka run addSurfSpotMarkers())
function toggleMapSearch() {
  $("#floating-search-toggle").click(function() {
    $("#floating-search-toggle").toggleClass("map-search-on");

    //When you toggle the search-map checkbox back on, populate the markers within current map view
    if ($("#floating-search-toggle").hasClass("map-search-on")) {
      addSurfSpotMarkersWrapper();
      addAccommMarkersWrapper();
    }
  });
}




////Call Lessons ON DESTIONATION.HTML
function callLessons() {

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    //Set the SW and NE corners of map on CITY page to query within that area
    bounds: new google.maps.LatLngBounds(swBounds, neBounds),
    keyword: 'surf lessons',
  }, lessonsCallbackV2);

}//END -- callLessons() FUNCTION


////ADD SURF LESSONS TO THE CITY PAGE VIA lessonsCallbackV2
function lessonsCallbackV2(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      place = results[i];

      //Stores the details we want of each surf lesson place
      let detailsRequest = {
        placeId: place.place_id,
        field: ['website', 'formatted_phone_number', 'formatted_address', 'review', 'rating', 'name', 'geometry'],
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(detailsRequest, lessonsDetailsCallback);

    }//END -- FORLOOP OF results.length
  } else {
    //Handle this error if there is a problem
    console.error("Error in lessonsCallbackV2", status);
    if (status == "ZERO_RESULTS") {

      lessonsUnavailable();

    }//END -- SHARE ZERO RESULTS WITH PEOPLE
  }
}//END -- SURF LESSONS CALLBACK

//IF LESSONS CALLBACK ERROR STATUS = ZERO_RESULTS, DISABLE BUTTON AND ALERT USER WHEN CLICKING ON IT
function lessonsUnavailable() {
  $("#toggleLessonCards").addClass("off");
  $("#toggleLessonCards").click(function() {
    alert('👋 I looked for surf lessons here, but there\'s none available. Check another city to find your perfect surf trip with surf lessons! 🤙');
  });
}
//END -- IF LESSONS CALLBACK ERROR STATUS = ZERO_RESULTS, DISABLE BUTTON AND ALERT USER WHEN CLICKING ON IT

//lessonsDetailsCallback FUNCTION
function lessonsDetailsCallback(placeDetails, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    //Check if place has more than one review and greater than 3 star rating as a quality check before putting on Surf Trip List
    if (placeDetails.reviews !== undefined && placeDetails.reviews.length > 1 && placeDetails.rating !== undefined && placeDetails.rating > 3) {
      //Check if .gov is in the website URL. If it's not (indexOf = -1) then we can use it.
      if (placeDetails.website !== undefined && placeDetails.website.indexOf(".gov") == -1) {
        //Check if  is in the placeDetails name. If it's not (indexOf = -1) then we can use it.
        if (placeDetails.name.indexOf("Naval Postgraduate School") == -1 && placeDetails.name.indexOf("Stevenson School (Grades 9-12)") == -1 && placeDetails.name.indexOf("Boardsports California") == -1 && placeDetails.name.indexOf("Shape") == -1 && placeDetails.name.indexOf("kite") == -1 && placeDetails.name.indexOf("Kite") == -1 && placeDetails.name.indexOf("Yoga") == -1 && placeDetails.name.indexOf("Bike") == -1 && placeDetails.name.indexOf("Bicycl") == -1 && placeDetails.name.indexOf("fitness") == -1) {
          id = placeDetails.id;
          name = placeDetails.name;
          rating = placeDetails.rating;
          website = placeDetails.website;
          phone = placeDetails.formatted_phone_number;
          address = placeDetails.formatted_address;
          //Gets the most recent review.
          note = placeDetails.reviews[0].text;
          review1 = placeDetails.reviews[0].text;
          // review2 = placeDetails.reviews[1].text;
          // review3 = placeDetails.reviews[2].text;
          reviewCount = placeDetails.reviews.length;
          lat = placeDetails.geometry.location.lat();
          lng = placeDetails.geometry.location.lng();
          coords = {lat: placeDetails.geometry.location.lat(), lng: placeDetails.geometry.location.lng()};

          addLessonMarkerV2(lessonMarker, map);

          //Add lessonMarkers to array to allow for hide/show functionality
          lessonMarkers.push(lessonMarker);
          //Creates the lessonMarker info window
          infowindow = new google.maps.InfoWindow({
          });

          lessonMarker.addListener('click', function(){
            //Opens the lessonMarker infowindow
            //setContent won't accept ES6. The // syntax below is to make referencing easier.
            // infowindow.setContent(`
            //   <div id="iwcontent">
            //     <h5 class="mb-0">${name}</h5>
            //     <h6><i class="fas fa-heart"></i> ${rating} of 5 (${reviewCount} reviews)</h6>
            //     <img id='iwPhoto' src="images/surf-lesson-default-photo.png" alt="${name}"><br>
            //     <button type="button" class="btn btn-sm btn-danger font-weight-bold mt-2 mr-1" data-toggle="modal" data-target="#${id}">MORE INFO</button>
            //     <button class="btn btn-sm btn-danger mt-2 mr-2"><a class="white-link font-weight-bold" href="https://maps.google.com/?saddr=Current+Location&daddr=${lat},${lng}&driving" target="_blank">DIRECTIONS</a></button>
            //   </div>
            // `);
            infowindow.setContent('<div id="iwcontent"><h5 class="mb-0">'+placeDetails.name+'</h5><h6><i class="fas fa-heart"></i> '+placeDetails.rating+' of 5 ('+placeDetails.reviews.length+' reviews)</h6><img id="iwPhoto" src="images/surf-lesson-default-photo.png" alt="'+placeDetails.name+'"><br><button type="button" class="btn btn-sm btn-danger font-weight-bold mt-2 mr-1" data-toggle="modal" data-target="#'+placeDetails.id+'">MORE INFO</button><button class="btn btn-sm btn-danger mt-2"><a class="white-link font-weight-bold" href="https://maps.google.com/?saddr=Current+Location&daddr='+placeDetails.geometry.location.lat()+','+placeDetails.geometry.location.lng()+'&driving" target="_blank">DIRECTIONS</a></button></div>')
            infowindow.open(map, this);
            //Close the lessonMarker infowindow
            google.maps.event.addListener(map, "click", function(event){
              infowindow.close();
            });//END -- CLOSE lessonMarker LISTENER
          });//END -- OPEN lessonMarker LISTENER

          trimName();

          trimNote();

          buildLessonCards();

          $(document).on('mouseenter', '.lesson-spot-card', function(){
            let id = $(this).attr('data-id');
            highlightMarker(id);
          })//END Lesson Card mouseenter function
          .on('mouseleave', '.lesson-spot-card', function(){
            let id = $(this).attr('data-id');
            normalMarker(id);
          });//END Lesson Card mouseleave function

        }//END -- NAME FILTER
      }//END -- WEBSITE FILTER
    }//END -- REVIEWS FILTER
  }//END -- PlacesServiceStatus.OK FOR lessonsDetailsCallback

}//END -- lessonsDetailsCallback FUNCTION


////Set the lessonMarkers on the map
function addLessonMarkerV2(props, map) {
  lessonMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: 'public/icon-images/surfLesson.png',
    optimized: false,
    zIndex: 4,
    id: id,
  });
}//END -- addLessonMarkerV2 FUNCTION


////BUILD LESSON CARDS AND MODALS
function buildLessonCards () {
  $("#spot-cards").prepend(`
    <div class="card lesson-spot-card bright-hover" data-id="${id}">
      <img class="card-img tinted-spot-cards" src="images/surf-lesson-default-photo.png" alt="${name}">
      <div class="card-img-overlay">
        <div class="card-body text-white p-0">
        <a class="white-link" data-toggle="modal" data-target="#${id}">
          <h5 class="card-title2">${name}</h5>
          <h6 class="card-subtitle2 mb-2 text-light"><i class="fas fa-heart"></i> ${rating} of 5 (${reviewCount} reviews)</h6>
          <p class="card-text2 note">"${note}"</p>
          <button type="button" class="btn btn-sm btn-danger font-weight-bold mr-1" data-toggle="modal" data-target="#${id}">MORE INFO</button>
        </a>
        </div>
      </div>
    </div>

    <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${name}-label" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header d-block mb-0">
            <div class="d-flex">
              <h5 class="modal-title" id="lesson-name">${name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <h6 class="modal-title"><i class="fas fa-heart"></i> ${rating} of 5 (${reviewCount} reviews)</h6>
            <p>${phone}</p>
          </div>
          <div class="modal-body">
            <p>"${review1}"</p>
          </div>
          <div class="modal-footer bg-secondary">
            <button class="btn btn-sm btn-danger mr-2"><a class="white-link font-weight-bold" href="${website}" target="_blank">BOOK</a></button>
            <button class="btn btn-sm btn-danger"><a class="white-link font-weight-bold" href="https://maps.google.com/?saddr=Current+Location&daddr=${lat},${lng}&driving" target="_blank">DIRECTIONS</a></button>
          </div>
        </div>
      </div>
    </div>
  `);
}//END -- BUILD LESSON CARDS AND MODALS




////ADD ACCOMM MARKERS TO THE CITY PAGE
function addAccommMarkers() {
  //Remove old accomm cards from the card list
  $("#spot-cards").find('.accomm-spot-card').remove();
  //Remove surf spot markers
  setMapOnAccommMarkers(null);
  accommMarkers = [];
  //Show loading accomm cards if accomms has .cards-showing
  if ($("#toggleAccommCards").hasClass("cards-showing")) {
    $("#spot-cards").prepend(`
      <div class="card bright-hover loading-accomm-card" data-id="loading">
        <img class="card-img tinted-spot-cards" src="images/city-images/bukit-peninsula.jpg" alt="loading-accommodations">
        <div class="card-img-overlay">
          <div class="card-body text-white p-0">
            <h5 class="card-title2">LOADING ACCOMMODATIONS...</h5>
          </div>
        </div>
      </div>
    `);
  }

  //QUERY accommMarkers (priceMarkers) COLLECTION TO ADD accommMarkers
  db.collection("priceMarkers").where("coords.lat", "<=", greaterLat).where("coords.lat", ">=", smallerLat).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      data = doc.data();
      coords = data.coords;
      accommURL = data.bookingURL;
      photo = data.photo;
      accommType = data.accommType;
      bedAmount = data.bedAmount;
      bedWord = data.bedWord;
      guestAmount = data.guestAmount;
      guestWord = data.guestWord;
      title = data.title;
      price = data.price;
      view = data.view;
      proximity = data.proximity;
      nearbySurfSpot = data.surfSpot.replace(/-/g,' ');

      //If the accomm-spot is within the lat/lng map bounds, run addAccommMarker().
      if (coords.lng <= greaterLng && coords.lng >= smallerLng) {
        addAccommMarker(accommMarker, map);
      }

    });//END -- querySnapshot OF accommMarkers
  }).then(function() {
    //If accommMarkers array holds 0 values, show card that tells user there are no surf spots in this map view.
    if (accommMarkers.length == 0) {
      //Make sure Accomm Cards are showing (.cards-showing)
      if ($("#toggleAccommCards").hasClass("cards-showing")) {
        //Remove old no-accomm-cards from the card list
        $("#spot-cards").find('.loading-accomm-card').remove();
        $(".loading-accomm-card").hide();

        $("#spot-cards").append(`
          <div id="no-accomms-card" class="card accomm-spot-card bright-hover" data-id="loading">
            <img class="card-img tinted-spot-cards" src="images/city-images/bukit-peninsula.jpg" alt="no-accommodations-in-map-view">
            <div class="card-img-overlay">
              <div class="card-body text-white p-0">
                <h5 class="card-title2">No accommodations here.</h5>
                <h5 class="card-text2 note mt-2">To discover more surf accommodations, move the map somewhere else or refresh the page.</h6>
              </div>
            </div>
          </div>
        `);
      }
    }//END -- spotMarkers.length CONDITIONAL

  });//END -- QUERY accommMarkers (priceMarkers) COLLECTION TO ADD accommMarkers

}//END -- addAccommMarkers FUNCTION


////ADDS AN ACCOMM MARKER TO THE MAP
function addAccommMarker(props, map) {
  //ADD accommMarkers TO MAP
  accommMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: 'images/pm/' + price + '.png',
    id: title,
    price: price,
  });

  //ADD EACH accommMarker TO THE ARRAY TO ALLOW FOR HIDE/SHOW OF accommMakers
  accommMarkers.push(accommMarker);

  //CREATE THE accommMarker infowindow
  infowindow = new google.maps.InfoWindow({
  });

  //SET THE infowindow HTML/CSS
  accommMarker.html = `
  <div class="infowindow">
     <a href="${accommURL}" target="_blank"><img class="w-100" src="images/accomm-images/${photo}"></img></a>
     <b><p class="mt-2 mb-0 nounderline text-uppercase" style="color:brown"><small>${accommType} • ${bedAmount} ${bedWord} | ${guestAmount} ${guestWord}</small></p></b>
     <h5 class="my-0 text-capitalize">${title}</h5>
     <b><p class="mt-0 mb-2">$${price}/n • ${view} | ‍${proximity}</p></b>
     <a class="btn btn-sm btn-danger font-weight-bold" href="${accommURL}" target="_blank">BOOK</a>
   </div>
  `;

  accommMarker.addListener('click', function() {
    //Set accommMarkerClick to true so 'idle' listener doesn't run addAccommMarkersWrapper() when infowindow pans map
    accommMarkerClick = true;
    //Open & close the accommMarker infowindow
    infowindow.setContent(this.html);
    infowindow.open(map, this);
    google.maps.event.addListener(map, "click", function(event) {
      infowindow.close();
    });
  });//End of accommMarker listener

  trimHeader();

  buildAccommCards();

  hideAndShowCards();

  $(document).on('mouseenter', '.accomm-spot-card', function() {
    let id = $(this).attr('data-id');
    highlightAccommMarker(id);
  })//END Accomm Card mouseenter function
  .on('mouseleave', '.accomm-spot-card', function(){
    let id = $(this).attr('data-id');
    normalAccommMarker(id);
  });//END Accomm Card mouseleave function

}//END -- addAccommMarker FUNCTION


////BUILD THE ACCOMM CARDS
function buildAccommCards() {
  //Hide the accomm loading card
  $(".loading-accomm-card").hide();

  //Build the accomm cards within map bounds
  $("#spot-cards").prepend(`
    <div class="card accomm-spot-card bright-hover" data-id="${title}">
        <img class="card-img tinted-spot-cards w-100" src="images/accomm-images/${photo}" alt="${title}">
        <div class="card-img-overlay">
          <div class="card-body p-0">
            <a class="white-link" href="${accommURL}" target="_blank">
              <p class="card-subtitle2 mb-0 text-light text-uppercase"><small>${accommType} • ${bedAmount} ${bedWord} | ${guestAmount} ${guestWord}</small></p>
              <h5 class="card-title2 cut-header">${title}</h5>
              <p class="accomm-card-text mt-1 mb-0 text-capitalize">Near ${nearbySurfSpot}</p>
              <p class="accomm-card-text mb-0">${proximity}</p>
              <p class="accomm-card-text mb-0">${view}</p>
              <p class="accomm-card-text">$${price}/n</p>
              <button class="btn btn-sm btn-danger mt-1 mr-2"><a class="white-link font-weight-bold" href="${accommURL}" target="_blank">BOOK</a></button>
            </a>
          </div>
        </div>
    </div>
  `);
}//END -- BUILD THE ACCOMM CARDS




////BUILD CITY PAGE BASED ON CITY PARAM
if (cityParam !== null) {
  db.collection("city").doc(cityParam).get().then(function(doc) {
    data = doc.data();
    city = doc.id.replace(/-/g,' ');
    mapCenter = data.cityCenter;
    zoom = data.zoom;
    swBounds = data.swBounds;
    neBounds = data.neBounds;

    //Add city's name next to logo
    $("#breadcrumb").append(
      `${city}`
    );

    initMap();

    //Add #map-wrapper back once initMap has ran, to hide map near immediately after clicking into new city on mobile
    setTimeout(function() {
      $("#map-wrapper").addClass("d-none");
    }, 100);

  });//END -- BUILD CITY PAGE BASED ON CITY PARAM
}
