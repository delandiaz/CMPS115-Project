var result;
var num_people;
var ven_names;
var url;

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
	//even_url();
	alert("The cost per person is $" + result);
	return false;
}


function custom_url(){
  url = "https://venmo.com/";
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

function even_url(){
  var itor = num_people;
  
  url = "https://venmo.com/";
  var helper = "?txn=charge&recipients=";
  var helper2 = "&amount=";
  var helper3 = "&note=";
  //var user_name = document.getElementById("venmo_id").value;
  var comments = document.getElementById("comment_id").value;
  comments = comments.trim();
  url += helper;
  while(itor > 0){
	var grabbed_name = document.getElementById("ven_user" + itor).value;
	if(itor != 1){
		url += grabbed_name + "%2C";
	}else{
		url += grabbed_name;
	}
	itor--;
  }
  url += helper2 + result;
  if(comments == null || comments == "")
  {
	//url += user_name + helper + result;
  }
  else
  {
	var comments2 = comments.split(' ').join('+');
  //alert(user_name);
  //url += user_name + helper + result;
	url += helper3 + comments2;
   }
  return url;
  //return false;
    
}

function hooray()
{
	var itor = num_people;
	while(itor > 0){
		var grab_names = document.getElementById("ven_user" + itor).value;
		alert(grab_names);
		itor = itor -1;
	}
	return false;
}

function create_form(){
	// Find a <table> element with id="myTable":
	var table = document.getElementById("CustomTable");
	var rowCount = CustomTable.rows.length;
	//Makes sure the table is empty
	for (var x=rowCount-1; x>=0; x--) {
	   table.deleteRow(x);
	}
	var i = 0;
	//Creates each row for form
	for(var i=0; i<num_people; i++){
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var i_itor = i+1;
		var cell2 = row.insertCell(1);
		ven_names = document.createElement("input");
		ven_names.setAttribute('type',"text");
		ven_names.setAttribute('id',"ven_user" + i_itor);
		ven_names.setAttribute('value',"");
		ven_names.setAttribute('style', 'color: black;');
		cell1.appendChild(ven_names);
		cell2.innerHTML = result;
	}
	//Creates confirmation area for end of form
	var row = table.insertRow(num_people);
	row.style = "text-align: center;"
	row.innerHTML = "Does this look correct to you?";
	var row = table.insertRow(num_people+1);
	var btn = document.createElement("BUTTON");
	btn.setAttribute('style', 'color: black;');
	btn.setAttribute('type','button');
	row.setAttribute('align', 'center');
	btn.setAttribute('onClick',"window.open(even_url(), 'new_window')");
	btn.innerHTML = "Yes";
	row.appendChild(btn);
}


