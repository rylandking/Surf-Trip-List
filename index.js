//Initalize Cloud Firestore through Firebase
const db = firebase.firestore();
const storage = firebase.storage();
let surfSpotDefaultPhoto = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/images%2Fsurf-spot-default-photo.png?alt=media&token=ed4077a4-bdf0-47a2-8dac-ecb0552c76c7";
const lessonsDefaultPhoto = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/images%2Fsurf-lesson-default-photo.png?alt=media&token=e05b69b4-a7b3-4df4-a042-30260a7dcca1";
const accommDefaultPhoto = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/city%2Fbukit-peninsula.jpg?alt=media&token=706726d8-35cd-434c-9f40-e1493b4ce674";
const allCardsOffPhoto = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/city%2Fsalina-cruz.jpg?alt=media&token=b3f2d278-5e8d-4951-903a-0846eb62ac68";
const beginnerMarker = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/markers%2Fbeginner.png?alt=media&token=ccc98813-735a-4b60-b10b-414f33e1bd58";
const intermediateMarker = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/markers%2Fintermediate.png?alt=media&token=97b3ab2e-d912-4e61-9014-6b755145d50a";
const advancedMarker = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/markers%2Fadvanced.png?alt=media&token=8bf6550f-d482-4086-91c6-1d3460719e16";
const expertMarker = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/markers%2Fexpert.png?alt=media&token=7bacc68e-8089-4192-8765-7eab996e71a4";
const surfSchoolMarker = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/markers%2Fsurf-lessons.png?alt=media&token=5505ee2f-be62-4d32-80b9-d657e89a8c6a";
const favIcon = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/logos%2Ffavicon.ico?alt=media&token=07d2e7a4-9cc0-473e-87e9-005ed4fec5ad";
const logoBlackTransparent = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/logos%2Flogo-black-transparent.png?alt=media&token=608b1e9e-d9c4-4ef9-969d-f28d08e11015";
const logoRedTransparent = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/logos%2Flogo-red-transparent.png?alt=media&token=1f49b9e3-783d-4d9e-a82d-404fc81da74a";
const logoWhiteTransparent = "https://firebasestorage.googleapis.com/v0/b/surf-trip-list.appspot.com/o/logos%2Flogo-white-transparent.png?alt=media&token=623d87bf-cbbe-41eb-82f1-e3f7769c84fa";
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
let cityDB;
let mapCenter;
let zoom;
let surfSpotID;
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
let lessonMarkerClick;
let accommMarkerClick;
let input;
let autoComplete;
let viewport;
let place;
let bounds;
let landingImage;
let cityImage;
let skillMarker;
let accommsHere;
let badge;
let surfSpotPhoto;
let attribution;
let attributionLink;
let surferAttribution;
let surferAttributionLink;
let useCustomPhotos;
let ssProps;
let surfSpotPhotoID;
let surfSpotSlideCount = 1;
let onePhotoOfSpot;
let accommProps;





////POPULATE CARDS ON HOME PAGE
db.collection("city").where("beta", "==", true).get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    data = doc.data();
    cityID = doc.id;
    city = doc.id.replace(/-/g,' ');
    region = data.region.replace(/-/g,' ');
    photo = data.cityimage;

    cityProps = {
      cityID: cityID,
      city: city,
      region: region,
    }

    buildCityCards(cityProps);

  });
});//END -- POPULATE CARDS ON HOME PAGE


