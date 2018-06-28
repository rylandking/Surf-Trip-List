let map; // making it global
//Map markers
const mExpert = 'icon-images/expert.png';
const mAdvanced = 'icon-images/advanced.png';
const mIntermediate = 'icon-images/intermediate.png';
const mBeginner = 'icon-images/beginner.png';
const mSurfLessons = 'icon-images/surf-lessons.png';
const mBeach = 'icon-images/beach.png';
const mCrowd = 'icon-images/crowd.png';
const mLocalism = 'icon-images/localism.png';
//Surfboard icons
const shortBoard = 'icon-images/short-board.png';
const funBoard = 'icon-images/fun-board.png';
const longBoard = 'icon-images/long-board.png';

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Hide/Show Filter Page
$(document).ready(function(){
    $("#showHideFilters").click(function(){
        $("#filter").toggle();
    });
});

//Change the filter arrow when filter button is clicked
$("#showHideFilters").on('click',function(){
  $(this).children('.fa-chevron-down, .fa-chevron-up').toggleClass("fa-chevron-down fa-chevron-up");
});

// Hide/Show citycards by Experience
function toggleByClass(className) {
     $("."+className).toggle();
}

//START add surf marker function
function addSurfMarker(props, map) {
  const smSurfSpot = props.surfSpot;
  const smContent = props.content;

  if(smSurfSpot != undefined) {
     smSurfSpotName = smSurfSpot.replace(/-/g,' ');
  }

  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: props.iconImage,
    id: surfMarkerID,
  });

 //Creates the marker info window
  var infoWindow = new google.maps.InfoWindow({
    content: `
      <h6 data-id="${surfMarkerID}">${smContent} at <a class="text-capitalize">${smSurfSpotName}</a></h6>
    `
  });

  //Adds the marker listener
  marker.addListener('click', function(){
    infoWindow.open(map, marker);

    //Closes marker windows when map is clicked
    google.maps.event.addListener(map, "click", function(event) {
    //Close info window
        infoWindow.close();
    });
  });
}//End of addSurfMarker v2

function renderSurfMarkers(map) {
  //Getting the surf markers relevant to the specific city
  db.collection("markers").where("city", "==", newCityPage)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

        const mData = doc.data();
        surfMarkerID = doc.id;
        const mCity = mData.city;
        const mSurfSpot = mData.surfSpot;

        //Array of markers v2
        var markers = [
          mData
        ];

        //Loop through markers
        for(var i = 0; i < markers.length; i++) {
          // console.log('rendering markers', markers[i])
          //Add marker
          addSurfMarker(markers[i], map);
        }

      });
  });
}
//END add surf marker

//Add map priceMarker function
function addPriceMarker(props, map) {
  //PRICE MARKERS IN TWO PLACES! 1. CARDS + 2. MARKERS. Change both
  const pmSurfSpot = props.surfSpot;
  const pmbookingURL = props.bookingURL;
  const pmPhoto = props.photo;
  const pmPrice = props.price;
  const pmAccommType = props.accommType;
  const pmTitle = props.title;
  const pmView = props.view;
  const pmProximity = props.proximity;
  const pmBedAmount = props.bedAmount;
  const pmBedWord = props.bedWord;
  const pmGuestAmount = props.guestAmount;
  const pmGuestWord = props.guestWord;

  if(pmSurfSpot != undefined) {
     pmSurfSpotName = pmSurfSpot.replace(/-/g,' ');
  }

  var priceMarker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: props.iconImage,
    id: pmID,
  });

 //Creates the priceMarker info window
  var infoWindow = new google.maps.InfoWindow({
    content: `
    <div class="iw-container" data-id="${pmID}">
       <a href="${pmbookingURL}" target="_blank"><img src="ac-images/${pmPhoto}" style="height=100%; width:100%"></a>
       <b><p class="my-2 nounderline" style="color:brown">${pmAccommType} • 🛌${pmBedAmount} ${pmBedWord} • 👫${pmGuestAmount} ${pmGuestWord}</p></b>
       <h5 class="my-0">${pmTitle}</h5>
       <b><p class="mt-2">💳$${pmPrice}/n • 😎${pmView} • 🏄‍${pmProximity}</p></b>
     </div>
    `
  });

  //Adds the priceMarker listener
  priceMarker.addListener('click', function(){
    infoWindow.open(map, priceMarker);

    //Closes marker windows when map is clicked
    google.maps.event.addListener(map, "click", function(event) {
    //Close info window
        infoWindow.close();
    });
  });
}//End of addPriceMarker v2

var priceMarkers = [];

function renderPriceMarkers(map) {
  //Getting the price markers relevant to chosen city to use in the addPriceMarker function
  db.collection("priceMarkers").where("city", "==", newCityPage)
      .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

        const pmData = doc.data();
        const pmCity = pmData.city;
        pmID = doc.id;

        //Array of markers v2
        priceMarkers = [
          pmData
        ];

        //Loop through priceMarkers
        for(var i=0; i<priceMarkers.length; i++) {
          //Add priceMarkers
          addPriceMarker(priceMarkers[i], map);
        }

      });
  });
}

//Add map boardRentalMarker function
function addBoardRentalMarker(props, map) {
  //BOARD RENTAL MARKERS IN TWO PLACES! 1. CARDS + 2. MARKERS. Change both
  const address = props.address;
  const boardDailyCost = props.boardDaily;
  const boardHourlyCost = props.boardHourly;
  let boardType = props.boardType;
  const city = props.city;
  const name = props.name;
  const phone = props.phone;
  const review = props.review;
  const surfSpot = props.surfSpot;
  const website = props.website;
  const wetsuitAvail = props.wetsuitAvail;
  const wetsuitDailyCost = props.wetsuitDaily;
  const wetsuitHourlyCost = props.wetsuitHourly;
  const zip = props.zip;
  const photo = props.photo;

  if(surfSpot != undefined) {
     surfSpotName = surfSpot.replace(/-/g,' ');
  }
  //Set boardType in #board-rentals__wrapper MAP
  //If boardType is "undefined", run nothing.
  if (boardType == null) {
    boardType = " "
  }
  if(boardType.indexOf("shortboards") != -1){
    var brIWShortBoard = `Shortboard`;
  } else {
    var brIWShortBoard = ""
  }
  if(boardType.indexOf("funboards") != -1){
    var brIWFunBoard = `Funboards`;
  } else {
    var brIWFunBoard = ""
  }
  if(boardType.indexOf("longboards") != -1){
    var brIWLongBoard = `Longboards`;
  } else {
    var brIWLongBoard = ""
  }

  var boardRentalMarker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: props.iconImage,
    id: brMarkerID
  });

 //Creates the boardRentalMarker info window
  var infoWindow = new google.maps.InfoWindow({
    content: `
    <div class="iw-container" data-id="${brMarkerID}">
       <a href="${website}" target="_blank"><img src="board-rental-images/${photo}" style="height=100%; width:100%"></a>
       <b><p class="my-2 nounderline" style="color:brown">📱${phone} • 🏡${address}, ${zip}</p></b>
       <h5 class="my-0">${name}</h5>
       <b><p class="mt-2">💳$${boardDailyCost} board/day • ${brIWShortBoard} ${brIWFunBoard} ${brIWLongBoard} • ${review}</p></b>
     </div>
    `
  });

  //Adds the boardRentalMarker listener
  boardRentalMarker.addListener('click', function(){
    infoWindow.open(map, boardRentalMarker);

    //Closes marker windows when map is clicked
    google.maps.event.addListener(map, "click", function(event) {
    //Close info window
        infoWindow.close();
    });
  });
}//End of addBoardRentalMarker

//START renderBoardRentalMarkers
function renderBoardRentalMarkers(map) {
  //Getting the price markers to use in the addPriceMarker function
  db.collection("boardRentalMarkers").where("city", "==", newCityPage)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

        const brData = doc.data();
        const brCity = brData.city;
        brMarkerID = doc.id;

        //Array of board rental markers
        var boardRentalMarkers = [
          brData
        ];

        //Loop through boardRentalMarkers
        for(var i=0; i<boardRentalMarkers.length; i++) {
          //Add boardRentalMarkers
          addBoardRentalMarker(boardRentalMarkers[i], map);
        }

      });
  });
}//END renderBoardRentalMarkers

//Add map lessonMarker function
function addLessonMarker(props, map) {
  //LESSON MARKERS IN TWO PLACES! 1. CARDS + 2. MARKERS. Change both
  const name = props.name;
  const city = props.city;
  const surfSpot = props.surfSpot;
  const website = props.website;
  // const lessonTypesAvail = props.lessonTypesAvail;
  const equipAvail = props.equipAvail;
  const review = props.review;
  const photo = props.photo;
  const phone = props.phone;

  if(surfSpot != undefined) {
     surfSpotName = surfSpot.replace(/-/g,' ');
  }
  //Set cost of different lessons in #lessons__wrapper
  if(props.oneOnOneCost > 1){
    var oneOnOneCost = props.oneOnOneCost;
    var lessonOneonOne = `Private $${oneOnOneCost} |`;
  } else {
    var oneOnOneCost = "";
    var lessonOneonOne = "";
  }
  if(props.smCost > 1){
    var smGroupCost = props.smCost;
    var lessonSmGroup = `2-3 people $${smGroupCost} |`;
  } else {
    var smGroupCost = "";
    var lessonSmGroup = "";
  }
  if(props.lgCost > 1){
    var lgGroupCost = props.lgCost;
    var lessonLgGroup = `4-8 people $${lgGroupCost} |`;
  } else {
    var lgGroupCost = "";
    var lessonLgGroup = "";
  }
  if(props.multiDayCost > 1){
    var campCost = props.multiDayCost;
    var lessonCamp = `Camp $${campCost}/day`;
  } else {
    var campCost = "";
    var lessonCamp = "";
  }

  var lessonMarker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: props.iconImage,
    id: lessonMarkerID
  });

 //Creates the lessonMarker info window
  var infoWindow = new google.maps.InfoWindow({
    content: `
    <div class="iw-container" data-id="${lessonMarkerID}">
       <a href="${website}" target="_blank"><img src="lesson-images/${photo}" style="height=100%; width:100%"></a>
       <b><p class="my-2 nounderline" style="color:brown">💳${lessonOneonOne} ${lessonSmGroup} ${lessonLgGroup} ${lessonCamp}</p></b>
       <h5 class="my-0">${name}</h5>
       <b><p class="mt-2">📱${phone} • ${review}</p></b>
     </div>
    `
  });
  //Adds the lessonMarker listener
  lessonMarker.addListener('click', function(){
    infoWindow.open(map, lessonMarker);

    //Closes marker windows when map is clicked
    google.maps.event.addListener(map, "click", function(event) {
    //Close info window
        infoWindow.close();
    });
  });
}//End of addLessonMarker

//START renderLessonMarkers
function renderLessonMarkers(map) {
  //Getting the lesson markers of the relevant city to use in the addLessonMarker function
  db.collection("lessonMarkers").where("city", "==", newCityPage)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

        const lData = doc.data();
        const lCity = lData.city;
        lessonMarkerID = doc.id;

        //Array of lesson markers
        var lessonMarkers = [
          lData
        ];

        //Loop through lessonMarkers
        for(var i=0; i<lessonMarkers.length; i++) {
          //Add lessonMarkers
          addLessonMarker(lessonMarkers[i], map);
        }

      });
  });
}//END renderLessonMarkers

// START - Loop the city collection. Populate location cards.
// db.collection("city").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
db.collection("city").where("beta", "==", true)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
      //format the name
      var citydata = doc.data();
      var cityName = doc.id;
      var locname = cityName.replace(/-/g,' ');
      let expIcons = [];

      // inside this loop, we want to get the document inside 'surf-spot' collection that matches doc.id
      db.collection("surf-spot").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          let ssData = doc.data();
          let ssName = doc.id;
          let ssCity = ssData.city;
          let ssExperience = ssData.experience;
          let ssLessons = ssData.surflessons;

          //if the cityName is the same as the surf spot city, then get the name of the surf spot
          if(cityName == ssCity){

            //set icons to an array
            expIcons.push(ssExperience); //push adds a new item to the array

            // console.log(cityName + ": " + expIcons);

            //then create a string with the fontawesome icons based on expIcons array - send that string to your HTML
          }

        })
      });//End of the surf spot loop inside the city loop

      // we are inside a loop, so doc.id will go through each location in 'cities'
      // then get the document that matches doc.id which connects to a field in each surf spot

      citydata = doc.data();
      var region = citydata.region;

      // //finds what month it is today and use that index of the rideable array
      // var rideable = citydata.rideable[new Date().getMonth()];

      //exp holds a string that displays an icon in our html
      //it chooses which icon to display based on the value of citydata.experience in the database
      var exp;
      //expFilter places experience variable in class of card container
      var expFilter;
        //surf lessons
      if(citydata.experience == 0){
        exp = '<div data-toggle="tooltip" title="Surf lessons"><i style="color:orange" class="fas fa-plus"></i></div>';
        expFilter = 'surf-lessons';
        //beginner
      }else if(citydata.experience == 1){
        exp = '<div data-toggle="tooltip" title="Beginner"><i style="color:limegreen" class="fas fa-circle"></i></div>';
        expFilter = 'beginner';
        //intermediate
      }else if(citydata.experience == 2){
        exp = '<div data-toggle="tooltip" title="Intermediate"><i style="color:skyblue" class="fas fa-square"></i></div>';
        expFilter = 'intermediate';
        //advanced
      }else if(citydata.experience == 3){
        exp = '<div data-toggle="tooltip" title="Advanced"><i style="color:white" class="fas fa-chevron-up"></i></i></div>';
        expFilter = 'advanced';
      }else{
        exp = '<div data-toggle="tooltip" title="Expert"><i style="color:white" class="fas fa-angle-double-up"></i></div>';
        expFilter = 'expert';
      }

      // GET IMAGE from Firebase Storage. Manual TO DOs:
        //1. Add downloadurl to firestore document
        //2. Get downloadurl from that firestore document
        //3. Place that download URL in the correct place int he cardcontainer
        var cityimage = citydata.cityimage;

        //add info to LOCATION CARD
        //$ is the same as getElementById
        $("#card-container").prepend(
          `<a id="city-card" data-id="${cityName}" href=""><div class="card bg-dark text-white ${expFilter}">
            <img class="img-fluid card-img" src="${cityimage}"></img>
              <div class="card-img-overlay">
                <h4 id="locName" class="card-title" style="white-space: nowrap;">${locname}</h4>
                <p id="region" class="card-text">${region}</p>
              </div>
          </div></a>`
        ); //end prepend

    });
});// END - Loop the city collection. Populate location cards


