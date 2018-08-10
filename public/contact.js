//Initalize Cloud Firestore through Firebase
const db = firebase.firestore();
let name;
let email;
let message;




////ADD SUBMITTED CONTACT FORM TO FIRESTORE

//LISTEN FOR CONTACT FORM SUBMIT
document.getElementById('contact-form').addEventListener('submit', submitContactForm);

function submitContactForm(e) {
  //STOP SUBMISSION FROM SUBMITTING TO THE HTML PAGE
  e.preventDefault();

  //GET INPUT VALUES
  name = getInputValue('name-input');
  email = getInputValue('email-input');
  message = getInputValue('message-textarea');
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),

  //ADD DOCUMENT TO "contact" COLLECTION
  db.collection("inquiries").add({

    name: name,
    email: email,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),

  }).then(function(docRef) {
    $(".alert-success").slideDown(500).delay(4000).slideUp(500);
    console.log(docRef.id);
  }).catch(function(error) {
    $(".alert-danger").slideDown(500).delay(4000).slideUp(500);
  });//END -- ADD DOCUMENT TO "contact" COLLECTION

  //RESET FORM AFTER SUBMISSION
  document.getElementById('contact-form').reset();

}//END -- submitContactForm();

//FUNCTION TO GET #contact-form VALUES
function getInputValue(id) {
  return document.getElementById(id).value;
}

//END -- ADD SUBMITTED CONTACT FORM TO FIRESTORE