//BUILD CITY CARDS
function buildCityCards(cityProps) {
  //Create a reference for each city photo in Firestore storage
  cityImage = storage.ref('city/' + cityProps.cityID + '.png');

  //Get each cityImage from Firestore storage and
  cityImage.getDownloadURL().then(function(cityImage) {
    $("#city-cards").append(
      `<div id="city-card" class="card city-card bright-hover text-white p-1 pt-0 mb-2 col-xs-12 col-sm-6 col-md-4 col-lg-3" data-id="${cityProps.cityID}">
        <img class="card-img tinted" src="${cityImage}" alt="${cityProps.city}">
        <a class="white-link" href="city.html">
          <div class="card-img-overlay">
            <h4 class=" surf-spot-card-title position-relative">${cityProps.city}</h4>
            <p class="card-subtitle position-relative">${cityProps.region}</p>
          </div>
        </a>
      </div>`
    );
  });

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


//Opens new window with city name (and coords if it's from a search) in the query perams
function redirectPage(city, lat, lng) {
  if (lat !== undefined) {
    window.location = `city.html?cityS=${city}&lat=${lat}&lng=${lng}`;
  } else {
    window.location = `city.html?cityDB=${city}`
  }
  window.city = city;
  window.lat = lat;
  window.lng = lng;
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
//City name stored in Firestore
cityDB = getParameterByName('cityDB');
//City name from search
cityS = getParameterByName('cityS');
lat = getParameterByName('lat');
lng = getParameterByName('lng');
//END -- PUT CITY IN QUERY PARAMS AFTER CLICKING ON CARD




////TRIM CARD NOTE LENGTH TO 200 CHARACTERS
function trimNote() {
  if (note.length > 160) {
    note = note.substr(0, 160);
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
        <img class="card-img tinted-spot-cards" src="${allCardsOffPhoto}" alt="no-surf-spots-in-map-view">
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



////SET MARKER IMG URLS
function setSkillMarker() {
  if (skill == "beginner") {
    skillMarker = beginnerMarker;
  } else if (skill == "intermediate") {
    skillMarker = intermediateMarker;
  } else if (skill == "advanced") {
    skillMarker = advancedMarker;
  } else if (skill == "expert") {
    skillMarker = expertMarker;
  }
}

function setHighlightedSkillMarkers() {
  if (surfSpotMarkers[i].skill !== undefined) {
    if (surfSpotMarkers[i].skill == "beginner") {
      skillMarker = beginnerMarker;
    } else if (surfSpotMarkers[i].skill == "intermediate") {
      skillMarker = intermediateMarker;
    } else if (surfSpotMarkers[i].skill == "advanced") {
      skillMarker = advancedMarker;
    } else if (surfSpotMarkers[i].skill == "expert") {
      skillMarker = expertMarker;
    }
  }
}



////HOVER OVER CARD, CHANGE THE SURF SPOT MARKER ON THE MAP
function highlightMarker(id) {
  for (i in surfSpotMarkers){
    if(surfSpotMarkers[i].id == id) {
      setHighlightedSkillMarkers();
      surfSpotMarkers[i].setIcon({url: skillMarker});
      surfSpotMarkers[i].setOptions({zIndex:9999999});
    }
  }

  for (i in lessonMarkers){
    if(lessonMarkers[i].id == id) {
      lessonMarkers[i].setIcon({url: surfSchoolMarker});
      lessonMarkers[i].setOptions({zIndex:9999999});
    }
  }

  for (i in accommMarkers){
    if(accommMarkers[i].id == id) {
      highlightAccommMarkers(i)
    }
  }
}


function returnToNormalMarkerSize(id) {
  for (i in surfSpotMarkers){
    if(surfSpotMarkers[i].id == id) {
      setHighlightedSkillMarkers();
      surfSpotMarkers[i].setIcon({url: skillMarker, scaledSize: new google.maps.Size(30, 30)})
      surfSpotMarkers[i].setOptions({zIndex:2});
    }
  }

  for (i in lessonMarkers){
    if(lessonMarkers[i].id == id) {
      lessonMarkers[i].setIcon({url: surfSchoolMarker, scaledSize: new google.maps.Size(30, 30)});
      lessonMarkers[i].setOptions({zIndex:2});
    }
  }

  for (i in accommMarkers){
    if(accommMarkers[i].id == id) {
      //The variable i has to be passed in as a paramenter to be able to highlight the correct marker
      returnAccommMarkersToNormalSize(i)
    }
  }
}//END -- HOVER OVER CARD, CHANGE THE SURF SPOT MARKER ON THE MAP


//Build the large accomm markers that show up on relevant card mouseenter
function highlightAccommMarkers(i) {
  accommImage = storage.ref('accomm-markers/' + accommMarkers[i].price + '.png');
  // Get the correct accommMarker download URL
  accommImage.getDownloadURL().then(function(url) {
    //Size the two digit and three digit accomm markers differently
    if (accommMarkers[i].price < 100) {
      accommMarkers[i].setIcon({url: url, scaledSize: new google.maps.Size(67, 60)});
    } else {
      accommMarkers[i].setIcon({url: url, scaledSize: new google.maps.Size(85, 60)});
    }
    accommMarkers[i].setOptions({zIndex:999999});
  });
}


//Build the normal accomm markers that show up on relevant card mouseleave
function returnAccommMarkersToNormalSize(i) {
  accommImage = storage.ref('accomm-markers/' + accommMarkers[i].price + '.png');

  // Get the correct accommMarker download URL
  accommImage.getDownloadURL().then(function(url) {
    //Size the two digit and three digit accomm markers differently
    if (accommMarkers[i].price < 100) {
      accommMarkers[i].setIcon({url: url, scaledSize: new google.maps.Size(36, 32)});
    } else {
      accommMarkers[i].setIcon({url: url, scaledSize: new google.maps.Size(45, 32)});
    }
    accommMarkers[i].setOptions({zIndex:2});
  });

}



function onCardHoverHighlightMarker() {
  //Mouseenter or mouseleave a SPOT CARD, show relevant marker on map
  $(document).on('mouseenter', '.surf-spot-card', function(){
    let id = $(this).attr('data-id');
    highlightMarker(id);
  })
  .on('mouseleave', '.surf-spot-card', function(){
    let id = $(this).attr('data-id');
    returnToNormalMarkerSize(id);
  });

  //Mouseenter or mouseleave a LESSON CARD, show relevant marker on map
  $(document).on('mouseenter', '.lesson-spot-card', function(){
    let id = $(this).attr('data-id');
    highlightMarker(id);
  })
  .on('mouseleave', '.lesson-spot-card', function(){
    let id = $(this).attr('data-id');
    returnToNormalMarkerSize(id);
  });

  //Mouseenter or mouseleave an ACCOMM CARD, show relevant marker on map
  $(document).on('mouseenter', '.accomm-spot-card', function() {
    let id = $(this).attr('data-id');
    highlightMarker(id);
  })
  .on('mouseleave', '.accomm-spot-card', function(){
    let id = $(this).attr('data-id');
    returnToNormalMarkerSize(id);
  });
}

onCardHoverHighlightMarker();





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
        <img class="card-img tinted-spot-cards" src="${surfSpotDefaultPhoto}" alt="loading-surf-spots">
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
        surfSpotID = doc.id;
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
        localism = data.localism;
        crowd = data.crowd;
        barrel = data.barrel;
        skill = data.skill;
        bottom = data.bottom;

        //Build a quick description for surf spot cards
        writeQuickSurfSpotDescription();

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
            <img class="card-img tinted-spot-cards" src="${surfSpotDefaultPhoto}" alt="no-surf-spots-in-map-view">
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
  //Set the skill icon
  setSkillMarker();

  //Add surfSpotMarkers to map
  surfSpotMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: {url: skillMarker, scaledSize: new google.maps.Size(30, 30)},
    id: surfSpotID,
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
        <span class="text-uppercase">${spotName}</span> - <img class="normal-marker-size mb-1" src="${skillMarker}" alt="${spotName}">
      </h5>
      <h6><span class="text-capitalize">${skill}</span> wave</h6>
        <p>${note}</p>
        <button type="button" class="btn btn-sm btn-danger font-weight-bold mr-1" data-toggle="modal" data-target="#${surfSpotID}-modal">MORE INFO</button>
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

  //useCustomPhotos set to false as default value for first surfSpotID passed through areCustomSurfSpotPhotosAvailable. Explained: (https://www.davidbcalhoun.com/2009/ways-of-passing-data-to-functions-in-javascript/)
  useCustomPhotos = false;

  //Surf spot variables to pass between functions
  ssProps = {
    surfSpotID: surfSpotID,
    spotName: spotName,
    surfSpotDefaultPhoto: surfSpotDefaultPhoto,
    waveDir: waveDir,
    waveType: waveType,
    note: note,
    skill: skill,
    fullNote: fullNote,
    parkingLat: parkingLat,
    parkingLng: parkingLng,
    badge: badge,
    waveDir: waveDir,
    waveType: waveType,
    skillMarker: skillMarker,
  }

  //Build the surf spot card skeleton
  buildSurfSpotCard(ssProps);

  //Get relevant surf spot photos
  areCustomSurfSpotPhotosAvailable(ssProps);

  hideAndShowCards();

}//END -- addSpotMarker FUNCTION



//Write a quick description for surf spot cards
function writeQuickSurfSpotDescription() {
  //Quick Description: Adjective
  if (barrel == "yes") {
    badge = "badge-dark";
  } else if (skill == "expert" || skill == "advanced") {
    badge = "badge-dark";
  } else if (skill == "intermediate") {
    badge = "badge-primary";
  } else if (skill == "beginner") {
    badge = "badge-success";
  }

  //Quick Description: WaveDirection
  if (waveDir == "right") {
    waveDir == "right";
  } else if (waveDir == "left") {
    waveDir = "left";
  } else if (waveDir == "both") {
    waveDir = "right and left"
  }

  //Quick Description: waveType
  if (waveType == "beach") {
    waveType = "beach break";
  } else if (waveType == "point") {
    waveType = "point break";
  } else if (waveType == "reef") {
    waveType = "reef break";
  } else if (waveType == "rockreef") {
    waveType = "rockreef break";
  }
}





//Check if custom photos are available
function areCustomSurfSpotPhotosAvailable(ssProps) {
  //In the surfSpotImages collection get each document that has the surfSpot field with relevant surfSpotID
  db.collection("surfSpotImages").where("surfSpot", "==", surfSpotID).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          data = doc.data();
          surfSpotPhotoID = doc.id;
          surfSpotPhoto = data.image;
          surfSpotPhotoLocation = data.surfSpot;
          surfSpotCoverPhoto = data.coverImage;
          //Update useCustomPhotos to true so that the relevant surfSpotID doesn't build another card with default photos in the following .then(function(){})
          useCustomPhotos = true;
          attribution = data.attribution;
          attributionLink = data.attributionLink;
          surferAttribution = data.surferAttribution;
          surferAttributionLink = data.surferAttributionLink;

          //Build surf spot cards with the custom photo. Pass the ssProps object that holds all necessary variables
          addSurfSpotPhotosToCards(ssProps);

      });
  }).then(function() {
    //If useCustomPhotos is NOT true, then buildSurfSpotCards with default photo
    if (useCustomPhotos !== true) {
      surfSpotPhoto = surfSpotDefaultPhoto;
      attribution = " ";
      //Build surf spot cards with the default photo. Pass the ssProps object that holds all necessary variables
      addSurfSpotPhotosToCards(ssProps);
    }
    //Reset useCustomPhotos to false to restart the loop
    useCustomPhotos = false;
  });
}