//START New location page after click on city card
var cityPage;

//Click location card on homepage
$(document).ready(function(){
  $('body').on('click','#city-card',function(e){
    //Stores data-id=${cityName} in variable cityPage
    window.cityPage = $(this).data('id');
    var newCityPage = window.cityPage;
    //Returns redirectPage function
    return redirectPage(newCityPage)
  });
});

//Opens new window with newCityPage in the query perams
function redirectPage(newCityPage) {
    window.location = "file:///Users/macbookpro/Desktop/Surf-Trip/location-page.html?newCityPage="+newCityPage;
    window.cityPage = newCityPage;
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

//Storing the query perams in a constant
const newCityPage = getParameterByName('newCityPage');

//Pings Firestore for relevant newCityPage document
const docRef = db.collection("city").doc(newCityPage);
docRef.get().then(function(doc) {
  var citydata = doc.data();
  var cityName = doc.id;
  //format cityName name
  var locname = cityName.replace(/-/g,' ');
  let cityRegion = citydata.region;
  //Format the state name (cityRegion)
  var stateName = cityRegion.replace(/-/g,' ');
  let cityContintent = citydata.contintent;
  let nation = citydata.nation;
  const cityZoom = citydata.zoom;
  const cityImage = citydata.cityimage;
  const airbnb = citydata.airbnb;
  let cityCenter = citydata.cityCenter;
  let goodFor = citydata.goodFor;
  let waterTemp = citydata.waterTemp;
  let language = citydata.language;
  let healthCareScore = citydata.healthCareScore;
  let internetScore = citydata.internetScore;
  let nightLifeScore = citydata.nightLifeScore;
  let natureScore = citydata.natureScore;
  let cultureScore = citydata.cultureScore;
  let sharkScore = citydata.sharkScore;
  let englishScore = citydata.englishScore;
  let safetyScore = citydata.safetyScore;
  let partyScore = citydata.partyScore;
  let femaleSafeScore = citydata.femaleSafeScore;
  let touristScore = citydata.touristScore;
  let lp = citydata.lp;
  let cityRentals = citydata.cityRentals;
  let cityLessons = citydata.cityLessons;
  let tapWater = citydata.tapWater;
  let power;
  let uber = citydata.uber;
  let airport = citydata.airport;
  // let insurance;
  // let immigration = citydata.immigration;
  // let norms = citydata.norms;
  let volts = citydata.volts;
  let frequency = citydata.frequency;
  let powerType = citydata.powerType;
  let meal = parseInt(citydata.meal);
  let beer = parseInt(citydata.beer);
  let currencyName = citydata.currencyName;
  let usdEquivalent = citydata.usdEquivalent;
  let atm = citydata.atm;
  let roomCost = parseInt(citydata.roomCost);
  let placeCost = parseInt(citydata.placeCost);
  //Calculates the USD of a common ATM takeout
  const atmInUSD = parseInt(atm/usdEquivalent);
  //Calculates daily cost of staying in a city
  const dailyCost = parseInt(roomCost + (3 * meal) + beer);

  //Sets healthCareScore in #travel-guide table
  if (healthCareScore == 5) {
    healthCareScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩‍⚕️Good health care readily available" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (healthCareScore == 4) {
    healthCareScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩‍⚕️Good health care available" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (healthCareScore == 3) {
    healthCareScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩‍⚕️Decent health care here and there" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (healthCareScore == 2) {
    healthCareScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="😳Mediocre health care here and there" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (healthCareScore == 1) {
    healthCareScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="😳Health care NOT available" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    healthCareScore = " ";
  }

  //Sets internetScore in #travel-guide table
  if (internetScore == 5) {
    internetScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="📱Fast internet everywhere" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (internetScore == 4) {
    internetScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="📱Fast internet most places" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (internetScore == 3) {
    internetScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="📱Internet available here and there" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (internetScore == 2) {
    internetScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="📱Internet tough to find" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (internetScore == 1) {
    internetScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="📱No internet available" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    internetScore = " ";
  }

  //Sets cultureScore in #travel-guide table
  if (cultureScore == 5) {
    cultureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="⛩Fascinating culture all over the place" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (cultureScore == 4) {
    cultureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="⛩Interesting culture in town" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (cultureScore == 3) {
    cultureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="⛩Some interesting culture nearby" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (cultureScore == 2) {
    cultureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="⛩Minimal interesting culture nearby" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (cultureScore == 1) {
    cultureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="⛩No culture nearby" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    cultureScore = " ";
  }

  //Sets nightLifeScore in #travel-guide table
  if (nightLifeScore == 5) {
    nightLifeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🍸Fun nightlife all over the place" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (nightLifeScore == 4) {
    nightLifeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🍸Fun nightlife around" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (nightLifeScore == 3) {
    nightLifeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🍸Nightlife here and there" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (nightLifeScore == 2) {
    nightLifeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🍸Nightlife all hard to find" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (nightLifeScore == 1) {
    nightLifeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="😢Almost no nightlife" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    cultureScore = " ";
  }

  //Sets natureScore in #travel-guide table
  if (natureScore == 5) {
    natureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🏞Beautiful nature everywhere" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (natureScore == 4) {
    natureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🏞Beautiful nature nearby" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (natureScore == 3) {
    natureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🏞Good nature spots hear and there" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (natureScore == 2) {
    natureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🏞Good nature spots hard to find" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (natureScore == 1) {
    natureScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="😢Almost no nature spots nearby" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    natureScore = " ";
  }

  //Sets safetyScore in #travel-guide table
  if (safetyScore == 5) {
    safetyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👮‍♂️Very safe area" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (safetyScore == 4) {
    safetyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👮‍♂️Mostly safe. Nothing big to worry about." class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (safetyScore == 3) {
    safetyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👮‍♂️Some crime. Keep an eye on your belongings." class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (safetyScore == 2) {
    safetyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👮‍♂️Crime common. Don't lose sight of your belongings." class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (safetyScore == 1) {
    safetyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="😳Not usually a safe place" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    safetyScore = " ";
  }

  //Sets partyScore in #travel-guide table
  if (partyScore == 5) {
    partyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🕺🏼💃Party on, Wayne!" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (partyScore == 4) {
    partyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🕺🏼💃Party spots nearby" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (partyScore == 3) {
    partyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🕺🏼💃Places to party here and there" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (partyScore == 2) {
    partyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="😢Lacking much of a party scene" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (partyScore == 1) {
    partyScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="😢Little to no partying" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    partyScore = " ";
  }

  //Sets femaleSafeScore in #travel-guide table
  if (femaleSafeScore == 5) {
    femaleSafeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩Very safe for solo-female travelers" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (femaleSafeScore == 4) {
    femaleSafeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩Mostly safe for solo-female travelers" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (femaleSafeScore == 3) {
    femaleSafeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩Some areas aren't safe for solo-female travelers" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (femaleSafeScore == 2) {
    femaleSafeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩Likely unsafe for solo-female travelers" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (femaleSafeScore == 1) {
    femaleSafeScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="👩Unsafe for solo-female travelers" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    femaleSafeScore = " ";
  }

  //Sets englishScore in #travel-guide table
  if (englishScore == 5) {
    englishScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🤓Everyone speaks English" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>great</b>
      </div>
    </div>`;
  } else if (englishScore == 4) {
    englishScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🤓Most people speak English" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>good</b>
      </div>
    </div>`;
  } else if (englishScore == 3) {
    englishScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🤓You can find English speaking locals" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>okay</b>
      </div>
    </div>`;
  } else if (englishScore == 2) {
    englishScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🙊Very few people speak English" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else if (englishScore == 1) {
    englishScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🙊Almost no one speaks English" class="progress-bar bg-danger" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
        <b>bad</b>
      </div>
    </div>`;
  } else {
    englishScore = " ";
  }

  //Sets touristScore in #travel-guide table
  if (touristScore == 5) {
    touristScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🎪Touristy and crowded area almost everyday" class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>very</b>
      </div>
    </div>`;
  } else if (touristScore == 4) {
    touristScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🎪Touristy and crowded area most days" class="progress-bar bg-danger" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>often</b>
      </div>
    </div>`;
  } else if (touristScore == 3) {
    touristScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🎪Can be touristy and crowded area on weekends and with nice weather" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>sometimes</b>
      </div>
    </div>`;
  } else if (touristScore == 2) {
    touristScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🎪Not touristy and pretty uncrowded area" class="progress-bar bg-success" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>rarely</b>
      </div>
    </div>`;
  } else if (touristScore == 1) {
    touristScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🎪No tourists and very uncrowded area" class="progress-bar bg-success" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
        <b>never</b>
      </div>
    </div>`;
  } else {
    touristScore = " ";
  }

  //Sets sharkScore in #travel-guide table
  if (sharkScore == 5) {
    sharkScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🤩No shark attacks here" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>very safe</b>
      </div>
    </div>`;
  } else if (sharkScore == 4) {
    sharkScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🤩Sharks are not a problem" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>safe</b>
      </div>
    </div>`;
  } else if (sharkScore == 3) {
    sharkScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🦈Sharks have been seen. Attacks almost never happen." class="progress-bar bg-success" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
        <b>very rare</b>
      </div>
    </div>`;
  } else if (sharkScore == 2) {
    sharkScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🦈Sharks can be around. Attacks do happen 1-2 times a year." class="progress-bar bg-warning" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
        <b>caution</b>
      </div>
    </div>`;
  } else if (sharkScore == 1) {
    sharkScore =
    `<div class="progress rounded-0" style="height: 30px;">
      <div data-toggle="tooltip" title="🦈Sharky region. Attacks do happen a few times a year." class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <b>caution</b>
      </div>
    </div>`;
  } else {
    englishScore = " ";
  }

  //Sets languageTip in #travel-guide table
  if (language == "english") {
    language = `<td data-toggle="tooltip" data-html="true" title="<p>🗣English speakers</p>" class="text-center">English</td>`;
  } else if (language == "spanish") {
    language = `<td data-toggle="tooltip" data-html="true" title="<p>👋Hello: Hola.</p><p>😁Please: Por favor.</p><p>🙏Thank you: Gracias.</p><p>🍻Beer: Cerveza.</p><p>More Spanish phrases 👇</p>" class="text-center"><a href="http://www.omniglot.com/language/phrases/spanish.php" target="_blank">Spanish</a></td>`;
  } else if (language == "portuguese") {
    language = `<td data-toggle="tooltip" data-html="true" title="<p>👋Hello: Olá.</p><p>😁Please: Por favor.</p><p>🙏Thank you: Obrigado.</p><p>🍻Beer: Cerveja.</p><p>More Portuguese phrases 👇</p>" class="text-center"><a href="https://www.omniglot.com/language/phrases/portuguese.php" target="_blank">Portuguese</a></td>`;
  } else if (language == "indonesian") {
    language = `<td data-toggle="tooltip" data-html="true" title="<p>👋Hello: Halo.</p><p>😁Please: Silakan. (suh-LAH-kann).</p><p>🙏Thank you: Terima kasih. (Tuh-REE-mah KAH-see).</p><p>🍻Beer: Bir.</p><p>More Indonesian phrases 👇</p>" class="text-center"><a href="https://www.omniglot.com/language/phrases/indonesian.php" target="_blank">🇮🇩Indonesian</a></td>`;
  } else {
    language = " ";
  }

  //Sets cityRentals in #travel-guide table
  if (cityRentals == "yes") {
    cityRentals = `<td class="text-center"><p data-toggle="tooltip" title="👍Surfboard rentals are available">👍</p></td>`;
  } else if (cityRentals == "no") {
    cityRentals = `<td class="text-center"><p data-toggle="tooltip" title="👎No surfboard rentals available">👎</p></td>`;
  } else {
    cityRentals = `<td data-toggle="tooltip" title="Undefined." class="text-center"> </td>`;
  }

  //Sets cityLessons in #travel-guide table
  if (cityLessons == "yes") {
    cityLessons = `<td class="text-center"><p data-toggle="tooltip" title="👍Surf lessons are available">👍</p></td>`;
  } else if (cityLessons == "no") {
    cityLessons = `<td class="text-center"><p data-toggle="tooltip" title="👎No surf lessons available">👎</p></td>`;
  } else {
    cityLessons = `<td data-toggle="tooltip" title="Undefined." class="text-center"> </td>`;
  }

  //Sets waterTemp in #travel-guide table
  if (waterTemp == "bathing-suit") {
    waterTemp = `<td data-toggle="tooltip" title="☀️Use a bathing suit most months" class="text-center">Bathing suit</td>`;
  } else if (waterTemp == "wetsuit") {
    waterTemp = `<td data-toggle="tooltip" title="❄️Use a wetsuit most months" class="text-center">Wetsuit</td>`;
  } else {
    waterTemp = `<td data-toggle="tooltip" title="Undefined." class="text-center"> </td>`;
  }

  //Sets tapWater in #travel-guide table
  if (tapWater == "yes") {
    tapWater = `<td data-toggle="tooltip" title="💧It's okay to drink the tap water" class="text-center">👌Tap water safe</td>`;
  } else if (tapWater == "no") {
    tapWater = `<td data-toggle="tooltip" title="🚫Do not drink the tap water" class="text-center">🚫No, dangerous</td>`;
  } else {
    tapWater = `<td data-toggle="tooltip" title="Undefined." class="text-center"> </td>`;
  }

  //Sets uber in #travel-guide table
  if (uber == "yes") {
    uber = `<td data-toggle="tooltip" title="🚘Uber is available" class="text-center">👍</td>`;
  } else if (uber == "no") {
    uber = `<td data-toggle="tooltip" title="🚘Uber is not available" class="text-center">👎</td>`;
  } else {
    uber = `<td data-toggle="tooltip" title="Undefined." class="text-center"> </td>`;
  }

  //Set goodFor in #travel-guide table
  //If goodFor is "undefined", run nothing.
  if (goodFor == null) {
    goodFor = " "
  }
  if(goodFor.indexOf("couples") != -1){
    var couples = `<a data-toggle="tooltip" title="Good for couples" style="text-decoration: none">💑</a>`;
  } else {
    var couples = ""
  }
  if(goodFor.indexOf("families") != -1){
    var families = `<a data-toggle="tooltip" title="Good for families"  style="text-decoration: none">👨‍👩‍👧‍👦 </a>`;
  } else {
    var families = ""
  }
  if(goodFor.indexOf("soloAdventure") != -1){
    var soloAdventure = `<a data-toggle="tooltip" title="Good for a solo adventure" style="text-decoration: none">🎒 </a>`;
  } else {
    var soloAdventure = ""
  }
  if(goodFor.indexOf("friendsTrip") != -1){
    var friendsTrip = `<a data-toggle="tooltip" title="Good for friend trips" style="text-decoration: none">🙌 </a>`;
  } else {
    var friendsTrip = ""
  }

  //Set powerType in #travel-guide table
  if (powerType == null) {
    powerType = " "
  }
  if(powerType.indexOf("A") != -1){
    var aType = `<a data-toggle="tooltip" title="USA, Canada, Mexico & Japan A-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/ab/" target="_blank"><img src='plugs/typeA.png'></img></a> `;
  } else {
    var aType = ""
  }
  if(powerType.indexOf("B") != -1){
    var bType = `<a data-toggle="tooltip" title="USA, Canada, Mexico & Japan B-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/ab/" target="_blank"><img src='plugs/typeB.png'></img></a> `;
  } else {
    var bType = ""
  }
  if(powerType.indexOf("C") != -1){
    var cType = `<a data-toggle="tooltip" title="Common in Europe, South America & Asia C-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/c/" target="_blank"><img src='plugs/typeC.png'></img></a> `;
  } else {
    var cType = ""
  }
  if(powerType.indexOf("D") != -1){
    var dType = `<a data-toggle="tooltip" title="Mainly in India D-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/d/" target="_blank"><img src='plugs/typeD.png'></img></a> `;
  } else {
    var dType = ""
  }
  if(powerType.indexOf("E") != -1){
    var eType = `<a data-toggle="tooltip" title="Primarily in France, Belgium, Poland, Slovakia & Czechia E-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/e/" target="_blank"><img src='plugs/typeE.png'></img></a> `;
  } else {
    var eType = ""
  }
  if(powerType.indexOf("F") != -1){
    var fType = `<a data-toggle="tooltip" title="Almost everywhere in Europe & Russia, except for the UK & Ireland F-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/f/" target="_blank"><img src='plugs/typeF.png'></img></a> `;
  } else {
    var fType = ""
  }
  if(powerType.indexOf("G") != -1){
    var gType = `<a data-toggle="tooltip" title="Mainly used in United Kingdom, Ireland, Malta, Malaysia & Singapore G-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/g/" target="_blank"><img src='plugs/typeG.png'></img></a> `;
  } else {
    var gType = ""
  }
  if(powerType.indexOf("H") != -1){
    var hType = `<a data-toggle="tooltip" title="Used in Israel, the West Bank & the Gaza Strip H-plug" href="used exclusively in Israel, the West Bank & the Gaza Strip" target="_blank"><img src='plugs/typeH.png'></img></a> `;
  } else {
    var hType = ""
  }
  if(powerType.indexOf("I") != -1){
    var iType = `<a data-toggle="tooltip" title="Mainly in Australia, New Zealand, China & Argentina I-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/i/" target="_blank"><img src='plugs/typeI.png'></img></a> `;
  } else {
    var iType = ""
  }
  if(powerType.indexOf("J") != -1){
    var jType = `<a data-toggle="tooltip" title="Used in Switzerland J-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/j/" target="_blank"><img src='plugs/typeJ.png'></img></a> `;
  } else {
    var jType = ""
  }
  if(powerType.indexOf("K") != -1){
    var kType = `<a data-toggle="tooltip" title="Used in Denmark & Greenland K-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/k/" target="_blank"><img src='plugs/typeK.png'></img></a> `;
  } else {
    var kType = ""
  }
  if(powerType.indexOf("L") != -1){
    var lType = `<a data-toggle="tooltip" title="Used in Italy & Chile L-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/l/" target="_blank"><img src='plugs/typeL.png'></img></a> `;
  } else {
    var lType = ""
  }
  if(powerType.indexOf("M") != -1){
    var mType = `<a data-toggle="tooltip" title="Used South Africa M-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/m/" target="_blank"><img src='plugs/typeM.png'></img></a> `;
  } else {
    var mType = ""
  }
  if(powerType.indexOf("N") != -1){
    var nType = `<a data-toggle="tooltip" title="Used in Brazil N-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/n/" target="_blank"><img src='plugs/typeN.png'></img></a> `;
  } else {
    var nType = ""
  }
  if(powerType.indexOf("O") != -1){
    var oType = `<a data-toggle="tooltip" title="Used in Thailand O-plug" href="https://www.worldstandards.eu/electricity/plugs-and-sockets/o/" target="_blank"><img src='plugs/typeO.png'></img></a> `;
  } else {
    var oType = ""
  }

  //Add Location Page header
  $("#loc-page-title").prepend(
    `<div class="jumbotron jumbotron-fluid" style="background-image:url(${cityImage}); background-size: cover; background-position: center; color: white;">
      <div class="container-fluid row mt-3">
        <a href="javascript:history.back()"><i class="fas fa-chevron-left fa-3x ml-4 white-link"></i></a>
        <h3 id="city" class="text-center text-capitalize mx-auto">${locname}<br><p class="h5 mt-2">${stateName}</p><h3>
      </div>
    </div>`
  );

  //add Guide Info to LOCATION GUIDE
  $("#cost__wrapper").prepend(`
    <div id="${cityName}" class="travel-guide col-lg-12 mb-4">
      <table class="table">
        <tbody>
          <tr>
            <td class="rooms font-weight-bold"><a href="${airbnb}">🏡Airbnb (private room)</a></td>
            <td class="text-center" data-toggle="tooltip" title="🏡Avg cost per night of a private room is $${roomCost}">$${roomCost}</td>
            <td class="flightPrice font-weight-bold">✈️Flight cost</td>
            <td data-toggle="tooltip" title="✈️Click to view flights" class="text-center"><a href="https://www.google.com/flights/#search;f=;t=${airport}" target="_blank">Check flights!</a></td>
          </tr>
          <tr>
            <td class="places font-weight-bold"><a href="${airbnb}">🏡Airbnb (entire place)</a></td>
            <td class="text-center" data-toggle="tooltip" title="🏡Avg cost per night of an entire place is $${placeCost}">$${placeCost}</td>
            <td class="dinner font-weight-bold">🥘Dinner Price</td>
            <td class="text-center" data-toggle="tooltip" title="🥘Avg cost of a dinner at a restaurant">$${meal}</td>
          </tr>
          <tr>
          <td class="cost font-weight-bold">💸Cost per day</td>
          <td class="text-center" data-toggle="tooltip" title="Cost of one private room, three meals out and a beer per day🤙">$${dailyCost}</td>
            <td class="beer font-weight-bold">🍺.5L Beer</td>
            <td class="text-center" data-toggle="tooltip" title="🍺Avg cost of 0.5L beer at a bar">$${beer}</td>
          </tr>
          <tr>
            <td class="atm font-weight-bold">🏧take out: ${atm} ${currencyName}</td>
            <td class="text-center" data-toggle="tooltip" title="🏧 Common ATM takeout amount">USD ${atmInUSD}</td>
            <td class="currency font-weight-bold">💸$1 USD in ${currencyName}</td>
            <td class="text-center" data-toggle="tooltip" title="💸Same as 1USD">${usdEquivalent} ${currencyName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  //add Guide Info to LOCATION GUIDE
  $("#travel-guide").prepend(`
    <div id="${cityName}" class="travel-guide col-lg-12 mb-4">
      <table class="table">
        <tbody>
          <tr>
              <td class="good-for font-weight-bold">👫Good for:</td>
              <td class="text-center">${friendsTrip}${soloAdventure}${families}${couples}</td>
              <td class="sharkScore font-weight-bold">🦈Shark safety</td>
              <td>${sharkScore}</td>
          </tr>
          <tr>
              <td class="language font-weight-bold">🗣Language</td>
              ${language}
              <td class="health-care font-weight-bold">🏥Health care</td>
              <td>${healthCareScore}</td>
          </tr>
          <tr>
              <td class="beaches font-weight-bold">🏖Beaches: </td>
              <td class="text-center"><p data-toggle="tooltip" title="🏖Comfortable beaches available">👍</p></td>
              <td class="intenet font-weight-bold">📱Internet</td>
              <td>${internetScore}</td>
          </tr>
          <tr>
              <td class="surf-lessons font-weight-bold">👩‍🏫Surf lessons</td>
              ${cityLessons}
              <td class="partyScore font-weight-bold">🕺🏼💃Party scene</td>
              <td>${partyScore}</td>
          </tr>
          <tr>
              <td class="rentals font-weight-bold">🏄‍Board rentals</td>
              ${cityRentals}
              <td class="nightlife font-weight-bold">🍸Nightlife</td>
              <td>${nightLifeScore}</td>
          </tr>
          <tr>
              <td class="uber font-weight-bold">🚘Uber available</td>
              ${uber}
              <td class="nature font-weight-bold">🏞Nature</td>
              <td>${natureScore}</td>
          </tr>
          <tr>
              <td class="tapWater font-weight-bold">🚰Safe tap water</td>
              ${tapWater}
              <td class="touristScore font-weight-bold">🎪Touristy</td>
              <td>${touristScore}</td>
          </tr>
          <tr>
              <td class="power font-weight-bold">🔌Power</td>
              <td class="text-center">${aType}${bType}${cType}${dType}${eType}${fType}${gType}${hType}${iType}${jType}${kType}${lType}${mType}${nType}${oType} <a data-toggle="tooltip" style="text-decoration: none" title="🔌${volts} Volts">${volts}V</a> <a data-toggle="tooltip" style="text-decoration: none" title="🔌${frequency} Hertz">${frequency}Hz</a></td>
              <td class="safetyScore font-weight-bold">👮‍♂️Safety</td>
              <td>${safetyScore}</td>
          </tr>
          <tr>
              <td class="insurance font-weight-bold">🚑Travelers Insurance</td>
              <td class="text-center" data-toggle="tooltip" title="🚑Click to get travelers insurance" style="color: black;"><a href="https://www.worldnomads.com/" target="_blank">Get insurance</a></td>
              <td class="femaleSafeScore font-weight-bold">👩Solo female safety</td>
              <td>${femaleSafeScore}</td>
          </tr>
          <tr>
              <td class="lp font-weight-bold">🗺Travel Guide</td>
              <td class="text-center" data-toggle="tooltip" title="💻Click to see a travel guide" style="color: black;"><a href="${lp}" target="_blank">Guidebook</a></td>
              <td class="englishScore font-weight-bold">🙊English speaking</td>
              <td>${englishScore}</td>
          </tr>
        </tbody>
      </table>
    </div>`
  );//End overview prepend

  //Initialize the AccommMap
  initAccommMap();
  //AccommMap options
  var options = {
    zoom:cityZoom,
    center:cityCenter,
  }
  //new AccommMap
  map = new google.maps.Map(document.getElementById('accomm-map'), options);
  //These functions render the price markers and markers onto the AccommMap
  renderPriceMarkers(map);
  renderSurfMarkers(map);

});//End of city document from Firestore

//Populates content on Accommodations section
window.initAccommMap = function() {
  $("#accomm-map__wrapper").prepend(`
   <div class="row">
     <div id="accomm-card-list" class="col-lg-4"></div>
     <div id="accomm-map" class="col-lg-8 mb-3"></div>
   </div>
  `);//end accomm-map prepend


  //START - Inside window.initAccommMap, populate accomm cards on the Accomm Section of the Location Page
  db.collection("priceMarkers").where("city", "==", newCityPage)
      .get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            //PRICE MARKERS IN TWO PLACES! 1. CARDS + 2. MARKERS. Change both
             const pmData = doc.data();
             const pmID = doc.id;
             const pmCity = pmData.city;
             const pmSurfSpot = pmData.surfSpot;
             const pmbookingURL = pmData.bookingURL;
             const pmPhoto = pmData.photo;
             const pmPrice = pmData.price;
             const pmAccommType = pmData.accommType;
             let pmTitle = pmData.title;
             const pmView = pmData.view;
             const pmProximity = pmData.proximity;
             const pmBedAmount = pmData.bedAmount;
             const pmBedWord = pmData.bedWord;
             const pmGuestAmount = pmData.guestAmount;
             const pmGuestWord = pmData.guestWord;

             if(pmSurfSpot != undefined) {
                pmSurfSpotName = pmSurfSpot.replace(/-/g,' ');
             }

            $("#accomm-card-list").prepend(`
              <a id="accomm-card-link" target="_blank" href="${pmbookingURL}">
               <div id="accomm-card" data-id="${pmID}" class="card accomm-card bg-dark text-white">
                 <img class="img-fluid accomm-card-img rounded" src="ac-images/${pmPhoto}"></img>
                 <div id="img-overlay" class="card-img-overlay">
                   <div id="ac-accomm-cost" class="ac-top-left">💳$${pmPrice}/n</div>
                   <div id="ac-accomm-type" class="ac-top-right">${pmAccommType}</div>
                   <h4 id="ac-title" class="card-title ac-title">${pmTitle}</h4>
                   <p id="ac-nearby-spot" class="card-text ac-text mt-1"><img src="icon-images/marker-small.png"/>Near ${pmSurfSpotName}</p>
                   <div id="ac-view" class="ac-bottom-left">😎${pmView}</div>
                   <div id="ac-dist-to-surf" class="ac-bottom-right">🏄‍${pmProximity}</div>
                 </div>
                 <div id="hover-overlay" class="card-img-overlay row">
                   <div class="ac-hover-specs font-weight-bold ml-2 my-4">
                     <p class="mb-1">👫${pmBedAmount} ${pmBedWord} • ${pmGuestAmount} ${pmGuestWord}</p>
                     <p class="mb-1 nearby-spot">📍Near ${pmSurfSpotName}</p>
                     <p class="mb-1">🏄‍${pmProximity}</p>
                     <p class="mb-1">😎${pmView}</p>
                     <p class="mb-1">💳$${pmPrice}/n</p>
                   </div>
                   <div id="ac-hover-button">
                     <button class="btn btn-danger ac-hover-button font-weight-bold mr-3">TAP TO OPEN</button>
                   </div>
                 </div>
               </div>
              </a>
            `);//End Accomm card prepend

        });
    });//END Price Markers loop
};//END window.initAccommMap

//Hover over accomm card, card changes to show more info + the relevant marker on map
$(document).on('mouseenter', '.accomm-card', function(){
  $(this).find('#img-overlay').hide();
  $(this).find('#hover-overlay').show();
})//END Accomm Card mouseenter function
.on('mouseleave', '.accomm-card', function(){
  $(this).find('#img-overlay').show();
  $(this).find('#hover-overlay').hide();
});//END Accomm Card mouseleave function

//START Populates the relevant board rental map per city
// QUERY: const docRef = db.collection("city").doc(newCityPage);
docRef.get().then(function(doc) {
  let citydata = doc.data();
  const cityZoom = citydata.zoom;
  let cityCenter = citydata.cityCenter;

  //Initialize the boardRentalMap
  initBoardRentalMap();
  //boardRentalMap options = {
  var options = {
    zoom:cityZoom,
    center:cityCenter,
  }
  //new boardRentalMap
  map = new google.maps.Map(document.getElementById('board-rental-map'), options);
  //These functions render the board rental, accomm and surf markers onto the boardRentalMap
  renderPriceMarkers(map);
  renderSurfMarkers(map);
  renderBoardRentalMarkers(map);

});//END OF POPULATING BOARD RENTAL MAP

//Populates contents of Rentals section
window.initBoardRentalMap = function () {
  $("#board-rentals__wrapper").prepend(`
    <div class="row">
      <div id="board-rental-card-list" class="col-lg-4"></div>
      <div id="board-rental-map" class="col-lg-8 mb-3"></div>
    </div>
  `);//End board rental prepend

  //START - Inside window.initBoardRentalMap, populate the board rental cards on the Rentals section of Location Page
  db.collection("boardRentalMarkers").where("city", "==", newCityPage)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //BOARD RENTAL MARKERS IN TWO PLACES! 1. CARDS + 2. MARKERS. Change both
        const brData = doc.data();
        const brID = doc.id;
        const address = brData.address;
        const boardDailyCost = brData.boardDaily;
        const boardHourlyCost = brData.boardHourly;
        const boardType = brData.boardType;
        const city = brData.city;
        const name = brData.name;
        const phone = brData.phone;
        const review = brData.review;
        const surfSpot = brData.surfSpot;
        const website = brData.website;
        const wetsuitAvail = brData.wetsuitAvail;
        const wetsuitDailyCost = brData.wetsuitDaily;
        const wetsuitHourlyCost = brData.wetsuitHourly;
        const zip = brData.zip;
        const photo = brData.photo;

        if(surfSpot != undefined) {
           brSurfSpotName = surfSpot.replace(/-/g,' ');
        }

        //Set boardType in #board-rentals__wrapper
        //If boardType is "undefined", run nothing.
        if (boardType == null) {
          boardType = " "
        }
        if(boardType.indexOf("shortboards") != -1){
          var brShortBoardOverlay = `<img src="icon-images/short-board-white.png"/><small><b>Advanced</b></small>`;
          var brShortBoardHover = `<small><b>Shortboards</b></small>`;
        } else {
          var brShortBoardOverlay = ""
          var brShortBoardHover = ""
        }
        if(boardType.indexOf("funboards") != -1){
          var brFunBoardOverlay = `<img src="icon-images/fun-board-white.png"/><small><b>Intermediate</b></small>`;
          var brFunBoardHover = `<small><b>Funboards</b></small>`;
        } else {
          var brFunBoardOverlay = ""
          var brFunBoardHover = ""
        }
        if(boardType.indexOf("longboards") != -1){
          var brLongBoardOverlay = `<img src="icon-images/long-board-white.png"/><small><b>Beginner</b></small>`;
          var brLongBoardHover = `<small><b>Longboards</b></small>`;
        } else {
          var brLongBoardOverlay = ""
          var brLongBoardHover = ""
        }

        $("#board-rental-card-list").prepend(`
          <a id="accomm-card-link" target="_blank" href="${website}">
           <div id="accomm-card" data-id="${brID}" class="card accomm-card bg-dark text-white">
             <img class="img-fluid accomm-card-img rounded" src="board-rental-images/${photo}"></img>
             <div id="img-overlay" class="card-img-overlay">
               <div id="ac-accomm-cost" class="ac-top-left"></div>
               <div id="ac-accomm-type" class="ac-top-middle pl-4">${brLongBoardOverlay}${brFunBoardOverlay}${brShortBoardOverlay}</div>
               <h4 id="ac-title" class="card-title ac-title br-title" style="white-space:nowrap; font-weight:700;">${name}</h4>
               <p id="ac-nearby-spot" class="card-text ac-text text-capitalize"><small><img src="icon-images/marker-small.png"/><b>Near ${brSurfSpotName}</b></small></p>
               <div id="ac-accomm-cost" class="ac-bottom-left text-left no-padding"><p><small><b>💳$${boardDailyCost}/board/day</b></small></p><p><small><b>💳$${wetsuitDailyCost}/wetsuit/day</b></small></p></div>
               <div id="ac-dist-to-surf" class="ac-bottom-right">${review}</div>
             </div>
             <div id="hover-overlay" class="card-img-overlay row">
               <div class="ac-hover-specs font-weight-bold ml-2 my-4">
                 <p class="mb-1">🏄‍ ${brShortBoardHover} ${brFunBoardHover} ${brLongBoardHover}</p>
                 <p class="mb-1">💳$<small><b>${boardDailyCost}/board/day</b></small></p>
                 <p class="mb-1">💳$<small><b>${wetsuitDailyCost}/wetsuit/day</b></small></p>
                 <p class="mb-1">📱<small><b>${phone}</b></small></p>
                 <p class="mb-1">${review}</p>
               </div>
               <div id="ac-hover-button">
                 <button class="btn btn-danger ac-hover-button font-weight-bold mb-5 mr-5">TAP TO OPEN</button>
               </div>
             </div>
           </div>
          </a>
        `);//END Board Rental card prepend

        //Hover over board rental card, card changes to show more info + the relevant marker on map
        $(document).on('mouseenter', '.accomm-card', function(){
          $(this).find('#img-overlay').hide();
          $(this).find('#hover-overlay').show();
        })//END Accomm Card mouseenter function
        .on('mouseleave', '.accomm-card', function(){
          $(this).find('#img-overlay').show();
          $(this).find('#hover-overlay').hide();
        });//END Accomm Card mouseleave function

      });
    });//END boardRentalMarkers loop
};//END window.initBoardRentalMap
//END - LOOP THE BOARD RENTAL CONTENT


//START Populates the relevant lesson map per city
// QUERY: const docRef = db.collection("city").doc(newCityPage);
docRef.get().then(function(doc) {
  let citydata = doc.data();
  const cityZoom = citydata.zoom;
  let cityCenter = citydata.cityCenter;

  //Initialize the lessonMap
  initLessonMap();

  var options = {
    zoom:cityZoom,
    center:cityCenter,
  }
  //new lessonMap
  map = new google.maps.Map(document.getElementById('lesson-map'), options);
  //These functions render the lesson, accomm and surf markers onto the boardRentalMap
  renderPriceMarkers(map);
  renderSurfMarkers(map);
  renderLessonMarkers(map);

});//END OF POPULATING BOARD RENTAL MAP

//Populates contents of Lessons section
window.initLessonMap = function () {
  $("#lessons__wrapper").prepend(`
    <div class="row">
      <div id="lesson-card-list" class="col-lg-4"></div>
      <div id="lesson-map" class="col-lg-8 mb-3"></div>
    </div>
  `);//End Lessons section prepend

  //START - Inside window.initLessonMap, populate the lesson cards on the Lessons section of Location Page
  db.collection("lessonMarkers").where("city", "==", newCityPage)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const lData = doc.data();
        const lessonID = doc.id;
        //LESSON MARKERS IN TWO PLACES! 1. CARDS + 2. MARKERS. Change both
        const name = lData.name;
        const city = lData.city;
        const surfSpot = lData.surfSpot;
        const website = lData.website;
        // const lessonTypesAvail = lData.lessonTypesAvail;
        const equipAvail = lData.equipAvail;
        const review = lData.review;
        const photo = lData.photo;
        const phone = lData.phone;

        if(surfSpot != undefined) {
           surfSpotName = surfSpot.replace(/-/g,' ');
        }
        //Set cost of different lessons in #lessons__wrapper
        if(lData.oneOnOneCost > 1){
          var oneOnOneCost = lData.oneOnOneCost;
          var lessonOneonOne = `😎Private $${oneOnOneCost}`;
        } else {
          var oneOnOneCost = "";
          var lessonOneonOne = "";
        }
        if(lData.smCost > 1){
          var smGroupCost = lData.smCost;
          var lessonSmGroup = `💳 $${smGroupCost}/sm group`;
        } else {
          var smGroupCost = "";
          var lessonSmGroup = "";
        }
        if(lData.lgCost > 1){
          var lgGroupCost = lData.lgCost;
          var lessonLgGroup = `💳 $${lgGroupCost}/lg group`;
        } else {
          var lgGroupCost = "";
          var lessonLgGroup = "";
        }
        if(lData.multiDayCost > 1){
          var campCost = lData.multiDayCost;
          var lessonCamp = `🎉Camp $${campCost}/day`;
        } else {
          var campCost = "";
          var lessonCamp = "";
        }

        $("#lesson-card-list").prepend(`
          <a id="accomm-card-link" target="_blank" href="${website}">
           <div id="accomm-card" data-id="${lessonID}" class="card accomm-card bg-dark text-white">
             <img class="img-fluid accomm-card-img rounded" src="lesson-images/${photo}"></img>
             <div id="img-overlay" class="card-img-overlay">
               <div id="ac-accomm-cost" class="ac-top-left"></div>
               <div id="ac-accomm-type" class="ac-top-right">${lessonOneonOne}</div>
               <h4 id="ac-title" class="card-title ac-title br-title" style="white-space:nowrap; font-weight:700;">${name}</h4>
               <p id="ac-nearby-spot" class="card-text ac-text text-capitalize"><small><img src="icon-images/marker-small.png"/><b>At ${surfSpotName}</b></small></p>
               <div id="ac-accomm-cost" class="ac-bottom-left text-left no-padding"><p>${lessonSmGroup}</p><p>${lessonLgGroup}</p></div>
               <div id="ac-dist-to-surf" class="ac-bottom-right">${review}</div>
             </div>
             <div id="hover-overlay" class="card-img-overlay row">
               <div class="ac-hover-specs font-weight-bold ml-2 my-4">
                 <p class="mb-1">💳$<small><b>${oneOnOneCost}/private</b></small></p>
                 <p class="mb-1">💳$<small><b>${smGroupCost}/sm group</b></small></p>
                 <p class="mb-1">💳$<small><b>${lgGroupCost}/lg group</b></small></p>
                 <p class="mb-1">📱<small><b>${phone}</b></small></p>
                 <p class="mb-1">${review}</p>
               </div>
               <div id="ac-hover-button">
                 <button class="btn btn-lg btn-danger ac-hover-button font-weight-bold mb-5 mr-4">TAP TO OPEN</button>
               </div>
             </div>
           </div>
          </a>
        `);//END Lesson card prepend

        //Hover over board rental card, card changes to show more info + the relevant marker on map
        $(document).on('mouseenter', '.accomm-card', function(){
          $(this).find('#img-overlay').hide();
          $(this).find('#hover-overlay').show();
        })//END Accomm Card mouseenter function
        .on('mouseleave', '.accomm-card', function(){
          $(this).find('#img-overlay').show();
          $(this).find('#hover-overlay').hide();
        });//END Accomm Card mouseleave function

      });
    });//END lessonMarkers loop
};//END window.initLessonMap
//END - LOOP THE LESSON CONTENT


//START - Populate surf spots on the location page
db.collection("surf-spot").where("city", "==", newCityPage)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

    const ssData = doc.data();
    const ssName = doc.id;
    const spotname = ssName.replace(/-/g,' ');
    const mapCenter = ssData.surfspot;
    const parkingLat = ssData.parkingLat;
    const parkingLng = ssData.parkingLng;
    const ssLat = mapCenter.lat;
    const ssLng = mapCenter.lng;
    const forecast = ssData.forecast;
    let skill = ssData.skill;
    let board = ssData.board;
    let size = ssData.size;
    let tide = ssData.tide;
    let wind = ssData.wind;
    const rentals = ssData.rentals;
    const lessons = ssData.surfLessons;
    let waveDir = ssData.direction;
    let waveType = ssData.type;
    let barrel = ssData.barrel;
    let bottom = ssData.bottom;
    let beach = ssData.beach;
    let crowd = ssData.crowd;
    let localism = ssData.localism;
    const access = ssData.access;
    const spotNote = ssData.spotNote;
    let jan = ssData.jan;
    let feb = ssData.feb;
    let mar = ssData.mar;
    let apr = ssData.apr;
    let may = ssData.may;
    let jun = ssData.jun;
    let jul = ssData.jul;
    let aug = ssData.aug;
    let sep = ssData.sep;
    let oct = ssData.oct;
    let nov = ssData.nov;
    let dec = ssData.dec;
    const icon = ssData.iconImage;
    const markerDB = ssData.marker;
    const markers1DB = ssData.markers1;
    const markersDB = ssData.markers;
    const zoom = ssData.zoom;

    //Sets skill icon in surf spot heading
    if (skill == "intermediate") {
      skill = mIntermediate;
      var skillTip = "Good for intermediate 🏄‍"
    } else if (skill == "advanced") {
      skill = mAdvanced;
      var skillTip = "Good for advanced 🏄‍"
    } else if (skill == "beginner") {
      skill = mBeginner;
      var skillTip = "Good for beginner 🏄‍"
    } else if (skill = "expert") {
      skill = mExpert;
      var skillTip = "Experts only 🏄‍"
    } else {
      skill = " ";
      var skillTip = " "
    }
    //Sets surfboard icon in surf spot specs
    if (board == "long-board") {
      board = "Longboard"
      var boardIcon = longBoard;
      var boardTip = "🏄🏽‍♀️Best with a +8ft longboard"
    } else if (board == "fun-board") {
      board = "Funboard"
      var boardIcon = funBoard;
      var boardTip = "🏄🏽‍♀️Best with a 6-8ft funboard"
    } else if (board == "short-board") {
      board = "Shortboard"
      var boardIcon = shortBoard;
      var boardTip = "🏄🏽‍♀️Best with a 5-7ft shortboard"
    } else {
      board = " ";
      var boardIcon = " ";
      var boardTip = " ";
    }
    //Sets best wave size in surf spot specs
    if (size == "waist-high") {
      size = "Waist high"
      var sizeTip = "🌊Best at waist high"
    } else if (size == "head-high") {
      size = "Head high"
      var sizeTip = "🌊Best at head high"
    } else if (size == "double-overhead") {
      size = "Double overhead"
      var sizeTip = "😱Best double overhead+"
    } else {
      size = " ";
      sizeTip = " ";
    }
    //Sets best tide in surf spot specs
    if (tide == "low") {
      tide = "Low";
      var tideTip = "〰️Best at low tide";
    } else if (tide == "medium") {
      tide = "Medium";
      var tideTip = "〰️Best at medium tide";
    } else if (tide == "high") {
      tide = "High";
      var tideTip = "〰️Best at high tide";
    } else if (tide == "all") {
      tide = "All tides";
      var tideTip = "🎉Best on all tides";
    } else {
      tide = " ";
      var tideTip = " ";
    }
    //Sets best wind in surf spot specs
    if (wind == "N") {
      var windTip = "🍃Best with N wind";
    } else if (wind == "NE") {
      var windTip = "🍃Best with NE wind";
    } else if (wind == "E") {
      var windTip = "🍃Best with E wind";
    } else if (wind == "SE") {
      var windTip = "🍃Best with SE wind";
    } else if (wind == "S") {
      var windTip = "🍃Best with S wind";
    } else if (wind == "SW") {
      var windTip = "🍃Best with SW wind";
    } else if (wind == "W") {
      var windTip = "🍃Best with W wind";
    } else if (wind == "NW") {
      var windTip = "🍃Best with NW wind";
    } else {
      wind = " ";
      var windTip = " ";
    }
    //Sets wave direction in surf spot specs
    if (waveDir == "right") {
      waveDir = "<img src='icon-images/right.png'></img>Right";
      var waveDirTip = "🌊Mostly breaks right";
    } else if (waveDir == "left") {
      waveDir = "<img src='icon-images/left.png'></img>Left";
      var waveDirTip = "🌊Mostly breaks left";
    } else if (waveDir == "both") {
      waveDir = "<img src='icon-images/right.png'><img src='icon-images/left.png'></img>Rights & Lefts";
      var waveDirTip = "🌊Breaks right and left";
    } else {
      waveDir = " ";
      var waveDirTip = " ";
    }
    //Sets wave type in surf spot specs
    if (waveType == "beach") {
      waveType = "Beach break";
      var waveTypeTip = "🌊Breaks on a beach";
    } else if (waveType == "point") {
      waveType = "Point break";
      var waveTypeTip = "🌊Breaks off a point";
    } else if (waveType == "reef") {
      waveType = "Reef break";
      var waveTypeTip = "🌊Breaks on top a reef";
    } else if (waveType == "rockreef") {
      waveType = "Rockreef break";
      var waveTypeTip = "🌊Breaks on top a rocky reef";
    } else if (waveType == "ocean") {
      waveType = "Open ocean break";
      var waveTypeTip = "🌊Breaks in open ocean";
    } else {
      waveType = " ";
      var waveTypeTip = " ";
    }
    //Sets barrel in surf spot specs
    if (barrel == "yes") {
      barrel = "Yes!";
      var barrelTip = "🤩Barrels often";
    } else if (barrel == "sometimes") {
      barrel = "If you're lucky!";
      var barrelTip = "🤩Barrels sometimes";
    } else if (barrel == "no") {
      barrel = "Nope";
      var barrelTip = "🙂Doesn't barrel";
    } else {
      barrel = " ";
      var barrelTip = " ";
    }
    //Sets bottom in surf spot specs
    if (bottom == "sand") {
      bottom = "Sand";
      var bottomTip = "🏖Mostly sandy bottom";
    } else if (bottom == "rock") {
      bottom = "Rock";
      var bottomTip = "⚓️Mostly rocky bottom";
    } else if (bottom == "reef") {
      bottom = "Reef";
      var bottomTip = "🐠Mostly reef bottom";
    } else {
      bottom = " ";
      var bottomTip = " ";
    }
    //Sets beach in surf spot specs
    if (beach == "comfortable") {
      beach = "Comfortable";
      var beachTip = "🏖Great beach to hang at";
    } else if (beach == "semi-comfortable") {
      beach = "Semi-comfortable";
      var beachTip = "🏖Rocks, weather or tide affect it. Can be good!";
    } else if (beach == "no-beach") {
      beach = "No beach";
      var beachTip = "😢No beach";
    } else {
      beach = " ";
      var beachTip = " ";
    }
    //Sets crowd in surf spot specs
    if (crowd == "a-zoo") {
      crowd = "It's often a zoo";
      var crowdTip = "🎪Often crowded";
    } else if (crowd == "spread-out") {
      crowd = "Spread out";
      var crowdTip = "😎Spread out crowd";
    } else if (crowd == "minimal") {
      crowd = "Minimal";
      var crowdTip = "🤩Minimal crowd";
    } else {
      crowd = " ";
      var crowdTip = " ";
    }
    //Sets localism in surf spot specs
    if (localism == "yes") {
      localism = "Unfriendly locals";
      var localismTip = "👺Unfriendly locals";
    } else if (localism == "be-respectful") {
      localism = "Please be respectful";
      var localismTip = "🏄‍ Respectfully";
    } else if (localism == "no") {
      localism = "Very friendly";
      var localismTip = "😇Minimal localism";
    } else {
      localism = " ";
      var localismTip = " ";
    }

    //Sets chance of rideable waves for JAN
    if (jan >= 90) {
      janEmoji = "🤩";
      var janTip = "🤩+90% chance of rideable waves";
      var janColor = "4fd600";
    } else if (jan >= 70) {
      janEmoji = "😃";
      var janTip = "😃70-90% chance of rideable waves";
      var janColor = "90EE90";
    }
    else if (jan >= 50) {
      janEmoji = "🙂";
      var janTip = "🙂50-70% chance of rideable waves";
      var janColor = "F5D327";
    }
    else if (jan < 50) {
      janEmoji = "😥";
      var janTip = "😥<50% chance of rideable waves";
      var janColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for FEB
    if (feb >= 90) {
      febEmoji = "🤩";
      var febTip = "🤩+90% chance of rideable waves";
      var febColor = "4fd600";
    } else if (feb >= 70) {
      febEmoji = "😃";
      var febTip = "😃70-90% chance of rideable waves";
      var febColor = "90EE90";
    }
    else if (feb >= 50) {
      febEmoji = "🙂";
      var febTip = "🙂50-70% chance of rideable waves";
      var febColor = "F5D327";
    }
    else if (feb < 50) {
      febEmoji = "😥";
      var febTip = "😥<50% chance of rideable waves";
      var febColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for MAR
    if (mar >= 90) {
      marEmoji = "🤩";
      var marTip = "🤩+90% chance of rideable waves";
      var marColor = "4fd600";
    } else if (mar >= 70) {
      marEmoji = "😃";
      var marTip = "😃70-90% chance of rideable waves";
      var marColor = "90EE90";
    }
    else if (mar >= 50) {
      marEmoji = "🙂";
      var marTip = "🙂50-70% chance of rideable waves";
      var marColor = "F5D327";
    }
    else if (mar < 50) {
      marEmoji = "😥";
      var marTip = "😥<50% chance of rideable waves";
      var marColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for APR
    if (apr >= 90) {
      aprEmoji = "🤩";
      var aprTip = "🤩+90% chance of rideable waves";
      var aprColor = "4fd600";
    } else if (apr >= 70) {
      aprEmoji = "😃";
      var aprTip = "😃70-90% chance of rideable waves";
      var aprColor = "90EE90";
    }
    else if (apr >= 50) {
      aprEmoji = "🙂";
      var aprTip = "🙂50-70% chance of rideable waves";
      var aprColor = "F5D327";
    }
    else if (apr < 50) {
      aprEmoji = "😥";
      var aprTip = "😥<50% chance of rideable waves";
      var aprColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for MAY
    if (may >= 90) {
      mayEmoji = "🤩";
      var mayTip = "🤩+90% chance of rideable waves";
      var mayColor = "4fd600";
    } else if (may >= 70) {
      mayEmoji = "😃";
      var mayTip = "😃70-90% chance of rideable waves";
      var mayColor = "90EE90";
    }
    else if (may >= 50) {
      mayEmoji = "🙂";
      var mayTip = "🙂50-70% chance of rideable waves";
      var mayColor = "F5D327";
    }
    else if (may < 50) {
      mayEmoji = "😥";
      var mayTip = "😥<50% chance of rideable waves";
      var mayColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for JUN
    if (jun >= 90) {
      junEmoji = "🤩";
      var junTip = "🤩+90% chance of rideable waves";
      var junColor = "4fd600";
    } else if (jun >= 70) {
      junEmoji = "😃";
      var junTip = "😃70-90% chance of rideable waves";
      var junColor = "90EE90";
    }
    else if (jun >= 50) {
      junEmoji = "🙂";
      var junTip = "🙂50-70% chance of rideable waves";
      var junColor = "F5D327";
    }
    else if (jun < 50) {
      junEmoji = "😥";
      var junTip = "😥<50% chance of rideable waves";
      var junColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for JUL
    if (jul >= 90) {
      julEmoji = "🤩";
      var julTip = "🤩+90% chance of rideable waves";
      var julColor = "4fd600";
    } else if (jul >= 70) {
      julEmoji = "😃";
      var julTip = "😃70-90% chance of rideable waves";
      var julColor = "90EE90";
    }
    else if (jul >= 50) {
      julEmoji = "🙂";
      var julTip = "🙂50-70% chance of rideable waves";
      var julColor = "F5D327";
    }
    else if (jul < 50) {
      julEmoji = "😥";
      var julTip = "😥<50% chance of rideable waves";
      var julColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for AUG
    if (aug >= 90) {
      augEmoji = "🤩";
      var augTip = "🤩+90% chance of rideable waves";
      var augColor = "4fd600";
    } else if (aug >= 70) {
      augEmoji = "😃";
      var augTip = "😃70-90% chance of rideable waves";
      var augColor = "90EE90";
    }
    else if (aug >= 50) {
      augEmoji = "🙂";
      var augTip = "🙂50-70% chance of rideable waves";
      var augColor = "F5D327";
    }
    else if (aug < 50) {
      augEmoji = "😥";
      var augTip = "😥<50% chance of rideable waves";
      var augColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for SEP
    if (sep >= 90) {
      sepEmoji = "🤩";
      var sepTip = "🤩+90% chance of rideable waves";
      var sepColor = "4fd600";
    } else if (sep >= 70) {
      sepEmoji = "😃";
      var sepTip = "😃70-90% chance of rideable waves";
      var sepColor = "90EE90";
    }
    else if (sep >= 50) {
      sepEmoji = "🙂";
      var sepTip = "🙂50-70% chance of rideable waves";
      var sepColor = "F5D327";
    }
    else if (sep < 50) {
      sepEmoji = "😥";
      var sepTip = "😥<50% chance of rideable waves";
      var sepColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for OCT
    if (oct >= 90) {
      octEmoji = "🤩";
      var octTip = "🤩+90% chance of rideable waves";
      var octColor = "4fd600";
    } else if (oct >= 70) {
      octEmoji = "😃";
      var octTip = "😃70-90% chance of rideable waves";
      var octColor = "90EE90";
    }
    else if (oct >= 50) {
      octEmoji = "🙂";
      var octTip = "🙂50-70% chance of rideable waves";
      var octColor = "F5D327";
    }
    else if (oct < 50) {
      octEmoji = "😥";
      var octTip = "😥<50% chance of rideable waves";
      var octColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for NOV
    if (nov >= 90) {
      novEmoji = "🤩";
      var novTip = "🤩+90% chance of rideable waves";
      var novColor = "4fd600";
    } else if (nov >= 70) {
      novEmoji = "😃";
      var novTip = "😃70-90% chance of rideable waves";
      var novColor = "90EE90";
    }
    else if (nov >= 50) {
      novEmoji = "🙂";
      var novTip = "🙂50-70% chance of rideable waves";
      var novColor = "F5D327";
    }
    else if (nov < 50) {
      novEmoji = "😥";
      var novTip = "😥<50% chance of rideable waves";
      var novColor = "EC5D57";
    }

    //Sets chance chance of rideable waves for DEC
    if (dec >= 90) {
      decEmoji = "🤩";
      var decTip = "🤩+90% chance of rideable waves";
      var decColor = "4fd600";
    } else if (dec >= 70) {
      decEmoji = "😃";
      var decTip = "😃70-90% chance of rideable waves";
      var decColor = "90EE90";
    }
    else if (dec >= 50) {
      decEmoji = "🙂";
      var decTip = "🙂50-70% chance of rideable waves";
      var decColor = "F5D327";
    }
    else if (dec < 50) {
      decEmoji = "😥";
      var decTip = "😥<50% chance of rideable waves";
      var decColor = "EC5D57";
    }

    initMap(
      ssData,
      spotname,
      mapCenter,
      parkingLat,
      parkingLng,
      icon,
      markerDB,
      markersDB,
      markers1DB,
      size,
      sizeTip,
      tide,
      tideTip,
      wind,
      windTip,
      rentals,
      lessons,
      waveDir,
      waveDirTip,
      waveType,
      waveTypeTip,
      barrel,
      barrelTip,
      bottom,
      bottomTip,
      beach,
      beachTip,
      crowd,
      crowdTip,
      localism,
      localismTip,
      access,
      spotNote,
      jan,
      janTip,
      janColor,
      febTip,
      febColor,
      marTip,
      marColor,
      aprTip,
      aprColor,
      mayTip,
      mayColor,
      junTip,
      junColor,
      julTip,
      julColor,
      augTip,
      augColor,
      sepTip,
      sepColor,
      octTip,
      octColor,
      novTip,
      novColor,
      decTip,
      decColor,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      forecast,
      skill,
      skillTip,
      board,
      boardIcon,
      boardTip,
      ssLat,
      ssLng
    );

    //Map options
    var options = {
      zoom:zoom,
      center:mapCenter
    }
    //new map
    map = new google.maps.Map(document.getElementById('surf-spot-map'), options);

    renderSurfMarkers(map);

  });
}); //END - Loop the surf-spot collection

window.initMap = function(
        ssData,
        spotname,
        mapCenter,
        parkingLat,
        parkingLng,
        icon,
        markerDB,
        markersDB,
        markers1DB,
        size,
        sizeTip,
        tide,
        tideTip,
        wind,
        windTip,
        rentals,
        lessons,
        waveDir,
        waveDirTip,
        waveType,
        waveTypeTip,
        barrel,
        barrelTip,
        bottom,
        bottomTip,
        beach,
        beachTip,
        crowd,
        crowdTip,
        localism,
        localismTip,
        access,
        spotNote,
        jan,
        janTip,
        janColor,
        febTip,
        febColor,
        marTip,
        marColor,
        aprTip,
        aprColor,
        mayTip,
        mayColor,
        junTip,
        junColor,
        julTip,
        julColor,
        augTip,
        augColor,
        sepTip,
        sepColor,
        octTip,
        octColor,
        novTip,
        novColor,
        decTip,
        decColor,
        feb,
        mar,
        apr,
        may,
        jun,
        jul,
        aug,
        sep,
        oct,
        nov,
        dec,
        forecast,
        skill,
        skillTip,
        board,
        boardIcon,
        boardTip,
        ssLat,
        ssLng
  ) {

    if (spotNote == undefined) {
      spotNote = "";
    }

    //If a variable is undefined don't show the surf spot
    if(spotname != undefined) {
    //Build new surf spot on location page
      $("#surf-spot-map__wrapper").prepend(
          `<div class="col-lg-6 mb-5 align-top" style="display:inline-block;">
            <h5 class="text-center mt-4 mb-1" style="text-transform:capitalize;"><a href="${forecast}" target="_blank" data-toggle="tooltip" title="Click to view 7 day 🏄‍ forecast" style="color:black;">${spotname}</a> - <img data-toggle="tooltip" title="${skillTip}" src="${skill}"></img></h5>
            <p id="spot-directions" class="text-center">
              <a href="https://maps.google.com/?saddr=Current+Location&daddr=${parkingLat},${parkingLng}&driving" target="_blank"><img src="icon-images/dir-drive.png"></img></a>
              <a href="https://maps.google.com/?saddr=Current+Location&dirflg=w&daddr=${parkingLat},${parkingLng}" target="_blank"><img src="icon-images/dir-walk.png"></img></a>
              <a href="https://maps.google.com/?saddr=Current+Location&dirflg=r&daddr=${parkingLat},${parkingLng}&mode=transit" target="_blank"><img src="icon-images/dir-bus.png"></img></a>
              <a href="https://maps.google.com/?saddr=Current+Location&dirflg=b&daddr=${parkingLat},${parkingLng}&mode=bicycling" target="_blank"><img src="icon-images/dir-bike.png"></img></a>
              <br>
              <small class="text-muted">Click for directions to the spot</small>
            </p>
            <div class="col-sm">
              <table class="table table-sm col-sm">
                <tbody class="container-fluid">
                    <tr>
                      <td class="text-center" style="background:#${janColor};" data-toggle="tooltip" title="${janTip}">${janEmoji}</td>
                      <td class="text-center" style="background:#${febColor};" data-toggle="tooltip" title="${febTip}">${febEmoji}</td>
                      <td class="text-center" style="background:#${marColor};" data-toggle="tooltip" title="${marTip}">${marEmoji}</td>
                      <td class="text-center" style="background:#${aprColor};" data-toggle="tooltip" title="${aprTip}">${aprEmoji}</td>
                      <td class="text-center" style="background:#${mayColor};" data-toggle="tooltip" title="${mayTip}">${mayEmoji}</td>
                      <td class="text-center" style="background:#${junColor};" data-toggle="tooltip" title="${junTip}">${junEmoji}</td>
                      <td class="text-center" style="background:#${julColor};" data-toggle="tooltip" title="${julTip}">${julEmoji}</td>
                      <td class="text-center" style="background:#${augColor};" data-toggle="tooltip" title="${augTip}">${augEmoji}</td>
                      <td class="text-center" style="background:#${sepColor};" data-toggle="tooltip" title="${sepTip}">${sepEmoji}</td>
                      <td class="text-center" style="background:#${octColor};" data-toggle="tooltip" title="${octTip}">${octEmoji}</td>
                      <td class="text-center" style="background:#${novColor};" data-toggle="tooltip" title="${novTip}">${novEmoji}</td>
                      <td class="text-center" style="background:#${decColor};" data-toggle="tooltip" title="${decTip}">${decEmoji}</td>
                    </tr>
                    <tr>
                      <td class="text-center">Jan</td>
                      <td class="text-center">Feb</td>
                      <td class="text-center">Mar</td>
                      <td class="text-center">Apr</td>
                      <td class="text-center">May</td>
                      <td class="text-center">Jun</td>
                      <td class="text-center">Jul</td>
                      <td class="text-center">Aug</td>
                      <td class="text-center">Sep</td>
                      <td class="text-center">Oct</td>
                      <td class="text-center">Nov</td>
                      <td class="text-center">Dec</td>
                    </tr>
                  </tbody>
                </table>
              </div>
             <div class="row">
               <div class="col-sm">
                 <table class="table col-sm">
                     <tbody>
                       <tr>
                           <td class="best-board font-weight-bold">🏄🏽‍Best board:</td>
                           <td class="text-left" data-toggle="tooltip" title="${boardTip}"><img src="${boardIcon}"></img>${board}</td>
                           <td class="wave-dir font-weight-bold">🌊Direction:</td>
                           <td class="text-left" data-toggle="tooltip" title="${waveDirTip}">${waveDir}</td>
                       </tr>
                       <tr>
                           <td class="best-size font-weight-bold">🌊Best size:</td>
                           <td class="text-left" data-toggle="tooltip" title="${sizeTip}">${size}</td>
                           <td class="wave-type font-weight-bold">🌊Type:</td>
                           <td class="text-left" data-toggle="tooltip" title="${waveTypeTip}">${waveType}</td>
                       </tr>
                       <tr>
                           <td class="best-tide font-weight-bold">〰️Best tide:</td>
                           <td class="text-left" data-toggle="tooltip" title="${tideTip}">${tide}</td>
                           <td class="barrel font-weight-bold">🤩Barrel:</td>
                           <td class="text-left" data-toggle="tooltip" title="${barrelTip}">${barrel}</td>
                       </tr>
                       <tr>
                           <td class="wind-dir font-weight-bold">💨Best wind:</td>
                           <td class="text-left" data-toggle="tooltip" title="${windTip}">${wind}</td>
                           <td class="bottom font-weight-bold">⚓️Bottom:</td>
                           <td class="text-left" data-toggle="tooltip" title="${bottomTip}">${bottom}</td>
                       </tr>
                       <tr>
                           <td class="beach font-weight-bold">🏖Beach: </td>
                           <td class="text-left" data-toggle="tooltip" title="${beachTip}">${beach}</td>
                           <td class="crowd font-weight-bold">🎪Crowd: </td>
                           <td class="text-left" data-toggle="tooltip" title="${crowdTip}">${crowd}</td>
                       </tr>
                       <tr>
                           <td class="access font-weight-bold">🚗Access: </td>
                           <td class="text-left" data-toggle="tooltip" title="${access}">${access}</td>
                           <td class="localism font-weight-bold">👺Localism: </td>
                           <td class="text-left" data-toggle="tooltip" title="${localismTip}">${localism}</td>
                       </tr>
                       <tr>
                          <td colspan="12" class="text-center">
                            <p class="mt-2"><b>📝Notes</b></p>
                            <p id="spot-notes">${spotNote} Get directions to <a style="text-transform:capitalize;">${spotname}\'s</a> main parking lot via Google Maps by clicking above.</p>
                            <p class="text-muted"><small>Always check the forecast before you go by clicking the spot name above. Be kind and surf respectfully.🤙</small></p>
                          </td>
                       </tr>
                     </tbody>
                 </table>
               </div>
             </div>
            <div id="surf-spot-map" class="mb-3" style="max-height:auto; width:auto;"></div>
           </div>`
      ); //End prepend
    }
  };//End window.initMap for Surf Spot Section

//DRAFT START Flights
//Adds days so the dateFrom and returnDate in the flights search menu don't start on today
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
};

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

//Sets default dateFrom and dateTo values
var dateFrom = new Date().addDays(1); //+1 days
var ddFrom = dateFrom.getDate();
var mmFrom = dateFrom.getMonth()+1; //January is 0!
var yyyyFrom = dateFrom.getFullYear();

var dateTo = new Date().addDays(1); //+1 days
var ddTo = dateTo.getDate();
var mmTo = dateTo.getMonth()+1; //January is 0!
var yyyyTo = dateTo.getFullYear();

//Sets default returnFrom and returnTo values
var returnFrom = new Date().addDays(7); //+7 days
var ddReturnFrom = returnFrom.getDate();
var mmReturnFrom = returnFrom.getMonth()+1; //January is 0!
var yyyyReturnFrom = returnFrom.getFullYear();

var returnTo = new Date().addDays(7); //+7 days
var ddReturnTo = returnTo.getDate();
var mmReturnTo = returnTo.getMonth()+1; //January is 0!
var yyyyReturnTo = returnTo.getFullYear();

if(dd<10){
    dd='0'+dd;
}
if(mm<10){
    mm='0'+mm;
}
var today = dd+'/'+mm+'/'+yyyy;
var dateFrom = ddFrom+'/'+mmFrom+'/'+yyyyFrom;
var dateTo = ddTo+'/'+mmTo+'/'+yyyyTo;
var returnFrom = ddReturnFrom+'/'+mmReturnFrom+'/'+yyyyReturnFrom;
var returnTo = ddReturnTo+'/'+mmReturnTo+'/'+yyyyReturnTo;
//Sets default return dates
var returnDates = `&returnFrom=${returnFrom}&returnTo=${returnTo}`;
//Sets default passenger type variables
var adults = 1;
var infants = 0;
//Sets default stopover count
var stopOvers = 5;
//Sets default departure time preferences
var dTimeFrom = "00:00";
var dTimeTo = "23:59";
//Sets default arrival time preferences
var aTimeFrom = "00:00";
var aTimeTo = "23:59";
//Sets default IB departure time preferences
var ibdTimeFrom = "00:00";
var ibdTimeTo = "23:59";
//Sets default IBarrival time preferences
var ibaTimeFrom = "00:00";
var ibaTimeTo = "23:59";
//Sets default sortBy to price
var sortFlightsBy = "price";
//Sets default max flight duration to 80 hours
var maxFlyDuration = 80;
//Sets bag price to false (hide)
var bagPrice = "hide";
//Sets from destination in flight search menu
var fromDest = "LAX";
//Sets default one way or round trip to Round Trip
var oneWayOrRoundTrip = "roundTrip";

//START Airport autocomplete (https://codepen.io/anon/pen/QrBdog)
var options = {
  shouldSort: true,
  threshold: 0.4,
  maxPatternLength: 32,
  keys: [{
    name: 'iata',
    weight: 0.5
  }, {
    name: 'name',
    weight: 0.3
  }, {
    name: 'city',
    weight: 0.2
  }]
};

var fuse = new Fuse(airports, options)

var ac = $('#fromDestSearch')
  .on('click', function(e) {
    e.stopPropagation();
  })
  .on('focus keyup', search)
  .on('keydown', onKeyDown);

var wrap = $('<div>')
  .addClass('autocomplete-wrapper')
  .insertBefore(ac)
  .append(ac);

var list = $('<div>')
  .addClass('autocomplete-results')
  .on('click', '.autocomplete-result', function(e) {
    e.preventDefault();
    e.stopPropagation();
    selectIndex($(this).data('index'));
  })
  .appendTo(wrap);

$(document)
  .on('mouseover', '.autocomplete-result', function(e) {
    var index = parseInt($(this).data('index'), 10);
    if (!isNaN(index)) {
      list.attr('data-highlight', index);
    }
  })
  .on('click', clearResults);

function clearResults() {
  results = [];
  numResults = 0;
  list.empty();
}

function selectIndex(index) {
  if (results.length >= index + 1) {
    ac.val(results[index].iata);
    clearResults();
  }
}

var results = [];
var numResults = 0;
var selectedIndex = -1;

function search(e) {
  if (e.which === 38 || e.which === 13 || e.which === 40) {
    return;
  }

  if (ac.val().length > 0) {
    results = _.take(fuse.search(ac.val()), 7);
    numResults = results.length;

    var divs = results.map(function(r, i) {
        return '<div class="autocomplete-result" data-index="'+ i +'">'
             + '<div><b>'+ r.iata +'</b> - '+ r.name +'</div>'
             + '<div class="autocomplete-location">'+ r.city +', '+ r.country +'</div>'
             + '</div>';
     });

    selectedIndex = -1;
    list.html(divs.join(''))
      .attr('data-highlight', selectedIndex);

  } else {
    numResults = 0;
    list.empty();
  }
}

function onKeyDown(e) {
  switch(e.which) {
    case 38: // up
      selectedIndex--;
      if (selectedIndex <= -1) {
        selectedIndex = -1;
      }
      list.attr('data-highlight', selectedIndex);
      break;
    case 13: // enter
      selectIndex(selectedIndex);
      break;
    case 9: // enter
      selectIndex(selectedIndex);
      e.stopPropagation();
      return;
    case 40: // down
      selectedIndex++;
      if (selectedIndex >= numResults) {
        selectedIndex = numResults-1;
      }
      list.attr('data-highlight', selectedIndex);
      break;

    default: return; // exit this handler for other keys
  }
  e.stopPropagation();
  e.preventDefault(); // prevent the default action (scroll / move caret)
}
//END Airport autocomplete (https://codepen.io/anon/pen/QrBdog)

//START Passenger button. Shows and store # of passengers on button when selected.
$(function(){
  $("#1adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#2adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#3adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#4adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#5adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#6adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#7adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#8adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
  $("#9adult").click(function () {
  $("#adult").text($(this).text());
  adults = $(this).attr("data-adults");
  });
});
//Infants button
$(function(){
  $("#0infant").click(function () {
  $("#infants").text($(this).text());
  infants = $(this).attr("data-infants");
  });
  $("#1infant").click(function () {
  $("#infants").text($(this).text());
  infants = $(this).attr("data-infants");
  });
  $("#2infant").click(function () {
  $("#infants").text($(this).text());
  infants = $(this).attr("data-infants");
  });
  $("#3infant").click(function () {
  $("#infants").text($(this).text());
  infants = $(this).attr("data-infants");
  });
  $("#4infant").click(function () {
  $("#infants").text($(this).text());
  infants = $(this).attr("data-infants");
  });
});
//stopOvers preference
$(function(){
  $("#stopOver").click(function () {
  $("#stopOvers").text($(this).text());
  stopOvers = $(this).attr("data-stopovers");
  });
  $("#0stopOver").click(function () {
  $("#stopOvers").text($(this).text());
  stopOvers = $(this).attr("data-stopovers");
  });
  $("#1stopOver").click(function () {
  $("#stopOvers").text($(this).text());
  stopOvers = $(this).attr("data-stopovers");
  });
  $("#2stopOver").click(function () {
  $("#stopOvers").text($(this).text());
  stopOvers = $(this).attr("data-stopovers");
  });
});
//OB Departure time preference (dtimefrom=min departure (after 8am), dtimeto=max departure (before 10am))
$(function(){
  $("#departureTime").click(function () {
  $("#departureTimes").text($(this).text());
  dTimeFrom = $(this).attr("data-dtimefrom");
  dTimeTo = $(this).attr("data-dtimeto");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#0departureTime").click(function () {
  $("#departureTimes").text($(this).text());
  dTimeTo = $(this).attr("data-dtimeto");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#1departureTime").click(function () {
  $("#departureTimes").text($(this).text());
  dTimeFrom = $(this).attr("data-dtimefrom");
  dTimeTo = $(this).attr("data-dtimeto");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#2departureTime").click(function () {
  $("#departureTimes").text($(this).text());
  dTimeFrom = $(this).attr("data-dtimefrom");
  $('#flights__list').empty();
  flightSearch();
  });
});
//OB Arrival time preference (atimefrom=min arrival (after 8am), atimeto=max arrival (before 10am))
$(function(){
  $("#arrivalTime").click(function () {
  $("#arrivalTimes").text($(this).text());
  aTimeFrom = $(this).attr("data-atimefrom");
  aTimeTo = $(this).attr("data-atimeto");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#0arrivalTime").click(function () {
  $("#arrivalTimes").text($(this).text());
  aTimeTo = $(this).attr("data-atimeto");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#1arrivalTime").click(function () {
  $("#arrivalTimes").text($(this).text());
  aTimeFrom = $(this).attr("data-atimefrom");
  aTimeTo = $(this).attr("data-atimeto");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#2arrivalTime").click(function () {
  $("#arrivalTimes").text($(this).text());
  aTimeFrom = $(this).attr("data-atimefrom");
  $('#flights__list').empty();
  flightSearch();
  });
});
//IB Departure time preference (dtimefrom=min departure (after 8am), dtimeto=max departure (before 10am))
$(function(){
  $("#ibDepartureTime").click(function () {
  $("#ibDepartureTimes").text($(this).text());
  ibdTimeFrom = $(this).attr("data-ibDTimeFrom");
  ibdTimeTo = $(this).attr("data-ibDTimeTo");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#0ibDepartureTime").click(function () {
  $("#ibDepartureTimes").text($(this).text());
  ibdTimeTo = $(this).attr("data-ibDTimeTo");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#1ibDepartureTime").click(function () {
  $("#ibDepartureTimes").text($(this).text());
  ibdTimeFrom = $(this).attr("data-ibDTimeFrom");
  ibdTimeTo = $(this).attr("data-ibDTimeTo");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#2ibDepartureTime").click(function () {
  $("#ibDepartureTimes").text($(this).text());
  ibdTimeFrom = $(this).attr("data-ibDTimeFrom");
  $('#flights__list').empty();
  flightSearch();
  });
});
//IB Arrival time preference (atimefrom=min arrival (after 8am), atimeto=max arrival (before 10am))
$(function(){
  $("#ibArrivalTime").click(function () {
  $("#ibArrivalTimes").text($(this).text());
  ibaTimeFrom = $(this).attr("data-ibAtimeFrom");
  ibaTimeTo = $(this).attr("data-ibAtimeTo");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#0ibArrivalTime").click(function () {
  $("#ibArrivalTimes").text($(this).text());
  ibaTimeTo = $(this).attr("data-ibAtimeTo");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#1ibArrivalTime").click(function () {
  $("#ibArrivalTimes").text($(this).text());
  ibaTimeFrom = $(this).attr("data-ibAtimeFrom");
  ibaTimeTo = $(this).attr("data-ibAtimeTo");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#2ibArrivalTime").click(function () {
  $("#ibArrivalTimes").text($(this).text());
  ibaTimeFrom = $(this).attr("data-ibAtimeFrom");
  $('#flights__list').empty();
  flightSearch();
  });
});
//Sets max flight duration preferences
$(function(){
  $("#50maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#45maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#40maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#35maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#30MaxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#25maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#20maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#15maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#10MaxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#9maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#8maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#7maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#6MaxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#5maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#4maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#3maxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#2MaxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#1MaxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#AnyMaxFlyDuration").click(function () {
  $("#maxFlyDurations").text($(this).text());
  maxFlyDuration = $(this).attr("data-flightDuration");
  $('#flights__list').empty();
  flightSearch();
  });
});

//Sorts flights by price and duration
$(function(){
  $("#sortFlightsByPrice").click(function () {
  $("#sortFlightsBy").text($(this).text());
  sortFlightsBy = $(this).attr("data-sortFlightsBy");
  $('#flights__list').empty();
  flightSearch();
  });
  $("#sortFlightsByDuration").click(function () {
  $("#sortFlightsBy").text($(this).text());
  sortFlightsBy = $(this).attr("data-sortFlightsBy");
  $('#flights__list').empty();
  flightSearch();
  });
});
//Shows/Hides bag price
$(function(){
  $("#bagPriceShow").click(function () {
    $(".bags").show();
  });
  $("#bagPriceHide").click(function () {
    $(".bags").hide();
  });
});
//Round Trip or One Way? on button click
$(function(){
  $("#roundTripShow").click(function () {
  $("#oneWayOrRoundTrip").text($(this).text());
  returnDates = $(this).attr("data-oneWayOrRoundTrip");
  $("#returnDate").show();
  $("#roundTripShow").addClass("active");
  $("#oneWayShow").removeClass("active");
  oneWayOrRoundTrip = "roundTrip";
  });

  $("#oneWayShow").click(function () {
  $("#oneWayOrRoundTrip").text($(this).text());
  returnDates = $(this).attr("data-oneWayOrRoundTrip");
  $("#returnDate").hide();
  $("#roundTripShow").removeClass("active");
  $("#oneWayShow").addClass("active");
  oneWayOrRoundTrip = "oneWay";
  });
});
//END Passenger Button

// //Drops down a calendar to pick departure date (http://www.daterangepicker.com/)
// $('input[name="departure"]').daterangepicker({
//   opens: 'center',
//   drops: 'down',
//   singleDatePicker: true,
//   buttonClasses: 'btn',
//   applyButtonClasses: 'btn-danger',
//   cancelButtonClasses: 'btn-outline-danger',
// }, function(start, end, label) {
//   console.log("A new outbound date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
//   dateFrom = start.format('DD/MM/YYYY');
//   dateTo = end.format('DD/MM/YYYY');
// });

//Drops down a calendar to pick OB AND IB flight dates (http://www.daterangepicker.com/)
$('input[name="return"]').daterangepicker({
  opens: 'center',
  drops: 'down',
  buttonClasses: 'btn',
  applyButtonClasses: 'btn-danger',
  cancelButtonClasses: 'btn-outline-danger',
  autoUpdateInput: false,
  locale: {
      cancelLabel: 'Clear'
  },
}, function(start, end, label) {
  // console.log("A new return date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  dateFrom = start.format('DD/MM/YYYY');
  dateTo = start.format('DD/MM/YYYY');
  returnFrom = end.format('DD/MM/YYYY');
  returnTo = end.format('DD/MM/YYYY');
  returnDates = `&returnFrom=${returnFrom}&returnTo=${returnTo}`
});

$('input[name="return"]').on('apply.daterangepicker', function(ev, picker) {
         $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
});

// //Drops down a calendar to pick return date (http://www.daterangepicker.com/)
// $('input[name="return"]').daterangepicker({
//   opens: 'center',
//   drops: 'down',
//   singleDatePicker: true,
//   buttonClasses: 'btn',
//   applyButtonClasses: 'btn-danger',
//   cancelButtonClasses: 'btn-outline-danger',
//   autoUpdateInput: false,
//   locale: {
//       cancelLabel: 'Clear'
//   }
// }, function(start, end, label) {
//   // console.log("A new return date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
//   returnFrom = start.format('DD/MM/YYYY');
//   returnTo = end.format('DD/MM/YYYY');
//   returnDates = `&returnFrom=${returnFrom}&returnTo=${returnTo}`
// });
//
// $('input[name="return"]').on('apply.daterangepicker', function(ev, picker) {
//     $(this).val(picker.startDate.format('MM/DD/YYYY'));
// });

//START Flight search on click
$('.flightSearch').click(function(){
   fromDest = $('#fromDestSearch').val();
   // console.log(returnFrom, returnTo);
   $('#flights__list').empty();
   flightSearch();
});//END Flight search

//START flightSearch function with the skypicker AJAX call
function flightSearch(){
  //If flight search happens without inputing city into FROM input, set fromDest to initial destination (LAX)
  if (fromDest.length < 2) {
    fromDest = "LAX";
  }
  //Dynamic API URL to call in flightSearch();
  var flightSearchURL = `https://api.skypicker.com/flights?flyFrom=${fromDest}&to=DPS&dateFrom=${dateFrom}&dateTo=${dateTo}${returnDates}&adults=${adults}&infants=${infants}&maxstopovers=${stopOvers}&dtimefrom=${dTimeFrom}&dtimeto=${dTimeTo}&atimefrom=${aTimeFrom}&atimeto=${aTimeTo}&returndtimefrom=${ibdTimeFrom}&returndtimeto=${ibdTimeTo}&returnatimefrom=${ibaTimeFrom}&returnatimeto=${ibaTimeTo}&maxFlyDuration=${maxFlyDuration}&curr=USD&sort=${sortFlightsBy}&limit=50&partner=picky`;
  $('#loadImage').show();
  $.ajax({
    type: 'GET',
    url:`${flightSearchURL}`,
    success: function(flights){
      //Hides the loading image after successful AJAX call
      $("#loadImage").hide();
      // console.log('success', flights);

      //Loops through route array. Gets data on each route.
      let flightData = flights.data;
       obaTimes = [];
       ibdTimes = [];
       obIatas = [];
       previousOBIatas = [];
       ibIatas = [];
       previousIBIatas = [];
       obLayovers = [];
       prevOBLayovers = [];
       ibLayovers = [];
       prevIBLayovers = [];

      for (let i=0; i < flightData.length; i++) {
        deeplink = flights.data[i].deep_link;
        price = flights.data[i].price;
        obFrom = flights.data[i].routes[0][0];
        obTo = flights.data[i].routes[0][1];
        ibFrom = flights.data[i].routes[1][0];
        ibTo = flights.data[i].routes[1][1];
        let obDuration = flights.data[i].fly_duration;
        let ibDuration = flights.data[i].return_duration;
        obdTime = flights.data[i].route[0].dTime + (60*60*7); //CORRECT
        routeLength = flights.data[i].route.length;
        ibaTime = flights.data[i].route[routeLength-1].aTime + (60*60*7); //CORRECT
        let routeData = flights.data[i].route;
        if (i > 0) {
          prevRouteData = flights.data[i-1].route;
        } else {
          prevRouteData = [];
        }

         //Loops through routeData and returns ib and ob times AND ib and ob airline iata codes
         for (let j=0; j < routeData.length; j++) {
           if (flights.data[i].route[j].return == 0) {
             obaTimes.push(flights.data[i].route[j].aTime + (60*60*7)); //CORRECT
             obIatas.push(flights.data[i].route[j].airline);
             if (flights.data[i].flyTo !== flights.data[i].route[j].flyTo) {
               obLayovers.push(flights.data[i].route[j].flyTo);
             }
           }
           if (flights.data[i].route[j].return == 1) {
             ibIatas.push(flights.data[i].route[j].airline);
             if (flights.data[i].flyFrom !== flights.data[i].route[j].flyTo) {
               ibLayovers.push(flights.data[i].route[j].flyTo);
             }
           }
           if (flights.data[i].flyTo == flights.data[i].route[j].flyFrom) {
             ibdTimes.push(flights.data[i].route[j].dTime + (60*60*7)); // CORRECT
           }
              // Sets outbound depature times
              var obdDate = new Date(obdTime*1000);  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
              // Hours part from the timestamp
              var obdHours = obdDate.getHours();
              if (obdHours > 0 && obdHours <= 12) {
                obdHourConversion= "" + obdHours;
              } else if (obdHours > 12) {
                obdHourConversion= "" + (obdHours - 12);
              } else if (obdHours == 0) {
                obdHourConversion= "12";
              }
              obdAMPM = (obdHours >= 12) ? " PM" : " AM";  // get AM/PM
              // Minutes part from the timestamp
              var obdMinutes = ('0'+obdDate.getMinutes()).slice(-2);

              // Sets outbound arrival times
              var obaDate = new Date(obaTimes[obaTimes.length-1]*1000);  //CORRECT. // multiplied by 1000 so that the argument is in milliseconds, not seconds.
              // Hours part from the timestamp
              var obaHours = obaDate.getHours();
              if (obaHours > 0 && obaHours <= 12) {
                var obaHourConversion= "" + obaHours;
              } else if (obaHours > 12) {
                obaHourConversion= "" + (obaHours - 12);
              } else if (obaHours == 0) {
                obaHourConversion= "12";
              }
              obaAMPM = (obaHours >= 12) ? " PM" : " AM";  // get AM/PM
              // Minutes part from the timestamp
              var obaMinutes = ('0'+obaDate.getMinutes()).slice(-2);
              // console.log(`obaTime: ${obaHourConversion}:${obaMinutes}${obaAMPM}`);

              // Sets inbound departure times
              var ibdDate = new Date(ibdTimes[i]*1000);  //INCORRECT. // multiplied by 1000 so that the argument is in milliseconds, not seconds.
              // Hours part from the timestamp
              var ibdHours = ibdDate.getHours();
              if (ibdHours > 0 && ibdHours <= 12) {
                var ibdHourConversion= "" + ibdHours;
              } else if (ibdHours > 12) {
                ibdHourConversion= "" + (ibdHours - 12);
              } else if (ibdHours == 0) {
                ibdHourConversion= "12";
              }
              ibdAMPM = (ibdHours >= 12) ? " PM" : " AM";  // get AM/PM
              // Minutes part from the timestamp
              var ibdMinutes = ('0'+ibdDate.getMinutes()).slice(-2);
              // console.log(`ibdTime: ${ibdHourConversion}:${ibdMinutes}${ibdAMPM}`);

              // Sets inbound arrival times
              var ibaDate = new Date(ibaTime*1000);  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
              // Hours part from the timestamp
              var ibaHours = ibaDate.getHours();
              if (ibaHours > 0 && ibaHours <= 12) {
                ibaHourConversion= "" + ibaHours;
              } else if (ibaHours > 12) {
                ibaHourConversion= "" + (ibaHours - 12);
              } else if (ibaHours == 0) {
                ibaHourConversion= "12";
              }
              ibaAMPM = (ibaHours >= 12) ? " PM" : " AM";  // get AM/PM
              // Minutes part from the timestamp
              var ibaMinutes = ('0'+ibaDate.getMinutes()).slice(-2);

         }//END routeData.length loop

         //Loops through previous route data so j is stable to previous route
           for (k=0; k<prevRouteData.length; k++) {
               if (flights.data[i-1].route[k].return == 0) {
                  if (i > 0) {
                     previousOBIatas.push(flights.data[i-1].route[k].airline);
                      if (flights.data[i-1].flyTo !== flights.data[i-1].route[k].flyTo) {
                        prevOBLayovers.push(flights.data[i-1].route[k].flyTo);
                      }
                  }
               }
               if (flights.data[i-1].route[k].return == 1) {
                  if (i > 0) {
                     previousIBIatas.push(flights.data[i-1].route[k].airline)
                     if (flights.data[i-1].flyFrom !== flights.data[i-1].route[k].flyTo) {
                       prevIBLayovers.push(flights.data[i-1].route[k].flyTo);
                     }
                  }
               }
           }

           // console.log(prevIBLayovers);
           // console.log(ibLayovers);
           //Gets length of current obIatas array
           var obIatasLength = obIatas.length;
           var ibIatasLength = ibIatas.length;
           var obLayoversLength = obLayovers.length;
           var ibLayoversLength = ibLayovers.length;
           //Gets length of previous obIatas array
           var previousOBIatasLength = previousOBIatas.length;
           var previousIBIatasLength = previousIBIatas.length;
           var prevOBLayoversLength = prevOBLayovers.length;
           var prevIBLayoversLength = prevIBLayovers.length;
           // console.log(previousOBIatasLength+", "+obIatasLength);
           // console.log(prevIBLayoversLength+", "+ibLayoversLength);
           //Gets the iata codes between the current obIatasLength and previousOBIatasLength to provide iata codes of current OB Flight. Example (14, 17) gives the iata codes between those spots in the array.
           var obFlightIatas = obIatas.slice(previousOBIatasLength, obIatasLength);
           var ibFlightIatas = ibIatas.slice(previousIBIatasLength, ibIatasLength);
           var obFlightLayovers = obLayovers.slice(prevOBLayoversLength, obLayoversLength);
           var ibFlightLayovers = ibLayovers.slice(prevIBLayoversLength, ibLayoversLength);
           // console.log("ibLayovers outcome array: "+ibFlightLayovers);
           //Checks if obIata code is available, if so build the ob airline logo, if not build nothing.
           if (obFlightIatas[0] != undefined) {
             obAirline1 = obFlightIatas[0];
             obAirline1 = `<img src="https://images.kiwi.com/airlines/64/${obAirline1}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline1 = ``;
           }
           if (obFlightIatas[1] != undefined) {
             obAirline2 = obFlightIatas[1];
             obAirline2 = ` <img src="https://images.kiwi.com/airlines/64/${obAirline2}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline2 = ``;
           }
           if (obFlightIatas[2] != undefined) {
             obAirline3 = obFlightIatas[2];
             obAirline3 = ` <img src="https://images.kiwi.com/airlines/64/${obAirline3}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline3 = ``;
           }
           if (obFlightIatas[3] != undefined) {
             obAirline4 = obFlightIatas[3];
             obAirline4 = ` <img src="https://images.kiwi.com/airlines/64/${obAirline4}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline4 = ``;
           }
           if (obFlightIatas[4] != undefined) {
             obAirline5 = obFlightIatas[4];
             obAirline5 = ` <img src="https://images.kiwi.com/airlines/64/${obAirline5}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline5 = ``;
           }
           if (obFlightIatas[5] != undefined) {
             obAirline6 = obFlightIatas[5];
             obAirline6 = ` <img src="https://images.kiwi.com/airlines/64/${obAirline6}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline6 = ``;
           }
           if (obFlightIatas[6] != undefined) {
             obAirline7 = obFlightIatas[6];
             obAirline7 = ` <img src="https://images.kiwi.com/airlines/64/${obAirline7}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline7 = ``;
           }
           if (obFlightIatas[7] != undefined) {
             obAirline8 = obFlightIatas[7];
             obAirline8 = ` <img src="https://images.kiwi.com/airlines/64/${obAirline8}.png" style="height:45px; width:45px;"</img>`
           } else {
             obAirline8 = ``;
           }
           //Builds airline logo for inbound flights
           if (ibFlightIatas[0] != undefined) {
             ibAirline1 = ibFlightIatas[0];
             ibAirline1 = `<img src="https://images.kiwi.com/airlines/64/${ibAirline1}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline1 = ``;
           }
           if (ibFlightIatas[1] != undefined) {
             ibAirline2 = ibFlightIatas[1];
             ibAirline2 = ` <img src="https://images.kiwi.com/airlines/64/${ibAirline2}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline2 = ``;
           }
           if (ibFlightIatas[2] != undefined) {
             ibAirline3 = ibFlightIatas[2];
             ibAirline3 = ` <img src="https://images.kiwi.com/airlines/64/${ibAirline3}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline3 = ``;
           }
           if (ibFlightIatas[3] != undefined) {
             ibAirline4 = ibFlightIatas[3];
             ibAirline4 = ` <img src="https://images.kiwi.com/airlines/64/${ibAirline4}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline4 = ``;
           }
           if (ibFlightIatas[4] != undefined) {
             ibAirline5 = ibFlightIatas[4];
             ibAirline5 = ` <img src="https://images.kiwi.com/airlines/64/${ibAirline5}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline5 = ``;
           }
           if (ibFlightIatas[5] != undefined) {
             ibAirline6 = ibFlightIatas[5];
             ibAirline6 = ` <img src="https://images.kiwi.com/airlines/64/${ibAirline6}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline6 = ``;
           }
           if (ibFlightIatas[6] != undefined) {
             ibAirline7 = ibFlightIatas[6];
             ibAirline7 = ` <img src="https://images.kiwi.com/airlines/64/${ibAirline7}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline7 = ``;
           }
           if (ibFlightIatas[7] != undefined) {
             ibAirline8 = ibFlightIatas[7];
             ibAirline8 = ` <img src="https://images.kiwi.com/airlines/64/${ibAirline8}.png" style="height:45px; width:45px;"</img>`
           } else {
             ibAirline8 = ``;
           }
           //Gets Outbound Layover airport codes that exists to place in #flights
           if (obFlightLayovers[0] != undefined) {
             obLayover1 = obFlightLayovers[0];
           } else {
             obLayover1 = ``;
           }
           if (obFlightLayovers[1] != undefined) {
             obLayover2 = ", "+obFlightLayovers[1];
           } else {
             obLayover2 = ``;
           }
           if (obFlightLayovers[2] != undefined) {
             obLayover3 = ", "+obFlightLayovers[2];
           } else {
             obLayover3 = ``;
           }
           if (obFlightLayovers[3] != undefined) {
             obLayover4 = ", "+obFlightLayovers[3];
           } else {
             obLayover4 = ``;
           }
           if (obFlightLayovers[4] != undefined) {
             obLayover5 = ", "+obFlightLayovers[4];
           } else {
             obLayover5 = ``;
           }
           if (obFlightLayovers[5] != undefined) {
             obLayover6 = ", "+obFlightLayovers[5];
           } else {
             obLayover6 = ``;
           }
           if (obFlightLayovers[6] != undefined) {
             obLayover7 = ", "+obFlightLayovers[6];
           } else {
             obLayover7 = ``;
           }
           //Gets Inbound Layover airport codes that exists to place in #flights
           if (ibFlightLayovers[0] != undefined) {
             ibLayover1 = ibFlightLayovers[0];
           } else {
             ibLayover1 = ``;
           }
           if (ibFlightLayovers[1] != undefined) {
             ibLayover2 = ", "+ibFlightLayovers[1];
           } else {
             ibLayover2 = ``;
           }
           if (ibFlightLayovers[2] != undefined) {
             ibLayover3 = ", "+ibFlightLayovers[2];
           } else {
             ibLayover3 = ``;
           }
           if (ibFlightLayovers[3] != undefined) {
             ibLayover4 = ", "+ibFlightLayovers[3];
           } else {
             ibLayover4 = ``;
           }
           if (ibFlightLayovers[4] != undefined) {
             ibLayover5 = ", "+ibFlightLayovers[4];
           } else {
             ibLayover5 = ``;
           }
           if (ibFlightLayovers[5] != undefined) {
             ibLayover6 = ", "+ibFlightLayovers[5];
           } else {
             ibLayover6 = ``;
           }
           if (ibFlightLayovers[6] != undefined) {
             ibLayover7 = ", "+ibFlightLayovers[6];
           } else {
             ibLayover7 = ``;
           }

       if (oneWayOrRoundTrip == "roundTrip") {
         $("#flights__list").append(`
           <div id="flights" class="route container-fluid justify-content-center mb-3" style="height:200px;">
             <div class="price col-1 float-right">
               <a href="${deeplink}" target="_blank"><button class="btn btn-lg btn-success mr-5"><b>$${price}</b></button></a>
             </div>
             <div id="obFlights" class="flight-specs row col-11 mt-4">
               <div id="obAirlines" style="width:22%">${obAirline1}${obAirline2}${obAirline3}${obAirline4}${obAirline5}${obAirline6}${obAirline7}${obAirline8}</div>
               <div class="obFrom text-right mr-3" style="width:16%"><b>${obdHourConversion}:${obdMinutes}${obdAMPM}</b><br>${obFrom}</div>
               <div class="obLayovers text-center" style="width:17%;"><hr style="color: #000000;"><small><a class="text-muted">${obLayover1}${obLayover2}${obLayover3}${obLayover4}${obLayover5}${obLayover6}${obLayover7}</a></small></div>
               <div class="obTo text-left ml-3" style="width:16%"><b>${obaHourConversion}:${obaMinutes}${obaAMPM}</b><br>${obTo}</div>
               <div class="obDuration text-left" style="width:15%"><small><b>⌚️${obDuration}</b></small></div>
             </div>
             <div id="ibFlights" class="flight-specs row col-11 mt-3 mb-3">
               <div id="ibAirlines" style="width:22%">${ibAirline1}${ibAirline2}${ibAirline3}${ibAirline4}${ibAirline5}${ibAirline6}${ibAirline7}${ibAirline8}</div>
               <div class="ibFrom text-right mr-3" style="width:16%"><b>${ibdHourConversion}:${ibdMinutes}${ibdAMPM}</b><br>${ibFrom}</div>
               <div class="ibLayovers text-center" style="width:17%;"><hr style="color: #000000;"><small><a class="text-muted">${ibLayover1}${ibLayover2}${ibLayover3}${ibLayover4}${ibLayover5}${ibLayover6}${ibLayover7}</a></small></div>
               <div class="ibTo text-left ml-3" style="width:16%"><b>${ibaHourConversion}:${ibaMinutes}${ibaAMPM}</b><br>${ibTo}</div>
               <div class="ibDuration text-left" style="width:15%"><small><b>⌚️${ibDuration}</b></small></div>
             </div>
           </div>
         `);
       }

      }//END Loop through flight.data

    },//END of Success function
    error: function(){
      $("#flightLoadFail").show();
      console.log("Error getting flights");
    }
  });//END AJAX Call
}//END flightSearch function with the skypicker AJAX call

//Show ajax call on page load
flightSearch();

//DRAFT END Flights


//Logs the surf spot and it's marker IDs (Firestore doc name) to console so I can edit them when need be.
db.collection("markers").where("city", "==", newCityPage)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var mData = doc.data();
          var mID = doc.id;
          var mSurfSpot = mData.surfSpot;
          var mContent = mData.content;
          var mCoords = mData.coords;
          var mLat = mCoords.lat;
          var mLng = mCoords.lng;

          //Logs the surf spot and it's marker IDs (Firestore doc name) to console so I can edit them when need be.
          $(".surf-spot-nav").click(function(){
            console.log(`${mSurfSpot}: ${mContent} LAT:${mLat} LNG:${mLng} ID:${mID}`)
          });

        });
      });//END of surf marker identification console.log

//Logs the priceMarkers and it's marker IDs (Firestore doc name) to console so I can edit them when need be.
db.collection("priceMarkers").where("city", "==", newCityPage)
  .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var pmData = doc.data();
        var pmID = doc.id;
        var pmTitle = pmData.title;
        var priceMarkerSurfSpot = pmData.surfSpot;
        var pmCoords = pmData.coords;
        var pmLat = pmCoords.lat;
        var pmLng = pmCoords.lng;

        $(".accomm-nav").click(function(){
          console.log(`${pmTitle}: ${pmID}`)
        });

      });
    });//END of price marker identification console.log

