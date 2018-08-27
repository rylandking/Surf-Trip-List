//Initalize Cloud Firestore through Firebase
const db = firebase.firestore();
let name;
let email;
let bizName;
let website;
let bizType;
let bizCity;
let message;




////ADD SUBMITTED BIZ CONTACT FORM TO FIRESTORE

//LISTEN FOR BIZ CONTACT FORM SUBMIT
document.getElementById('biz-form').addEventListener('submit', submitBizForm);

function submitBizForm(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  //GET INPUT VALUES
  name = getInputValue('name-input');
  email = getInputValue('email-input');
  bizName = getInputValue('biz-name-input');
  website = getInputValue('website-input');
  bizType = getInputValue('biz-type-input');
  bizCity = getInputValue('biz-city-input');
  message = getInputValue('message-textarea');

  //ADD DOCUMENT TO "contact" COLLECTION
  db.collection("biz-inquiries").add({

    name: name,
    email: email,
    bizName: bizName,
    website: website,
    bizType: bizType,
    bizCity: bizCity,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),

  }).then(function(docRef) {
    $(".alert-success").slideDown(500).delay(4000).slideUp(500);
    console.log(docRef.id);
  }).catch(function(error) {
    $(".alert-danger").slideDown(500).delay(4000).slideUp(500);
  });//END -- ADD DOCUMENT TO "contact" COLLECTION

  //FIND BIZ INQUIRIES AND SORT THEM BY MOST RECENT
  db.collection("biz-inquiries").orderBy("timestamp", "desc")
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          data = doc.data();
          name = data.name;
          email = data.email;
          bizName = data.bizName;
          website = data.website;
          bizType = data.bizType;
          bizCity = data.bizCity;
          message = data.message;
          timestamp = data.timestamp;

          console.log(name +': '+ message +' ::: '+ email +':::::'+ timestamp);

        });
    });


}//END -- submitBizForm();

//FUNCTION TO GET #biz-form VALUES
function getInputValue(id) {
  return document.getElementById(id).value;
}



//END -- ADD SUBMITTED BIZ CONTACT FORM TO FIRESTORE
