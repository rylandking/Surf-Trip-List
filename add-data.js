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

//ADD SURF SPOT DATA
const ssDocRef = db.doc("surf-spot/steamer-lane");
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

const saveButton = document.querySelector("#saveButton");


//Saves surf-spot properties to the ssDocRef surf spot on line 14
saveButton.addEventListener("click", function(){
  const cityToSave = inputCity.value;
  const forecastToSave = inputForecast.value;

  var spotLessonsToSave = document.querySelector('input[name = "spotLessons"]:checked').value;
  var spotRentalsToSave = document.querySelector('input[name = "spotRentals"]:checked').value;
  var tempToSave = document.querySelector('input[name = "temp"]:checked').value;
  var accessToSave = document.querySelector('input[name = "access"]:checked').value;
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

    surfspot: mapCenterToSave


  }).then(function() {
    console.log("I saved the SURF SPOT DATA to Firestore. 👍");
  }).catch(function (error) {
    console.log("Oops! There was an error: ", error);
  })
});
//END ADD SURF SPOT DATA


//START ADD CITY DATA
const cityDocRef = db.doc("city/santa-cruz");

// console.log(document.querySelector("#inputFemaleSafe").value);

//City data properties
const inputRegion = document.querySelector("#inputRegion");
const inputNation = document.querySelector("#inputNation");
const inputGoodFor = document.querySelector("#inputGoodFor");
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

const saveCityButton = document.querySelector("#saveCityButton");

//Changes inputs to values on click
saveCityButton.addEventListener("click", function(){
  const regionToSave = inputRegion.value;
  const nationToSave = inputNation.value;
  const cityLatToSave = parseFloat(inputCityLat.value);
  const cityLngToSave = parseFloat(inputCityLng.value);

  var cityContinentToSave = document.querySelector('input[name = "cityContintent"]:checked').value;
  var languageToSave = document.querySelector('input[name = "language"]:checked').value;
  var healthCareToSave = document.querySelector('input[name = "healthCareScore"]:checked').value;
  var internetToSave = document.querySelector('input[name = "internetScore"]:checked').value;
  var nightLifeToSave = document.querySelector('input[name = "nightLifeScore"]:checked').value;
  var natureToSave = document.querySelector('input[name = "natureScore"]:checked').value;
  var cultureToSave = document.querySelector('input[name = "cultureScore"]:checked').value;
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
  goodFor: goodForToSave,
  waterTemp: waterTempToSave,
  language: languageToSave,
  healthCareScore: parseInt(healthCareToSave),
  internetScore: parseInt(internetToSave),
  nightLifeScore: parseInt(nightLifeToSave),
  natureScore: parseInt(natureToSave),
  cultureScore: parseInt(cultureToSave),
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
    console.log("I saved the CITY DATA to Firestore. 👍");
  }).catch(function (error) {
    console.log("Oops! There was an error: ", error);
})
});

//END ADD CITY DATA


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
  var markerSkillToSave = document.querySelector('input[name = "markerSkill"]:checked').value;

  if (markerSkillToSave == "expert") {
    var markerContentToSave = "<h4>Expert</4>";
    var iconImageToSave = 'icon-images/expert.png';
  } else if (markerSkillToSave == "advanced") {
    var markerContentToSave = "<h4>Advanced</4>";
    var iconImageToSave = 'icon-images/advanced.png';
  } else if (markerSkillToSave == "intermediate") {
    var markerContentToSave = "<h4>Intermediate</4>";
    var iconImageToSave = 'icon-images/intermediate.png';
  } else if (markerSkillToSave == "beginner") {
    var markerContentToSave = "<h4>Beginner</4>";
    var iconImageToSave = 'icon-images/beginner.png';
  } else if (markerSkillToSave == "surf-lessons") {
    var markerContentToSave = "<h4>Surf Lessons</4>";
    var iconImageToSave = 'icon-images/surf-lessons.png';
  } else if (markerSkillToSave == "comfortable-beach") {
    var markerContentToSave = "<h4>Comfortable Beach</4>";
    var iconImageToSave = 'icon-images/beach.png';
  } else if (markerSkillToSave == "localism") {
    var markerContentToSave = "<h4>Localism</4>";
    var iconImageToSave = 'icon-images/localism.png';
  } else if (markerSkillToSave == "crowded") {
    var markerContentToSave = "<h4>Crowded</4>";
    var iconImageToSave = 'icon-images/crowd.png';
  }

  console.log("Marker content " + markerContentToSave + ".");
  console.log("Marker icon " + iconImageToSave + ".");

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
      console.log("I saved the MARKER DATA to Firestore. 👍", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});


//END ADD PRICE MARKERS

//START ADD PRICE MARKERS

//Marker properties
const inputPMCity = document.querySelector("#inputPMCity");
const inputBookingUrl = document.querySelector("#inputBookingUrl");
const inputPMTitle = document.querySelector("#inputPMTitle");
const inputPMPrice = document.querySelector("#inputPMPrice");
const inputPMPhotoUrl = document.querySelector("#inputPMPhotoUrl");
const inputPMBeds = document.querySelector("#inputPMBeds");
const inputPMLat = document.querySelector("#inputPMLat");
const inputPMLng = document.querySelector("#inputPMLng");

const savePMButton = document.querySelector("#savePMButton");

//Changes inputs to values on click
savePMButton.addEventListener("click", function(){

  //Changes Marker inputs to values on click
  const PMCityToSave = inputPMCity.value;
  const PMBookingUrlToSave = inputBookingUrl.value;
  const PMTitleToSave = inputPMTitle.value;
  const PMPriceToSave = inputPMPrice.value;
  //Need to rethink PMPhotoUrlToSave if it's coming from firestore db
  const PMPhotoUrlToSave = inputPMPhotoUrl.value;
  const PMBedsToSave = inputPMBeds.value;

  const PMLatToSave = parseFloat(inputPMLat.value);
  const PMLngToSave = parseFloat(inputPMLng.value);
  var accommTypeToSave = document.querySelector('input[name = "accommType"]:checked').value;
  var viewToSave = document.querySelector('input[name = "view"]:checked').value;
  var proximityToSave = document.querySelector('input[name = "proximity"]:checked').value;

  var pmContentToSave =
  `<div class="iw-container">
     <a href="${PMBookingUrlToSave}"><img src="${PMPhotoUrlToSave}" style="height=100%; width:100%"></a>
     <b><p class="mb-2" style="color:brown">${accommTypeToSave} • ${PMBedsToSave} BEDS</p></b>
     <h5 class="my-0">${PMTitleToSave}</h5>
     <b><p class="mt-1">${PMPriceToSave} per night • ${viewToSave} • ${proximityToSave}</p></b>
  </div>`;

  var pmIconImageToSave = `pm/${PMPriceToSave}.png`

  console.log("content: " + pmContentToSave);
  console.log("pmIcon: " + pmIconImageToSave);
  console.log("I am going to log PM DATA to Firestore. 🙃");

  // Add a new document with a generated id.
  db.collection("priceMarkers").add({
    coords: {
      lat: PMLatToSave,
      lng: PMLngToSave,
    },
    city: PMCityToSave,
    content: pmContentToSave,
    iconImage: pmIconImageToSave,

  })
  .then(function(docRef) {
      console.log("I saved the PM to Firestore. 👍", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});


//END ADD PRICE MARKERS
