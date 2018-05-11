// Initialize Firebase
var config = {
  apiKey: "AIzaSyB85TjM4154F_LU7bWtckJ20i22kjcK1T0",
  authDomain: "surf-trip-list.firebaseapp.com",
  databaseURL: "https://surf-trip-list.firebaseio.com",
  projectId: "surf-trip-list",
  storageBucket: "surf-trip-list.appspot.com",
  messagingSenderId: "743850386285"
};
firebase.initializeApp(config);

var db = firebase.firestore();

//Set city name.
const inputCityDocName = document.querySelector("#inputCityDocName");
const saveCityDocNameButton = document.querySelector("#saveCityDocNameButton");
let CityDocNameToSave;
//Sets Firestore's surf spot doc name on click
saveCityDocNameButton.addEventListener("click", function(){
    CityDocNameToSave = inputCityDocName.value;
    console.log("🏙City name: " + CityDocNameToSave);

  //Start add city data
  const cityDocRef = db.doc("city/"+CityDocNameToSave);
  //City data properties
  const inputRegion = document.querySelector("#inputRegion");
  const inputNation = document.querySelector("#inputNation");
  const inputGoodFor = document.querySelector("#inputGoodFor");
  const inputAirport = document.querySelector("#inputAirport");
  const inputAirbnb = document.querySelector("#inputAirbnb");
  // const inputInsurance = document.querySelector("#inputInsurance");
  // const inputImmigration = document.querySelector("#inputImmigration");
  // const inputNorms = document.querySelector("#inputNorms");
  const inputPowerType = document.querySelector("#inputPowerType");
  const inputFrequency = document.querySelector("#inputFrequency");
  const inputVolts = document.querySelector("#inputVolts");
  const inputCityImage = document.querySelector("#inputCityImage");
  const inputLP = document.querySelector("#inputLP");
  const inputRooms = document.querySelector("#inputRooms");
  const inputPlaces = document.querySelector("#inputPlaces");
  const inputUsdEquivalent = document.querySelector("#inputUsdEquivalent");
  const inputCurrencyName = document.querySelector("#inputCurrencyName");
  const inputATM = document.querySelector("#inputATM");
  const inputBeer = document.querySelector("#inputBeer");
  const inputMeal = document.querySelector("#inputMeal");
  const inputCityLat = document.querySelector("#inputCityLat");
  const inputCityLng = document.querySelector("#inputCityLng");
  const inputCityZoom = document.querySelector("#inputCityZoom");

  const saveCityButton = document.querySelector("#saveCityButton");

  //Changes inputs to values on click
  saveCityButton.addEventListener("click", function(){
    const regionToSave = inputRegion.value;
    const nationToSave = inputNation.value;
    const cityLatToSave = parseFloat(inputCityLat.value);
    const cityLngToSave = parseFloat(inputCityLng.value);
    const cityZoomToSave = parseInt(inputCityZoom.value);
    const airportToSave = inputAirport.value;
    const airbnbToSave = inputAirbnb.value;
    var cityContinentToSave = document.querySelector('input[name = "cityContintent"]:checked').value;
    var languageToSave = document.querySelector('input[name = "language"]:checked').value;
    var healthCareToSave = document.querySelector('input[name = "healthCareScore"]:checked').value;
    var internetToSave = document.querySelector('input[name = "internetScore"]:checked').value;
    var nightLifeToSave = document.querySelector('input[name = "nightLifeScore"]:checked').value;
    var natureToSave = document.querySelector('input[name = "natureScore"]:checked').value;
    var cultureToSave = document.querySelector('input[name = "cultureScore"]:checked').value;
    var sharkToSave = document.querySelector('input[name = "sharkScore"]:checked').value;
    var englishToSave = document.querySelector('input[name = "englishScore"]:checked').value;
    var safetyToSave = document.querySelector('input[name = "safetyScore"]:checked').value;
    var partyToSave = document.querySelector('input[name = "partyScore"]:checked').value;
    var femaleToSave = document.querySelector('input[name = "femaleSafeScore"]:checked').value;
    var touristToSave = document.querySelector('input[name = "touristScore"]:checked').value;
    var uberToSave = document.querySelector('input[name = "uber"]:checked').value;
    var tapWaterToSave = document.querySelector('input[name = "tapWater"]:checked').value;
    var rentalsToSave = document.querySelector('input[name = "cityRentals"]:checked').value;
    var cityLessonsToSave = document.querySelector('input[name = "cityLessons"]:checked').value;
    var waterTempToSave = document.querySelector('input[name = "waterTemp"]:checked').value;

    // const insuranceToSave = inputInsurance.value;
    // const immigrationToSave = inputImmigration.value;
    // const normsToSave = inputNorms.value;
    const voltsToSave = inputVolts.value;
    const frequencyToSave = inputFrequency.value;
    const powerTypeToSave = inputPowerType.value;
    const cityImageToSave = inputCityImage.value;
    const lpToSave = inputLP.value;
    const roomsToSave = inputRooms.value;
    const placesToSave = inputPlaces.value;
    const usdEquivalentToSave = inputUsdEquivalent.value;
    const currencyNameToSave = inputCurrencyName.value;
    const aTMToSave = inputATM.value;
    const beerToSave = inputBeer.value;
    const mealToSave = inputMeal.value;
    const goodForToSave = inputGoodFor.value;

  console.log("I am going to log CITY DATA to Firestore. 🙃");

  //Add inputs to fields inside the document in Firestore
  cityDocRef.set({
    region: regionToSave,
    nation: nationToSave,
    contintent: cityContinentToSave,
    cityCenter: {
      lat: cityLatToSave,
      lng: cityLngToSave,
    },
    zoom: cityZoomToSave,
    goodFor: goodForToSave,
    airport: airportToSave,
    airbnb: airbnbToSave,
    waterTemp: waterTempToSave,
    language: languageToSave,
    healthCareScore: parseInt(healthCareToSave),
    internetScore: parseInt(internetToSave),
    nightLifeScore: parseInt(nightLifeToSave),
    natureScore: parseInt(natureToSave),
    cultureScore: parseInt(cultureToSave),
    sharkScore: parseInt(sharkToSave),
    englishScore: parseInt(englishToSave),
    safetyScore: parseInt(safetyToSave),
    partyScore: parseInt(partyToSave),
    femaleSafeScore: parseInt(femaleToSave),
    touristScore: parseInt(touristToSave),
    cityimage: cityImageToSave,
    lp: lpToSave,
    cityRentals: rentalsToSave,
    cityLessons: cityLessonsToSave,
    tapWater: tapWaterToSave,
    uber: uberToSave,
    // insurance: insuranceToSave,
    // immigration: immigrationToSave,
    // norms: normsToSave,
    powerType: powerTypeToSave,
    frequency: frequencyToSave,
    volts: voltsToSave,
    meal: parseFloat(mealToSave).toFixed(2),
    beer: parseFloat(beerToSave).toFixed(2),
    currencyName: currencyNameToSave,
    usdEquivalent: parseInt(usdEquivalentToSave),
    atm: parseInt(aTMToSave),
    placeCost: parseInt(placesToSave),
    roomCost: parseInt(roomsToSave),

    }).then(function() {
      $("#save-city-success-alert").prepend(
        `👍I saved "${CityDocNameToSave}" info.`
      );
      console.log("I saved the CITY DATA to Firestore. 👍");
    }).catch(function (error) {
      console.log("Oops! There was an error: ", error);
    })
  });//End add city data
});//End of set city name

