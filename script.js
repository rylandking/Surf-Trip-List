
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

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
        var cityName = doc.id;
        var locname = cityName.replace(/-/g,' ');

        // console.log("doc.id " + doc.id);

        let expIcons = []; //create empty array

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

                      console.log(cityName + ": " + expIcons);

                      //then create a string with the fontawesome icons based on expIcons array - send that string to your HTML
                    }

                    // if (expIcons = "0") {
                    //
                    // }
                    //
                    // //if expIcons array has 0
                    // //put beginner variable into relevant cardcontainer div
                    //
                    // var beginner = '<div data-toggle="tooltip" title="Beginner"><i style="color:limegreen" class="fas fa-circle"></i></div>';
                    // var intermediate = '<div data-toggle="tooltip" title="Intermediate"><i style="color:skyblue" class="fas fa-square"></i></div>';
                    // var advanced = '<div data-toggle="tooltip" title="Advanced"><i style="color:white" class="fas fa-chevron-up"></i></i></div>';
                    // var expert = '<div data-toggle="tooltip" title="Expert"><i style="color:white" class="fas fa-angle-double-up"></i></div>';

                  })
                });//End of the surf spot loop

        // we are inside a loop, so doc.id will go through each location in 'cities'
        // then get the document that matches doc.id which connects to a field in each surf spot


        //citydata is all data for the documents in the city collection
        //access just parts of using citydata.fieldname
        var citydata = doc.data();
        var region = citydata.region;

        // //finds what month it is today and use that index of the rideable array
        // var rideable = citydata.rideable[new Date().getMonth()];

        // Calling tooltip to initialize it
        $("[data-toggle=tooltip]").tooltip();

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


        //add to html
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

  });
});

//Surf Spot Maps
db.collection("surf-spot").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {

    const ssData = doc.data();
    const ssName = doc.id;
    const spotname = ssName.replace(/-/g,' ');
    const mapCenter = ssData.surfspot;
    // console.log('data is: ', ssData);


    initMap(ssData, spotname, mapCenter)


  });
});

window.initMap = function(ssData, spotname, mapCenter){

  console.log("ssData:", ssData );
  console.log("mapCenter:", mapCenter );

  //Map options
  var options = {
    zoom: 15,
    // center: {lat:36.9517,lng:-122.0258}
    center: mapCenter
  }

  //add to html
  //$ is the same as getElementById
  $("#surf-spot-map__wrapper").prepend(
    `<h1>${spotname}</h1>
      <div id="surf-spot-map" style="height:300px; width:400px;" class="col-xs-6"></div>`
  ); //end prepend

  var map = new google.maps.Map(document.getElementById('surf-spot-map'), options);
};





/////OLD SYNTAX/////

////Card Container Div
// '<div class="card bg-dark text-white' + ' ' + expFilter +'">' +
//   '<img class="img-fluid card-img" src="' + cityimage + '" alt="sample card">' +
//     '<div class="card-img-overlay">' +
//
//       '<div id="experience" class="lc-experience">' + exp + '</div>' +
//       '<div id="rideable" class="lc-seasonality" data-toggle="tooltip" title="Chance of rideable waves this month">🏄‍♂️ ' + rideable +'% </div>' +
//       // '<div class="lc-conditions">⭐️⭐️⭐️⭐️</div>' +
//       '<h4 id="locName" class="card-title" style="white-space: nowrap;">' + locname +'</h4>' +
//       '<p id="region" class="card-text">' + region +'</p>' +
//       '<div class="lc-flight"<div data-toggle="tooltip" data-placement="bottom" title="Flight cost">🛫 $187</div>' +
//       '<div class="lc-cost" <div data-toggle="tooltip" data-placement="bottom" title="Avg accomm cost">🏡 $42/n</div>' +
//
//     '</div>'+
// '</div>'
