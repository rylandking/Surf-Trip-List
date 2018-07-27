//Initalize Cloud Firestore through Firebase
const db = firebase.firestore();
const storage = firebase.storage();
let pathReference;
let map;
let service;
let infowindow;
let spotMarker;
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
let spotMarkers = [];
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




////SETS MAP ON ALL spotMarkers IN THE ARRAY. (KEEPS THEM STORED IN ARRAY SO TOGGLE WORKS.)
function setMapOnSpotMarkers(map) {
 for (var i = 0; i < spotMarkers.length; i++) {
   spotMarkers[i].setMap(map);
 }
}

////TOGGLE spotMarkers ON MAP
function toggleSurfSpots() {
 if ($("#toggleSurfSpots").hasClass("show")) {
   // Removes the surfSpotMarkers from the map, but keeps them in the array.
   setMapOnSpotMarkers(null);
   $("#toggleSurfSpots").removeClass("show");
   $("#toggleSurfSpots").addClass("disabled");
   $(".lesson-spot-card").show();
   $(".surf-spot-card").hide();
 } else {
   //Shows any surfSpotMarkers currently in the array.
   setMapOnSpotMarkers(map);
   $("#toggleSurfSpots").addClass("show");
   $("#toggleSurfSpots").removeClass("disabled");
   $(".lesson-spot-card").hide();
   $(".surf-spot-card").show();
   $(".accomm-spot-card").hide();
 }
}//END -- TOGGLE spotMarkers ON THE MAP


////SETS MAP ON ALL lessonMarkers IN THE ARRAY. (KEEPS THEM STORED IN ARRAY SO TOGGLE WORKS.)
function setMapOnLessonMarkers(map) {
  for (var i = 0; i < lessonMarkers.length; i++) {
    lessonMarkers[i].setMap(map);
  }
}

////TOGGLE lessonMarkers ON MAP
function toggleLessons() {
  if ($("#toggleLessons").hasClass("show")) {
    // Removes the lessonMarkers from the map, but keeps them in the array.
    setMapOnLessonMarkers(null);
    $("#toggleLessons").removeClass("show");
    $("#toggleLessons").addClass("disabled");
    $(".lesson-spot-card").hide();
    $(".surf-spot-card").show();
  } else {
    //Shows any lessonMarkers currently in the array.
    setMapOnLessonMarkers(map);
    $("#toggleLessons").addClass("show");
    $("#toggleLessons").removeClass("disabled");
    $(".lesson-spot-card").show();
    $(".surf-spot-card").hide();
    $(".accomm-spot-card").hide();
  }
}//END -- TOGGLE lessonMarkers ON MAP


////SETS MAP ON ALL accommMarkers IN THE ARRAY. (KEEPS THEM STORED IN ARRAY SO TOGGLE WORKS.)
function setMapOnAccommMarkers(map) {
 for (var i = 0; i < accommMarkers.length; i++) {
   accommMarkers[i].setMap(map);
 }
}

////TOGGLE accommMarkers ON THE MAP
function toggleAccomms() {
 if ($("#toggleAccomms").hasClass("disabled") && $("#toggleAccomms").hasClass("accomm-not-initialized")) {
     //Run accommMarkers() to add accomm cards + markers to city page
     addAccommMarkers();
     $("#toggleAccomms").removeClass("accomm-not-initialized");
     $("#toggleAccomms").removeClass("disabled");
     $("#toggleAccomms").addClass("show");
 } else if ($("#toggleAccomms").hasClass("show")) {
     // Removes the accommMarkers from the map, but keeps them in the array.
     setMapOnAccommMarkers(null);
     $(".accomm-spot-card").hide();
     $("#toggleAccomms").removeClass("show");
     $("#toggleAccomms").addClass("disabled");
   } else {
     //Shows any accommMarkers currently in the array.
     setMapOnAccommMarkers(map);
     $(".accomm-spot-card").show();
     $("#toggleAccomms").addClass("show");
     $("#toggleAccomms").removeClass("disabled");
   }
  }//END -- TOGGLE accommMarkers ON THE MAP




////HOVER OVER CARD, CHANGE THE SURF SPOT MARKER ON THE MAP
function highlightSurfSpotMarker(id) {
  for (i in spotMarkers){
    if(spotMarkers[i].id == id) {
      spotMarkers[i].setIcon('public/icon-images/'+spotMarkers[i].skill+'-large.png');
    }
  }
}

function normalSurfSpotMarker(id) {
  for (i in spotMarkers){
    if(spotMarkers[i].id == id) {
      spotMarkers[i].setIcon('public/icon-images/'+spotMarkers[i].skill+'.png');
    }
  }
}//END -- HOVER OVER CARD, CHANGE THE SURF SPOT MARKER ON THE MAP


