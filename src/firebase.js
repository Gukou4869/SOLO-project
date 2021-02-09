import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDIHAPzDGoE28hupkCnyYFgRiUh7MmGEMA",
  authDomain: "calorie-caliculator.firebaseapp.com",
  databaseURL: "https://calorie-caliculator-default-rtdb.firebaseio.com",
  projectId: "calorie-caliculator",
  storageBucket: "calorie-caliculator.appspot.com",
  messagingSenderId: "638860257269",
  appId: "1:638860257269:web:7492bc769739f2320ba2bc",
  measurementId: "G-P5MT62M6G8",
};
// Initialize Firebase
let fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
