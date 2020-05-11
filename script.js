// Time and Date, Moment.js
$("#day-of-week").html(moment().format("dddd, MMMM Do YYYY"));

var CurrentDay = moment().format("dddd");

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

//Generator for both Animal Giphies and Memes
$("button").on("click", function () {
	var meme = $(this).attr("data-meme");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		meme + "&api_key=0BC3uC9rF7GCxcza8JnE4FIKwcXEoS0V";

	$.ajax({
		url: queryURL,
		method: "GET"

	}).then(function (response) {

		var results = response.data;

		var memeDiv = $("<div>");

		var shuffledlist = shuffle(results)

		for (var i = 0; i < 5; i++) {

			var memeImage = $("<img>");
			memeImage.attr("src", shuffledlist[i].images.fixed_height.url);

			memeDiv.append(memeImage);

		}
		$("#generated_content").html(memeDiv);


	});

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
});