//Initalize Cloud Firestore through Firebase
const db = firebase.firestore();
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

//Hover over desktop card, card changes to show more info + the relevant marker on map
$(document).on('mouseenter', '.card', function(){
  $(this).find('.card-overlay').hide();
  $(this).find('.card-hover-overlay').show();
})//END Accomm Card mouseenter function
.on('mouseleave', '.card', function(){
  $(this).find('.card-overlay').show();
  $(this).find('.card-hover-overlay').hide();
});//END desktop card mouseleave function

//Initiates lessonMarkers and rentalMarkers on map
function initialize() {
  var mapCenter = new google.maps.LatLng(37.598881,-122.502043);

  map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 7,

    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
    },
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,

  });//End of map variable

  //Query surf-spot collection to add spotMarkers
  db.collection("surf-spot").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data = doc.data();
        spotName = doc.id.replace(/-/g,' ');
        coords = data.surfspot;
        skill = data.skill;
        note = data.spotNote;
        parkingLat = data.parkingLat;
        parkingLng = data.parkingLng;

        function addSpotMarker(props, map) {
          //Add spotMarkers to map
          spotMarker = new google.maps.Marker({
            position: coords,
            map: map,
            icon: 'icon-images/' + skill + '.png',
          });
          //Add each spotMarker to the array to allow for hide/show of spotMarkers
          spotMarkers.push(spotMarker);
          //Create the spotMarker infowindow
          infowindow = new google.maps.InfoWindow ({
          });
          //Set the infowindow html
          spotMarker.html = `
            <div class="infoWindow">
              <h6>
                <img class="iwSkillIcon" src="icon-images/${skill}.png" alt="${spotName}">
                <span class="capitalize">${skill}</span> wave at <span class="capitalize">${spotName}</span></h6>
                <p>${note}</p>
                <button class="btn btn-sm btn-danger"><a class="white-link" href="https://maps.google.com/?saddr=Current+Location&daddr=${parkingLat},${parkingLng}&driving" target="_blank">Get Directions</a></button>
            </div>
          `;

          spotMarker.addListener('click', function() {
            //Open & close the spotMarker infowindow
            infowindow.setContent(this.html);
            infowindow.open(map, this);
            google.maps.event.addListener(map, "click", function(event) {
              infowindow.close();
            });
          });//End of spotMarker listener
        }//End of addSpotMarker function

      addSpotMarker(spotMarker, map);

    });
  });//End surf-spot Firestore query

  //Query accommMarkers (priceMarkers) collection to add accommMarkers
  db.collection("priceMarkers").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data = doc.data();
        coords = data.coords;
        icon = data.iconImage;
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

        function addAccommMarker(props, map) {
          //Add accommMarkers to map
          accommMarker = new google.maps.Marker({
            position: coords,
            map: map,
            icon: icon
          });
          //Add each accommMarker to the array to allow for hide/show of accommMarkers
          accommMarkers.push(accommMarker);
          //Create the accommMarker infowindow
          infowindow = new google.maps.InfoWindow({
          });
          //Set the infowindow html
          accommMarker.html = `
          <div class="infowindow">
             <a href="${accommURL}" target="_blank"><img src="ac-images/${photo}"></a>
             <b><p class="my-2 nounderline" style="color:brown">${accommType} • 🛌${bedAmount} ${bedWord} • 👫${guestAmount} ${guestWord}</p></b>
             <h5 class="my-0">${title}</h5>
             <b><p class="mt-2">💳$${price}/n • 😎${view} • 🏄‍${proximity}</p></b>
           </div>
          `;

          accommMarker.addListener('click', function(){
            //Open & close the accommMarker infowindow
            infowindow.setContent(this.html);
            infowindow.open(map, this);
            google.maps.event.addListener(map, "click", function(event) {
              infowindow.close();
            });
          });//End of accommMarker listener

        }//End of add AccommMarker function

       addAccommMarker(accommMarker, map);

      });
  });//End of accomm Firestore query

  //Query Google Places JS Library to add lessons
  var requestLessons = {
    query: 'surf lessons in pacifica'
  };

  //Query Google Places JS Library to add rentals
  var requestRentals = {
    query: 'surfboard rentals in pacifica'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(requestLessons, lessonsCallback);
  service.textSearch(requestRentals, rentalsCallback);
} //End of initialize