////HOVER OVER LESSON CARD, CHANGE THE MARKER ON THE MAP
function highlightMarker(id) {
  for (i in lessonMarkers){
    if(lessonMarkers[i].id == id) {
      lessonMarkers[i].setIcon('public/icon-images/surfLesson-large.png');
    }
  }
}

function normalMarker(id) {
  for (i in lessonMarkers){
    if(lessonMarkers[i].id == id) {
      lessonMarkers[i].setIcon('public/icon-images/surfLesson.png');
    }
  }
}//END -- HOVER OVER LESSON CARD, CHANGE THE MARKER ON THE MAP


////HOVER OVER ACCOMM CARD, CHANGE THE MARKER ON THE MAP
function highlightAccommMarker(id) {
  for (i in accommMarkers){
    if(accommMarkers[i].id == id) {
      accommMarkers[i].setIcon('images/pm/' + accommMarkers[i].price + '-large.png');
    }
  }
}

function normalAccommMarker(id) {
  for (i in accommMarkers){
    if(accommMarkers[i].id == id) {
      accommMarkers[i].setIcon('images/pm/' + accommMarkers[i].price + '.png');
    }
  }
}//END -- HOVER OVER ACCOMM CARD, CHANGE THE MARKER ON THE MAP




////ADD SURF SPOT MARKERS TO THE CITY PAGE
function addSurfSpotMarkers() {
  //Query surf-spot collection to add spotMarkers
  db.collection("surf-spot").where("city", "==", cityParam).get().then(function(querySnapshot) {
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

      addSpotMarkerV2(spotMarker, map);

    });//END -- surf-spot querySnapshot
  });//END -- surf-spot FIRESTORE QUERY
}//END -- addSurfSpotMarkers


////ADDS A SURF SPOT MARKER TO THE MAP
function addSpotMarkerV2(props, map) {

  //Add spotMarkers to map
  spotMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: 'public/icon-images/' + skill + '.png',
    id: spotID,
    skill: skill,
  });

  //Add each spotMarker to the array to allow for hide/show of spotMarkers
  spotMarkers.push(spotMarker);

  //Create the spotMarker infowindow
  infowindow = new google.maps.InfoWindow ({
  });

  trimNote();

  //Set the surf spot infowindow html
  spotMarker.html = `
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

  spotMarker.addListener('click', function() {
    //Open & close the spotMarker infowindow
    infowindow.setContent(this.html);
    infowindow.open(map, this);
    google.maps.event.addListener(map, "click", function(event) {
      infowindow.close();
    });
  });//END -- spotMarker LISTENER

  buildSurfSpotCards();

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
  $("#spot-cards").append(`
    <div class="card surf-spot-card bright-hover" data-id="${spotID}">
      <img class="card-img tinted-spot-cards" src="images/surf-spot-default-photo.png" alt="${spotName}">
      <div class="card-img-overlay">
        <div class="card-body text-white p-0">
          <h5 class="card-title2">${spotName} - <img src="public/icon-images/${skill}.png"></h5>
          <h6 class="card-subtitle2 mb-2 text-light"><span class="capitalize">${skill}</span> wave</h6>
          <p class="card-text2 note">${note}</p>
          <button type="button" class="btn btn-sm btn-danger font-weight-bold mr-1" data-toggle="modal" data-target="#${spotID}">
            MORE INFO
          </button>
          <button type="button" class="btn btn-sm btn-danger font-weight-bold mr-1" data-toggle="modal" data-target="#${spotName}">
            STAY NEARBY
          </button>
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
            <a class="btn btn-sm btn-danger mr-auto font-weight-bold" href="https://maps.google.com/?saddr=Current+Location&daddr=${parkingLat},${parkingLng}&driving" target="_blank">DIRECTIONS</a>
          </div>
        </div>
      </div>
    </div>
  `);
}//END -- BUILDS SURF SPOT CARDS AND MODAL




////INIATILIZES THE MAP ON DESTIONATION.HTML
function initializeMapCallLessons() {

  map = new google.maps.Map(document.getElementById('map2'), {
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

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    //Set the SW and NE corners of map on CITY page to query within that area
    bounds: new google.maps.LatLngBounds(swBounds, neBounds),
    keyword: 'surf lessons',
  }, lessonsCallbackV2);

}//END -- initializeMapCallLessons() FUNCTION


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
  $("#toggleLessons").addClass("disabled");
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
        if (placeDetails.name.indexOf("Boardsports California") == -1 && placeDetails.name.indexOf("Shape") == -1 && placeDetails.name.indexOf("kite") == -1 && placeDetails.name.indexOf("Kite") == -1 && placeDetails.name.indexOf("Yoga") == -1 && placeDetails.name.indexOf("Bike") == -1 && placeDetails.name.indexOf("Bicycl") == -1 && placeDetails.name.indexOf("fitness") == -1) {
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
    id: id,
  });
}//END -- addLessonMarkerV2 FUNCTION


////BUILD LESSON CARDS AND MODALS
function buildLessonCards () {
  $("#spot-cards").append(`
    <div class="card lesson-spot-card bright-hover" data-id="${id}">
      <img class="card-img tinted-spot-cards" src="images/surf-lesson-default-photo.png" alt="${name}">
      <div class="card-img-overlay">
        <div class="card-body text-white p-0">
          <h5 class="card-title2">${name}</h5>
          <h6 class="card-subtitle2 mb-2 text-light"><i class="fas fa-heart"></i> ${rating} of 5 (${reviewCount} reviews)</h6>
          <p class="card-text2 note">"${note}"</p>
          <button type="button" class="btn btn-sm btn-danger font-weight-bold mr-1" data-toggle="modal" data-target="#${id}">MORE INFO</button>
          <a class="btn btn-sm btn-danger font-weight-bold mr-1" href="${website}" target="_blank">BOOK</a>
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
  //QUERY accommMarkers (priceMarkers) COLLECTION TO ADD accommMarkers
  db.collection("priceMarkers").where("city", "==", cityParam).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      data = doc.data();
      coords = data.coords;
      icon = 'images/'+data.iconImage;
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

      addAccommMarker(accommMarker, map);

    });//END -- querySnapshot OF accommMarkers
  });//END -- QUERY accommMarkers (priceMarkers) COLLECTION TO ADD accommMarkers
}//END -- addAccommMarkers FUNCTION


