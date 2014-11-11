var result;


function do_costdivide() 
{
	var len = document.costdivideform.Field5.length;
	
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
	url();
	alert("The cost per person is $" + result);
	return false;
}


function url(){
  var url = "https://venmo.com/";
  var helper = "?txn=pay&amount=";
  var helper2 = "&note=";
  var user_name = document.getElementById("venmo_id").value;
  var comments = document.getElementById("comment_id").value;
  comments = comments.trim();
  if(comments == null || comments == "")
  {
	url += user_name + helper + result;
  }
  else
  {
	var comments2 = comments.split(' ').join('+');
  //alert(user_name);
  //url += user_name + helper + result;
	url += user_name + helper + result + helper2 + comments2;
   }
  alert(url);
  //return false;
    
}



function do_test()
{
	alert("This is a test");
	return false;
}