//Logs the boardRentalMarkers and it's marker IDs (Firestore doc name) to console so I can edit them when need be.
db.collection("boardRentalMarkers").where("city", "==", newCityPage)
  .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var brData = doc.data();
        var brID = doc.id;
        var brName = brData.name;
        var brSurfSpot = brData.surfSpot;

        $(".board-rentals-nav").click(function(){
          console.log(`${brName}: ${brID}`)
        });

      });
    });//END of board rental marker identification console.log

//Logs the lessonMarkers and it's marker IDs (Firestore doc name) to console so I can edit them when need be.
db.collection("lessonMarkers").where("city", "==", newCityPage)
  .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var lData = doc.data();
        var lID = doc.id;
        var lName = lData.name;
        var lSurfSpot = lData.surfSpot;

        $(".lessons-nav").click(function(){
          console.log(`${lName}: ${lID}:`)
        });

      });
    });//END of price marker identification console.log

//Click the location page menu to hide and show each section
$(".nav-link").click(function () {
  $(".Hide").hide("fast");
  $("#" + $(this).data('type')).show("fast");
});

//Show which section is active in the location page nav bar
// When we click on the a tag
$("a").click(function(){
  // If this isn't already active
  if (!$(this).hasClass("active")) {
    // Remove the class from anything that is active
    $("a.active").removeClass("active");
    // And make this active
    $(this).addClass("active");
  }
});
