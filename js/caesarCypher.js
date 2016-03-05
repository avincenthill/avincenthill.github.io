//Caesar Cypher Encryption, Decryption, and Attack in JavaScript
//Alexander Vincent-Hill, 29 Feb 2016

//Rotates a string and outputs the ASCII-shifted string
"use strict";
function cypher(rawString, numericalShift) {
	var stringArray = rawString.split(""), rotatedString = "", i, character, ord, newOrd;
	for (i = 0; i < rawString.length; i++) {
		character = stringArray[i];
		ord = character.charCodeAt();
		newOrd = ord + Number(numericalShift);
		//Confirms newORd within ASCII table
		while (newOrd > 127) {
			newOrd -= 96;
		}
		while (newOrd < 32) {
			newOrd += 96;
		}
		var encryptedCharacter = String.fromCharCode(newOrd);
		stringArray[i] = encryptedCharacter;
		rotatedString = stringArray.join("");
	}
	return rotatedString
}

//Calls cypher on input string
function encrypt(){
	var rawString = document.getElementById('rawString').value;
	var numericalShift = document.getElementById('numericalShift').value;
	document.getElementById('encryptedString').value = cypher(rawString, numericalShift);
    document.getElementById('parsedStrings').value = ""
    if (rawString.length != 0){
        if (numericalShift<10){
            document.getElementById('parsedStrings').value = "0" + numericalShift%96 + " " + cypher(rawString, numericalShift) + "\n"	
        }
        else {
            document.getElementById('parsedStrings').value = numericalShift%96 + " " + cypher(rawString, numericalShift) + "\n"
        }
    }
}

//Calls cypher on input string with numerical shift negated, decrypting the string
function decrypt(){
	var encryptedString = document.getElementById('encryptedString').value;
	var numericalShift = document.getElementById('numericalShift').value;
	document.getElementById('encryptedString').value = cypher(encryptedString, -numericalShift);
    document.getElementById('parsedStrings').value = ""
    if (encryptedString.length != 0){
        if (numericalShift<10){
            document.getElementById('parsedStrings').value = "0" + numericalShift%96 + " " + cypher(encryptedString, -numericalShift) + "\n"
        }
        else {
            document.getElementById('parsedStrings').value = numericalShift%96 + " " + cypher(encryptedString, -numericalShift) + "\n"
        }
    }
}

//Parses all possible shifted strings for an encrypted string input
function bruteForce() {
	var rawString = document.getElementById('rawString')
	var parsedStrings = document.getElementById('parsedStrings')
	parsedStrings.value = ""
	if (rawString.value.length != 0) {
		for (var i = 0; i < 96; i++) {
			//Formats output strings correctly for i < 10
			if (i<10){
				document.getElementById('parsedStrings').value += "0" + i + " " + cypher(rawString.value, i) + "\n"	
			}
			else {
				document.getElementById('parsedStrings').value += i + " " + cypher(rawString.value, i) + "\n"
			}
		};
	};
}

//Key-value pairs of characters and frequency in the English language
function englishLetterFrequencyArray() {
	var englishLetterFrequencyArray = [
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0.16,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0.0817,
		0.0149,
		0.0278,
		0.0425,
		0.127,
		0.0223,
		0.0202,
		0.0609,
		0.0697,
		0.0015,
		0.0077,
		0.0403,
		0.0241,
		0.0675,
		0.0751,
		0.0193,
		0.001,
		0.0599,
		0.0633,
		0.0906,
		0.0276,
		0.0098,
		0.0236,
		0.0015,
		0.0197,
		0.0007,
		0,
		0,
		0,
		0,
		0,
		0,
		0.0817,
		0.0149,
		0.0278,
		0.0425,
		0.127,
		0.0223,
		0.0202,
		0.0609,
		0.0697,
		0.0015,
		0.0077,
		0.0403,
		0.0241,
		0.0675,
		0.0751,
		0.0193,
		0.001,
		0.0599,
		0.0633,
		0.0906,
		0.0276,
		0.0098,
		0.0236,
		0.0015,
		0.0197,
		0.0007,
		0,
		0,
		0,
		0,
		0
	]
	return englishLetterFrequencyArray
}

//Outputs a score based on how often the input string's characters appear in English
function howEnglish(sampleString) {
	var englishScore = 0
	var sampleStringArray = sampleString.split("")
	var freq = englishLetterFrequencyArray()
	var currentChar;
	for (var i = 0; i < sampleStringArray.length; i++) {
		englishScore += freq[sampleStringArray[i].charCodeAt()]
	}
	return englishScore
};

//Outputs the top five possible decrypted strings for an encrypted English string
function smartEnglishBruteForce() {
	var encryptedString = document.getElementById('encryptedString')
	var parsedStrings = document.getElementById('parsedStrings')
	var ratedStrings = []
	var rotatedString = ""
	if (encryptedString.value.length != 0) {
		for (var i = 0; i < 96; i++) {
			rotatedString = cypher(encryptedString.value, i)
			ratedStrings.push({"string":rotatedString, "rating":howEnglish(rotatedString), "shift":96-i})
		};
	};
	console.log(ratedStrings.sort(function(a,b){
		var ratingA = a.rating, ratingB = b.rating
		if (ratingA < ratingB) //sort string descending
			return 1 
		if (ratingA > ratingB)
			return -1
		return 0
	}).slice(0,5))
	document.getElementById('parsedStrings').value = ""
	for (var i = 0; i < 5; i++) {
		//Formats output strings correctly for i < 10
		if (ratedStrings[i].shift<10){
			document.getElementById('parsedStrings').value += "0" + ratedStrings[i].shift + " " + ratedStrings[i].string + "\n"	
		}
		else {
			document.getElementById('parsedStrings').value += ratedStrings[i].shift + " " + ratedStrings[i].string + "\n"
		}
	}
};

//Handlers for html elements
$('form').submit(function(e){e.preventDefault()});
$("#encrypt").click(encrypt);
$("#decrypt").click(decrypt);
$("#bruteForce").click(bruteForce);
$("#smartBrute").click(smartEnglishBruteForce);