//Set surf spot name.
const inputSSDocName = document.querySelector("#inputSSDocName");
const saveSSDocNameButton = document.querySelector("#saveSSDocNameButton");
let SSDocNameToSave;
//Sets Firestore's surf spot doc name on click
saveSSDocNameButton.addEventListener("click", function(){
    SSDocNameToSave = inputSSDocName.value;
    console.log("Surf spot name: " + SSDocNameToSave);

  //Adds surf spot data
  const ssDocRef = db.doc("surf-spot/"+SSDocNameToSave);
  //Surf Spot properties
  const inputCity = document.querySelector("#inputCity");
  const inputForecast = document.querySelector("#inputForecast");
  const inputJan = document.querySelector("#inputJan");
  const inputFeb = document.querySelector("#inputFeb");
  const inputMar = document.querySelector("#inputMar");
  const inputApr = document.querySelector("#inputApr");
  const inputMay = document.querySelector("#inputMay");
  const inputJun = document.querySelector("#inputJun");
  const inputJul = document.querySelector("#inputJul");
  const inputAug = document.querySelector("#inputAug");
  const inputSep = document.querySelector("#inputSep");
  const inputOct = document.querySelector("#inputOct");
  const inputNov = document.querySelector("#inputNov");
  const inputDec = document.querySelector("#inputDec");
  const inputLat = document.querySelector("#inputLat");
  const inputLng = document.querySelector("#inputLng");
  const inputSpotParkingLat = document.querySelector("#inputSpotParkingLat");
  const inputSpotParkingLng = document.querySelector("#inputSpotParkingLng");
  const inputSpotNote = document.querySelector("#inputSpotNote");
  const inputSSZoom = document.querySelector("#inputSSZoom");
  const saveButton = document.querySelector("#saveButton");

  //Saves surf-spot properties to the ssDocRef surf spot on line 14
  saveButton.addEventListener("click", function(){
    const cityToSave = inputCity.value;
    const forecastToSave = inputForecast.value;

    var spotLessonsToSave = document.querySelector('input[name = "spotLessons"]:checked').value;
    var spotRentalsToSave = document.querySelector('input[name = "spotRentals"]:checked').value;
    var tempToSave = document.querySelector('input[name = "temp"]:checked').value;
    var accessToSave = document.querySelector('input[name = "access"]:checked').value;
    const SpotNoteToSave = inputSpotNote.value;
    var localismToSave = document.querySelector('input[name = "localism"]:checked').value;
    var crowdToSave = document.querySelector('input[name = "crowd"]:checked').value;
    var beachToSave = document.querySelector('input[name = "beach"]:checked').value;
    var bottomToSave = document.querySelector('input[name = "bottom"]:checked').value;
    var barrelToSave = document.querySelector('input[name = "barrel"]:checked').value;
    var directionToSave = document.querySelector('input[name = "waveDir"]:checked').value;
    var typeToSave = document.querySelector('input[name = "waveType"]:checked').value;
    var windToSave = document.querySelector('input[name = "wind"]:checked').value;
    var tideToSave = document.querySelector('input[name = "tide"]:checked').value;
    var sizeToSave = document.querySelector('input[name = "size"]:checked').value;
    var boardToSave = document.querySelector('input[name = "board"]:checked').value;
    var skillToSave = document.querySelector('input[name = "skill"]:checked').value;
    var continentToSave = document.querySelector('input[name = "continent"]:checked').value;
    const janToSave = parseInt(inputJan.value);
    const febToSave = parseInt(inputFeb.value);
    const marToSave = parseInt(inputMar.value);
    const aprToSave = parseInt(inputApr.value);
    const mayToSave = parseInt(inputMay.value);
    const junToSave = parseInt(inputJun.value);
    const julToSave = parseInt(inputJul.value);
    const augToSave = parseInt(inputAug.value);
    const sepToSave = parseInt(inputSep.value);
    const octToSave = parseInt(inputOct.value);
    const novToSave = parseInt(inputNov.value);
    const decToSave = parseInt(inputDec.value);

    const latToSave = parseFloat(inputLat.value);
    const lngToSave = parseFloat(inputLng.value);
    const spotParkingLatToSave = parseFloat(inputSpotParkingLat.value);
    const spotParkingLngToSave = parseFloat(inputSpotParkingLng.value);
    const ssZoomToSave = parseInt(inputSSZoom.value);
    const mapCenterToSave = {
      lat: latToSave,
      lng: lngToSave
    };

    console.log("I am going to log SURF SPOT DATA to Firestore. 🙃");

    //Add fields to the document
    ssDocRef.set({
      city: cityToSave,
      board: boardToSave,
      size: sizeToSave,
      tide: tideToSave,
      wind: windToSave,
      type: typeToSave,
      bottom: bottomToSave,
      forecast: forecastToSave,
      barrel: barrelToSave,
      beach: beachToSave,
      localism: localismToSave,
      access: accessToSave,
      spotNote: SpotNoteToSave,
      rentals: spotRentalsToSave,
      lessons: spotLessonsToSave,
      crowd: crowdToSave,
      direction: directionToSave,
      skill: skillToSave,
      temp: tempToSave,
      contintent: continentToSave,
      jan: janToSave,
      feb: febToSave,
      mar: marToSave,
      apr: aprToSave,
      may: mayToSave,
      jun: junToSave,
      jul: julToSave,
      aug: augToSave,
      sep: sepToSave,
      oct: octToSave,
      nov: novToSave,
      dec: decToSave,
      surfspot: mapCenterToSave,
      zoom: ssZoomToSave,
      parkingLat: spotParkingLatToSave,
      parkingLng: spotParkingLngToSave,

    }).then(function() {
      $("#save-ss-success-alert").prepend(
        `👍I saved all of "${SSDocNameToSave}" info.`
      );
      console.log("I saved the SURF SPOT DATA to Firestore. 👍");
    }).catch(function (error) {
      console.log("Oops! There was an error: ", error);
    })
  });//END ADD SURF SPOT DATA
});//End of set surf spot name

