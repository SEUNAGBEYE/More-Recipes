
// Adding steps
let counter = 1
$('#step').on('click',function(element) {
	element.preventDefault();
	$(this).before("<fieldset class='form-group'><label>Step " + counter + "</label><input class = 'form-control'></input></fieldset>");
	counter +=1
	/* Act on the event */
});
