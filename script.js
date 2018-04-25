var map; // making it global
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

// Location Cards
db.collection("city").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots

        //format the name
        var citydata = doc.data();
        var cityName = doc.id;
        var locname = cityName.replace(/-/g,' ');

        // console.log("doc.id " + doc.id);

        let expIcons = []; //create empty array

        //City Data from FORM
        let cityRegion = citydata.region;
        let cityContintent = citydata.contintent;
        let nation = citydata.nation;
        let goodFor = citydata.goodFor;
        let waterTemp = citydata.waterTemp;
        let language = citydata.language;
        let healthCareScore = citydata.healthCareScore;
        let internetScore = citydata.internetScore;
        let nightLifeScore = citydata.nightLifeScore;
        let natureScore = citydata.natureScore;
        let cultureScore = citydata.cultureScore;
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
        let insurance;
        let immigration = citydata.immigration;
        let norms = citydata.norms;
        let volts = citydata.volts;
        let frequency = citydata.frequency;
        let powerType = citydata.powerType;
        let meal = citydata.meal;
        let beer = citydata.beer;
        let currencyName = citydata.currencyName;
        let usdEquivalent = citydata.usdEquivalent;
        let atm = citydata.atm;
        let roomCost = citydata.roomCost;
        let placeCost = citydata.placeCost;

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
              <b>good</b>
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
            <div data-toggle="tooltip" title="👮‍♂️Very safe" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
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
            <div data-toggle="tooltip" title="🕺🏼💃Places to party can be hard to find" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
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

        //Sets femaleSafeScore in #travel-guide table
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
            <div data-toggle="tooltip" title="🎪No tourists and very uncrowded area" class="progress-bar bg-success" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
              <b>never</b>
            </div>
          </div>`;
        } else {
          touristScore = " ";
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
          tapWater = `<td data-toggle="tooltip" title="💧It's okay to drink the tap water" class="text-center">👍</td>`;
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
          var couples = `<a data-toggle="tooltip" title="Good for couples">💑</a>`;
        } else {
          var couples = ""
        }
        if(goodFor.indexOf("families") != -1){
          var families = `<a data-toggle="tooltip" title="Good for families">👨‍👩‍👧‍👦 </a>`;
        } else {
          var families = ""
        }
        if(goodFor.indexOf("soloAdventure") != -1){
          var soloAdventure = `<a data-toggle="tooltip" title="Good for a solo adventure">🎒 </a>`;
        } else {
          var soloAdventure = ""
        }
        if(goodFor.indexOf("friendsTrip") != -1){
          var friendsTrip = `<a data-toggle="tooltip" title="Good for friend trips">🙌 </a>`;
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
        });//End of the surf spot loop

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

        // GET IMAGE from Firebase Storage
          //1. Add downloadurl to firestore document
          //2. Get downloadurl from that firestore document
          //3. Place that download URL in the correct place int he cardcontainer
          var cityimage = citydata.cityimage;


        //add info to LOCATION CARD
        //$ is the same as getElementById
        $("#card-container").prepend(

          `<div class="card bg-dark text-white ${expFilter}">
            <img class="img-fluid card-img" src="${cityimage}" alt="location card">
              <div class="card-img-overlay">

                <div id="experience" class="lc-experience">${exp}</div>

                <h4 id="locName" class="card-title" style="white-space: nowrap;">${locname}</h4>
                <p id="region" class="card-text">${region}</p>
                <div class="lc-flight"<div data-toggle="tooltip" data-placement="bottom" title="Flight cost">🛫 $187</div>
                <div class="lc-cost" <div data-toggle="tooltip" data-placement="bottom" title="Avg accomm cost">🏡 $42/n</div>

              </div>
          </div>`
        ); //end prepend

        //add info to LOCATION OVERVIEW
        $("#travel-guide").prepend(
          `<div class="col-lg-12 mb-4">
            <table class="table">
              <tbody>
                <tr>
                    <td class="flightPrice">✈️Flight cost</td>
                    <td data-toggle="tooltip" title="✈️Round trip flight is $196" class="text-center">$196</td>
                    <td class="health-care">🏥Health care</td>
                    <td>${healthCareScore}</td>
                </tr>
                <tr>
                    <td class="accommodationPrice">🏡Accommodations</td>
                    <td data-toggle="tooltip" title="🏡Avg stay is $47/n" class="text-center">$47/n</td>
                    <td class="intenet">📱Internet</td>
                    <td>${internetScore}</td>
                </tr>
                <tr>
                    <td class="beaches">🏖Beaches: </td>
                    <td class="text-center"><p data-toggle="tooltip" title="🏖Comfortable beaches available">👍</p></td>
                    <td class="partyScore">🕺🏼💃Party scene</td>
                    <td>${partyScore}</td>
                </tr>
                <tr>
                    <td class="good-for">👫Good for:</td>
                    <td class="text-center">${friendsTrip}${soloAdventure}${families}${couples}</td>
                    <td class="nightlife">🍸Nightlife</td>
                    <td>${nightLifeScore}</td>
                </tr>
                <tr>
                    <td class="surf-lessons">👩‍🏫Surf lessons</td>
                    ${cityLessons}
                    <td class="nature">🏞Nature</td>
                    <td>${natureScore}</td>
                </tr>
                <tr>
                    <td class="rentals">🏄‍♂️Board rentals</td>
                    ${cityRentals}
                    <td class="safety">👮‍♂️Safety</td>
                    <td>${safetyScore}</td>
                </tr>
                <tr>
                    <td class="power">🔌Power</td>
                    <td class="text-center">${aType}${bType}${cType}${dType}${eType}${fType}${gType}${hType}${iType}${jType}${kType}${lType}${mType}${nType}${oType} <a data-toggle="tooltip" title="🔌${volts} Volts">${volts}V</a> <a data-toggle="tooltip" title="🔌${frequency} Hertz">${frequency}Hz</a></td>
                    <td class="femaleSafeScore">👩Female Friendly</td>
                    <td>${femaleSafeScore}</td>
                </tr>
                <tr>
                    <td class="tapWater">🚰Safe tap water</td>
                    ${tapWater}
                    <td class="englishScore">🙊English speaking</td>
                    <td>${englishScore}</td>
                </tr>
                <tr>
                  <td class="waterTemp">☀️Water temp</td>
                  ${waterTemp}
                  <td class="tourist">🎪Touristy</td>
                    <td>${touristScore}</td>
                </tr>
                <tr>
                  <td class="insurance">🚑Travelers Insurance</td>
                  <td class="text-center" data-toggle="tooltip" title="🚑Get travelers insurance" style="color: black;"><a href="https://www.worldnomads.com/" target="_blank">Get insurance</a></td>
                  <td class="language">🗣Language</td>
                  ${language}
                </tr>
                <tr>
                  <td class="lp">🗺Travel Guide</td>
                  <td class="text-center" data-toggle="tooltip" title="💻${locname} travel guide" style="color: black;"><a href="${lp}" target="_blank">Guidebook</a></td>
                  <td class="uber">🚘Uber available</td>
                  ${uber}
                </tr>
                <tr>
                  <td class="immigration">👮‍♂️Immigration</td>
                  <td class="text-center" data-toggle="tooltip" title="👮‍♂️See immigration guide" style="color: black;"><a href="${immigration}" target="_blank">Immigration guide</a></td>
                  <td class="meal">🌮Meal Price</td>
                  <td class="text-center" data-toggle="tooltip" title="🌮Avg cost of a meal in an establishment">$${meal}</td>
                </tr>
                <tr>
                  <td class="immigration">🤐Cultural norms</td>
                  <td class="text-center" data-toggle="tooltip" title="📖Learn the cultural norms" style="color: black;"><a href="${norms}" target="_blank">Cultural norm guide</a></td>
                  <td class="beer">🍺.5L Beer</td>
                  <td class="text-center" data-toggle="tooltip" title="🍺Cost of 0.5L beer in an establishment">$${beer}</td>
                </tr>
                <tr>
                  <td class="rooms">🏡Airbnb (private room)</td>
                  <td class="text-center" data-toggle="tooltip" title="🏡Avg cost per night of a private room in ${cityName}">$${roomCost}</td>
                  <td class="currency">💸$1 USD in ${currencyName}</td>
                  <td class="text-center" data-toggle="tooltip" title="💸Same as 1USD">${usdEquivalent} ${currencyName}</td>
                </tr>
                <tr>
                  <td class="places">🏡Airbnb (entire place)</td>
                  <td class="text-center" data-toggle="tooltip" title="🏡Avg cost per night of an entire place in ${cityName}">$${placeCost}</td>
                  <td class="atm">🏧take out: ${atm} ${currencyName}</td>
                  <td class="text-center" data-toggle="tooltip" title="🏧 Common ATM takeout amount">USD ${atmInUSD}</td>
                </tr>
                <tr>
                  <td class="cost">💸Cost per day</td>
                  <td class="text-center" data-toggle="tooltip" title="Cost of one private room, three meals out and a beer per day🤙">$${dailyCost}</td>
                  <td class="culture">⛩Cultural sights nearby</td>
                  <td>${cultureScore}</td>
                </tr>
              </tbody>
            </table>
          </div>`
        )

  });
});

//Add marker function
function addMarker(props, map) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: props.iconImage
  });

 //Creates the info window
  var infoWindow = new google.maps.InfoWindow({
    content: props.content
  });

  //Adds the listener
  marker.addListener('click', function(){
    infoWindow.open(map, marker);

    //Closes windows when map is clicked
    google.maps.event.addListener(map, "click", function(event) {
    //Close info window
        infoWindow.close();
    });
  });
}//End of addMarker v2

function renderMarkers(map) {
  // console.log('map: ', map)
  //Getting the markers
  db.collection("markers").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

        const mData = doc.data();
        const mCity = mData.city;
        const mSurfSpot = mData.surfSpot;

        // console.log('mData: ', mData);

        //Array of markers v2
        var markers = [
          mData
        ];

        //Loop through markers
        for(var i = 0; i < markers.length; i++) {
          console.log('rendering markers', markers[i])
          //Add marker
          addMarker(markers[i], map);
        }

      });
  });
}



//Getting Surf Spot Maps
db.collection("surf-spot").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {

    const ssData = doc.data();
    const ssName = doc.id;
    const spotname = ssName.replace(/-/g,' ');
    const mapCenter = ssData.surfspot;

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
    let access = ssData.access;

    const jan = ssData.jan;
    const feb = ssData.feb;
    const mar = ssData.mar;
    const apr = ssData.apr;
    const may = ssData.may;
    const jun = ssData.jun;
    const jul = ssData.jul;
    const aug = ssData.aug;
    const sep = ssData.sep;
    const oct = ssData.oct;
    const nov = ssData.nov;
    const dec = ssData.dec;

    const icon = ssData.iconImage;
    const markerDB = ssData.marker;
    const markers1DB = ssData.markers1;
    const markersDB = ssData.markers;



    //Sets skill icon in surf spot heading
    if (skill == "intermediate") {
      skill = mIntermediate;
      var skillTip = "Good for intermediate 🏄‍♂️"
    } else if (skill == "advanced") {
      skill = mAdvanced;
      var skillTip = "Good for advanced 🏄‍♂️"
    } else if (skill == "beginner") {
      skill = mBeginner;
      var skillTip = "Good for beginner 🏄‍♂️"
    } else if (skill = "expert") {
      skill = mExpert;
      var skillTip = "Experts only 🏄‍♂️"
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
      var beachTip = "🏖Rocky or weathery. Can be good!";
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
      var localismTip = "🏄‍♂️ Respectfully";
    } else if (localism == "no") {
      localism = "Very friendly";
      var localismTip = "😇Minimal localism";
    } else {
      localism = " ";
      var localismTip = " ";
    }
    //Sets access in surf spot specs
    if (access == "park") {
      access = "Parking available";
      var accessTip = "🚗Park and surf";
    } else if (access == "hike") {
      access = "Need to hike";
      var accessTip = "👟A bit of a hike";
    } else if (access == "boat") {
      access = "Boat access";
      var accessTip = "🛥Likely need a boat";
    } else if (access == "in-front") {
      access = "Right out front!";
      var accessTip = "🤩Can be walking distance";
    } else {
      access = " ";
      var accessTip = " ";
    }

    //ssData.marker (cowells) logs CORRECT object w/ map:map & position: {lat:lng:}

    // const a = [0, 1, 2];
    // console.log( a[0] );
    //
    // const dbMarkers = ssData.markers;
    // console.log( dbMarkers[0] );

    // //Loop through markers
    // for(var i = 0; i < dbMarkers.length; i++) {
    //   //Add marker
    //   // addMarker(markers[i]);
    //   console.log(dbMarkers[i]);
    // }

    initMap(
      ssData,
      spotname,
      mapCenter,
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
      accessTip,
      jan,
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
      boardTip)

    //Map options
    var options = {
      zoom:15,
      center:mapCenter
    }

    //new map
    map = new google.maps.Map(document.getElementById('surf-spot-map'), options);

    // // Add one marker -- markerDB works
    // var marker = new google.maps.Marker(
    //   markerDB
      // {
      // position:{lat:36.9510, lng:-122.0250},
      // map:map,
      // icon:beginner
      // }
    // );
    // marker.setMap(map);


    renderMarkers(map)


  });
});


window.initMap = function(
    ssData,
    spotname,
    mapCenter,
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
    accessTip,
    jan,
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
    boardTip
  ){

  //add to html
  //$ is the same as getElementById
  $("#surf-spot-map__wrapper").prepend(
      `<div class="col-lg-6 mb-5">
       <h5 class="text-center mb-3" style="text-transform:capitalize;"><a href="${forecast}" target="_blank" data-toggle="tooltip" title="Click to view 7 day 🏄‍♂️ forecast" style="color:black;">${spotname}</a> - <img data-toggle="tooltip" title="${skillTip}" src="${skill}"></img></h5>
         <div class="row">
           <div class="col-sm">
             <table class="table col-sm">
                 <tbody>
                   <tr>
                       <td class="best-board">🏄🏽‍♀️Best board:</td>
                       <td class="text-center" data-toggle="tooltip" title="${boardTip}"><img src="${boardIcon}"></img>${board}</td>
                   </tr>
                   <tr>
                       <td class="best-size">🌊Best size:</td>
                       <td class="text-center" data-toggle="tooltip" title="${sizeTip}">${size}</td>
                   </tr>
                   <tr>
                       <td class="best-tide">〰️Best tide:</td>
                       <td class="text-center" data-toggle="tooltip" title="${tideTip}">${tide}</td>
                   </tr>
                   <tr>
                       <td class="wind-dir">💨Best wind:</td>
                       <td class="text-center" data-toggle="tooltip" title="${windTip}">${wind}</td>
                   </tr>
                   <tr>
                       <td class="beach">🏖Beach: </td>
                       <td class="text-center" data-toggle="tooltip" title="${beachTip}">${beach}</td>
                   </tr>
                   <tr>
                       <td class="access">🚗Access: </td>
                       <td class="text-center" data-toggle="tooltip" title="${accessTip}">${access}</td>
                   </tr>
                 </tbody>
             </table>
           </div>
           <div class="col-sm">
             <table class="table col-sm">
                 <tbody>
                   <tr>
                       <td class="wave-dir">🌊Direction:</td>
                       <td class="text-center" data-toggle="tooltip" title="${waveDirTip}">${waveDir}</td>
                   </tr>
                   <tr>
                       <td class="wave-type">🌊Type:</td>
                       <td class="text-center" data-toggle="tooltip" title="${waveTypeTip}">${waveType}</td>
                   </tr>
                   <tr>
                       <td class="barrel">🤩Barrel:</td>
                       <td class="text-center" data-toggle="tooltip" title="${barrelTip}">${barrel}</td>
                   </tr>
                   <tr>
                       <td class="bottom">⚓️Bottom:</td>
                       <td class="text-center" data-toggle="tooltip" title="${bottomTip}">${bottom}</td>
                   </tr>
                   <tr>
                       <td class="crowd">🎪Crowd: </td>
                       <td class="text-center" data-toggle="tooltip" title="${crowdTip}">${crowd}</td>
                   </tr>
                   <tr>
                       <td class="localism">👺Localism: </td>
                       <td class="text-center" data-toggle="tooltip" title="${localismTip}">${localism}</td>
                   </tr>
               </tbody>
             </table>
           </div>
         </div>
       <div class="col-sm">
         <table class="table table-sm col-sm">
           <tbody>
             <tr>
                 <td data-toggle="tooltip" title="${jan}% chance of 🏄‍♂️ surfable waves in Jan"><small>${jan}%</small><br><b>Jan<b></td>
                 <td data-toggle="tooltip" title="${feb}% chance of 🏄‍♂️ surfable waves in Feb"><small>${feb}%</small><br><b>Feb<b></td>
                 <td data-toggle="tooltip" title="${mar}% chance of 🏄‍♂️ surfable waves in Mar"><small>${mar}%</small><br><b>Mar<b></td>
                 <td data-toggle="tooltip" title="${apr}% chance of 🏄‍♂️ surfable waves in Apr"><small>${apr}%</small><br><b>Apr<b></td>
                 <td data-toggle="tooltip" title="${may}% chance of 🏄‍♂️ surfable waves in May"><small>${may}%</small><br><b>May<b></td>
                 <td data-toggle="tooltip" title="${jun}% chance of 🏄‍♂️ surfable waves in Jun"><small>${jun}%</small><br><b>Jun<b></td>
                 <td data-toggle="tooltip" title="${jul}% chance of 🏄‍♂️ surfable waves in Jul"><small>${jul}%</small><br><b>Jul<b></td>
                 <td data-toggle="tooltip" title="${aug}% chance of 🏄‍♂️ surfable waves in Aug"><small>${aug}%</small><br><b>Aug<b></td>
                 <td data-toggle="tooltip" title="${sep}% chance of 🏄‍♂️ surfable waves in Sep"><small>${sep}%</small><br><b>Sep<b></td>
                 <td data-toggle="tooltip" title="${oct}% chance of 🏄‍♂️ surfable waves in Oct"><small>${oct}%</small><br><b>Oct<b></td>
                 <td data-toggle="tooltip" title="${nov}% chance of 🏄‍♂️ surfable waves in Nov"><small>${nov}%</small><br><b>Nov<b></td>
                 <td data-toggle="tooltip" title="${dec}% chance of 🏄‍♂️ surfable waves in Dec"><small>${dec}%</small><br><b>Dec<b></td>
               </tr>
             </tbody>
           </table>
         </div>
        <div id="surf-spot-map" class="mb-3" style="max-height:auto; width:auto;"></div>
       </div>`
  ); //end prepend

};//End window.initMap



  // // //TEST of marker from db
  // var marker = new google.maps.Marker({
  //   position:mapCenter,
  //   map:map,
  //   icon:localism
  // });
  //
  // var infoWindow = new google.maps.InfoWindow({
  //   content:'<h3>Localism</h3>'
  // });
  //
  // marker.addListener('click', function(){
  //   infoWindow.open(map, marker);
  // });//End Test
