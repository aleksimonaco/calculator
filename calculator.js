/*=================================
Navigation
===================================*/

$(document).ready(function(){
	$("#about").hide();
});

$("#calculatorLink").click(function(){
	$("#about").fadeOut(500, function(){
		$("#calculator").fadeIn(500);
	});
});

$("#aboutLink").click(function(){
	$("#calculator").fadeOut(500, function(){
		$("#about").fadeIn(500);
	});
});

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
		calculationButton: " / ",
		calculateButton: "="
	}
	]
};

//Add the buttons the div with class numberbuttons
$('.numberbuttons').append(template(data));

/*=================================
Calculator button click functions
===================================*/

//Store last made calculation
var lastMadeOperation = "";

//Click functions for the numberpad (only the numbers)
$("#button1, #button2, #button3, #button4, #button5, #button6, #button7, #button8, #button9, #button0").click(function() {

	var progress = $("#progress").val();

	if(progress == 0 && progress.indexOf(".") == -1){
		$("#progress").val($(this).val());
	}else{
		$("#progress").val(progress + $(this).val());
	}
});

//Click function for the negative button (-)
$("#button-").click(function(){
	if($("#progress").val() != 0){
		if($("#progress").val().charAt(0) == "-"){
			$("#progress").val($("#progress").val().substr(1));
		}else{
			$("#progress").val("-" + $("#progress").val());
		}
	}
})

//Click function for the dot button (.)
$("#buttondot").click(function(){
	if($("#progress").val().indexOf(".") == -1){
		$("#progress").val($("#progress").val() + $(this).val());
	}
});

//Click functions for the logical operator buttons
$(".calculationButton").click(function(){

	//If number ends with a dot (.), add two zeros to the end
	if($("#progress").val().substr($("#progress").val().length - 1) == "."){
		$("#progress").val($("#progress").val() + "00");
	}

	//If there's already a calculation made
	if($("#result").is(":empty")){
		$("#result").prepend($("#progress").val() + $(this).val());
	}else{
		var previousResult = parseFloat($("#result").html());
		var progress = parseFloat($("#progress").val());
		var result = performCalculation(previousResult, progress, $(this).val().trim());

		lastMadeOperation = $(this).val().trim();

		$("#result").html(result);
		$("#result").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	}

	$("#progress").val(0);
});

//When the "C" is pressed
$("#C").click(function(){
	$("#progress").val(0);
});

//When the square root and exponent buttons are pressed
$(".specialButton").click(function(){
	if($("#result").html() != ""){
		if($(this).val() == 2){
			$("#result").html(Math.pow(parseFloat($("#result").html()), 2));
		}else{
			$("#result").html(Math.sqrt(parseFloat($("#result").html()), 2));
		}

		$("#result").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	};
});

//Click function for "=" button
$("#calculateButton").click(function(){
	if($("#result").is(":empty")){
		
	}else{

		var resultStart = $("#result").html().split(" ");

		var firstNumber;
		var secondNumber;
		var operator;

		if(lastMadeOperation == ""){
			//Get the two numbers and them as float
			firstNumber = parseFloat(resultStart[0]);
			secondNumber = parseFloat($("#progress").val());

			//Which operator, + - * /
			operator = resultStart[1];
			lastMadeOperation = operator;
		}else{
			firstNumber = parseFloat($("#result").html());
			secondNumber = parseFloat($("#progress").val());
			operator = lastMadeOperation;
		}

		var result = performCalculation(firstNumber, secondNumber, operator);

		$("#result").html(result);

		$("#progress").val(0);
		$("#result").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	}
});

/*=================================
Calculation function TODO: QUnit tests
===================================*/

function performCalculation(firstNumber, secondNumber, operator){
	var result;

	if(operator == "+"){
			result = firstNumber + secondNumber;
		}else if(operator == "-"){
			result = firstNumber - secondNumber;
		}else if(operator == "*"){
			result = firstNumber * secondNumber;
		}else if(operator == "/"){
			result = firstNumber / secondNumber;
		}else{
			console.log("Unknown operator");
			result = "Unknown";
		}

	return result;
}

/*=================================
Hover function for GitHub logo
===================================*/

//Hover effect for github logo
$("#github").hover(function(){
	$(this).attr("src", "img/GitHub-Mark-Light-32px.png")
}, function(){
	 $(this).attr("src", "img/GitHub-Mark-32px.png")
});