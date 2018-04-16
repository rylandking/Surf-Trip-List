
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
    const icon = ssData.iconImage;
    const markerDB = ssData.marker;
    const markers1DB = ssData.markers1;
    const markersDB = ssData.markers;

    const expert = 'map-images/expert.png';
    const advanced = 'map-images/advanced.png';
    const intermediate = 'map-images/intermediate.png';
    const beginner = 'map-images/beginner.png';
    const surfLessons = 'map-images/surf-lessons.png';
    const beach = 'map-images/beach.png';
    const crowd = 'map-images/crowd.png';
    const localism = 'map-images/localism.png';

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

    initMap(ssData, spotname, mapCenter, icon, markerDB, markersDB, markers1DB)

    //Map options
    var options = {
      zoom:15,
      center:mapCenter
    }

    //new map
    var map = new google.maps.Map(document.getElementById('surf-spot-map'), options);

    // console.log(markerDB);
    //
    // Add one marker -- works
    // var marker = new google.maps.Marker(
    //   markerDB
    //   // {
    //   // position:{lat:36.9510, lng:-122.0250},
    //   // map:map,
    //   // // icon:beginner
    //   // }
    // );
    // marker.setMap(map);


    console.log(markers1DB);


    //Array of markers v2
    var markers = [
      {
        coords:{lat:36.9599, lng:-122.0280},
        iconImage:advanced,
        content:'<h3>Advanced</h3>'
      },
      {
        coords:mapCenter,
        iconImage:beginner,
        content:'<h3>Beginner</h3>'
      },
      {
        coords:{lat:36.9599, lng:-122.0200},
        iconImage:intermediate,
        content:'<h3>Intermediate</h3>'
      }
    ];

    //Loop through markers
    for(var i = 0; i < markers.length; i++) {
      //Add marker
      addMarker(markers[i]);
    }

    //Add marker function
    function addMarker(props) {
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        icon:props.iconImage
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


  });
});


window.initMap = function(ssData, spotname, mapCenter, icon, markerDB, markersDB, markers1DB){

  //add to html
  //$ is the same as getElementById
  $("#surf-spot-map__wrapper").prepend(
      `<div class="col-lg-6 mb-5">
       <h5 class="text-center spot-name mb-3" style="text-transform:capitalize;">${spotname} - Skill Levels</h5>
         <div class="row">
           <div class="col-sm">
             <table class="table col-sm">
                 <tbody>
                 <tr>
                     <td class="good-for">👍Good for:</td>
                     <td>ABC</td>
                 </tr>
                   <tr>
                       <td class="wave-type">🌊Type:</td>
                       <td>ABC</td>
                   </tr>
                   <tr>
                       <td class="bottom">⚓️Bottom:</td>
                       <td>ABC</td>
                   </tr>
                   <tr>
                       <td class="beach">🏖Beach: </td>
                       <td>ABC</td>
                   </tr>
                   <tr>
                       <td class="accessiblity">🚗Accessibility: </td>
                       <td>ABC</td>
                   </tr>
                 </tbody>
             </table>
           </div>
           <div class="col-sm">
             <table class="table col-sm">
                 <tbody>
                 <tr>
                     <td class="best-board">🏄🏽‍♀️Best board:</td>
                     <td>ABC</td>
                 </tr>
                 <tr>
                     <td class="best-size">🌊Best size:</td>
                     <td>ABC</td>
                 </tr>
                 <tr>
                     <td class="best-tide">〰️Best tide:</td>
                     <td>ABC</td>
                 </tr>
                 <tr>
                     <td class="wind-dir">💨Best wind:</td>
                     <td>ABC</td>
                 </tr>
                 <tr>
                     <td class="forecast">🗓Forecast:</td>
                     <td>ABC</td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
       <div class="col-sm">
         <table class="table table-sm col-sm">
           <tbody>
             <tr>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Jan"><small>95%</small><br><b>Jan<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Feb"><small>95%</small><br><b>Feb<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Mar"><small>95%</small><br><b>Mar<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Apr"><small>95%</small><br><b>Apr<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in May"><small>95%</small><br><b>May<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Jun"><small>95%</small><br><b>Jun<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Jul"><small>95%</small><br><b>Jul<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Aug"><small>95%</small><br><b>Aug<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Sep"><small>95%</small><br><b>Sep<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Oct"><small>95%</small><br><b>Oct<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Nov"><small>95%</small><br><b>Nov<b></td>
                 <td data-toggle="tooltip" title="Chance of 🏄‍♂️ surfable waves in Dec"><small>95%</small><br><b>Dec<b></td>
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
