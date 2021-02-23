var JSON_data;

var event_styles = {
    "CTEG Seminar": {
        "bg":"#90A9B7",
        "text":"white"
    },
    "PopGen JC":{
        "bg":"#DDE8B9",
        "text":"black"
    },
    "CCB Seminar":{
        "bg":"#CB8589",
        "text":"white"
    },
    "default":{
        "bg":"#505168",
        "text":"black"
    }
};


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

	function draw_announce(announce_array){ 
		
		let main_div = document.getElementById("announcements");
		
		for (let i = 0; i < announce_array.length; i++){
			var temp = document.getElementById("announce_template");
			var clon = temp.content.cloneNode(true);
			let currdata = announce_array[i];
            clon.getElementById("event_text").innerHTML=currdata.TEXT;
		    main_div.appendChild(clon);
        }
            
    }

	function draw_events(events_array){ 
		
		let main_div = document.getElementById("events");
		main_div.innerHTML=""; 
		let row_div = document.createElement("div");
		row_div.className="row";	
		main_div.appendChild(row_div);
		
		for (let i = 0; i < events_array.length; i++){
			
			var temp = document.getElementById("event_template");
            
			var clon = temp.content.cloneNode(true);
			let currdata = events_array[i];
		    
			let curr_div = clon.getElementById("CARDHEADER");
            
            var bg_col = event_styles['default']['bg'];
            var text_col = event_styles['default']['text'];

            if (currdata.EVENT_TYPE in event_styles){
                bg_col = event_styles[currdata.EVENT_TYPE]["bg"];
                text_col = event_styles[currdata.EVENT_TYPE]["text"];
            }
            curr_div.style.backgroundColor = bg_col;
            curr_div.style.color = text_col;

			curr_div = clon.getElementById("EVENT");
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
    
    $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1Yo-gy-0JnUJRtg0uK8RUg6uv32vcrB0LSndlhTkDMXc/values/Events?key=AIzaSyCdZChtatuP0KOBYfHOtZiuHh4VVG3JyHs', function(data)   {
        event_list = get_data_array(data).sort(date_compare);
		if ( (document.location.pathname === "/") || (document.URL.includes("index.html")) ) {
			let d = new Date();
			let i = 0;
			let event_date = new Date(event_list[i].DATE);
		    event_date.setHours(22); 
			while ((i<event_list.length-1) && (d > event_date)){
				i++;
				event_date = new Date(event_list[i].DATE);
		        event_date.setHours(22); 
			}
			draw_events(event_list.slice(i,i+1));
		}else if ( document.URL.includes("events.html") ) {
			draw_events(event_list.sort(date_compare));
		}
    });
	
    $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1Yo-gy-0JnUJRtg0uK8RUg6uv32vcrB0LSndlhTkDMXc/values/Announcements?key=AIzaSyCdZChtatuP0KOBYfHOtZiuHh4VVG3JyHs', function(data)   {
        announce_list = get_data_array(data);
		if ( (document.location.pathname === "/") || (document.URL.includes("index.html")) ) {
			draw_announce(announce_list);
        }
    });

    
   	
  });
})(jQuery);


