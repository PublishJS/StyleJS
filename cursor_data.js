var first_line_pos = -1;
var second_line_pos = -1;

function cursor_init() {
  var current_pos = getSelectionCoords().y;
  if (current_pos>first_line_pos && second_line_pos==-1 && first_line_pos!=-1){
    second_line_pos = current_pos;
  }
  if (first_line_pos==-1){
    first_line_pos = current_pos;
  }
}

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
  var line_space = second_line_pos - first_line_pos;
  var current_line = (y_pos - first_line_pos)/(second_line_pos - first_line_pos)+1;
  if (y_pos==first_line_pos) {
    current_line=1;
  }
  return current_line;
} 

function showSelection(){
  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  return range;
}

function changeSelection(current_line,instring,x_spaces_size,focus_offset,range) {
  var x_pos = focus_offset - x_spaces_size;  
  range.deleteContents();
  var instring_size = instring.length;
  range.insertNode(document.createTextNode(instring.substr(x_pos,instring_size-x_pos)));  
}