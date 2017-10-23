
// Adding steps
let step = 1
$('#step').on('click',function(element) {
	element.preventDefault();
	$(this).before("<fieldset class='form-group'><label>Step " + step + "</label><input class = 'form-control'></input></fieldset>");
	step +=1
	/* Act on the event */
});

let ingredient = 1
$('#ingredient').on('click',function(element) {
	element.preventDefault();
	$(this).before("<fieldset class='form-group'><label>Ingredient " + ingredient + "</label><input class = 'form-control'></input></fieldset>");
	ingredient +=1
	/* Act on the event */
});
