function getCurrentLine(){
  var all_the_lines = $("#enter_field").html().replace(/<\/div>/g,"").replace(/&nbsp;/g,"").split("<div>");
  var selection = window.getSelection();
  console.log(all_the_lines);
  var current_line = 1;
  for (i=0;i<all_the_lines.length;i++){
    current_line+=1;
    if($.trim(selection.focusNode.nodeValue)==$.trim(all_the_lines[i])){
      i=all_the_lines.length;
    }
  }
  return current_line-1;
}


function leftRightAndRecomString(line_pos){
  var recom_string_spaces_cnt=0;
  var current_line = getCurrentLine();
  var selection = window.getSelection(); 
  var all_strings = $("#enter_field").html();
  var instring = all_strings.replace(/&nbsp;/g," ");
  var text_in_divs = instring.replace(/<\/div>/g,"").split(/<div>/g);
  var no_of_lines = text_in_divs.length;
  if (current_line>1) {
    instring = text_in_divs[current_line-1];
    recom_string_spaces_cnt = instring.split(/ /g).length-1;
    console.log(">>",instring.split(/ /g).length-1);
  }
  var size_of_text = instring.length;
  // obdelaj le trenutno vrstico, kot eno vrstico ... na koncu dodaj levo (vrsitce prej) in desno (vrstice potem)
    var words = instring.split(/ /g);
    var i = line_pos;
    var word_cnt = 0;
    while (i>=0) {
      if (word_cnt<words.length) {
        i= i-words[word_cnt].length;
      } else {
        i=-1;
      }
      word_cnt+=1;              
    }
    var recom_string_pos = word_cnt-2;
    var recom_string = words[recom_string_pos];
    var left_string = "";

    if (no_of_lines>1){
      var j=0;
      left_string = "<div>";
      while(j<current_line-1){
        left_string+=text_in_divs[j].replace(/ /g,"&nbsp;")+"&nbsp;";
        j+=1;
      }
      left_string+="</div>";
    }
    var right_string = "";
    if (no_of_lines>1){
      right_string="<div>";
      var j=current_line;
      while(j<no_of_lines){
        console.log("right_divs",text_in_divs[j]);        
        right_string+=text_in_divs[j].replace(/ /g,"&nbsp;")+"&nbsp;";
        j+=1;
      }
      right_string+="</div>";
    }

  console.log("left",left_string);
  console.log("recom",recom_string);
  console.log("right",right_string);  
  return [left_string,recom_string,right_string,recom_string_spaces_cnt];
}

function listOfRecomendations(instring,left_menu_pos,top_menu_pos,left_string,right_string,recom_string_spaces_cnt){
    var out_value = "";
    $("#selection_menu").dialog({modal: true,
                                position: [left_menu_pos+10,top_menu_pos+30]});   
    var list_of_recs = recomendation_list(instring);
    console.log(list_of_recs);
    var html_string = "<ul id='lister'>";
    for (i=0;i<list_of_recs.length;i++){
       html_string += "<li id='"+list_of_recs[i]+"' >"+list_of_recs[i]+"</li>";
    }
    html_string += "</ul>";
    $("#list_menu").html(html_string);
    var prev_back_color = $("#lister li").css("background-color");
    $("#lister li").hover(
      function(){
        $(this).css('background-color','red');
      },
      function(){
        $(this).css('background-color',prev_back_color);
      });
    $("#lister li").click(function(e){
      out_value = Array(recom_string_spaces_cnt).join("&nbsp;")+this.id;
      $("#selection_menu").dialog("close");
       var out_string = left_string+out_value+right_string;
       $("#enter_field").html(out_string);      
      //return out_value;      
    });
}
 
    $(document).ready(function(){
      var instring;
      var selection;
      var Ypos;
      var line_flag = -1;
      $("#enter_field").keydown(function(e){ // getting keydown to see if special keys are selected 
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code && line_flag==-1){
          line_flag = window.event.srcElement.offsetHeight;
        }

        if (code==9){
          console.log("event",window.event);
          instring = $("#enter_field").html();
          var selection = window.getSelection(); 
          var all_strings = leftRightAndRecomString(selection.anchorOffset);
          listOfRecomendations(all_strings[1],e.target.offsetLeft,e.target.offsetTop,all_strings[0],all_strings[2],all_strings[3]);
        }
      }); 
    });  
