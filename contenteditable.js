    var ctrl_pressed=false; 
    var alt_pressed = false;
    var cmd_pressed = false;

    function removeElement(instring,in_pos){ 
      var size = instring.length;
      return instring.substr(0,in_pos)+instring.substr(in_pos+1,size);
    };

    function enterElement(instring,in_pos,inchar){ // should work as insert even when clicking on random word but doesn't always :(
      var size = instring.length;
      return instring.substr(0,in_pos-1)+inchar+instring.substr(in_pos-1,size);
    };

    function splitElements(instring){ //split on the space or newline character
      var elements = instring.split(/\r\n|\r|\n|\ /);
      return elements; 

    };

    $(document).ready(function(){
      var written_value="";
      var char_position=0;
      $("#enter_field").click(function(e){
        if (written_value==""){
          char_position=0;
        } else {
          var selection = window.getSelection();          
          char_position = selection.focusOffset; // getting character position when doing a mouseclick
        }
      });

      $("#enter_field").keydown(function(e){ // getting keydown to see if special keys are selected 
        var code = (e.keyCode ? e.keyCode : e.which);
        switch(code){
          case 17: //ctrl
            ctrl_pressed=true;
            break;
          case 18: //alt
            alt_pressed=true;
            break;
          case 91: // cmd
            cmd_pressed=true;
        }
        // check control keys
      });

      $("#enter_field").keyup(function(e){        
        $("#position_value").html(char_position);        
        var code = (e.keyCode ? e.keyCode : e.which);
        switch(code){
          case 9: // tab
            break;
          // moving with arrow keys
          case 37: // left
            char_position-=1; 
            break;
          case 38: // up
            char_position=0;
            break;
          case 39: // right
            char_position+=1;
            break;
          case 40: //down
            char_position=written_value.length; // doesn't move the cursor to the start
            //$("#enter_field").focus();
            //$("#enter_field")[0].setSelectionRange(0,0);
            // move cursor to start!!!!
            break;
          case 8: //backspace -- you know ... deleting
            char_position-=1;
            written_value = removeElement(written_value,char_position);           
            break;
          default: // just regular text - need to correct some characters though 
            char_position+=1;
            written_value=enterElement(written_value,char_position,String.fromCharCode(code)); 
        }
        var list_of_values = splitElements(written_value); // splitting entered values 
        $("#recomended_value").text(list_of_values); // shows typedin words separated with commas
        })
    }); 
