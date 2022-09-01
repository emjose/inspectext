"use strict";

const inputTextArea = document.getElementById("input-textarea");
const searchTextArea = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");
const characCount = document.getElementById("charac-count");
const copyButton = document.getElementById("copy-button-1");
const wordCount = document.getElementById("word-count");
const term = document.getElementById("search-text");
const result = document.getElementById("result");

// Color options
const normalColor = "var(--normalColor)";
const alertColor = "var(--alertColor)";

// Inspection options
const yesPal = ` is a palindrome.`;
const noPal = ` is <span>not</span> a palindrome.`;
const yesSearch = `<span>Yes</span>, the text contains `;
const noSearch = `<span>No</span>, the text doesn't contain `;
const invalidChar = ` is <span>not</span> a palindrome. Please use alphanumeric characters.`;

// Result options
const defaultText = "Press buttons to inspect text";
const emptyField = "Please enter text above";
const emptySearch = "Please fill in all text fields";
const noResults = "No results to copy. Please inspect text first.";

// Clear text fields
function clearCount() {
	inputTextArea.value = "";
	searchTextArea.value = "";
	wordCount.textContent = "0";
	characCount.textContent = "0";
}

// Clear text fields and results
function clearAll() {
	clearCount();
	result.innerHTML = defaultText;
	result.style.color = normalColor;
}

// Validation for empty fields and whitespaces
function isEmpty() {
	if (inputTextArea.value.trim() === "" || inputTextArea.value.length === 0) {
		clearCount();
		return true;
	} else {
		return false;
	}
}

// Display Results
function resultText(string, color) {
	result.innerHTML = string;
	result.style.color = color;
}

// Trigger active search button style if enter key is pressed
function clicked(element) {
	element.style.transform = "scale(0.95)";
	element.style.backgroundColor = "var(--darkButton)";
	setTimeout(() => {
		element.removeAttribute("style");
	}, 150);
}

// Trigger search if enter key is pressed
term.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		searchFor();
		clicked(searchButton);
	}
});

// Count words and characters
inputTextArea.addEventListener("input", () => {
	characCount.textContent = inputTextArea.value.length;
	let trimText = inputTextArea.value.trim();
	wordCount.textContent = trimText.split(/\s+/).filter((item) => item).length;
});

// Copy the textarea
function copy() {
	if (isEmpty()) {
		resultText(emptyField, alertColor);
	} else {
		resultText(defaultText, normalColor);
		navigator.clipboard.writeText(inputTextArea.value);
	}
}

// Copy inspection results
function copyResult() {
	if (isEmpty() || result.innerHTML === defaultText || result.style.color === alertColor) {
		resultText(noResults, alertColor);
	} else {
		navigator.clipboard.writeText(result.innerHTML.replace(/<\/?[^>]+(>|$)/g, ""));
	}
}

// Reverse the string
function reverseString() {
	if (isEmpty()) {
		resultText(emptyField, alertColor);
	} else {
		let myText = inputTextArea.value.trim();
		result.innerHTML = `The reversed text is: <span>${myText.split("").reverse().join("")}</span>`;
		resultText(result.innerHTML, normalColor);
	}
}

