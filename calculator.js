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

$("#1, #2, #3, #4, #5, #6, #7, #8, #9, #0").click(function() {
	if($("#progress").val() == 0){
		$("#progress").val($(this).val());
	}else{
		$("#progress").val($("#progress").val() + $(this).val());
	}
});