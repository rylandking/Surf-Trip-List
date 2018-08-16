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




////SETS MAP ON ALL surfSpotMarkers IN THE ARRAY. (KEEPS THEM STORED IN ARRAY SO TOGGLE WORKS.)
function setMapOnSpotMarkers(map) {
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
  $("#toggleSurfSpots").click(function () {
    //IF BUTTON IS OFF (markers-hidden) AND CLICKED ON
    if ($("#toggleSurfSpots").hasClass("markers-hidden")) {
      //Remove .two or .three from this button
      $("#toggleSurfSpots").removeClass("two");
      $("#toggleSurfSpots").removeClass("three");
      //Add .one to this button
      $("#toggleSurfSpots").addClass("one");

      //If toggleLessons has .one replace it with .two
      if ($("#toggleLessons").hasClass("one")) {
        $("#toggleLessons").removeClass("one");
        $("#toggleLessons").addClass("two");
      //If toggleLessons has .two replace it with .three
      } else if ($("#toggleLessons").hasClass("two")) {
        $("#toggleLessons").removeClass("two");
        $("#toggleLessons").addClass("three");
      }

      //If toggleAccomms has .one replace it with .two
      if ($("#toggleAccomms").hasClass("one")) {
        $("#toggleAccomms").removeClass("one");
        $("#toggleAccomms").addClass("two");
      //If toggleAccomms has .two replace it with .three
      } else if ($("#toggleAccomms").hasClass("two")) {
        $("#toggleAccomms").removeClass("two");
        $("#toggleAccomms").addClass("three");
      }
    }//END -- IF BUTTON IS OFF (markers-hidden) AND CLICKED ON

    //IF BUTTON IS ON (markers-showing) AND CLICKED OFF
    if ($("#toggleSurfSpots").hasClass("markers-showing")) {
      //Remove .one or .two from this button
      $("#toggleSurfSpots").removeClass("one");
      $("#toggleSurfSpots").removeClass("two");
      //Add .three to this button
      $("#toggleSurfSpots").addClass("three");

      //If toggleLessons has .two replace it with .one
      if ($("#toggleLessons").hasClass("two")) {
        $("#toggleLessons").removeClass("two");
        $("#toggleLessons").addClass("one");
      //If toggleLessons has .three replace it with .two
      } else if ($("#toggleLessons").hasClass("three")) {
        $("#toggleLessons").removeClass("three");
        $("#toggleLessons").addClass("two");
      }

      //If toggleAccomms has .two replace it with .one
      if ($("#toggleAccomms").hasClass("two")) {
        $("#toggleAccomms").removeClass("two");
        $("#toggleAccomms").addClass("one");
      //If toggleLessons has .three replace it with .two
      } else if ($("#toggleAccomms").hasClass("three")) {
        $("#toggleAccomms").removeClass("three");
        $("#toggleAccomms").addClass("two");
      }
    }

  });//END -- click function
}//END -- toggleSurfSpotCards()