//START ADD MARKERS
//Marker properties
const inputMarkerSurfSpot = document.querySelector("#inputMarkerSurfSpot");
const inputMarkerCity = document.querySelector("#inputMarkerCity");
const inputMarkerLat = document.querySelector("#inputMarkerLat");
const inputMarkerLng = document.querySelector("#inputMarkerLng");

const saveMarkerButton = document.querySelector("#saveMarkerButton");

//Changes inputs to values on click
saveMarkerButton.addEventListener("click", function(){

  //Changes Marker inputs to values on click
  const markerSurfSpotToSave = inputMarkerSurfSpot.value;
  const markerCityToSave = inputMarkerCity.value;
  const markerLatToSave = parseFloat(inputMarkerLat.value);
  const markerLngToSave = parseFloat(inputMarkerLng.value);
  var markerContentToSave = document.querySelector('input[name = "markerContent"]:checked').value;

  if (markerContentToSave == "🏄‍♂️Expert wave") {
    var iconImageToSave = 'icon-images/expert.png';
  } else if (markerContentToSave == "🏄‍♂️Advanced wave") {
    var iconImageToSave = 'icon-images/advanced.png';
  } else if (markerContentToSave == "🏄‍♂️Intermediate wave") {
    var iconImageToSave = 'icon-images/intermediate.png';
  } else if (markerContentToSave == "🏄‍♂️Beginner wave") {
    var iconImageToSave = 'icon-images/beginner.png';
  } else if (markerContentToSave == "🏖Comfortable beach") {
    var iconImageToSave = 'icon-images/beach.png';
  } else if (markerContentToSave == "🚗Parking") {
    var iconImageToSave = 'icon-images/parking.png';
  } else if (markerContentToSave == "👺Localism here") {
    var iconImageToSave = 'icon-images/localism.png';
  } else if (markerContentToSave == "🎪Crowded area") {
    var iconImageToSave = 'icon-images/crowd.png';
  }

  console.log("I am going to log MARKER DATA to Firestore. 🙃");

  // Add a new document with a generated id.
  db.collection("markers").add({
    city: markerCityToSave,
    content: markerContentToSave,
    coords: {
      lat: markerLatToSave,
      lng: markerLngToSave,
    },
    iconImage: iconImageToSave,
    surfSpot: markerSurfSpotToSave,
  })
  .then(function(docRef) {
      const markerID = docRef.id;
      $("#save-marker-success-alert").prepend(
        `👍I saved the "${markerID}" marker.`
      );
      console.log("I saved the MARKER DATA to Firestore. 👍", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});
//END ADD MARKERS

//START ADD ACCOMM MARKERS
//Marker properties
const inputPMCity = document.querySelector("#inputPMCity");
const inputPMSurfSpot = document.querySelector("#inputPMSurfSpot");
const inputBookingUrl = document.querySelector("#inputBookingUrl");
const inputPMTitle = document.querySelector("#inputPMTitle");
const inputPMPrice = document.querySelector("#inputPMPrice");
const inputPMPhotoUrl = document.querySelector("#inputPMPhotoUrl");
const inputPMBeds = document.querySelector("#inputPMBeds");
const inputPMGuests = document.querySelector("#inputPMGuests");
const inputPMLat = document.querySelector("#inputPMLat");
const inputPMLng = document.querySelector("#inputPMLng");

const savePMButton = document.querySelector("#savePMButton");

//Changes inputs to values on click
savePMButton.addEventListener("click", function(){

  //Changes Marker inputs to values on click
  const PMCityToSave = inputPMCity.value;
  const PMSurfSpotToSave = inputPMSurfSpot.value;
  const PMBookingUrlToSave = inputBookingUrl.value;
  const PMTitleToSave = inputPMTitle.value;
  const PMPriceToSave = inputPMPrice.value;
  //Need to rethink PMPhotoUrlToSave if it's coming from firestore db. Currently stored in ac-images folder.
  const PMPhotoUrlToSave = inputPMPhotoUrl.value;
  let PMBedsToSave = inputPMBeds.value;
  let PMGuestsToSave = inputPMGuests.value;
  const PMLatToSave = parseFloat(inputPMLat.value);
  const PMLngToSave = parseFloat(inputPMLng.value);
  var accommTypeToSave = document.querySelector('input[name = "accommType"]:checked').value;
  var viewToSave = document.querySelector('input[name = "view"]:checked').value;
  var proximityToSave = document.querySelector('input[name = "proximity"]:checked').value;

  if (PMBedsToSave == "1") {
    var PMBedsPlural = "Bed"
  } else {
    var PMBedsPlural = "Beds"
  }

  if (PMGuestsToSave == "1") {
    var PMGuestsPlural = "Guest"
  } else {
    var PMGuestsPlural = "Guests"
  }

  var pmIconImageToSave = `pm/${PMPriceToSave}.png`

  console.log("I am going to log PM DATA to Firestore. 🙃");

  // Add a new document with a generated id.
  db.collection("priceMarkers").add({
    city: PMCityToSave,
    surfSpot: PMSurfSpotToSave,
    bookingURL: PMBookingUrlToSave,
    price: PMPriceToSave,
    photo: PMPhotoUrlToSave,
    bedAmount: PMBedsToSave,
    bedWord: PMBedsPlural,
    guestAmount: PMGuestsToSave,
    guestWord: PMGuestsPlural,
    accommType: accommTypeToSave,
    title: PMTitleToSave,
    view: viewToSave,
    proximity: proximityToSave,
    iconImage: pmIconImageToSave,
    coords: {
      lat: PMLatToSave,
      lng: PMLngToSave,
    },

  })
  .then(function(docRef) {
    const pmID = docRef.id;
    $("#save-pm-success-alert").prepend(
      `👍I saved the "${pmID}" acommodation marker.`
    );
      console.log("I saved the PM to Firestore. 👍", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});
//END ADD PRICE MARKERS


//START ADD RENTAL MARKERS + CARDS
//RENTAL Marker properties
const inputRentalName = document.querySelector("#inputRentalName");
const inputRentalCity = document.querySelector("#inputRentalCity");
const inputRentalSurfSpot = document.querySelector("#inputRentalSurfSpot");
const inputRentalAddress = document.querySelector("#inputRentalAddress");
const inputRentalZip = document.querySelector("#inputRentalZip");
const inputRentalWebsite = document.querySelector("#inputRentalWebsite");
const inputRentalPhone = document.querySelector("#inputRentalPhone");
const inputRentalType = document.querySelector("#inputRentalType");
const inputRentalBoardHourly = document.querySelector("#inputRentalBoardHourly");
const inputRentalBoardDaily = document.querySelector("#inputRentalBoardDaily");
const inputRentalWetsuitHourly = document.querySelector("#inputRentalWetsuitHourly");
const inputRentalWetsuitDaily = document.querySelector("#inputRentalWetsuitDaily");
const inputRentalPhoto = document.querySelector("#inputRentalPhoto");
const inputRentalLat = document.querySelector("#inputRentalLat");
const inputRentalLng = document.querySelector("#inputRentalLng");

const saveRentalButton = document.querySelector("#saveRentalButton");

//Changes inputs to values on click
saveRentalButton.addEventListener("click", function(){

  //Changes Marker inputs to values on click
  const RentalNameToSave = inputRentalName.value;
  const RentalCityToSave = inputRentalCity.value;
  const RentalSurfSpotToSave = inputRentalSurfSpot.value;
  const RentalAddressToSave = inputRentalAddress.value;
  const RentalZipToSave = inputRentalZip.value;
  const RentalWebsiteToSave = inputRentalWebsite.value;
  const RentalPhoneToSave = inputRentalPhone.value;
  const RentalTypeToSave = inputRentalType.value;
  const RentalBoardHourlyToSave = inputRentalBoardHourly.value;
  const RentalBoardDailyToSave = inputRentalBoardDaily.value;
  const RentalWetsuitHourlyToSave = inputRentalWetsuitHourly.value;
  const RentalWetsuitDailyToSave = inputRentalWetsuitDaily.value;
  const RentalPhotoToSave = inputRentalPhoto.value;
  const RentalIconImageToSave = "icon-images/boardRental.png"
  const RentalLatToSave = parseFloat(inputRentalLat.value);
  const RentalLngToSave = parseFloat(inputRentalLng.value);

  const rentalReviewToSave = document.querySelector('input[name = "rentalReview"]:checked').value;
  const rentalWetsuitToSave = document.querySelector('input[name = "rentalWetsuit"]:checked').value;

  console.log("I am going to log RENTAL DATA to Firestore. 🙃");

  // Add a new document with a generated id.
  db.collection("boardRentalMarkers").add({
    name: RentalNameToSave,
    city: RentalCityToSave,
    surfSpot: RentalSurfSpotToSave,
    address: RentalAddressToSave,
    zip: RentalZipToSave,
    website: RentalWebsiteToSave,
    phone: RentalPhoneToSave,
    boardType: RentalTypeToSave,
    boardHourly: RentalBoardHourlyToSave,
    boardDaily: RentalBoardDailyToSave,
    wetsuitHourly: RentalWetsuitHourlyToSave,
    wetsuitDaily: RentalWetsuitDailyToSave,
    review: rentalReviewToSave,
    wetsuitAvail: rentalWetsuitToSave,
    photo: RentalPhotoToSave,
    coords: {
      lat: RentalLatToSave,
      lng: RentalLngToSave,
    },
    iconImage: RentalIconImageToSave,

  })
  .then(function(docRef) {
    const rentalID = docRef.id;
    $("#save-rental-success-alert").prepend(
      `👍I saved the "${rentalID}" rental shop.`
    );
      console.log("I saved the Rental Shop to Firestore. 👍", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});
//END ADD RENTAL MARKERS + CARDS


//START ADD LESSON MARKERS + CARDS
//LESSON Marker properties
const inputLessonName = document.querySelector("#inputLessonName");
const inputLessonCity = document.querySelector("#inputLessonCity");
const inputLessonSpots = document.querySelector("#inputLessonSpots");
const inputLessonWebsite = document.querySelector("#inputLessonWebsite");
const inputLessonPhone = document.querySelector("#inputLessonPhone");
// const inputLessonSize = document.querySelector("#inputLessonSize");
const inputLesson1on1Cost = document.querySelector("#inputLesson1on1Cost");
const inputLessonSmCost = document.querySelector("#inputLessonSmCost");
const inputLessonLgCost = document.querySelector("#inputLessonLgCost");
const inputLessonMultiDayCost = document.querySelector("#inputLessonMultiDayCost");
const inputLessonEquipAvail = document.querySelector("#inputLessonEquipAvail");
const inputLessonPhoto = document.querySelector ("#inputLessonPhoto");
const inputLessonLat = document.querySelector("#inputLessonLat");
const inputLessonLng = document.querySelector("#inputLessonLng");

const saveLessonButton = document.querySelector("#saveLessonButton");

//Changes inputs to values on click
saveLessonButton.addEventListener("click", function(){

  //Changes Marker inputs to values on click
  const lessonNameToSave = inputLessonName.value;
  const lessonCityToSave = inputLessonCity.value;
  const lessonSpotsToSave = inputLessonSpots.value;
  const lessonWebsiteToSave = inputLessonWebsite.value;
  const lessonPhoneToSave = inputLessonPhone.value;
  // const lessonSizeToSave = inputLessonSize.value;
  const lesson1on1ToSave = parseInt(inputLesson1on1Cost.value);
  const lessonSmCostToSave = parseInt(inputLessonSmCost.value);
  const lessonLgCostToSave = parseInt(inputLessonLgCost.value);
  const lessonMultiDayCostToSave = parseInt(inputLessonMultiDayCost.value);
  const lessonEquipAvailToSave = inputLessonEquipAvail.value;
  const lessonPhotoToSave = inputLessonPhoto.value;
  const lessonIconImageToSave = "icon-images/surfLesson.png";
  const lessonLatToSave = parseFloat(inputLessonLat.value);
  const lessonLngToSave = parseFloat(inputLessonLng.value);

  const lessonReviewToSave = document.querySelector('input[name = "lessonReview"]:checked').value;

  console.log("I am going to log LESSON COMPANY DATA to Firestore. 🙃");

  // Add a new document with a generated id.
  db.collection("lessonMarkers").add({
    name: lessonNameToSave,
    city: lessonCityToSave,
    surfSpot: lessonSpotsToSave,
    website: lessonWebsiteToSave,
    phone: lessonPhoneToSave,
    // lessonTypesAvail: lessonSizeToSave,
    oneOnOneCost: lesson1on1ToSave,
    smCost: lessonSmCostToSave,
    lgCost: lessonLgCostToSave,
    multiDayCost: lessonMultiDayCostToSave,
    equipAvail: lessonEquipAvailToSave,
    review: lessonReviewToSave,
    photo: lessonPhotoToSave,
    coords: {
      lat: lessonLatToSave,
      lng: lessonLngToSave,
    },
    iconImage: lessonIconImageToSave,

  })
  .then(function(docRef) {
    const lessonID = docRef.id;
    $("#save-lesson-success-alert").prepend(
      `👍I saved the "${lessonID}" lesson company.`
    );
      console.log("I saved the Lesson Company to Firestore. 👍", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});
//END ADD LESSON MARKERS + CARDS


//Refreshes the page so buttons refresh on click of #refreshCityForm
function refreshCityForm() {
    location.reload();
}

//Clears all City form fields on click of #refreshCityForm
function ClearCityFields() {
    document.getElementById("inputPowerType").value = "";
    document.getElementById("inputFrequency").value = "";
    document.getElementById("inputVolts").value = "";
    document.getElementById("inputGoodFor").value = "";
    document.getElementById("inputMeal").value = "";
    document.getElementById("inputBeer").value = "";
    document.getElementById("inputATM").value = "";
    document.getElementById("inputCurrencyName").value = "";
    document.getElementById("inputUsdEquivalent").value = "";
    document.getElementById("inputPlaces").value = "";
    document.getElementById("inputRooms").value = "";
    document.getElementById("inputLP").value = "";
    document.getElementById("inputCityLng").value = "";
    document.getElementById("inputCityLat").value = "";
    document.getElementById("inputNation").value = "";
    document.getElementById("inputRegion").value = "";
    document.getElementById("inputCityImage").value = "";
    document.getElementById("inputCityDocName").value = "";
}

//Refreshes the page so buttons refresh on click of #refreshSSForm
function refreshSSForm() {
    location.reload();
}

//Clears all Surf Spot form fields on click of #refreshSSForm
function ClearSSFields() {
    document.getElementById("inputSSDocName").value = "";
    document.getElementById("inputCity").value = "";
    document.getElementById("inputForecast").value = "";
    document.getElementById("inputJan").value = "";
    document.getElementById("inputFeb").value = "";
    document.getElementById("inputMar").value = "";
    document.getElementById("inputApr").value = "";
    document.getElementById("inputMay").value = "";
    document.getElementById("inputJun").value = "";
    document.getElementById("inputJul").value = "";
    document.getElementById("inputAug").value = "";
    document.getElementById("inputSep").value = "";
    document.getElementById("inputOct").value = "";
    document.getElementById("inputNov").value = "";
    document.getElementById("inputDec").value = "";
    document.getElementById("inputLat").value = "";
    document.getElementById("inputLng").value = "";
}

//Refreshes the page so Marker buttons refresh on click of #refreshMarkerForm
function refreshMarkerForm() {
    location.reload();
}

//Clears all Marker form fields on click of #refreshMarkerForm
function ClearMarkerFields() {
    document.getElementById("inputMarkerSurfSpot").value = "";
    document.getElementById("inputMarkerCity").value = "";
    document.getElementById("inputMarkerLat").value = "";
    document.getElementById("inputMarkerLng").value = "";
}

//Refreshes the page so PM buttons refresh on click of #refreshPMForm
function refreshPMForm() {
    location.reload();
}

//Clears all Price Marker form fields on click of #refreshPMForm
function ClearPMFields() {
    document.getElementById("inputPMCity").value = "";
    document.getElementById("inputBookingUrl").value = "";
    document.getElementById("inputPMTitle").value = "";
    document.getElementById("inputPMPrice").value = "";
    document.getElementById("inputPMPhotoUrl").value = "";
    document.getElementById("inputPMBeds").value = "";
    document.getElementById("inputPMLat").value = "";
    document.getElementById("inputPMLng").value = "";
}

//Refreshes the page so Rental buttons refresh on click of #refreshRentalForm
function refreshRentalForm() {
    location.reload();
}

//Clears all Rental Marker form fields on click of #refreshRentalForm
function ClearRentalFields() {
    document.getElementById("inputRentalName").value = "";
    document.getElementById("inputRentalCity").value = "";
    document.getElementById("inputRentalSurfSpot").value = "";
    document.getElementById("inputRentalAddress").value = "";
    document.getElementById("inputRentalZip").value = "";
    document.getElementById("inputRentalWebsite").value = "";
    document.getElementById("inputRentalPhone").value = "";
    document.getElementById("inputRentalType").value = "";
    document.getElementById("inputRentalBoardHourly").value = "";
    document.getElementById("inputRentalBoardDaily").value = "";
    document.getElementById("inputRentalWetsuitHourly").value = "";
    document.getElementById("inputRentalWetsuitDaily").value = "";
    document.getElementById("inputRentalLat").value = "";
    document.getElementById("inputRentalLng").value = "";
    document.getElementById("inputRentalPhoto").value = "";
}

//Refreshes the page so Lesson buttons refresh on click of #refreshLessonForm
function refreshLessonForm() {
    location.reload();
}

//Clears all Lesson Marker form fields on click of #refreshLessonForm
function ClearLessonFields() {
    document.getElementById("inputLessonName").value = "";
    document.getElementById("inputLessonCity").value = "";
    document.getElementById("inputLessonSpots").value = "";
    document.getElementById("inputLessonWebsite").value = "";
    document.getElementById("inputLessonPhone").value = "";
    document.getElementById("inputLessonSize").value = "";
    document.getElementById("inputLesson1on1Cost").value = "";
    document.getElementById("inputLessonSmCost").value = "";
    document.getElementById("inputLessonMultiDayCost").value = "";
    document.getElementById("inputLessonEquipAvail").value = "";
    document.getElementById("inputLessonLat").value = "";
    document.getElementById("inputLessonLng").value = "";
    document.getElementById("inputLessonPhoto").value = "";
}

//Alerts a success message after City Name is saved
  $("#city-doc-success-alert").hide();
    $("#saveCityDocNameButton").click(function showAlert() {
      $("#city-doc-success-alert").prepend(
        `<p>👍Ready to submit: "${CityDocNameToSave}."</p>`
      );
      $("#city-doc-success-alert").fadeTo(10000, 500).slideUp(500, function(){
           $("#city-doc-success-alert").slideUp(500);
      });
    });

//Alerts a success message once ready to add a new city
  $("#save-city-success-alert").hide();
    $("#saveCityButton").click(function showAlert() {
      $("#save-city-success-alert").fadeTo(4000, 500).slideUp(500, function(){
           $("#save-city-success-alert").slideUp(500);
      });
    });

//Alerts a success message after Surf Spot Name is saved
  $("#ss-doc-success-alert").hide();
  $("#saveSSDocNameButton").click(function showAlert() {
    $("#ss-doc-success-alert").prepend(
      `<p>👍Ready to submit: "${SSDocNameToSave}."</p>`
    );
    $("#ss-doc-success-alert").fadeTo(10000, 500).slideUp(500, function(){
         $("#ss-doc-success-alert").slideUp(500);
    });
  });

//Alerts a success message when adding a new surf spot
  $("#save-ss-success-alert").hide();
  $("#saveButton").click(function showAlert() {
    $("#save-ss-success-alert").fadeTo(4000, 500).slideUp(500, function(){
         $("#save-ss-success-alert").slideUp(500);
    });
  });

//Alerts a success message when adding a new marker
  $("#save-marker-success-alert").hide();
  $("#saveMarkerButton").click(function showAlert() {
    $("#save-marker-success-alert").fadeTo(20000, 500).slideUp(500, function(){
         $("#save-marker-success-alert").slideUp(500);
    });
  });

//Alerts a success message when adding a new price marker
  $("#save-pm-success-alert").hide();
  $("#savePMButton").click(function showAlert() {
    $("#save-pm-success-alert").fadeTo(20000, 500).slideUp(500, function(){
         $("#save-pm-success-alert").slideUp(500);
    });
  });

//Alerts a success message when adding a new rental marker
  $("#save-rental-success-alert").hide();
  $("#saveRentalButton").click(function showAlert() {
    $("#save-rental-success-alert").fadeTo(20000, 500).slideUp(500, function(){
         $("#save-rental-success-alert").slideUp(500);
    });
  });

//Alerts a success message when adding a new lesson marker
  $("#save-lesson-success-alert").hide();
  $("#saveLessonButton").click(function showAlert() {
    $("#save-lesson-success-alert").fadeTo(20000, 500).slideUp(500, function(){
         $("#save-lesson-success-alert").slideUp(500);
    });
  });

//Click the add-data.html page menu to hide and show each section
$(".nav-link").click(function () {
  $(".Hide").hide("fast");
  $("#" + $(this).data('type')).show("fast");
});


//Click on the add-data.html page menu and show which section is active
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
