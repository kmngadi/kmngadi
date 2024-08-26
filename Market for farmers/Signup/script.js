
const firebaseConfig = {
    apiKey: "AIzaSyCrMk6O2LujLmAxcqMJ8c6h-PxX35uoxE0",
    authDomain: "signup-page-59935.firebaseapp.com",
    databaseURL: "https://signup-page-59935-default-rtdb.firebaseio.com",
    projectId: "signup-page-59935",
    storageBucket: "signup-page-59935.appspot.com",
    messagingSenderId: "915596998373",
    appId: "1:915596998373:web:c06bed9474967c0182460c",
    measurementId: "G-L0G99BFRQQ"
  };

  //initialize firebase
  firebase.initializeApp('firebaseConfig');
  firebase.analytics();

   var datab = firebase.database().ref('data');
   function UserRegister(){
   var email = document.getElementById('email').value;
   var password = document.getElementById('password').value;
   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(function (userCredential){ 
}).catch(function(error){
    var error = error.code;
    var errormsg = error.message;
});
}
const auth = firebase.auth();
function SignIn(){
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
}
   
   