function toggleLessonCards() {
  //IF LESSONS BUTTON IS OFF (markers-hidden) AND CLICKED ON
  $("#toggleLessons").click(function () {
    if ($("#toggleLessons").hasClass("markers-hidden")) {
      //Remove .two or .three from this button
      $("#toggleLessons").removeClass("two");
      $("#toggleLessons").removeClass("three");
      //Add .one to this button
      $("#toggleLessons").addClass("one");

      //If toggleSurfSpots has .one replace it with .two
      if ($("#toggleSurfSpots").hasClass("one")) {
        $("#toggleSurfSpots").removeClass("one");
        $("#toggleSurfSpots").addClass("two");
      //If toggleSurfSpots has .two replace it with .three
      } else if ($("#toggleSurfSpots").hasClass("two")) {
        $("#toggleSurfSpots").removeClass("two");
        $("#toggleSurfSpots").addClass("three");
      }

      //If toggleAccomms has .one replace it with .two
      if ($("#toggleAccomms").hasClass("one")) {
        $("#toggleAccomms").removeClass("one");
        $("#toggleAccomms").addClass("two");
      //If toggleAccomms has .two replace it with .three
      } else if ($("#toggleAccomms").hasClass("two")) {
        $("#toggleAccomms").removeClass("two");
        $("#toggleAccomms").addClass("three");
      }
    }//END -- IF LESSONS BUTTON IS OFF (markers-hidden) AND CLICKED ON

    //IF LESSON BUTTON IS ON (markers-showing) AND CLICKED OFF
    if ($("#toggleLessons").hasClass("markers-showing")) {
      //Remove .one or .two from this button
      $("#toggleLessons").removeClass("one");
      $("#toggleLessons").removeClass("two");
      //Add .three to this button
      $("#toggleLessons").addClass("three");

      //If toggleSurfSpots has .two replace it with .one
      if ($("#toggleSurfSpots").hasClass("two")) {
        $("#toggleSurfSpots").removeClass("two");
        $("#toggleSurfSpots").addClass("one");
      //If toggleSurfSpots has .three replace it with .two
      } else if ($("#toggleSurfSpots").hasClass("three")) {
        $("#toggleSurfSpots").removeClass("three");
        $("#toggleSurfSpots").addClass("two");
      }

      //If toggleAccomms has .two replace it with .one
      if ($("#toggleAccomms").hasClass("two")) {
        $("#toggleAccomms").removeClass("two");
        $("#toggleAccomms").addClass("one");
      //If toggleLessons has .three replace it with .two
      } else if ($("#toggleAccomms").hasClass("three")) {
        $("#toggleAccomms").removeClass("three");
        $("#toggleAccomms").addClass("two");
      }
    }//END -- IF LESSON BUTTON IS ON (markers-showing) AND CLICKED OFF

  });//END -- click function
}//END -- toggleLessonCards()


function toggleAccommCards() {
  //IF ACCOMMS BUTTON IS OFF (markers-hidden) AND CLICKED ON
  $("#toggleAccomms").click(function () {
    if ($("#toggleAccomms").hasClass("markers-hidden")) {
      //Remove .two or .three from this button
      $("#toggleAccomms").removeClass("two");
      $("#toggleAccomms").removeClass("three");
      //Add .one to this button
      $("#toggleAccomms").addClass("one");
      // console.log('toggleAccoms markers-hidden running');

      //If toggleSurfSpots has .one replace it with .two
      if ($("#toggleSurfSpots").hasClass("one")) {
        $("#toggleSurfSpots").removeClass("one");
        $("#toggleSurfSpots").addClass("two");
      //If toggleSurfSpots has .two replace it with .three
      } else if ($("#toggleSurfSpots").hasClass("two")) {
        $("#toggleSurfSpots").removeClass("two");
        $("#toggleSurfSpots").addClass("three");
      }

      //If toggleLessons has .one replace it with .two
      if ($("#toggleLessons").hasClass("one")) {
        $("#toggleLessons").removeClass("one");
        $("#toggleLessons").addClass("two");
      //If toggleLessons has .two replace it with .three
      } else if ($("#toggleLessons").hasClass("two")) {
        $("#toggleLessons").removeClass("two");
        $("#toggleLessons").addClass("three");
      }
    }//END -- IF ACCOMMS BUTTON IS OFF (markers-hidden) AND CLICKED ON

    //IF ACCOMMS BUTTON IS ON (markers-showing) AND CLICKED OFF
    if ($("#toggleAccomms").hasClass("markers-showing")) {
      //Remove .one or .two from this button
      $("#toggleAccomms").removeClass("one");
      $("#toggleAccomms").removeClass("two");
      //Add .three to this button
      $("#toggleAccomms").addClass("three");

      //If toggleSurfSpots has .two replace it with .one
      if ($("#toggleSurfSpots").hasClass("two")) {
        $("#toggleSurfSpots").removeClass("two");
        $("#toggleSurfSpots").addClass("one");
      //If toggleSurfSpots has .three replace it with .two
      } else if ($("#toggleSurfSpots").hasClass("three")) {
        $("#toggleSurfSpots").removeClass("three");
        $("#toggleSurfSpots").addClass("two");
      }

      //If toggleLessons has .two replace it with .one
      if ($("#toggleLessons").hasClass("two")) {
        $("#toggleLessons").removeClass("two");
        $("#toggleLessons").addClass("one");
      //If toggleLessons has .three replace it with .two
      } else if ($("#toggleLessons").hasClass("three")) {
        $("#toggleLessons").removeClass("three");
        $("#toggleLessons").addClass("two");
      }
    }//END -- IF ACCOMMS BUTTON IS ON (markers-showing) AND CLICKED OFF

  });
}//END -- toggleAccommCards()


