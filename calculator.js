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

	if($("#result").is(":empty")){
		$("#result").prepend($("#progress").val() + $(this).val());
	}else{
		
	}

	$("#progress").val(0);
});

//When the "C" is pressed
$("#C").click(function(){
	$("#progress").val(0);
});

//Click function for "=" button
$("#calculateButton").click(function(){
	if($("#result").is(":empty")){
		
	}else{

		var test = $("#result").html().split(" ");

		//Get the two numbers
		var firstNumber = parseInt(test[0]);
		var secondNumber = parseInt($("#progress").val());

		//Which operator, + - * /
		var operator = test[1];

		if(operator == "+"){
			var result = firstNumber + secondNumber;
			$("#result").html(result);
		}else if(operator == "-"){

		}else if(operator == "*"){

		}else if(operator == "/"){

		}else{
			console.log("Unknown operator");
		}

		$("#progress").val(0);
		$("#result").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	}
});

//Hover effect for github logo
$("#github").hover(function(){
	$(this).attr("src", "img/GitHub-Mark-Light-32px.png")
}, function(){
	 $(this).attr("src", "img/GitHub-Mark-32px.png")
});