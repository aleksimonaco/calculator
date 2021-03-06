/*=================================
Navigation
===================================*/

$(document).ready(function() {

	//For dragend
	$("#container").dragend();
	animateSwipeIcon("#angleRight");
	animateSwipeIcon("#angleLeft");

/*=================================
Handlebar template
===================================*/


var source = $("#button-template").html();
var template = Handlebars.compile(source);

var data = {
	buttons: [ {
		leftButton: 7,
		centerButton: 8,
		rightButton: 9,
		calculationButton: " + ",
		emptyButton: "C"
	}, {
		leftButton: 4,
		centerButton: 5,
		rightButton: 6,
		calculationButton: " - ",
		specialButton: " √"
	}, {
		leftButton: 1,
		centerButton: 2,
		rightButton: 3,
		calculationButton: " * ",
		specialButton: "2"
	}, {
		leftButton: ".",
		leftButtonString: "dot",
		centerButton: 0,
		rightButton: "-",
		rightButtonString: "slash",
		calculationButton: " / ",
		calculateButton: "="
	}
	]
};

var responsiveData = {
	buttons: [{
		basicCalculationButton: " + ",
		basicSecondCalculationButton: " * ",
		specialButton : "√",
		emptyButton: "C"
	}, {
		basicCalculationButton: " - ",
		basicSecondCalculationButton: " / ",
		specialButton : "2",
		calculateButton: "="
	}
	]
};

//Add the buttons the div with class numberbuttons
$('.numberbuttons').append(template(data));

//Initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

/*=======================================
Handlebar template for responsive buttons
========================================*/

var sourceUpperResponsive = $("#upper-responsive-button-template").html();
var templateUpperResponsive = Handlebars.compile(sourceUpperResponsive);

var sourceLowerResponsive = $("#lower-responsive-button-template").html();
var templateLowerResponsive = Handlebars.compile(sourceLowerResponsive);

$('.numberbuttons').append(templateUpperResponsive(data));
$('.numberbuttons').append(templateLowerResponsive(responsiveData));

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key > 47 && key < 58) { //numbers from 0 - 9
   		addNumberToProgress(String.fromCharCode(key));
   }
}

function addNumberToProgress(number) {
	var progress = $("#progress").val();

	if (parseInt(progress) === 0 && progress.indexOf(".") === -1) {
		$("#progress").val(number);
	} else {
		$("#progress").val(progress + number);
	}
}

/*===============================
Calculator button click functions
=================================*/

//Store last made calculation
var lastMadeOperation = "";

//Click functions for the numberpad (only the numbers)
$(".numberbutton").click(function() {
	var progress = $("#progress").val();

	if (parseInt(progress) === 0 && progress.indexOf(".") === -1) {
		$("#progress").val($(this).val());
	} else {
		$("#progress").val(progress + $(this).val());
	}
});

//Click function for the negative button (-)
$(".buttonslash").click(function() {
	if ($("#progress").val() !== 0) {
		if ($("#progress").val().charAt(0) === "-") {
			$("#progress").val($("#progress").val().substr(1));
		} else {
			$("#progress").val("-" + $("#progress").val());
		}
	}
})

//Click function for the dot button (.)
$(".buttondot").click(function() {
	if ($("#progress").val().indexOf(".") === -1) {
		$("#progress").val($("#progress").val() + $(this).val());
	}
});

//Click functions for the logical operator buttons
$(".calculationButton").click(function() {

	//If number ends with a dot (.), add two zeros to the end
	if ($("#progress").val().substr($("#progress").val().length - 1) == ".") {
		$("#progress").val($("#progress").val() + "00");
	}

	//If there's already a calculation made
	if ($("#result").is(":empty")) {
		$("#result").prepend($("#progress").val() + $(this).val());
	} else {
		var previousResult = parseFloat($("#result").html());
		var progress = parseFloat($("#progress").val());
		var result = performCalculation(previousResult, progress, $(this).val().trim());

		lastMadeOperation = $(this).val().trim();

		$("#result").html(result);
		flashResultAfterCalculation();
	}

	$("#progress").val(0);
});

//When the "C" is clicked
$(".C").click(function() {
	$("#progress").val(0);
});
$(".C").dblclick(function() {
	$("#result").html('');
});

//When the square root and exponent buttons are pressed
$(".specialButton").click(function() {

	if($("#result").html() !== "") {
		if (parseInt($(this).val()) === 2) {
			$("#result").html(Math.pow(parseFloat($("#result").html()), 2));
		} else {
			if (parseFloat($("#result").html()) > 0) {
				$("#result").html(Math.sqrt(parseFloat($("#result").html()), 2));
			}
		}

		flashResultAfterCalculation();
	};
});

//Click function for "=" button
$(".calculateButton").click(function() {
	if($("#result").is(":empty")) {
		
	} else {

		var resultStart = $("#result").html().split(" "),
			firstNumber,
			secondNumber,
			operator,
			progress = $("#progress").val();

		if (lastMadeOperation == "") {
			//Get the two numbers and them as float
			firstNumber = parseFloat(resultStart[0]);
			secondNumber = parseFloat(progress);

			//Which operator, + - * /
			operator = resultStart[1];
			lastMadeOperation = operator;
		} else {
			firstNumber = parseFloat($("#result").html());
			secondNumber = parseFloat(progress);
			operator = lastMadeOperation;
		}

		var result = performCalculation(firstNumber, secondNumber, operator);

		$("#result").html(result);

		$("#progress").val(0);
		flashResultAfterCalculation();
	}
});

});

/*====================================
Functions TODO: QUnit tests
======================================*/

function performCalculation(firstNumber, secondNumber, operator) {
	var result;

	if (operator === "+") {
			result = firstNumber + secondNumber;
		} else if (operator === "-") {
			result = firstNumber - secondNumber;
		} else if (operator === "*") {
			result = firstNumber * secondNumber;
		} else if (operator === "/") {
			result = firstNumber / secondNumber;
		} else {
			console.log("Unknown operator");
			result = "Unknown";
		}

	return result;
}

function flashResultAfterCalculation() {
	$("#result").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animateSwipeIcon(direction) {
	 $(direction).animate({
		"marginLeft": "+=40px"
		}, 1000, function() {
		$(this).animate({
			"marginLeft": "-=40px"
		}, 1000, function() {
			setInterval(animateSwipeIcon(direction), 2000);
		});
	});
}