//IN PROGRESS: BUILD OF THE NEW CARDS
//Build the card skeleton
function buildSurfSpotCard(ssProps) {
  //Make badge say "expert only" for expert waves
  if (ssProps.skill == "expert") {
    ssProps.skill = "expert only";
  }

  //Hide the loading card
  $(".loading-surf-spot-card").hide();

  $("#spot-cards").prepend(`
    <!-- SURF SPOT CARD -->
    <a class="inherit-link surf-spot-modal-trigger" data-toggle="modal" data-target="#${ssProps.surfSpotID}-modal">
      <div class="card photo-card surf-spot-card illuminate-hover" data-id="${ssProps.surfSpotID}">

        <!-- SURF SPOT IMAGE CAROUSEL -->
        <div id="${ssProps.surfSpotID}" class="carousel slide" data-ride="carousel" data-interval="false" data-photo-location="${ssProps.surfSpotID}">
          <ol class="carousel-indicators" data-carousel-indicators="${ssProps.surfSpotID}">
          </ol>

          <div class="carousel-inner" data-carousel-inner="${ssProps.surfSpotID}">
          </div>

          <a class="carousel-control-prev" href="#${ssProps.surfSpotID}" role="button" data-slide="prev" data-prev="${ssProps.surfSpotID}">
            <span><i class="fas fa-chevron-left carousel-controls" aria-hidden="true"></i></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#${ssProps.surfSpotID}" role="button" data-slide="next" data-next="${ssProps.surfSpotID}">
            <span><i class="fas fa-chevron-right carousel-controls" aria-hidden="true"></i></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <!-- SURF SPOT DESCRIPTORS -->
        <div class="card-body mx-0 p-0 pt-2">
          <small class="text-muted card-preheader-text font-weight-bold">${ssProps.waveDir} ${ssProps.waveType}</small>
          <h5 class="card-title card-title-text font-weight-bold">${ssProps.spotName}</h5>
          <span class="badge card-badge ${ssProps.badge} text-uppercase mb-1">${ssProps.skill}</span>
          <p class="card-note">${ssProps.note}</p>
        </div>
      </div>
    </a>

    <!-- SURF SPOT MODAL -->
    <div class="modal fade" id="${ssProps.surfSpotID}-modal" tabindex="-1" role="dialog" aria-labelledby="${ssProps.surfSpotID}-label" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="surf-spot-title">${ssProps.spotName} - <img class="normal-marker-size" src="${ssProps.skillMarker}"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>${ssProps.fullNote}</p>
          </div>
          <div class="modal-footer bg-secondary">
            <a class="btn btn-sm btn-danger mr-auto font-weight-bold" href="https://maps.google.com/?saddr=Current+Location&daddr=${ssProps.parkingLat},${ssProps.parkingLng}&driving" target="_blank">DIRECTIONS TO PARKING</a>
          </div>
        </div>
      </div>
    </div>
  `);

}//END -- buildSurfSpotCard()



//If surferAttribution is not available, don't show the "S: " on the photo
function showOrHideSurferAttribution() {
  if (surferAttribution !== undefined) {
    if (surferAttribution.length < 4) {
      surferAttribution = " ";
    }
  }
}


