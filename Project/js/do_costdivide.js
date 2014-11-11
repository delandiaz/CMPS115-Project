var result;


function do_costdivide() 
{
	//var len = document.costdivideform.
	var num_people = parseInt(document.costdivideform.num_people.value);
	if(isNaN(num_people) || num_people <= 0){
		alert("Please enter a valid amount of people");
		return false;
	}
	var total_cost = parseInt(document.costdivideform.total_cost.value);
	if(isNaN(total_cost) || total_cost <= 0){
		alert("Please enter a valid total cost");
		return false;
	}
	result = (total_cost/num_people).toFixed(2);
	alert("The cost per person is $" + result);
	return false;
}


function do_test()
{
	alert("This is a test");
	return false;
}