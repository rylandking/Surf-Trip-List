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
const ssDocRef = db.doc("surf-spot/hammonds");
//Surf Spot properties
const inputCity = document.querySelector("#inputCity");
const inputBoard = document.querySelector("#inputBoard");
const inputSize = document.querySelector("#inputSize");
const inputTide = document.querySelector("#inputTide");
const inputWind = document.querySelector("#inputWind");
const inputType = document.querySelector("#inputType");
const inputBottom = document.querySelector("#inputBottom");
const inputForecast = document.querySelector("#inputForecast");
const inputBarrel = document.querySelector("#inputBarrel");
const inputBeach = document.querySelector("#inputBeach");
const inputLocalism = document.querySelector("#inputLocalism");
const inputAccess = document.querySelector("#inputAccess");
const inputCrowd = document.querySelector("#inputCrowd");
const inputDirection = document.querySelector("#inputDirection");
const inputSkill = document.querySelector("#inputSkill");
const inputTemp = document.querySelector("#inputTemp");
const inputContinent = document.querySelector("#inputContinent");
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
  const boardToSave = inputBoard.value;
  const sizeToSave = inputSize.value;
  const tideToSave = inputTide.value;
  const windToSave = inputWind.value;
  const typeToSave = inputType.value;
  const bottomToSave = inputBottom.value;
  const forecastToSave = inputForecast.value;
  const barrelToSave = inputBarrel.value;
  const beachToSave = inputBeach.value;
  const localismToSave = inputLocalism.value;
  const accessToSave = inputAccess.value;

  const crowdToSave = inputCrowd.value;
  const directionToSave = inputDirection.value;
  const skillToSave = inputSkill.value;
  const tempToSave = inputTemp.value;
  const continentToSave = inputContinent.value;

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
const cityDocRef = db.doc("city/zTest");

// console.log(document.querySelector("#inputFemaleSafe").value);

//City data properties
const inputRegion = document.querySelector("#inputRegion");
const inputCityContinent = document.querySelector("#inputCityContinent");
const inputNation = document.querySelector("#inputNation");
const inputGoodFor = document.querySelector("#inputGoodFor");
const inputWaterTemp = document.querySelector("#inputWaterTemp");
const inputLanguage = document.querySelector("#inputLanguage");
// const inputHealthCare = document.querySelector("#inputHealthCare");
// const inputInternet = document.querySelector("#inputInternet");
// const inputNightlife = document.querySelector("#inputNightlife");
// const inputNature = document.querySelector("#inputNature");
// const inputCulture = document.querySelector("#inputCulture");
// const inputEnglish = document.querySelector("#inputEnglish");
// const inputSafety = document.querySelector("#inputSafety");
// const inputParty = document.querySelector("#inputParty");
// const inputFemaleSafe = document.querySelector("#inputFemaleSafe");
// const inputCityCrowd = document.querySelector("#inputCityCrowd");
// const inputCitySurfLessons = document.querySelector("#inputCitySurfLessons");
// const inputRentals = document.querySelector("#inputRentals");
// const inputTapWater = document.querySelector("#inputTapWater");
// const inputUber = document.querySelector("#inputUber");
const inputInsurance = document.querySelector("#inputInsurance");
const inputImmigration = document.querySelector("#inputImmigration");
const inputNorms = document.querySelector("#inputNorms");
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

const saveCityButton = document.querySelector("#saveCityButton");

//Changes inputs to values on click
saveCityButton.addEventListener("click", function(){
  const regionToSave = inputRegion.value;
  const cityContinentToSave = inputCityContinent.value;
  const nationToSave = inputNation.value;
  const goodForToSave = inputGoodFor.value;
  const waterTempToSave = inputWaterTemp.value;
  const languageToSave = inputLanguage.value;

  var healthCareToSave = document.querySelector('input[name = "healthCareScore"]:checked').value;
  console.log("Health care score " + healthCareToSave + ".");

  var internetToSave = document.querySelector('input[name = "internetScore"]:checked').value;
  console.log("Internet score " + internetToSave + ".");

  var nightLifeToSave = document.querySelector('input[name = "nightLifeScore"]:checked').value;
  console.log("Night life score " + nightLifeToSave + ".");

  var natureToSave = document.querySelector('input[name = "natureScore"]:checked').value;
  console.log("Nature score " + natureToSave + ".");

  var cultureToSave = document.querySelector('input[name = "cultureScore"]:checked').value;
  console.log("Culture score " + cultureToSave + ".");

  var englishToSave = document.querySelector('input[name = "englishScore"]:checked').value;
  console.log("English score " + englishToSave + ".");

  var safetyToSave = document.querySelector('input[name = "safetyScore"]:checked').value;
  console.log("Safety score " + safetyToSave + ".");

  var partyToSave = document.querySelector('input[name = "partyScore"]:checked').value;
  console.log("Party score " + partyToSave + ".");

  var femaleToSave = document.querySelector('input[name = "femaleSafeScore"]:checked').value;
  console.log("Female score " + femaleToSave + ".");

  var touristToSave = document.querySelector('input[name = "touristScore"]:checked').value;
  console.log("Touristy score " + touristToSave + ".");

  var uberToSave = document.querySelector('input[name = "uber"]:checked').value;
  console.log("Uber available " + uberToSave + ".");

  var tapWaterToSave = document.querySelector('input[name = "tapWater"]:checked').value;
  console.log("Tap water safe " + tapWaterToSave + ".");

  var rentalsToSave = document.querySelector('input[name = "cityRentals"]:checked').value;
  console.log("City rentals available " + rentalsToSave + ".");

  var cityLessonsToSave = document.querySelector('input[name = "cityLessons"]:checked').value;
  console.log("Surf lessons available " + cityLessonsToSave + ".");

  const insuranceToSave = inputInsurance.value;
  const immigrationToSave = inputImmigration.value;
  const normsToSave = inputNorms.value;
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

console.log("I am going to log CITY DATA to Firestore. 🙃");

//Add inputs to fields inside the document in Firestore
cityDocRef.set({
  region: regionToSave,
  nation: nationToSave,
  contintent: cityContinentToSave,
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
  insurance: insuranceToSave,
  immigration: immigrationToSave,
  norms: normsToSave,
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
const inputContent = document.querySelector("#inputContent");
const inputIconImage = document.querySelector("#inputIconImage");

const saveMarkerButton = document.querySelector("#saveMarkerButton");

//Changes inputs to values on click
saveMarkerButton.addEventListener("click", function(){

  //Changes Marker inputs to values on click
  const markerSurfSpotToSave = inputMarkerSurfSpot.value;
  const markerCityToSave = inputMarkerCity.value;
  const markerLatToSave = parseFloat(inputMarkerLat.value);
  const markerLngToSave = parseFloat(inputMarkerLng.value);
  const markerContentToSave = inputContent.value;
  const iconImageToSave = inputIconImage.value;

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


//END ADD MARKERS
