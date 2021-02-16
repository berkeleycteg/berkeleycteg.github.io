var JSON_data;
var recipe_list;
var recipe_tags;

function get_data_array(data){
    
    var data_array = [];
   
    var headers = [];
    for (let i = 0; i<data.values[0].length; i++){
       headers.push(data.values[0][i]);
    }

    for (let i = 1; i < data.values.length; i++){
        let datum = Object();
        for (let j=0; j <data.values[0].length; j++){
            datum[headers[j]] = data.values[i][j];
        }
        data_array.push(datum);
    }
	return data_array;
			
}

function date_compare(r1,r2) {
  let a = new Date(r1.DATE);
  let b = new Date(r2.DATE);
  if (a > b)
    return 1;
  if (a < b)
    return -1;
  return 0;
}

(function ($) {
  $(document).ready(function(){

	function draw_events(events_array){ 
		
		let main_div = document.getElementById("events");
		main_div.innerHTML=""; 
		let row_div = document.createElement("div");
		row_div.className="row";	
		main_div.appendChild(row_div);
		
		for (let i = 0; i < events_array.length; i++){
			
			var temp = document.getElementsByTagName("template")[0];
			var clon = temp.content.cloneNode(true);
			let currdata = events_array[i];
			
			let curr_div = clon.getElementById("EVENT");
			curr_div.innerHTML=currdata.EVENT_TYPE;

			curr_div = clon.getElementById("DATE");
			curr_div.innerHTML=currdata.DATE;
			
			curr_div = clon.getElementById("SPEAKER");
			curr_div.innerHTML=currdata.SPEAKER;
			
			curr_div = clon.getElementById("TITLE");
			curr_div.innerHTML=currdata.TITLE;
			
			curr_div = clon.getElementById("abstract_ID");
			curr_div.innerHTML=currdata.ABSTRACT;
			curr_div.id = currdata.ID;
			
			curr_div = clon.getElementById("abstract_button");
			let newid = "#" + currdata.ID;
			curr_div.dataset.target = newid;
			
			row_div.appendChild(clon);
			row_div.append(document.createElement("br"));
		}
		
		$(function () {
		  $('[data-toggle="popover"]').popover()
		})
	}
    
    //$.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1VvaXyDbPiswnC1V49Y92jM4XcpDsJtQkWSGsmZ-82Sk/values/cooking?key=AIzaSyAfRXwQu3DM67Nh5GZm6-lD1W-bq79hvIQ', function(data)   {
    $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1Yo-gy-0JnUJRtg0uK8RUg6uv32vcrB0LSndlhTkDMXc/values/Events?key=AIzaSyCdZChtatuP0KOBYfHOtZiuHh4VVG3JyHs', function(data)   {
        event_list = get_data_array(data).sort(date_compare);
		
		if ( document.URL.includes("index.html") ) {
			let d = new Date();
			let i = 0;
			let event_date = new Date(event_list[i].DATE);
			
			while ((i<event_list.length-1)&&(d > event_date)){
				i++;
				event_date = new Date(event_list[i].DATE);
			}
			draw_events(event_list.slice(i,i+1));
		}else if ( document.URL.includes("events.html") ) {
			draw_events(event_list.sort(date_compare));
		}
    });
	

    
   	
  });
})(jQuery);


