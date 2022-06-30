// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// password criteria options
var specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[/]^_`{|}~";
var numbersList = "0123456789";
var upperCase =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerCase = "abcdefghijklmnopqrstuvwxyz";

//  varifies length and at least one criteria was selected then runs the password generation function
function generatePassword() {
  var length = passLength(8, 128);
  // if length does not meet requirements
  if (!length) {
    return null;
  }

  var lowercase = confirm("Use lowercase letters?");
  var uppercase = confirm("Use uppercase letters?");
  var numbers = confirm("Use numeric characters?");
  var special = confirm("Use special characters?");

  // if no criteria is selected it should show an error
  if (!(lowercase || uppercase || numbers || special)) {
    window.alert("No criteria selected. please select desired password criteria!");
    return null
  }

  var generatedPassword = passwordGeneration(length, lowercase, uppercase, numbers, special);
  return generatedPassword;
}

// this function confimrs the users input length meets requirements
function passLength(minLength, maxLength) {
  var lengthInput = window.prompt("How many characters should your new password have? (between 8 and 128)");
  // makes sure users input is a number
  if (isNaN(lengthInput)) {
    window.alert(lengthInput + " is not a number. Please try again and enter a number.")
    return null;
  }
  var numInput = Number(lengthInput);

  
  //number must also be an integer
  if (!Number.isInteger(numInput)) {
    window.alert(numInput + " is not an integer. Please try again and enter an integer.")
    return null;
  }
  var inputInt = Number.parseInt(lengthInput);

  // runs the user input to make sure it meets  min and max length requirements
  if (inputInt < minLength) {
    window.alert(inputInt + " does not meet minimum length. Please try again.");
    return null;
  }
  if (maxLength < inputInt) {
    window.alert(inputInt + " exceedes max password length. Please enter new value.");
    return null;
  }

  return inputInt;
}

// this function checks which criteria is true(user wants included in password) 
function passwordGeneration(length, lowercase, uppercase, numbers, special) {
  var myCharacters = "";
  var characterCount = 0;

  var allCharacters = "";

  // takes a character from selected array and increases the count until we reach the length 
  var chooseFromCharacterSet = (charSet) => {
    myCharacters += randomChar(charSet);
    characterCount++;
    allCharacters += charSet;
  }

  // verifies selected criteria and includes it in the password
  if (lowercase) {
    chooseFromCharacterSet(lowerCase);
  }
  if (uppercase) {
    chooseFromCharacterSet(upperCase);
  }
  if (numbers) {
    chooseFromCharacterSet(numbersList);
  }
  if (special) {
    chooseFromCharacterSet(specialCharacters);
  }

  // continues to add characters until password meets length value
  while (characterCount < length) {
    myCharacters += randomChar(allCharacters);
    characterCount++;
  }

  return shuffleCharacters(myCharacters);
}

function randomChar(characterSet) {
  var charIndex = Math.floor(Math.random() * characterSet.length);
  return characterSet.charAt(charIndex);
}

//gives final password as a combination of randomly selected characters 
function shuffleCharacters(characterSet) {
  var finalPassword = "";

  var characterArray = Array.from(characterSet);
  while (characterArray.length != 0) {
    var charIndex = Math.floor(Math.random() * characterArray.length);
    finalPassword += characterArray[charIndex];
    characterArray.splice(charIndex, 1);
  }

  return finalPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
