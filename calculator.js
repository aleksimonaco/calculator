var source = $("#button-template").html();
var template = Handlebars.compile(source);

var data = {
	buttons: [ {
		leftButton: 7,
		centerButton: 8,
		rightButton: 9
	}, {
		leftButton: 4,
		centerButton: 5,
		rightButton: 6
	}, {
		leftButton: 1,
		centerButton: 2,
		rightButton: 3
	}, {
		leftButton: ".",
		centerButton: 0,
		rightButton: "-"
	}
	]
};

$('.numberbuttons').append(template(data));

//Click functions for the numberpad (only the numbers)
$("#button1, #button2, #button3, #button4, #button5, #button6, #button7, #button8, #button9, #button0").click(function() {
	if($("#progress").val() == 0){
		$("#progress").val($(this).val());
	}else{
		$("#progress").val($("#progress").val() + $(this).val());
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

//Hover effect for github logo
$("#github").hover(function(){
	$(this).attr("src", "img/GitHub-Mark-Light-32px.png")
}, function(){
	 $(this).attr("src", "img/GitHub-Mark-32px.png")
});