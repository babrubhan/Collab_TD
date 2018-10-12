function add (a, b) {
	return a + b; 
}

function substract (a, b) {
	return a - b; 
}

function divide (a, b) {
	if(b === 0){
		$('#validation').text('Attempt to divide by zero');
		return "error";
	}
	return a / b;
}

function multiply (a, b) {
	return a * b;
}

function notSupported () {
	$('#validation').text("un-supported operation");
	return "error";
}

function validate_input (number) {
	var is_valid = true;
	number =  number.toString().trim();
	if(number.length == 0){
		$('#validation').text("Blank input found");
		is_valid = false;
	}
	else if(!/^\d+$/.test(number)){
		$('#validation').text("Invalid input ("+ number+")");
		is_valid = false;
	}
	
	return is_valid;		
}

function calculate (a, b, op) {
	if(!validate_input(a))
		return;
	if(!validate_input(b))
		return;
	a = parseInt(a);
	b = parseInt(b);
	switch(op){
		case "+":
			return add(a,b);
			break;
		case "-":
			return substract(a,b);
			break;
		case "*":
			return multiply(a,b);
			break;
		case "/":
			return divide(a,b);
			break;
		default:
			return notSupported();
			break;
	}
}