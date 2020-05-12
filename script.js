// Time and Date, Moment.js
$("#day-of-week").html(moment().format("dddd, MMMM Do YYYY"));

var CurrentDay = moment().format("dddd");

$("#image").hide(); // ----------------------------------------------
$("#generated_content").hide();
$("#container").hide();
$("#slideshow").hide();

// Day and picture object array
var daysArr = [
	{
		day: "Monday",
		pic: "./images/monday-meme-1.jpg",
		today: "It's Monday, let's do this!"
	},
	{
		day: "Tuesday",
		pic: "./images/taco-tuesday1.jpeg",
		today: "It's Taco Tuesday!"
	},
	{
		day: "Wednesday",
		pic: "./images/wonder-woman-wednesday.jpg",
		today: "It's Wonder Woman Wednesday!"
	},
	{
		day: "Thursday",
		pic: "./images/tbt1.jpg",
		today: "It's Throwback Thursday!"
	},
	{
		day: "Friday",
		pic: "./images/tgif.png",
		today: "Thank God It's Friday!"
	},
	{
		day: "Saturday",
		pic: "./images/social-saturday.webp",
		today: "It's Social Saturday!"
	},
	{
		day: "Sunday",
		pic: "./images/sunday-funday.jpg",
		today: "Cheer up, It's Sunday Funday!"
	}
];

// For loop for showing the days and pictures comparing current day with object array
for (var i = 0; i < daysArr.length; i++) {
	if (CurrentDay === daysArr[i].day) {
		var img = $("#day-images");
		var day = $("#day");
		day.html(daysArr[i].today);
		img.attr("src", daysArr[i].pic);
		img.attr("height", "250px");
		img.attr("width", "250px");
		img.attr("alt", "Day Picture");
	}
}

//Celebrity Bucks API
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://celebrity-bucks.p.rapidapi.com/birthdays/JSON",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "celebrity-bucks.p.rapidapi.com",
		"x-rapidapi-key": "1e6c93b045mshb322101bcbaf48fp193474jsnd209ea317000"
	}
}

$.ajax(settings).done(function (response) {

	var celebrity = response.Birthdays[0].name;

	$("#celebrity-birthdays").html("Celebrity " + celebrity + " was born on this day");

});

//Funny Animal's Giphy generator 
$("#Giphy-animal-button").on("click", function () {
	$("#image").show();
	$("#generated_content").hide();
	$("#container").hide();
	$("#slideshow").hide();
	// $("#randomImg").show();
	var queryURL =
		"https://api.giphy.com/v1/gifs/random?api_key=0BC3uC9rF7GCxcza8JnE4FIKwcXEoS0V&tag=funny_animals&rating=PG-13";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

		.then(function (res) {

			var animals = res.data;

			var memeImage = $("#image");
			memeImage.attr("src", animals.images.fixed_height.url);
		});
});

//Meme generator
$("#Meme-button").on("click", function () {
	$("#image").show();
	$("#generated_content").hide();
	$("#container").hide();
	$("#slideshow").hide();
	var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=0BC3uC9rF7GCxcza8JnE4FIKwcXEoS0V&tag=Memes&rating=PG";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
		.then(function (response) {
			console.log(response)
			console.log(response.data)

			var results = response.data;

			var memeImage = $("#image");
			memeImage.attr("src", results.images.fixed_height.url);
		});

});


//meditation tab ---------------------------------------------------------------------------


$("#meditation-btn").on("click", function (e) {
	e.preventDefault();
	$("#slideshow").show();
	$("#container").show();
	$("#image").hide();
	$("#generated_content").hide();

	$("#slideshow > div:gt(0)").hide();

	setInterval(function () {
		$('#slideshow > div:first')
			.fadeOut(1000)
			.next()
			.fadeIn(1000)
			.end()
			.appendTo('#slideshow');
	}, 10000);

});

// timer for meditate tab
var playEl = $("#play");
var pauseEl = $("#pause");
var stopEl = $("#stop");
var minutesEl = $("#minutes");
var secondsEl = $("#seconds");
var inputMin = $("#input-minutes");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var music = new Audio("./images/meditate.mp3");

function getFormattedMinutes() {

	var secondsLeft = totalSeconds - secondsElapsed;

	var minutesLeft = Math.floor(secondsLeft / 60);

	var formattedMinutes;

	if (minutesLeft < 10) {
		formattedMinutes = "0" + minutesLeft;
	} else {
		formattedMinutes = minutesLeft;
	}

	return formattedMinutes;
}


function getFormattedSeconds() {
	var secondsLeft = (totalSeconds - secondsElapsed) % 60;

	var formattedSeconds;

	if (secondsLeft < 10) {
		formattedSeconds = "0" + secondsLeft;
	} else {
		formattedSeconds = secondsLeft;
	}

	return formattedSeconds;
}

function setTime() {
	var minutes;

	inputMin.keypress(function () {
		minutes = inputMin.val();
		minutesEl.html(minutes);
		totalSeconds = minutes * 60;
		console.log(totalSeconds); //test
	});

	clearInterval(interval);

}

function renderTime() {
	minutesEl.html(getFormattedMinutes());
	secondsEl.html(getFormattedSeconds());
}

function pauseTimer() {
	clearInterval(interval);
	renderTime();
}

function stopTimer() {
	secondsElapsed = 0;
	setTime();
	renderTime();
}

playEl.on("click", function () {
	setTime();

	// start music

	music.play();

	// we only want to start the timer if minutes is > 0
	if (totalSeconds > 0) {
		interval = setInterval(function () {
			secondsElapsed++;
			//So renderTime() is called here once every second.
			renderTime();
		}, 1000);

	}
});

pauseEl.on("click", function () {
	pauseTimer();
	music.pause();
});

stopEl.on("click", function () {
	stopTimer();
});

// Adding function to get Dad Joke

const jokeEl = document.getElementById('generated_content');
const get_joke = document.getElementById('get_joke');

get_joke.addEventListener('click', function () {
	
	$("#generated_content").show();
	$("#container").hide();
	$("#slideshow").hide();
	$("#image").hide();

	generateJoke();

});

//generateJoke();

async function generateJoke() {
	// call icanhasdadjoke API
	var jokeDiv = $("<div>");

	const jokeRes = await fetch('https://icanhazdadjoke.com/', {
		headers: {
			'Accept': 'application/json'
		}

	});

	const joke = await jokeRes.json();
	jokeDiv.empty().append(joke.joke);
	console.log(joke);
	//set the new joke
	jokeEl.innerHTML = joke.joke;

}
// Adding function to get Random Photo
var getPhotoEl = document.getElementById("get_photo");

getPhotoEl.addEventListener('click', function () {
	$("#image").show();
	$("#generated_content").hide();
	$("#container").hide();
	$("#slideshow").hide();

	getPhoto();

});

function getPhoto() {
	
	var unsplash = "https://source.unsplash.com/collection/209138/1600x900";

	$("#image").attr("src", unsplash);


}