//Build the first photo you see representing a surf spot
function buildSurfSpotCoverPhoto(ssProps) {
  //If surferAttribution is not available, don't show the "S: " on the photo
  showOrHideSurferAttribution();
  //Add dot indicator for the cover photo
  $("[data-carousel-indicators='" + ssProps.surfSpotID + "']").prepend(`
      <li data-target="#${ssProps.surfSpotID}" data-slide-to="0"></li>
  `);
  //Add the cover photo
  $("[data-carousel-inner='" + ssProps.surfSpotID + "']").prepend(`
      <div class="carousel-item active">
        <img class="d-block card-custom-image" src="${surfSpotPhoto}" alt="${ssProps.spotName}">
        <small class="card-photo-credit font-weight-bold">
          <a target="_blank" onclick='window.open("${surferAttributionLink}");' class="inherit-link">
            <p class="m-0">${surferAttribution}</p>
          </a>
          <a target="_blank" onclick='window.open("${attributionLink}");' class="inherit-link">
            <p>P: ${attribution}</p>
          </a>
        </small>
      </div>
  `);
  //Set onePhotoOfSpot to 'true' because this is the first photo to be added to a surf spot card
  onePhotoOfSpot = true;
}



//Add photos to surf spot card
function addSurfSpotPhotosToCards(ssProps) {
  //If coverImage set to 'true' use photo as cover photo
  if (surfSpotPhoto == surfSpotDefaultPhoto) {
    //Build the surf spot cover photo
    buildSurfSpotCoverPhoto(ssProps);
  //If coverImage set to 'true' use photo as cover photo
  } else if (surfSpotCoverPhoto == true) {
    //Build the surf spot cover photo
    buildSurfSpotCoverPhoto(ssProps);
  //If coverImage set to 'false' use photo as part of the slideshow
  } else {
    //If surferAttribution is not available, don't show the "S: " on the photo
    showOrHideSurferAttribution()
    //Add dot indicators for the photos
    $("[data-carousel-indicators='" + ssProps.surfSpotID + "']").prepend(`
        <li data-target="#${ssProps.surfSpotID}" data-slide-to="${surfSpotSlideCount}"></li>
    `);
    //Add each of the photos
    $("[data-carousel-inner='" + ssProps.surfSpotID + "']").prepend(`
        <div class="carousel-item">
          <img class="d-block card-custom-image" src="${surfSpotPhoto}" alt="${ssProps.spotName}">
          <small class="card-photo-credit font-weight-bold">
            <a target="_blank" onclick='window.open("${surferAttributionLink}");' class="inherit-link">
              <p class="m-0">${surferAttribution}</p>
            </a>
            <a target="_blank" onclick='window.open("${attributionLink}");' class="inherit-link">
              <p>P: ${attribution}</p>
            </a>
          </small>
        </div>
    `);
      surfSpotSlideCount++
      //Set onePhotoOfSpot to 'false' since this adds second or greater photo to the surf spot card
      onePhotoOfSpot = false;

  }//END -- conditional

  //Set listener show and hide prev and next controls on mouseenter/leave
  showCarouselControlsOnHover(ssProps);
  //Hide prev, next and indicators on card load
  hideCarouselControls(ssProps);

}//END -- addSurfSpotPhotosToCards()


//Show prev and next controls on mouseenter/leave of surf spot photo
function showCarouselControlsOnHover(ssProps) {
  //If the surf spot card has one photo (true), never show prev and next controls. If false, show prev and next controls on mouseenter/leave
  if (onePhotoOfSpot == false) {
    $(document).on('mouseenter', '[data-photo-location="' + ssProps.surfSpotID + '"]', function(){
      $('[data-prev="' + ssProps.surfSpotID + '"]').show();
      $('[data-next="' + ssProps.surfSpotID + '"]').show();
    })
    .on('mouseleave', '[data-photo-location="' + ssProps.surfSpotID + '"]', function(){
      //Hides prev and next arrows on surf spot photos in surf spot card
      hideCarouselControls(ssProps);
    });
  }
}

//Hides prev and next arrows on surf spot photos in surf spot card
function hideCarouselControls(ssProps) {
  //If window is bigger than mobile, hide the prev/next controls on page load. If window is mobile (less than 600px), show the prev hide controls on page load.
  if ($(window).width() > 600) {
    $('[data-prev="' + ssProps.surfSpotID + '"]').hide();
    $('[data-next="' + ssProps.surfSpotID + '"]').hide();
  }
}





////INITALIZE GOOGLE MAPS
function initMap() {

  if (cityS !== null) {
    zoom = 12;
  }

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
  } );//END -- map OBJECT

  //IF SEARCH BAR IS NOT EMPTY WITH TEXT, INITALIZE AUTOCOMPLETE
  if ($(".search-input").value !== null) {

    //If cityDB or cityS exist (...on city page), use the city.html input #searchInput
    if (cityDB !== null || cityS !== null) {
      //SELECT WHAT'S TYPED INTO THE SEARCH BOX
      input = document.getElementById('searchInput');
      //If it's on mobile and not on city.html, use #mobileSearchInput
    } else if (cityDB == null && cityS == null && $(window).width() < 960) {
      input = document.getElementById('mobileSearchInput');
      //If it's on desktop and not on city.html, use the index.html #searchInput
    } else {
      input = document.getElementById('searchInput');
    }//END -- Conditional for which input to use

    //BIAS AUTOCOMPLETE RESULTS WITHIN THESE BOUNDS
    bounds = new google.maps.LatLngBounds (
      new google.maps.LatLng(31.293808, -122.260797), //sw
      new google.maps.LatLng(39.990799, -116.374700) //ne
    );

    //Only show cities (geocodes) in the autocomplete and bias results within the bounds set in the variable bounds
    options = {
      types: ['geocode'],
      bounds: bounds,
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    //LISTEN FOR WHEN A PLACE IS SELECTED FROM THE AUTOCOMPLETE
    autocomplete.addListener('place_changed', function() {
      place = autocomplete.getPlace();
      window.city = place.name;
      window.lat = place.geometry.location.lat(),
      window.lng = place.geometry.location.lng();

      city = window.city;
      lat = window.lat;
      lng = window.lng;

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for: '" + place.name + "'");
        return;
      }

      //LOAD THE CITY PAGE
      return redirectPage(city, lat, lng);
    });//END -- autocomplete listener
  }//END -- searchInput conditional

  //TO DO #1: CHANGE LISTENER TO USE 'dragend' AND 'zoom_changed' INSTEAD OF 'idle' -- This takes care of markers on map movement: https://stackoverflow.com/questions/8810979/updating-maps-v3-with-idle-listener-opening-infowwindow-triggers-this-and-hid
  //TO DO #2: MODIFY SYNTAX SO ALL THE MARKERS ARE CREATED WITHIN INITMAP() -- This takes care of markers and cards on page load. :https://stackoverflow.com/questions/37140901/how-can-i-resolve-uncaught-referenceerror-google-is-not-defined-google-maps
  //UPDATE MAP AS MAP STOPS MOVING AFTER BOUNDS CHANGE
  google.maps.event.addListener(map, 'idle', function() {
    //Clear array & card list
    latArray = [];
    lngArray = [];

    //Get SW and NE bounds (for lessons callback)
    neBounds = map.getBounds().getNorthEast();
    swBounds = map.getBounds().getSouthWest();

    //Get lat of NE and SW corners of map at current state
    neLat = map.getBounds().getNorthEast().lat();
    swLat = map.getBounds().getSouthWest().lat();
    neLng = map.getBounds().getNorthEast().lng();
    swLng = map.getBounds().getSouthWest().lng();

    //Push lats and lngs into arrays
    latArray.push(neLat, swLat);
    lngArray.push(neLng, swLng);

    //Find the largest and smallest lat and lng (for Firestore queries)
    greaterLat = latArray.sort()[latArray.length - 1];
    smallerLat = latArray.sort()[latArray.length - 2];
    greaterLng = lngArray.sort()[lngArray.length - 2];
    smallerLng = lngArray.sort()[lngArray.length - 1];

    addSurfSpotMarkersWrapper();

    addLessonMarkersWrapper();

    addAccommMarkersWrapper();

    hideAndShowCards();

    //Return ____MarkerClick to false to allow add____Markers() to run on future map 'idle's
    surfSpotMarkerClick = false;
    lessonMarkerClick = false;
    accommMarkerClick = false;

  });//END -- UPDATE MAP ON 'idle'

  //Listener toggles on/off a checkbox that controls the ability to add markers to map
  searchAsIMoveMapToggle();

}//END -- initMap() FUNCTION


