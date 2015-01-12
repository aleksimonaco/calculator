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
	}
	]
};

$('.numberbuttons').append(template(data));