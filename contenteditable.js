function listOfRecomendations(instring_sp,left_menu_pos,top_menu_pos,current_line,selection,range){
    var out_value = "";
    var instring = $.trim(instring_sp);
    var x_pos = instring_sp.indexOf(instring);
    $("#selection_menu").dialog({modal: true,
                                position: [left_menu_pos+10,top_menu_pos+30]});   
    var list_of_recs = recomendation_list(instring);
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
      out_value = this.id;
      $("#selection_menu").dialog("close");
      changeSelection(current_line,out_value,x_pos,selection,range);
    });
}
 
    $(document).ready(function(){
      var instring;
      var selection;

      $("#enter_field").keydown(function(e){ // getting keydown to see if special keys are selected 
        var code = (e.keyCode ? e.keyCode : e.which);
        cursor_init();
        if (code==9){
          instring = $("#enter_field").html();
          var selection = window.getSelection(); 
          var range = showSelection();
          var instring_data = showSelection().startContainer.data;
          var current_line = getCurrentLine();
          listOfRecomendations(instring_data,e.target.offsetLeft,e.target.offsetTop,current_line,selection.focusOffset,range);          
        }
      }); 
    });  