//Runs through all the conditionals before add
function addSurfSpotMarkersWrapper() {
  //If toggleSurfSpotMarkers button is on, let surfSpotMarkers be added to the map on 'idle' event
  if ($("#toggleSurfSpotMarkers").hasClass("markers-showing")) {
    //If search-toggle button is checked, let markers refresh when map moves
    if ($("#floating-search-toggle").hasClass("map-search-on")) {
      //Dont add markers to the map when an accommMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
      if (!accommMarkerClick) {
        //Dont add markers to the map when a lessonMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
        if (!lessonMarkerClick) {
          //Don't add markers to the map when a marker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
          if (!surfSpotMarkerClick) {
            //ADD SURF SPOT MARKERS WITHIN MAP BOUNDS
            addSurfSpotMarkers();
          }
        }
      }
    }
  }
}//END -- addSurfSpotMarkersWrapper()


function addLessonMarkersWrapper() {
  //If toggleLessonMarkers button is on, let lessonMarkers be added to the map on 'idle' event
  if ($("#toggleLessonMarkers").hasClass("markers-showing")) {
    //If search-toggle button is checked, let markers refresh when map moves
    if ($("#floating-search-toggle").hasClass("map-search-on")) {
      //Dont add markers to the map when an accommMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
      if (!accommMarkerClick) {
        //Dont add markers to the map when a lessonMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
        if (!lessonMarkerClick) {
          //Don't add markers to the map when a marker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
          if (!surfSpotMarkerClick) {
            //ADD LESSON MARKERS WITHIN MAP BOUNDS
            callLessons();
          }
        }
      }
    }
  }
}//END -- addLessonMarkersWrapper()


function addAccommMarkersWrapper() {
  //If toggleAccommMarkers button is on, let accommMarkers be added to the map on 'idle' event
  if ($("#toggleAccommMarkers").hasClass("markers-showing")) {
    //If search-toggle button is checked, let markers refresh when map moves
    if ($("#floating-search-toggle").hasClass("map-search-on")) {
      //Don't add markers to the map when a surfSpotMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
      if (!surfSpotMarkerClick) {
        //Dont add markers to the map when a lessonMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
        if (!lessonMarkerClick) {
          //Don't add markers to the map when an accomMarker has been clicked re: infowindow causing the map to pan and the 'idle' event to fire
          if (!accommMarkerClick) {
            addAccommMarkers();
          }
        }
      }
    }
  }
}//END -- addAccommMarkersWrapper()




//On click of #floating-search-toggle (a checkbox), turn OFF ability to add markers to the map (aka run addSurfSpotMarkers())
function searchAsIMoveMapToggle() {
  $("#floating-search-toggle").click(function() {
    $("#floating-search-toggle").toggleClass("map-search-on");

    //When you toggle the search-map checkbox back on, populate the markers within current map view
    if ($("#floating-search-toggle").hasClass("map-search-on")) {
      addSurfSpotMarkersWrapper();
      addLessonMarkersWrapper();
      addAccommMarkersWrapper();
    }
  });
}




//Builds lessons loading card
function buildLessonLoadCard() {
  $("#spot-cards").prepend(`
    <div class="card bright-hover loading-lessons-card" data-id="loading">
      <img class="card-img tinted-spot-cards" src="${lessonsDefaultPhoto}" alt="Loading surf schools">
      <div class="card-img-overlay">
        <div class="card-body text-white p-0">
          <h5 class="card-title2">LOADING SURF SCHOOLS...</h5>
        </div>
      </div>
    </div>
  `);
}


////Call Lessons ON DESTIONATION.HTML
function callLessons() {
  //Remove old lesson cards from the card list
  $("#spot-cards").find('.lesson-spot-card').remove();
  $("#spot-cards").find('#no-lessons-card').remove();
  //Remove lesson markers
  setMapOnLessonMarkers(null);
  lessonMarkers = [];

  //Show loading lessons card if lessons has .cards-showing
  if ($("#toggleLessonCards").hasClass("cards-showing")) {
    buildLessonLoadCard();
  }

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    //Use map bounds to query all relative lessonp places in map view
    bounds: new google.maps.LatLngBounds(swBounds, neBounds),
    keyword: 'surf lessons',
  }, lessonsCallbackV2);
}//END -- callLessons() FUNCTION


