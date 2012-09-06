
function list_of_recomendations(instring,left_menu_pos,top_menu_pos,left_string,right_string){
    var out_value = "";
    $("#selection_menu").dialog({modal: true,
                                position: [left_menu_pos+10,top_menu_pos+30]});   
    var list_of_recs = recomendation_list(instring);
    console.log(list_of_recs);
    var html_string = "<ul id='lister'>";
    for (i=0;i<list_of_recs.length;i++){
       html_string += "<li id='"+list_of_recs[i]+"'>"+list_of_recs[i]+"</li>";
    }
    html_string += "</ul>";
    $("#list_menu").html(html_string);
    $("#lister li").click(function(e){
      out_value = this.id;
      console.log(out_value);
      $("#selection_menu").dialog("close");
       var out_string = left_string+out_value+right_string;
       $("#enter_field").html(out_string);      
      return out_value;      
    });
}



  function get_recomendation(in_pos,left_menu_pos,top_menu_pos){
     var instring = $("#enter_field").text();
     var instring_size = instring.length;
     if ((instring_size==in_pos)||(instring.substr(in_pos,1)==" ")) { // is it end of the string??
       var rec_string = instring.substr(0,in_pos);
       var reversed_string = rec_string.split("").reverse().join("");
       var end_rev_pos = reversed_string.indexOf(" ");
       if (end_rev_pos==-1) {
         end_rev_pos=instring_size;
       }
       console.log("space pos ",end_rev_pos);
       var text_size = instring.length;
       var tab_string = reversed_string.substr(0,end_rev_pos).split("").reverse().join(""); // string by cursor
       console.log("tab",tab_string);
       console.log("rec ",instring.substr(0,in_pos));
       // get recomendation on out_string and show it in menu
       var left_string = instring.substr(0,in_pos-tab_string.length);
       var right_string = instring.substr(in_pos,text_size-in_pos);
       var recomended_string = list_of_recomendations(tab_string,left_menu_pos,top_menu_pos,left_string,right_string);
     }
  }

    $(document).ready(function(){
      $("#enter_field").keydown(function(e){ // getting keydown to see if special keys are selected 
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code==9){
          var selection = window.getSelection(); 
          var end_pos = selection.focusOffset; 
          console.log(e.target.offsetLeft);
          get_recomendation(end_pos,e.target.offsetLeft,e.target.offsetTop);     // new written value          
        }
      }); 
    });  
