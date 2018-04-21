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
//City data properties
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

  const surfLessonsToSave = false;
  const rentalsToSave = false;

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

    surfLessons: surfLessonsToSave,
    rentals: rentalsToSave,
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
//City data properties
const inputRegion = document.querySelector("#inputRegion");
const inputCityContinent = document.querySelector("#inputCityContinent");
const inputGoodFor = document.querySelector("#inputGoodFor");
const inputWaterTemp = document.querySelector("#inputWaterTemp");
const inputLanguage = document.querySelector("#inputLanguage");
const inputHealthCare = document.querySelector("#inputHealthCare");
const inputInternet = document.querySelector("#inputInternet");
const inputNightlife = document.querySelector("#inputNightlife");
const inputNature = document.querySelector("#inputNature");
const inputCulture = document.querySelector("#inputCulture");
const inputEnglish = document.querySelector("#inputEnglish");
const inputSafety = document.querySelector("#inputSafety");
const inputParty = document.querySelector("#inputParty");
const inputFemaleSafe = document.querySelector("#inputFemaleSafe");
const inputCitySurfLessons = document.querySelector("#inputCitySurfLessons");
const inputRentals = document.querySelector("#inputRentals");

const inputCityImage = document.querySelector("#inputCityImage");
const inputLP = document.querySelector("#inputLP");

const saveCityButton = document.querySelector("#saveCityButton");

//Changes inputs to values on click
saveCityButton.addEventListener("click", function(){
  const regionToSave = inputRegion.value;
  const cityContinentToSave = inputCityContinent.value;
  const goodForToSave = inputGoodFor.value;
  const waterTempToSave = inputWaterTemp.value;
  const languageToSave = inputLanguage.value;
  const healthCareToSave = inputHealthCare.value;
  const internetToSave = inputInternet.value;
  const nightLifeToSave = inputNightlife.value;
  const natureToSave = inputNature.value;
  const cultureToSave = inputCulture.value;
  const englishToSave = inputEnglish.value;
  const safetyToSave = inputSafety.value;
  const partyToSave = inputParty.value;
  const femaleToSave = inputFemaleSafe.value;
  const citySurfLessonsToSave = inputCitySurfLessons.value;
  const rentalsToSave = inputRentals.value;

  const cityImageToSave = inputCityImage.value;
  const lpToSave = inputLP.value;

console.log("I am going to log CITY DATA to Firestore. 🙃");

//Add inputs to fields inside the document in Firestore
cityDocRef.set({
  region: regionToSave,
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
  cityimage: cityImageToSave,
  lp: lpToSave,
  cityRentals: rentalsToSave,
  cityLessons: citySurfLessonsToSave,

}).then(function() {
  console.log("I saved the CITY DATA to Firestore. 👍");
}).catch(function (error) {
  console.log("Oops! There was an error: ", error);
})
});

//END ADD CITY DATA