function showInSpotCardList() {
  //If at least one of the buttons has .markers-showing, then refresh the spot-card-list with the buttons who has .one
  if ($("#toggleSurfSpots").hasClass("markers-showing") || $("#toggleLessons").hasClass("markers-showing") || $("#toggleAccomms").hasClass("markers-showing")) {

    if ($("#toggleSurfSpots").hasClass("one")) {
      $(".all-filters-off-card").hide();
      $(".lesson-spot-card").hide();
      $(".accomm-spot-card").hide();
      //Show cards
      $(".surf-spot-card").show();
      //Add button shadow
      // $("#toggleSurfSpots").css('box-shadow', '2px 2px 2px 2px #888');
      // $("#toggleSurfSpots").removeClass("no-button-shadow");
      // $("#toggleLessons").addClass("no-button-shadow");
      // $("#toggleAccoms").addClass("no-button-shadow");
      console.log('surf spots cards showing');
    }
    if ($("#toggleLessons").hasClass("one")) {
      $(".all-filters-off-card").hide();
      $(".surf-spot-card").hide();
      $(".accomm-spot-card").hide();
      //Show cards
      $(".lesson-spot-card").show();
      console.log('lessons cards showing');
    }
    if ($("#toggleAccomms").hasClass("one")) {
      $(".all-filters-off-card").hide();
      $(".surf-spot-card").hide();
      $(".lesson-spot-card").hide();
      //Show cards
      $(".accomm-spot-card").show();
      console.log('accomms cards showing');
    }
  //If none of the buttons have .markers-showing, then refresh the spot-card-list with no cards
  } else {
    $(".surf-spot-card").hide();
    $(".lesson-spot-card").hide();
    $(".accomm-spot-card").hide();
    //Show cards
    $(".all-filters-off-card").show();
  }
}




////HIDE/SHOW MARKERS ON MAP WHEN TOGGLE BUTTONS ARE CLICKED
//HIDE AND SHOW SURF SPOT MARKERS
function toggleSurfSpotMarkers() {
  $("#toggleSurfSpots").click(function() {
    //Hide surf spot markers from map
    if ($("#toggleSurfSpots").hasClass("markers-hidden")) {
      $("#toggleSurfSpots").removeClass("markers-hidden");
      $("#toggleSurfSpots").addClass("markers-showing");
      addSurfSpotMarkersWrapper();
    //Show surf spot markers on map
    } else if ($("#toggleSurfSpots").hasClass("markers-showing")) {
      $("#toggleSurfSpots").removeClass("markers-showing");
      $("#toggleSurfSpots").addClass("markers-hidden");
      setMapOnSpotMarkers(null);
      surfSpotMarkers = [];
    }
    //IF BUTTON HAS CLASS .ONE, SHOW ITS CARDS IN THE SPOT CARD LIST
    showInSpotCardList();
  });
}


//HIDE AND SHOW LESSON MARKERS
function toggleLessonMarkers() {
  $("#toggleLessons").click(function() {
    //Hide lesson markers from map
    if ($("#toggleLessons").hasClass("markers-hidden")) {
      $("#toggleLessons").removeClass("markers-hidden");
      $("#toggleLessons").addClass("markers-showing");
      callLessons();
    //Show lesson markers on map
    } else if ($("#toggleLessons").hasClass("markers-showing")) {
      $("#toggleLessons").removeClass("markers-showing");
      $("#toggleLessons").addClass("markers-hidden");
      setMapOnLessonMarkers(null);
      lessonMarkers = [];
    }
    //IF BUTTON HAS CLASS .ONE, SHOW ITS CARDS IN THE SPOT CARD LIST
    showInSpotCardList();
  });
}


//HIDE AND SHOW ACCOMM MARKERS
function toggleAccommMarkers() {
  $("#toggleAccomms").click(function() {
    //Hide accomm markers from map
    if ($("#toggleAccomms").hasClass("markers-hidden")) {
      $("#toggleAccomms").removeClass("markers-hidden");
      $("#toggleAccomms").addClass("markers-showing");
      addAccommMarkersWrapper();
    //Show accomm markers on map
    } else if ($("#toggleAccomms").hasClass("markers-showing")) {
      $("#toggleAccomms").removeClass("markers-showing");
      $("#toggleAccomms").addClass("markers-hidden");
      setMapOnAccommMarkers(null);
      accommMarkers = [];
    }
    //IF BUTTON HAS CLASS .ONE, SHOW ITS CARDS IN THE SPOT CARD LIST
    showInSpotCardList();
  });
}