////ADD SURF LESSONS TO THE CITY PAGE VIA lessonsCallbackV2
function lessonsCallbackV2(results, status) {

  //Start lessons callback
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      place = results[i];

      //Stores the details we want of each surf lesson place
      let detailsRequest = {
        placeId: place.place_id,
        field: ['website', 'formatted_phone_number', 'review', 'rating', 'name', 'geometry', 'photo',],
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(detailsRequest, lessonsDetailsCallback);

    }//END -- FORLOOP OF results.length
  } else {
    //Handle this error if there is a problem
    console.error("Error in lessonsCallbackV2", status);
    if (status == "ZERO_RESULTS") {

      //Make surf lesson cards are showing (.cards-showing)
      if ($("#toggleLessonCards").hasClass("cards-showing")) {
        //Remove old loading card and no-lesson-spot-cards from the card list
        $("#spot-cards").find('#no-lessons-card').remove();
        $(".loading-lessons-card").hide();

        $("#spot-cards").append(`
          <div id="no-lessons-card" class="card bright-hover" data-id="loading">
            <img class="card-img tinted-spot-cards" src="${lessonsDefaultPhoto}" alt="No surf schools in map view.">
            <div class="card-img-overlay">
              <div class="card-body text-white p-0">
                <h5 class="card-title2">No surf schools here.</h5>
                <h5 class="card-text2 note mt-2">Move the map somewhere else or refresh the page to discover more surf schools.</h6>
              </div>
            </div>
          </div>
        `);
      }

    }//END -- SHARE ZERO RESULTS WITH PEOPLE
  }//END -- IF LESSONS CALLBACK ERROR STATUS = ZERO_RESULTS, DISABLE BUTTON AND ALERT USER WHEN CLICKING ON IT
}//END -- SURF LESSONS CALLBACK

//lessonsDetailsCallback FUNCTION
function lessonsDetailsCallback(placeDetails, status) {
  //Start the callback
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    //Check if place has more than one review and greater than 3 star rating as a quality check before putting on Surf Trip List
    if (placeDetails.reviews !== undefined && placeDetails.reviews.length > 3 && placeDetails.rating !== undefined && placeDetails.rating > 4) {
      //Check if .gov is in the website URL. If it's not (indexOf = -1) then we can use it.
      if (placeDetails.website !== undefined && placeDetails.website.indexOf(".gov") == -1) {
        //Check if  is in the placeDetails name. If it's not (indexOf = -1) then we can use it.
        if (placeDetails.name.indexOf("Naval Postgraduate School") == -1 && placeDetails.name.indexOf("Stevenson School (Grades 9-12)") == -1 && placeDetails.name.indexOf("Boardsports California") == -1 && placeDetails.name.indexOf("Shape") == -1 && placeDetails.name.indexOf("kite") == -1 && placeDetails.name.indexOf("Kite") == -1 && placeDetails.name.indexOf("Yoga") == -1 && placeDetails.name.indexOf("Bike") == -1 && placeDetails.name.indexOf("Bicycl") == -1 && placeDetails.name.indexOf("fitness") == -1) {
          id = placeDetails.id;
          name = placeDetails.name;
          rating = placeDetails.rating;
          website = placeDetails.website;
          phone = placeDetails.formatted_phone_number;
          // address = placeDetails.formatted_address;
          //Gets the most recent review.
          note = placeDetails.reviews[0].text;
          review1 = placeDetails.reviews[0].text;
          authorReview1= placeDetails.reviews[0].author_name;
          timeDescriptionReview1 = placeDetails.reviews[0].relative_time_description;
          review2 = placeDetails.reviews[1].text;
          authorReview2 = placeDetails.reviews[1].author_name;
          timeDescriptionReview2 = placeDetails.reviews[1].relative_time_description;
          review3 = placeDetails.reviews[2].text;
          authorReview3 = placeDetails.reviews[2].author_name;
          timeDescriptionReview3 = placeDetails.reviews[2].relative_time_description;
          reviewCount = placeDetails.reviews.length;
          lat = placeDetails.geometry.location.lat();
          lng = placeDetails.geometry.location.lng();
          coords = {lat: placeDetails.geometry.location.lat(), lng: placeDetails.geometry.location.lng()};
          photos = placeDetails.photos;
          lessonPhoto = photos[0].getUrl();

          addLessonMarker(lessonMarker, map);

          //Add lessonMarkers to array to allow for hide/show functionality
          lessonMarkers.push(lessonMarker);
          //Creates the lessonMarker info window
          infowindow = new google.maps.InfoWindow({
          });

          lessonMarker.addListener('click', function(){
            //Set lessonMarkerClick to true so 'idle' listener doesn't run addLessonMarkersWrapper when infowindow pans map
            lessonMarkerClick = true;
            //Opens the lessonMarker infowindow
            //setContent won't accept ES6. The // syntax below is to make referencing easier.
            infowindow.setContent(`
              <div id="iwcontent">
                <img id='iwPhoto' class="mb-2" src="${placeDetails.photos[0].getUrl()}" alt="${placeDetails.name}"><br>

                <small><i class="fas fa-heart"></i> ${placeDetails.rating} of 5 (${placeDetails.reviews.length} reviews)</small>
                <h5 class="mb-0">${placeDetails.name}</h5>
                <small>${placeDetails.formatted_phone_number}</small>
                <br>
                <button type="button" class="btn btn-sm btn-danger font-weight-bold mt-3 mr-1" data-toggle="modal" data-target="#${placeDetails.id}">MORE INFO</button>

              </div>
            `);

            infowindow.open(map, this);
            //Close the lessonMarker infowindow
            google.maps.event.addListener(map, "click", function(event){
              infowindow.close();
            });//END -- CLOSE lessonMarker LISTENER
          });//END -- OPEN lessonMarker LISTENER

          trimName();

          trimNote();

          buildLessonCards();

          hideAndShowCards();

        }//END -- NAME FILTER
      }//END -- WEBSITE FILTER
    }//END -- REVIEWS FILTER
  }//END -- PlacesServiceStatus.OK FOR lessonsDetailsCallback

}//END -- lessonsDetailsCallback FUNCTION


