var first_line_pos = -1;
var second_line_pos = -1;

function getSelectionCoords() {
    var sel = document.selection, range;
    var x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                var rect = range.getClientRects()[0];
                x = rect.left;
                y = rect.top;
            }
        }
    }
    return { x: x, y: y };
} 

function getCurrentLine(){
  var y_pos = getSelectionCoords().y; 
  console.log("ypos",y_pos); 
  var line_space = second_line_pos - first_line_pos;
  console.log("space",line_space);
  var current_line = (y_pos - first_line_pos)/(second_line_pos - first_line_pos)+1;
  if (y_pos==first_line_pos) {
    current_line=1;
  }
  console.log("current_line",current_line);
  return current_line;
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
    console.log(current_line);
    instring = text_in_divs[current_line-1];
    console.log(text_in_divs);
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

      $("#enter_field").keydown(function(e){ // getting keydown to see if special keys are selected 
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code && first_line_pos!=-1 && second_line_pos==-1){
          var current_pos = getSelectionCoords().y;
          if (current_pos>first_line_pos){
            second_line_pos = current_pos;
          }
        }
        if (code && first_line_pos==-1){
          first_line_pos = getSelectionCoords().y;
        }

        if (code==9){
          instring = $("#enter_field").html();
          var selection = window.getSelection(); 
          var all_strings = leftRightAndRecomString(selection.anchorOffset);
          listOfRecomendations(all_strings[1],e.target.offsetLeft,e.target.offsetTop,all_strings[0],all_strings[2],all_strings[3]);
        }
      }); 
    });  
