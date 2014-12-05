/*
 * Authors: Delan Diaz, Muzammel Choudhery, Alex Sadeghi, Christian Lewcyzk
 * CMPS115 Team Skyy Project
 * Cost-Divider App
*/

//Global Variables
var result;
var num_people;
var total_cost;
var ven_names;
var url;

function do_costdivide() 
{
	num_people = parseInt(document.costdivideform.num_people.value);
	total_cost = parseInt(document.costdivideform.total_cost.value);
	if(isNaN(num_people) || num_people <= 1){
		alert("Please enter a valid amount of people");
		return false;
	}
	
	if(isNaN(total_cost) || total_cost <= 0){
		alert("Please enter a valid total cost");
		return false;
	}	
	if(document.cd_typeform.custom.checked) {
		create_form();
		return false;
	}		
	result = (total_cost/num_people).toFixed(2);
	create_form();
	//even_url();
	//alert("The cost per person is $" + result);
	return false;
}


function custom_url(){
  
  var comments = document.getElementById("comment_id").value;
  comments = comments.trim();
  
  var total_split = 0;
  var personal_split;
  var urls = [];
  var personal_splits = [];
  var user_names = [];
  var table = document.getElementById("LinksTable");
  var helper = "?txn=charge&amount=";
  var helper2 = "&note=";
	var rowCount = LinksTable.rows.length;
	//Makes sure the table is empty
	for (var x=rowCount-1; x>=0; x--) {
	   table.deleteRow(x);
	}
  
  for(var i = 1; i < num_people + 1; i++){
	url = "https://venmo.com/";
	
	var string = "cust_inputs" + i.toString();
	var percentage = (document.getElementById(string.toString()).value);
	if(isNaN(percentage) || percentage == 0){
		alert("Please enter valid values in the percent field");
		return;
	}
	total_split += Number(percentage);
	personal_split = (((percentage) / 100) * total_cost).toFixed(2);
	personal_splits[i - 1] = personal_split;
	var user_name = document.getElementById("ven_user" + i).value;
	if(user_name == "" || user_name == null){
		alert("Please enter a valid user name");
		return
	}
	user_names[i-1] = user_name;
	url += user_name + helper + personal_split;
	//alert(personal_split);
	
	if(comments == null || comments == ""){
	
	}else{
	   url += helper2 + comments;
	}
	//window.open(url, 'new_window')
	if(total_split > 100 || total_split <= 0){
		alert("Please enter valid total percentage (1-100%)" + total_split);
		return;
	}
	urls[i-1] = url;
	//alert(url);
	
  }
	for(var i=0; i<num_people;i++){
	var row = table.insertRow(0);
	var a = document.createElement('a');
	var linkText = document.createTextNode("" + user_names[i] + ", $" + personal_splits[i]);
	a.appendChild(linkText);
	a.setAttribute('title', "" + user_names[i] + ", $" + personal_splits[i]);
	a.setAttribute('href', "" + urls[i]);
	a.setAttribute('style', "color: #26ADE4; font-size: 16px");
	row.appendChild(a);
	}
  
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
	if(num_people > 25){
		alert("The maximum amount of people allowed is 25!");
		return;
	}
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
	//Conditions determines whether to print evenly or custom cells
		if(document.cd_typeform.evenly.checked){
			cell2.innerHTML = result;
		}
		else if(document.cd_typeform.custom.checked) {
		    var custom_inputs = document.createElement("input");
		    custom_inputs.setAttribute('type',"text");
		    custom_inputs.setAttribute('id',"cust_inputs" + i_itor);
		    custom_inputs.setAttribute('value',"");
		    custom_inputs.setAttribute('style', 'color: black; width: 30px;');
		    cell2.appendChild(custom_inputs);
		}
	//Inserts Headers/Titles for each column in custom form
		if(i == num_people - 1){
			var row_header = table.insertRow(0);
			var cell_header1 = row_header.insertCell(0);
			cell_header1.innerHTML = "Venmo Username";
			var cell_header2 = row_header.insertCell(1);
			if(document.cd_typeform.custom.checked){
				cell_header2.innerHTML = "&nbsp;&nbsp;%";
			}else if(document.cd_typeform.evenly.checked){
				cell_header2.innerHTML = "Amount";
			}
		}
	}
	//Creates confirmation area for end of form
	var row = table.insertRow(num_people+1);
	row.style = "vertical-align:bottom;text-align:center"
	row.innerHTML = "Verify the above information";
	var row_end = table.insertRow(num_people+2);
	var btn = document.createElement("BUTTON");
	btn.setAttribute('style', 'color: black;');
	btn.setAttribute('type','button');
	row.setAttribute('align', 'center');
	if(document.cd_typeform.custom.checked) {
		btn.setAttribute('onClick',"custom_url()");
	}else{
		btn.setAttribute('onClick',"window.open(even_url(), 'new_window')");
	}
	btn.innerHTML = "Confirm";
	row_end.style = "vertical-align:bottom;text-align:center;"
	row_end.appendChild(btn);
}