////Set the lessonMarkers on the map
function addLessonMarker(props, map) {
  lessonMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: {url: surfSchoolMarker, scaledSize: new google.maps.Size(30, 30)},
    optimized: false,
    zIndex: 4,
    id: id,
  });
}//END -- addLessonMarker FUNCTION


////BUILD LESSON CARDS AND MODALS
function buildLessonCards() {
  //Hide the loading card
  $(".loading-lessons-card").hide();

    $("#spot-cards").prepend(`
      <a class="inherit-link" data-toggle="modal" data-target="#${id}">
        <div class="card photo-card lesson-spot-card illuminate-hover" data-id="${id}">

          <!-- LESSON PHOTOS -->
          <img class="card-img card-custom-image" src="${lessonPhoto}" alt="${name}">

          <!-- LESSON DESCRIPTORS -->
          <div class="card-body mx-0 p-0 pt-2">
            <small class="text-muted large-card-preheader-text font-weight-bold"><i class="fas fa-heart"></i> ${rating} of 5 (${reviewCount}+ reviews)</small>
            <h5 class="card-title card-title-text font-weight-bold">${name}</h5>
            <p class="card-note">${note}</p>
          </div>

        </div>
      </a>

      <div class="modal fade lesson-modal" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${name}-label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">

            <div class="modal-body lesson-modal-body">
              <div class="card lesson-photo-modal illuminate-hover">

                <!-- LESSON MODAL PHOTOS -->
                <a href="${website}" target="_blank">
                  <img class="accomm-card-custom-image mb-1" src="${lessonPhoto}" alt="${name}">
                </a>

                <!-- LESSON MODAL DESCRIPTORS -->
                <small class="text-muted large-card-preheader-text font-weight-bold"><i class="fas fa-heart"></i> ${rating} of 5 (${reviewCount}+ reviews)</small>
                <h5 class="card-title card-title-text font-weight-bold">${name}</h5>
                <small class="review-attribution">${phone}</small>

                <p class="card-note mt-3">"${review1}"</p>
                <small class="review-attribution"><span class="capitalize">${authorReview1}</span>, ${timeDescriptionReview1}</small>
                <hr>
                <p class="card-note mt-2">"${review2}"</p>
                <small class="review-attribution"><span class="capitalize">${authorReview2}</span>, ${timeDescriptionReview2}</small>
                <hr>
                <p class="card-note mt-2">"${review3}"</p>
                <small class="review-attribution"><span class="capitalize">${authorReview3}</span>, ${timeDescriptionReview3}</small>

              </div>
            </div>

            <div class="modal-footer lesson-modal-footer bg-secondary mt-3">
              <button class="btn btn-sm btn-danger mr-2"><a class="white-link font-weight-bold" href="${website}" target="_blank">BOOK</a></button>
              <button class="btn btn-sm btn-danger"><a class="white-link font-weight-bold" href="https://maps.google.com/?saddr=Current+Location&daddr=${lat},${lng}&driving" target="_blank">DIRECTIONS</a></button>
            </div>

          </div>
        </div>
      </div>
    `);

}//END -- BUILD LESSON CARDS AND MODALS