////ADDS AN ACCOMM MARKER TO THE MAP
function addAccommMarker(props, map) {
  //ADD accommMarkers TO MAP
  accommMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: icon,
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
  $("#spot-cards").prepend(`
    <div class="card accomm-spot-card bright-hover" data-id="${title}">
      <img class="card-img tinted-spot-cards w-100" src="images/accomm-images/${photo}" alt="${title}">
      <div class="card-img-overlay">
        <div class="card-body text-white p-0">
          <p class="card-subtitle2 mb-0 text-light text-uppercase"><small>${accommType} • ${bedAmount} ${bedWord} | ${guestAmount} ${guestWord}</small></p>
          <h5 class="card-title2 cut-header">${title}</h5>
          <p class="accomm-card-text mt-1 mb-0 text-capitalize">Near ${nearbySurfSpot}</p>
          <p class="accomm-card-text mb-0">${proximity}</p>
          <p class="accomm-card-text mb-0">${view}</p>
          <p class="accomm-card-text">$${price}/n</p>
          <button class="btn btn-sm btn-danger mt-1 mr-2"><a class="white-link font-weight-bold" href="${accommURL}" target="_blank">BOOK</a></button>
        </div>
      </div>
    </div>
  `);
}//END -- BUILD THE ACCOMM CARDS


////ADD SUBMITTED CONTACT FORM TO FIRESTORE

//LISTEN FOR CONTACT FORM SUBMIT
document.getElementById('contact-form').addEventListener('submit', submitContactForm);

function submitContactForm(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  //GET INPUT VALUES
  name = getInputValue('name-input');
  email = getInputValue('email-input');
  message = getInputValue('message-textarea');

  //ADD DOCUMENT TO "contact" COLLECTION
  db.collection("inquiries").add({

    name: name,
    email: email,
    message: message,

  }).then(function(docRef) {
    $(".alert-success").slideDown(500).delay(4000).slideUp(500);
  }).catch(function(error) {
    $(".alert-danger").slideDown(500).delay(4000).slideUp(500);
  });//END -- ADD DOCUMENT TO "contact" COLLECTION

  //RESET FORM AFTER SUBMISSION
  document.getElementById('contact-form').reset();

}//END -- submitContactForm();

//FUNCTION TO GET #contact-form VALUES
function getInputValue(id) {
  return document.getElementById(id).value;
}//END -- FUNCTION TO GET #contact-form VALUES


//END -- ADD SUBMITTED CONTACT FORM TO FIRESTORE




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

    initializeMapCallLessons();

    addSurfSpotMarkers();

  });//END -- BUILD CITY PAGE BASED ON CITY PARAM
}