//toggle_Cards MUST BE ON TOP OF toggle_Markers SO THAT IT CAN READ IF THE BUTTON STATE IS ON OR OFF BEFORE toggle_Markers SWITCHES THE BUTTON STATE OFF OR ON
toggleSurfSpotCards();
toggleLessonCards();
toggleAccommCards();

toggleSurfSpotMarkers();
toggleLessonMarkers();
toggleAccommMarkers();




//SHOW MAP ON MOBILE
function showMapMobile() {
  $("#map-wrapper").removeClass("d-none");
  $("#map-wrapper").show();
  $("#spot-cards").hide();
  $("#show-list-mobile").show();
  $("#show-map-mobile").hide();
}//END -- SHOW MAP ON MOBILE

//SHOW LIST ON MOBILE
function showListMobile() {
  $("#map-wrapper").addClass("d-none");
  $("#map-wrapper").hide();
  $("#spot-cards").show();
  $("#show-list-mobile").hide();
  $("#show-map-mobile").show();
}//END -- SHOW LIST ON MOBILE




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
  //Clear surf spot markers and cards, and show loading surf spot card
  $(".surf-spot-card").hide();
  setMapOnSpotMarkers(null);
  surfSpotMarkers = [];
  $(".loading-surf-spot-card").show();

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
      $(".loading-surf-spot-card").hide();

      $("#spot-cards").append(`
        <div class="card surf-spot-card bright-hover no-surf-spots-card" data-id="loading">
          <img class="card-img tinted-spot-cards" src="images/surf-spot-default-photo.png" alt="no-surf-spots-in-map-view">
          <div class="card-img-overlay">
            <div class="card-body text-white p-0">
              <h5 class="card-title2">No surf spots here.</h5>
              <h5 class="card-text2 note mt-2">To discover more surf spots, move the map somewhere else or refresh the page.</h6>
            </div>
          </div>
        </div>
      `);
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
  $("#spot-cards").append(`
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
        position: google.maps.ControlPosition.TOP_LEFT
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

    //Return surfSpotMarkerClick to false to allow addSurfSpotMarkers() to run on future map 'idle's
    surfSpotMarkerClick = false;
    accommMarkerClick = false;

  });//END -- UPDATE MAP AS BOUNDS CHANGE

  //Listener toggles on/off a checkbox that controls the ability to add markers to map
  toggleMapSearch();

}//END -- initMap() FUNCTION


//Runs through all the conditionals before add
function addSurfSpotMarkersWrapper() {
  //If toggleSurfSpots button is on, let surfSpotMarkers be added to the map on 'idle' event
  if ($("#toggleSurfSpots").hasClass("markers-showing")) {
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
  //If toggleAccommss button is on, let accommMarkers be added to the map on 'idle' event
  if ($("#toggleAccomms").hasClass("markers-showing")) {
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
      // console.log(place);

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
  $("#toggleLessons").addClass("off");
  $("#toggleLessons").click(function() {
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
          <a class="btn btn-sm btn-danger font-weight-bold mr-1" href="${website}" target="_blank">BOOK</a>
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
  //Clear accomm markers and cards, and show loading accomm card
  $(".accomm-spot-card").hide();
  setMapOnAccommMarkers(null);
  accommMarkers = [];
  $(".loading-accomm-card").show();

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
      $(".loading-accomm-card").hide();

      $("#spot-cards").append(`
        <div class="card accomm-spot-card bright-hover no-accomms-card" data-id="loading">
          <img class="card-img tinted-spot-cards" src="images/accomm-default-photo.png" alt="no-accommodations-in-map-view">
          <div class="card-img-overlay">
            <div class="card-body text-white p-0">
              <h5 class="card-title2">No accommodations here.</h5>
              <h5 class="card-text2 note mt-2">To discover more surf accommodations, move the map somewhere else or refresh the page.</h6>
            </div>
          </div>
        </div>
      `);
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
    }, 75);

  });//END -- BUILD CITY PAGE BASED ON CITY PARAM
}
