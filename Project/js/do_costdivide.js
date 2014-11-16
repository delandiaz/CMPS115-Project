var result;
var num_people;

function do_costdivide() 
{
	
	num_people = parseInt(document.costdivideform.num_people.value);
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
	create_form();
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

function create_form(){
	var table = document.getElementById("CustomTable");
	var rowCount = CustomTable.rows.length;
	//Makes sure the table is empty
	for (var x=rowCount-1; x>=0; x--) {
	   table.deleteRow(x);
	}
	var i = 0;
	for(var i=0; i<num_people; i++){
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var i_itor = i+1;
		var cell2 = row.insertCell(1);
		cell1.innerHTML = "Person " + i_itor;
		cell2.innerHTML = result;
	}
	var row = table.insertRow(num_people);
	row.style = "text-align: center;"
	row.innerHTML = "Does this look correct to you?";
	var row = table.insertRow(num_people+1);
	var btn = document.createElement("BUTTON");
	btn.setAttribute('style', 'color: black;');
	btn.setAttribute('type','button');
	row.setAttribute('align', 'center');
	btn.setAttribute('onClick','hooray()');
	btn.innerHTML = "Yes";
	row.appendChild(btn);
}

function hooray()
{
	alert("Yay!! It was a success!!!!");
	return false;
}