//Gets the place_ids relevant to the initialize query. Uses that to get the place details.
function lessonsCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      place = results[i];

      //Sets the details we want of each surf lesson place
      var detailsRequest = {
        placeId: place.place_id,
        fields: ['photo', 'website','formatted_phone_number', 'formatted_address', 'review', 'rating', 'name', 'geometry']
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(detailsRequest, lessonsCallback);

      function lessonsCallback(placeDetails, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          //Check if place has more than one review and greater than 3 star rating as a quality check before putting on Surf Trip List
          if (placeDetails.reviews !== undefined && placeDetails.reviews.length > 1 && placeDetails.rating !== undefined && placeDetails.rating > 3) {
            //Check if .gov is in the website URL. If it's not (indexOf = -1) then we can use it.
            if (placeDetails.website !== undefined && placeDetails.website.indexOf(".gov") == -1) {
              //Check if  is in the placeDetails name. If it's not (indexOf = -1) then we can use it.
              if (placeDetails.name.indexOf("Boardsports California") == -1 && placeDetails.name.indexOf("Shape") == -1 && placeDetails.name.indexOf("kite") == -1 && placeDetails.name.indexOf("Kite") == -1 && placeDetails.name.indexOf("Yoga") == -1 && placeDetails.name.indexOf("Bike") == -1 && placeDetails.name.indexOf("Bicycl") == -1 && placeDetails.name.indexOf("fitness") == -1) {
                // console.log(placeDetails);
                // console.log(placeDetails.name);
                name = placeDetails.name;
                rating = placeDetails.rating;
                website = placeDetails.website;
                phone = placeDetails.formatted_phone_number;
                address = placeDetails.formatted_address;
                //Gets the most recent review.
                review = placeDetails.reviews[0].text;
                coords = {lat: placeDetails.geometry.location.lat(), lng: placeDetails.geometry.location.lng()};

                //Sets the surf lesson lessonMarkers on the map
                function addLessonMarker(props, map) {
                  lessonMarker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: 'icon-images/surfLesson.png'
                  });
                  //Add lessonMarkers to array to allow for hide/show of all related lessonMarkers
                  lessonMarkers.push(lessonMarker);
                  //Creates the lessonMarker info window
                  infowindow = new google.maps.InfoWindow({
                  });

                  lessonMarker.addListener('click', function(){
                    //Opens the lessonMarker infowindow
                    if (placeDetails.photos !== undefined) {
                      infowindow.setContent ('<div id="iwcontent"><h4>' + placeDetails.name + "</h4><br><a href='" + placeDetails.website + "' target=_'blank'><img src='" + placeDetails.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 150}) + "'></a>" + "<p>📞" + placeDetails.formatted_phone_number + "<br>📍" + placeDetails.formatted_address + "<br>💖" + placeDetails.rating + "</p>" + "</div>");
                    } else {
                      infowindow.setContent ('<div id="iwcontent"><h4>' + placeDetails.name + "</h4><br><a href='" + placeDetails.website + "' target=_'blank'><img id='iwPhoto' src='lesson-images/surf-lesson.png'></a><p>📞" + placeDetails.formatted_phone_number + "<br>📍" + placeDetails.formatted_address + "<br>💖" + placeDetails.rating + "</p>" + "</div>");
                    }
                    infowindow.open(map, this);
                    google.maps.event.addListener(map, "click", function(event){
                      //Closes the lessonMarker infowindow
                      infowindow.close();
                    });
                  });//End of lessonMarker listener
                }//End of addLessonMarker

                addLessonMarker(lessonMarker, map);

              }//End of Name filter
            }//End of Website filter
          }//End of Reviews filter

        }
      }
    }
  } else {
    //Handle this error if there is a problem
    console.error("Error in 1st lessonsCallback", status);
  }
} //End surf lessons callback

// Sets the map on all lessonMarkers in the array. (Keeps them stored in the array so toggle works.)
function setMapOnLessonMarkers(map) {
  for (var i = 0; i < lessonMarkers.length; i++) {
    lessonMarkers[i].setMap(map);
  }
}

//Toggles lessonMarkers on the map
function toggleLessons() {
  if ($("#toggleLessons").hasClass("show")) {
    // Removes the lessonMarkers from the map, but keeps them in the array.
    setMapOnLessonMarkers(null);
    $("#toggleLessons").removeClass("show");
    $("#toggleLessons").addClass("disabled");
  } else {
    //Shows any lessonMarkers currently in the array.
    setMapOnLessonMarkers(map);
    $("#toggleLessons").addClass("show");
    $("#toggleLessons").removeClass("disabled");
  }
}

function rentalsCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];

      //Sets the details we want of each surfboard rental place
      var detailsRequest = {
        placeId: place.place_id,
        fields: ['photo', 'website','formatted_phone_number', 'formatted_address', 'review', 'rating', 'name', 'geometry']
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(detailsRequest, rentalsCallback);

      function rentalsCallback(placeDetails, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          //Review filter - Check if place has more than one review and greater than 3 star rating as a quality check before putting on Surf Trip List
          if (placeDetails.reviews !== undefined && placeDetails.reviews.length > 1 && placeDetails.rating !== undefined && placeDetails.rating > 3) {
            //Website filter - Check if .gov is in the website URL. If it's not (indexOf = -1) then we can use it.
            if (placeDetails.website !== undefined && placeDetails.website.indexOf(".gov") == -1) {
              // console.log('rentalDetails:', placeDetails);
              name = placeDetails.name;
              rating = placeDetails.rating;
              website = placeDetails.website;
              phone = placeDetails.formatted_phone_number;
              address = placeDetails.formatted_address;
              //Gets the most recent review.
              review = placeDetails.reviews[0].text;
              coords = {lat: placeDetails.geometry.location.lat(), lng: placeDetails.geometry.location.lng()};

              function addRentalMarker(props, map) {
                rentalMarker = new google.maps.Marker({
                  position: coords,
                  map: map,
                  icon: 'icon-images/rental.png'
                });
                //Add each rentalMarker to array to allow for hide/show of all related markers
                rentalMarkers.push(rentalMarker);
                //Creates the rentalMarker info window
                infowindow = new google.maps.InfoWindow({
                });

                rentalMarker.addListener('click', function(){
                  //Open the rentalMarker infowindow
                  if (placeDetails.photos !== undefined) {
                    infowindow.setContent ('<div id="iwcontent"><h4>' + placeDetails.name + "</h4><br>" + "<a href='" + placeDetails.website + "' target=_'blank'><img src='" + placeDetails.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 150}) + "'></a>" + "<p>📞" + placeDetails.formatted_phone_number + "<br>📍" + placeDetails.formatted_address + "<br>💖" + placeDetails.rating + "</p></div>");
                  } else {
                    infowindow.setContent ('<div id="iwcontent"><h4>' + placeDetails.name + "</h4><br><a href='" + placeDetails.website + "' target=_'blank'><img id='iwPhoto' src='rental-images/rentals-default-photo.png'></a><p>📞" + placeDetails.formatted_phone_number + "<br>📍" + placeDetails.formatted_address + "<br>💖" + placeDetails.rating + "</p></div>");
                  }
                  infowindow.open(map, this);
                  google.maps.event.addListener(map, "click", function(event){
                    //Closes the rentalMarker infowindow
                    infowindow.close();
                  });
                });//End of rentalMarker listener
              }//End of addRentalMarker function

              addRentalMarker(rentalMarker, map);

            }//End of website filter
          }//End of reviews filter

        }
      }//End of rentalsCallback function with placeDetails
    }//End of results loop
  } else {
    // Handle this error if there is a problem
    console.error("Error in 1st rentalsCallback", status)
  }
}

//Sets the map on all rentalMarkers in the array. (Keeps them stored in the array so toggle works.)
function setMapOnRentalMarkers(map) {
 for (var i = 0; i < rentalMarkers.length; i++) {
   rentalMarkers[i].setMap(map);
 }
}

//Toggles rentalMarkers on the map
function toggleRentals() {
 if ($("#toggleRentals").hasClass("show")) {
   // Removes the rentalMarkers from the map, but keeps them in the array.
   setMapOnRentalMarkers(null);
   $("#toggleRentals").removeClass("show");
   $("#toggleRentals").addClass("disabled");
 } else {
   //Shows any rentalMarkers currently in the array.
   setMapOnRentalMarkers(map);
   $("#toggleRentals").addClass("show");
   $("#toggleRentals").removeClass("disabled");
 }
}

//Sets the map on all spotMarkers in the array. (Keeps them stored in the array so toggle works.)
function setMapOnSpotMarkers(map) {
 for (var i = 0; i < spotMarkers.length; i++) {
   spotMarkers[i].setMap(map);
 }
}

//Toggle spotMarkers on the map
function toggleSurfSpots() {
 if ($("#toggleSurfSpots").hasClass("show")) {
   // Removes the surfSpotMarkers from the map, but keeps them in the array.
   setMapOnSpotMarkers(null);
   $("#toggleSurfSpots").removeClass("show");
   $("#toggleSurfSpots").addClass("disabled");
 } else {
   //Shows any surfSpotMarkers currently in the array.
   setMapOnSpotMarkers(map);
   $("#toggleSurfSpots").addClass("show");
   $("#toggleSurfSpots").removeClass("disabled");
 }
}

//Sets the map on all accommMarkers in the array. (Keeps them stored in the array so toggle works.)
function setMapOnAccommMarkers(map) {
 for (var i = 0; i < accommMarkers.length; i++) {
   accommMarkers[i].setMap(map);
 }
}

//Toggle accommMarkers on the map
function toggleAccomms() {
 if ($("#toggleAccomms").hasClass("show")) {
   // Removes the accommMarkers from the map, but keeps them in the array.
   setMapOnAccommMarkers(null);
   $("#toggleAccomms").removeClass("show");
   $("#toggleAccomms").addClass("disabled");
 } else {
   //Shows any accommMarkers currently in the array.
   setMapOnAccommMarkers(map);
   $("#toggleAccomms").addClass("show");
   $("#toggleAccomms").removeClass("disabled");
 }
}

initialize();