////ADD ACCOMM MARKERS TO THE CITY PAGE
function addAccommMarkers(i) {
  //Remove old accomm cards from the card list
  $("#spot-cards").find('.accomm-spot-card').remove();
  //Remove surf spot markers
  setMapOnAccommMarkers(null);
  accommMarkers = [];
  //Show loading accomm cards if accomms has .cards-showing
  if ($("#toggleAccommCards").hasClass("cards-showing")) {
    $("#spot-cards").prepend(`
      <div class="card bright-hover loading-accomm-card" data-id="loading">
        <img class="card-img tinted-spot-cards" src="${accommDefaultPhoto}" alt="loading-accommodations">
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
      accommID = doc.id;
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
      accommsHere = false;

      //TO DO: Use this props object to pass accomm variables between functions
      accommProps = {
        coords: coords,
        accommURL: accommURL,
        photo: photo,
        accommType: accommType,
        bedAmount: bedAmount,
        bedWord: bedWord,
        guestAmount: guestAmount,
        guestWord: guestWord,
        title: title,
        price: price,
        view: view,
        proximity: proximity,
        nearbySurfSpot: nearbySurfSpot,
        accommsHere: accommsHere,
      }

      //If the accomm-spot is within the lat/lng map bounds, run addAccommMarker().
      if (coords.lng <= greaterLng && coords.lng >= smallerLng) {
        addAccommMarker(accommMarker, map, coords, title, price, accommURL, accommType, bedAmount, bedWord, guestAmount, guestWord, view, proximity, accommID);
        accommsHere = true;
      }

    });//END -- querySnapshot OF accommMarkers
  }).then(function() {
    //If accommMarkers array holds 0 values, show card that tells user there are no surf spots in this map view.
    if (accommsHere !== true) {
      //Make sure Accomm Cards are showing (.cards-showing)
      if ($("#toggleAccommCards").hasClass("cards-showing")) {
        //Remove old no-accomm-cards from the card list
        $("#spot-cards").find('.loading-accomm-card').remove();
        $(".loading-accomm-card").hide();

        $("#spot-cards").append(`
          <div id="no-accomms-card" class="card accomm-spot-card bright-hover" data-id="loading">
            <img class="card-img tinted-spot-cards" src="${accommDefaultPhoto}" alt="no-accommodations-in-map-view">
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
function addAccommMarker(props, map, coords, title, price, accommURL, accommType, bedAmount, bedWord, guestAmount, guestWord, view, proximity, accommID) {
  //ADD accommMarkers TO MAP
  //Get the correct accommMarker download URL
  setAccommMarkerIcon = storage.ref('accomm-markers/' + price + '.png');
  setAccommMarkerIcon.getDownloadURL().then(function(url) {
    //Get the correct accommImage download URL
    accommImage = storage.ref('accomm-images/' + title + '.png');
    accommImage.getDownloadURL().then(function(accommPhoto) {

      //Size the two digit and three digit accomm markers differently
      if (price < 100) {
        accommMarker = new google.maps.Marker({
          position: coords,
          map: map,
          icon: {url: url, scaledSize: new google.maps.Size(36, 32)},
          id: accommID,
          price: price,
        });
      } else {
        accommMarker = new google.maps.Marker({
          position: coords,
          map: map,
          icon: {url: url, scaledSize: new google.maps.Size(45, 32)},
          id: accommID,
          price: price,
        });
      }

      //ADD EACH accommMarker TO THE ARRAY TO ALLOW FOR HIDE/SHOW OF accommMakers
      accommMarkers.push(accommMarker);

      //CREATE THE accommMarker infowindow
      infowindow = new google.maps.InfoWindow({
      });

      accommImage = storage.ref('accomm-images/' + title + '.png');

      //SET THE infowindow HTML/CSS
      accommMarker.html = `
       <div class="infowindow">
         <a data-toggle="modal" data-target="#${accommID}">
          <img class="accomm-infowindow-photo w-100 mb-2" src="${accommPhoto}"></img>
         </a>

         <span class="text-muted infowindow-preheader-text font-weight-bold mb-2">${accommType} • ${bedAmount} ${bedWord}</span>
         <h5 class="card-title card-title-text font-weight-bold">${title}</h5>
         <p class="accomm-card-price">$${price} per night • Free cancellation</p>

         <div class="mt-2">
           <a class="btn btn-sm btn-danger font-weight-bold white-link accomm-modal-trigger" data-toggle="modal" data-target="#${accommID}">MORE INFO</a>
         </div>

       </div>
      `;

      //Set a 'click' listner on each accommMarker to show the infowindow
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

    });//END -- accommImage.getDownloadURL
  });//END -- setAccommMarkerIcon.getDownloadURL

  trimHeader();

  buildAccommCards(accommURL, title, photo, accommType, bedAmount, bedWord, guestAmount, guestWord, nearbySurfSpot, proximity, view, price, accommID);

  hideAndShowCards();

  $("#spot-cards").find('#no-accomms-card').remove();

}//END -- addAccommMarker FUNCTION



////BUILD THE ACCOMM CARDS
function buildAccommCards(accommURL, title, photo, accommType, bedAmount, bedWord, guestAmount, guestWord, nearbySurfSpot, proximity, view, price, accommID) {
  //Hide the accomm loading card
  $(".loading-accomm-card").hide();

  //Set a reference to location of accommImage in Firebase Storage. Then get its download URL
  accommImage = storage.ref('accomm-images/' + photo);
  accommImage.getDownloadURL().then(function(accommPhoto) {
    // Insert url into an <img> tag to "download"
    //Build the accomm cards within map bounds
    $("#spot-cards").prepend(`
      <a class="inherit-link accomm-modal-trigger" data-toggle="modal" data-target="#${accommID}">
        <div class="card accomm-spot-card accomm-photo-card illuminate-hover" data-id="${accommID}">

          <!-- ACCOMM PHOTOS -->
          <img class="accomm-card-custom-image" src="${accommPhoto}" alt="${title}">

          <!-- ACCOMM DESCRIPTORS -->
          <div class="card-body mx-0 p-0 pt-2">
            <small class="text-muted card-preheader-text font-weight-bold">${accommType} • ${bedAmount} ${bedWord}</small>
            <h5 class="card-title card-title-text font-weight-bold">${title}</h5>
            <span class="badge badge-danger card-badge text-uppercase mb-1">AIRBNB</span>
            <p class="accomm-card-price">$${price} per night • Free cancellation</p>
          </div>

        </div>
      </a>

      <!-- ACCOMM MODAL -->
      <div class="modal fade" id="${accommID}" tabindex="-1" role="dialog" aria-labelledby="documentID-label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">

            <div class="modal-body">
              <div class="card accomm-photo-modal illuminate-hover">

                <!-- ACCOMM MODAL PHOTOS -->
                <img class="accomm-card-custom-image mb-1" src="${accommPhoto}" alt="${title}"></img>

                <!-- ACCOMM MODAL DESCRIPTORS -->
                <small class="text-muted card-preheader-text font-weight-bold">${accommType} • ${bedAmount} ${bedWord}</small>
                <h5 class="card-title card-title-text font-weight-bold">${title}</h5>
                <span class="badge badge-danger card-badge text-uppercase accomm-modal-badge mb-1">AIRBNB</span>
                <p class="accomm-card-price">$${price} per night • Free cancellation</p>
              </div>
            </div>

            <div class="modal-footer bg-secondary">
              <a class="btn btn-sm btn-danger mr-auto font-weight-bold" href="${accommURL}" target="_blank">BOOK</a>
            </div>

          </div>
        </div>
      </div>

    `);
  });
}//END -- BUILD THE ACCOMM CARDS





//Called from the Google Maps API script tag on the bottom of city.html body. Initalized the building of the city page based on whether user clicked a city card or entered a search
function initialize() {
////BUILD CITY PAGE BASED ON cityDB PARAM (user clicked on card on homepage)
if (cityDB !== null) {

  db.collection("city").doc(cityDB).get().then(function(doc) {
    data = doc.data();
    city = doc.id.replace(/-/g,' ');
    mapCenter = data.cityCenter;
    zoom = data.zoom;

    //Add city's name as placeholder in search bar
    $(".city-page-search").attr("placeholder", city);

    initMap();

    //Add d-none back to #map-wrapper once initMap has ran, to hide map near immediately after clicking into new city on mobile
    setTimeout(function() {
      $("#map-wrapper").addClass("d-none");

      //If click on 'Map' on home page and screen width is mobile go straight to mobile map view
      if (cityDB == 'california' && $(window).width() < 600) {
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
      }
    }, 300);

  });
  //If user submitted a search from the homepage, populate the city page as so
  } else if (cityS !== null) {
    //The variables lat and lng are stored beneath getParameterByName()
    //The '+' (somehow) converts lat and lng to numerical format and keeps the decimal places. Without it they show up as strings.
    mapCenter = {
      lat: +lat,
      lng: +lng
    };
    zoom = 17;

    //Add city's name as placeholder in search bar
    $(".city-page-search").attr("placeholder", cityS);

    initMap();

    //Add d-none back to #map-wrapper once initMap has ran, to hide map on mobile city page near immediately after clicking into it
    setTimeout(function() {
      $("#map-wrapper").addClass("d-none");
    }, 300);
  } else {
    //Initiate the map on load of index.html
    initMap();
  }
}