// Detect invalid characters
function hasInvalid(string) {
	const puncChar = /,|.|[/]|[?]|;|:|[(]|[)]|'|"|!|-|—/g;
	const emoji = /\p{Extended_Pictographic}/gu;
	const nonAlpha =
		/@|#|[$]|[*]|[%]|[\^]|&|<|>|~|{|}|[|]|`|_|=|[+]|[\\]|[\[]|[\]]|[\uD83C]|[\uDDE6-\uDDFF]|[\uD83C]|[\uDDE6-\uDDFF]/g;
	const symbolChar =
		/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u3004|\u327F|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25b2|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2150-\u215f]|[\u2180-\u218b]|[\u2200-\u220f]|[\u2210-\u221f]|[\u2220-\u222f]|[\u2230-\u223f]|[\u2240-\u224f]|[\u2250-\u225f]|[\u2260-\u226f]|[\u2270-\u227f]|[\u2280-\u228f]|[\u2290-\u229f]|[\u22a0-\u22af]|[\u22b0-\u22bf]|[\u22c0-\u22cf]|[\u22d0-\u22df]|[\u22e0-\u22ef]|[\u22f0-\u22ff]|[\u2300-\u230f]|[\u2310-\u231f]|[\u2320-\u232f]|[\u2330-\u233f]|[\u2340-\u234f]|[\u2350-\u235f]|[\u2360-\u236f]|[\u2370-\u237f]|[\u2380-\u238f]|[\u2390-\u239f]|[\u23a0-\u23af]|[\u23b0-\u23bf]|[\u23c0-\u23cf]|[\u23d0-\u23df]|[\u23e0-\u23ef]|[\u23f0-\u23f3]|[\u23f8-\u23fe]|[\u2400-\u240f]|[\u2410-\u241f]|[\u2420-\u2426]|[\u2440-\u244a]|[\u2460-\u246f]|[\u2470-\u247f]|[\u2480-\u2487]|[\u249c-\u249f]|[\u24ac-\u24af]|[\u24b0-\u24bf]|[\u24c0-\u24cf]|[\u24d0-\u24df]|[\u24e0-\u24ef]|[\u24f0-\u24ff]|[\u27c0-\u27cd]|[\u27d0-\u27df]|[\u27e0-\u27ef]|[\u2980-\u298f]|[\u2990-\u299f]|[\u29a0-\u29af]|[\u29b0-\u29bf]|[\u29c0-\u29cf]|[\u29d0-\u29df]|[\u29e0-\u29ef]|[\u29f0-\u29ff]|[\u2a00-\u2a0f]|[\u2a10-\u2a1f]|[\u2a20-\u2a2f]|[\u2a30-\u2a3f]|[\u2a40-\u2a4f]|[\u2a50-\u2a5f]|[\u2a60-\u2a6f]|[\u2a70-\u2a7f]|[\u2a80-\u2a8f]|[\u2a90-\u2a9f]|[\u2aa0-\u2aaf]|[\u2ab0-\u2abf]|[\u2ac0-\u2acf]|[\u2ad0-\u2adf]|[\u2ae0-\u2aef]|[\u2af0-\u2aff])/gu;
	if (
		emoji.test(string) ||
		nonAlpha.test(string) ||
		symbolChar.test(string) ||
		(puncChar.test(string) && string.replace(/[^a-zA-Z0-9]/g, "").trim() === "")
	) {
		return true;
	}
}

// Palindrome Validation
function isPalindrome() {
	let inputText = inputTextArea.value;
	let palText = `<span>${inputText}</span>`;
	if (isEmpty()) {
		resultText(emptyField, alertColor);
	} else if (hasInvalid(inputText)) {
		result.innerHTML = palText + invalidChar;
		resultText(result.innerHTML, normalColor);
	} else {
		let plainText = inputText.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
		result.innerHTML = plainText === plainText.split("").reverse().join("") ? palText + yesPal : palText + noPal;
		resultText(result.innerHTML, normalColor);
	}
}

// Search for term
function searchFor() {
	let myText = inputTextArea.value.trim().toLowerCase();
	let searchText = term.value.trim().toLowerCase();
	let spanText = `<span>${searchText}</span>`;
	if (isEmpty() || searchText.length === 0) {
		resultText(emptySearch, alertColor);
	} else {
		result.innerHTML = myText.includes(searchText) ? yesSearch + spanText : noSearch + spanText;
		resultText(result.innerHTML, normalColor);
	}
}

function swRegistration() {
	const heart = ["font-size: 20px", "padding: 12px", "margin: 4px 0 4px 4px", "color: rgba(238,58,136,1)"].join(";");
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/sw.js")
			.then(function (registration) {
				console.log("%c❤️", heart);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
}

function consoleText() {
	console.clear();
	const styles = [
		"color: white",
		"background: rgba(238,58,136,1)",
		"font-size: 18px",
		"padding: 12px",
		"margin: 6px 0 6px 14px",
	].join(";");
	const styles2 = ["font-size: 14px", "padding: 16px", "margin: 6px 0 6px 0", "color: rgba(238,58,136,1)"].join(";");
	console.log("%cHello World! I'm Emmanuel.", styles);
	console.log("%cThank you for checking out my work!", styles2);
	const gradient = [
		"font-size: 14px",
		"color: #fff",
		"width: 200px",
		"padding: 8px",
		"margin: 6px 0 6px 14px",
		"border-radius: 4px",
		"background: rgba(238,58,136,1)",
		"background: linear-gradient( 109.6deg, rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% )",
	].join(";");
	console.log("%cPortfolio%chttps://bit.ly/3QQr1Ux", gradient, styles2);
	console.log("%cLinkedin %chttps://bit.ly/3cygAD4", gradient, styles2);
	console.log("%cGithub   %chttps://bit.ly/3iwQC6U", gradient, styles2);
	console.log("%cThe README   %chttps://bit.ly/3CO1w2a", gradient, styles2);
	console.log("%cHave a wonderful day!", styles2);
}

swRegistration();
consoleText();
