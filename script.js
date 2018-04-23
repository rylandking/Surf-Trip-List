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
        let lp = citydata.lp;
        let cityRentals = citydata.cityRentals;
        let cityLessons = citydata.cityLessons;

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
            <div data-toggle="tooltip" title="👩‍⚕️Okay health care here and there" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
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
            <div data-toggle="tooltip" title="📱Fast internet almost everywhere" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <b>good</b>
            </div>
          </div>`;
        } else if (internetScore == 4) {
          internetScore =
          `<div class="progress rounded-0" style="height: 30px;">
            <div data-toggle="tooltip" title="📱Fast internet available" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
              <b>good</b>
            </div>
          </div>`;
        } else if (internetScore == 3) {
          internetScore =
          `<div class="progress rounded-0" style="height: 30px;">
            <div data-toggle="tooltip" title="📱Internet available someplaces" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
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
            <div data-toggle="tooltip" title="⛩Minimal interesting culture" class="progress-bar bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
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
            <div data-toggle="tooltip" title="💃Party on, Wayne!" class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <b>great</b>
            </div>
          </div>`;
        } else if (partyScore == 4) {
          partyScore =
          `<div class="progress rounded-0" style="height: 30px;">
            <div data-toggle="tooltip" title="💃Party spots nearby" class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
              <b>good</b>
            </div>
          </div>`;
        } else if (partyScore == 3) {
          partyScore =
          `<div class="progress rounded-0" style="height: 30px;">
            <div data-toggle="tooltip" title="💃Places to party can be hard to find" class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
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

        //Sets languageTip in #travel-guide table
        if (language == "english") {
          languageTip =
          `data-toggle="tooltip" title="🗣Mostly English speakers"`;
        } else if (language == "spanish") {
          languageTip =
          `data-toggle="tooltip" data-html="true" title="<p>👋Hello: Hola.</p><p>😁Please: Por favor.</p><p>🙏Thank you: Gracias.</p><p>🍻Beer: Cerveza.</p>"`;
        } else if (language == "portugese") {
          languageTip =
          `data-toggle="tooltip" data-html="true" title="<p>👋Hello: Olá.</p><p>😁Please: Por favor.</p><p>🙏Thank you: Obrigado.</p><p>🍻Beer: Cerveja.</p>"`;
        } else if (language == "indonesian") {
          languageTip =
          `data-toggle="tooltip" data-html="true" title="<p>👋Hello: Halo.</p><p>😁Please: Silakan. (suh-LAH-kann).</p><p>🙏Thank you: Terima kasih. (Tuh-REE-mah KAH-see).</p><p>🍻Beer: Bir.</p>"`;
        } else {
          languageTip = " ";
        }

        //Sets cityRentals in #travel-guide table
        if (cityRentals == "available") {
          cityRentals = `<td class="text-center"><p data-toggle="tooltip" title="👍Surfboard rentals are available">👍</p></td>`;
        } else if (cityRentals == "not-available") {
          cityRentals = `<td class="text-center"><p data-toggle="tooltip" title="👎No surfboard rentals available">👎</p></td>`;
        } else {
          cityRentals = `<td data-toggle="tooltip" title="Undefined." class="text-center"> </td>`;
        }

        //Sets cityLessons in #travel-guide table
        if (cityLessons == "available") {
          cityLessons = `<td class="text-center"><p data-toggle="tooltip" title="👍Surf lessons are available">👍</p></td>`;
        } else if (cityLessons == "not-available") {
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
                    <td>ABC</td>
                    <td class="health-care">🏥Health care</td>
                    <td>${healthCareScore}</td>
                </tr>
                <tr>
                    <td class="accommodationPrice">🏡Accommodations</td>
                    <td>ABC</td>
                    <td class="intenet">📱Internet</td>
                    <td>${internetScore}</td>
                </tr>
                <tr>
                    <td class="beaches">🏖Beaches: </td>
                    <td class="text-center"><p data-toggle="tooltip" title="🏖Comfortable beaches available">👍</p></td>
                    <td class="partyScore">💃Party scene</td>
                    <td>${partyScore}</td>
                </tr>
                <tr>
                    <td class="good-for">👫Good for:</td>
                    <td>${goodFor}</td>
                    <td class="nightlife">🍸Nightlife</td>
                    <td>${nightLifeScore}</td>
                </tr>
                <tr>
                    <td class="surf-lessons">👩‍🏫Surf lessons</td>
                    ${cityLessons}
                    <td class="culture">⛩Culture</td>
                    <td>${cultureScore}</td>
                </tr>
                <tr>
                    <td class="rentals">🏄‍♂️Board rentals</td>
                    ${cityRentals}
                    <td class="nature">🏞Nature</td>
                    <td>${natureScore}</td>
                </tr>
                <tr>
                    <td class="power">🔌Power</td>
                    <td>ABC</td>
                    <td class="safety">👮‍♂️Safety</td>
                    <td>${safetyScore}</td>
                </tr>
                <tr>
                    <td class="tapWater">🚰Safe tap water</td>
                    <td class="text-center">🚫No</td>
                    <td class="femaleSafeScore">👩Female Friendly</td>
                    <td>${femaleSafeScore}</td>
                </tr>
                <tr>
                  <td class="waterTemp">☀️Water temp</td>
                  ${waterTemp}
                  <td class="englishScore">🙊English speaking</td>
                  <td>${englishScore}</td>
                </tr>
                <tr>
                  <td class="insurance">🚑Travelers Insurance</td>
                  <td class="text-center" data-toggle="tooltip" title="🚑Travelers insurance" style="color: black;"><a href="www.travelersinsurance.com" >👍Get insurance</a></td>
                  <td class="language">🗣Language</td>
                  <td class="text-center" style="text-transform:capitalize" ${languageTip}>${language}</td>
                </tr>
                <tr>
                  <td class="lp">🗺Travel Guide</td>
                  <td class="text-center" data-toggle="tooltip" title="💻Regional travel guide" style="color: black;"><a href="${lp}" >👍Learn even more!</a></td>
                  <td class="immigration">👮‍♂️Immigration</td>
                  <td class="text-center" data-toggle="tooltip" title="👮‍♂️Immigration guide" style="color: black;"><a href="www.immigrationguides.com">👍See an immigration guide</a></td>
                </tr>
                <tr>
                  <td class="lp">🚘Uber available</td>
                  <td class="text-center" data-toggle="tooltip" title="🚘Uber is available" style="color: black;"><a href="www.uber.com">👍Available!</a></td>
                  <td></td>
                  <td></td>
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


window.initMap = function(ssData, spotname, mapCenter, icon, markerDB, markersDB, markers1DB, board, size, sizeTip, tide, tideTip, wind, windTip, rentals, lessons, waveDir, waveDirTip, waveType, waveTypeTip, barrel, barrelTip, bottom, bottomTip, beach, beachTip, crowd, crowdTip, localism, localismTip, access, accessTip, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, forecast, skill, skillTip, board, boardIcon, boardTip){

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
