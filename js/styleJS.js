$(document).ready(function() {

    var styleJS = function(){

        var dragDrop = {
            initialMouseX: undefined,
            initialMouseY: undefined,
            startX: undefined,
            startY: undefined,
            dXKeys: undefined,
            dYKeys: undefined,
            draggedObject: undefined,
            addEventSimple: function (obj,evt,fn) {
                if (obj.addEventListener)
                    obj.addEventListener(evt,fn,false);
                else if (obj.attachEvent)
                    obj.attachEvent('on'+evt,fn);
            },
            removeEventSimple: function (obj,evt,fn) {
                if (obj.removeEventListener)
                    obj.removeEventListener(evt,fn,false);
                else if (obj.detachEvent)
                    obj.detachEvent('on'+evt,fn);
            },
            initElement: function (element) {
                if (typeof element == 'string')
                    element = document.getElementById(element);
                //element.onmousedown = dragDrop.startDragMouse;
                dragDrop.addEventSimple(element,'mousedown',dragDrop.startDragMouse);
            },
            startDragMouse: function (e) {
                dragDrop.startDrag(this);
                var evt = e || window.event;
                dragDrop.initialMouseX = evt.clientX;
                dragDrop.initialMouseY = evt.clientY;
                dragDrop.addEventSimple(document,'mousemove',dragDrop.dragMouse);
                dragDrop.addEventSimple(document,'mouseup',dragDrop.releaseElement);
                return false;
            },
            startDrag: function (obj) {
                if (dragDrop.draggedObject)
                    dragDrop.releaseElement();
                dragDrop.startX = obj.offsetLeft;
                dragDrop.startY = obj.offsetTop;
                dragDrop.draggedObject = obj;
                obj.className += ' dragged';
            },
            dragMouse: function (e) {
                var evt = e || window.event;
                var dX = evt.clientX - dragDrop.initialMouseX;
                var dY = evt.clientY - dragDrop.initialMouseY;
                dragDrop.setPosition(dX,dY);
                return false;
            },
            setPosition: function (dx,dy) {
                dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
                dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
            },
            releaseElement: function() {
                dragDrop.removeEventSimple(document,'mousemove',dragDrop.dragMouse);
                dragDrop.removeEventSimple(document,'mouseup',dragDrop.releaseElement);
                dragDrop.draggedObject.className = dragDrop.draggedObject.className.replace(/dragged/,'');
                dragDrop.draggedObject = null;
            }
        };

        // Internal Hidden Variables
        var selected_item;  // Selected Item By Clicking an element
        var that = this;    // Helper variable for use in internal functions

        // Getting all possible CSS style attributes
        // dynamically.
        // TBD: for future use in autocompletition.
        //
        var css_style_attributes = [];
        var i; // index
        for (i in document.body.style) {
            if (document.body.style.hasOwnProperty(i)) {
                css_style_attributes.push(i);
            };
        };

        // static hardcoded possible fonts
        // TBD: dynamically find installed fonts
        // Problem would occur if the host computer does not
        // have the fonts installed.
        var hardcoded_font_families = ["cursive", "monospace", "serif", "sans-serif", "fantasy", "Arial", "Arial Black", "Comic Sans MS",
                                        "Courier", "Courier New", "Georgia", "Impact", "Times", "Times New Roman", "Trebuchet MS","Verdana",
                                        "Inconsolata", "Un Dotum"]; // this row are found in fonts.css

       var hardcoded_border_styles = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];

       var hiding_wrapper = function(action_trig, action_recieve) {
            //console.log("Activate click on: ", action_trig);
            //console.log("Activate click hidding: ", action_recieve);
            //console.log($(action_trig), $(action_recieve));
            $(action_trig).click(function(e) {
                    var temp_lookup = $(action_recieve);
                    if(temp_lookup.is(":hidden")) {
                        temp_lookup.slideDown("slow"); 
                    } else {
                        temp_lookup.hide();
                    }
            });
        };

       var toggle_visibility = function(element) {
            //console.log("Activate click on: ", action_trig);
            //console.log("Activate click hidding: ", action_recieve);
            //console.log($(action_trig), $(action_recieve));
            var temp_lookup = $(element);
            if(temp_lookup.is(":hidden")) {
                temp_lookup.slideDown("slow"); 
            } else {
                temp_lookup.hide();
            }
        };


        var from_array_to_select = function(select_identifier, input_array) {
            // var select = document.getElementById(select_identifier);
            var select = $(select_identifier);
            for(var i = 0; i < input_array.length; i++) {
                //var opt = options[i];
                //var el = document.createElement("option");
                //el.textContent = opt;
                //el.value = opt;
                //select.appendChild(el);
                select.append("<option>" + input_array[i] + "</option>");
            };
        };

        console.log("Running!");
        //console.log("Running!", this);
        // console.log(css_style_attributes);

        // Create a CSS style for the Floating Menu.
        var css_part = "<style>";
            css_part +="    .styleJS_buttons { ";
            css_part +="        color: white; padding: 5px;";
            css_part +="        border: 1px solid white;";
            css_part +="    }";
            css_part +="    #clickme { ";
            css_part +="        position:relative;";
            css_part +="        left:10px;";
            css_part +="        top:10px;";
            css_part +="    }";
            css_part +="    button { ";
            css_part +="        -webkit-appearance:button;";
            css_part +="    }";
            css_part +="    .styleJS_buttons:hover { ";
            css_part +="        cursor: pointer;";
            css_part +="    }";
            css_part +="    #styleJS_tooltip { ";
            css_part +="        border:1px solid #333; background:#f7f5d1;";
            css_part +="        padding:2px 5px; color:#333;";
            css_part +="    }";
            css_part +="    #styleJS_tooltip1 { ";
            css_part +="        display:none ";
          //  css_part +="        position: fixed;";
          //  css_part +="        border:1px solid #333; background:#f7f5d1;";
          //  css_part +="        left:0;";
          //  css_part +="        top:100px;";
            css_part +="    }";
            css_part +="    #slider { ";
            css_part +="        position:relative;";
            css_part +="        left: 20px;";
            css_part +="        top :50px;";
            css_part +="    }";
            css_part +="    .styleJS_buttons1 { ";
            css_part +="        display:block ";
            css_part +="        color: black; padding: 5px;";
            css_part +="        background-color: white;";
            css_part +="        border: 1px solid white;";
            css_part +="        border-radius: 2px;";
            css_part +="        width: 32px;";
            css_part +="        heigth: 25px;";
            css_part +="    }";
            css_part +="    .styleJS_buttons1:hover { ";
            css_part +="        cursor: pointer;";
            css_part +="    }";
            css_part +="    .styleJS_buttons1.toggled { ";
            css_part +="        color: white; padding: 5px;";
            css_part +="        background-color: black;";
            css_part +="        border: 1px solid white;";
            css_part +="    }";
            css_part +="    .styleJS_hidden { ";
            css_part +="        display:none;";
            css_part +="    }";
            css_part +="    #styleJS_master_menu { ";
            css_part +="        position: fixed;";
            css_part +="        background-color: grey;";
            css_part +="        width:auto;";
            css_part +="        max-width:250px;";
          //  css_part +="        height:200px;";
            css_part +="        border:1px solid black;";
            css_part +="        cursor:move;";
            css_part +="        left:0;";
            css_part +="        top:150px;";
            css_part +="        padding:8px 0px 0px 0px;";
            css_part +="    }";
            css_part +="    #styleJS_zero { ";
            css_part +="        width: auto";
            css_part +="    }";
            css_part +="    #styleJS_colorSelection.styleJS_buttons1::before { ";
            css_part +="        display: inline-block;";
            css_part +="        content: url(images/example1.png);";
            css_part +="    }";
            css_part +="    #styleJS_cornerRadius.styleJS_buttons1::before { ";
            css_part +="        display: inline-block;";
            css_part +="        content: url(images/example2.png);";
            css_part +="    }";
            css_part +="    #styleJS_displayStyle.styleJS_buttons1::before { ";
            css_part +="        display: inline-block;";
            css_part +="        content: url(images/example3.png);";
            css_part +="    }";
            css_part +="    #styleJS_fontPicker.styleJS_buttons1::before { ";
            css_part +="        display: inline-block;";
            css_part +="        content: url(images/example4.png);";
            css_part +="    }";
            css_part +="    #styleJS_wordWrap.styleJS_buttons1::before { ";
            css_part +="        display: inline-block;";
            css_part +="        content: url(images/example5.png);";
            css_part +="    }";
            css_part +="    #styleJS_changeSizes.styleJS_buttons1::before { ";
            css_part +="        display: inline-block;";
            css_part +="        content: url(images/example6.png);";
            css_part +="    }";
            css_part +="    #styleJS_alignMargin.styleJS_buttons1::before { ";
            css_part +="        display: inline-block;";
            css_part +="        content: url(images/example7.png);";
            css_part +="    }";
            css_part +="</style>";

        $("head").append(css_part);

        // Create the floating Menu.
        var html_part = '<div id="styleJS_master_menu"> ';
            html_part +='   <button id="styleJS_zero" style="align:center;" class="styleJS_buttons1" title="Functions">StyleJS</button>';
            html_part +='   <div id="styleJS_submenu_1" style="display: none">';
            html_part +='      <button id="styleJS_colorSelection" class="styleJS_buttons1" title="Change Background Color"></button>';
            html_part +='      <button id="styleJS_cornerRadius" class="styleJS_buttons1" title="Change Corners"></button>';
            html_part +='      <button id="styleJS_displayStyle" class="styleJS_buttons1" title="Display Style"></button>';
            html_part +='      <button id="styleJS_fontPicker" class="styleJS_buttons1" title="Font Picker"></button>';
            html_part +='      <button id="styleJS_wordWrap" class="styleJS_buttons1" title="Word Wrap"></button>';
            html_part +='      <button id="styleJS_changeSizes" class="styleJS_buttons1" title="Change Sizes"></button>';
            html_part +='      <button id="styleJS_alignMargin" class="styleJS_buttons1" title="Align and Margin"></button>';
            html_part +='   </div>';
            html_part +='   <div id="styleJS_submenu_2" style="display: none">';

            html_part +='      <fieldset id="styleJS_colorSelection_fs" style="display=none;">';
            html_part +='          <input id="styleJS_colorSelection_fs_input" placeholder="eg. blue or rgba(0,0,255,0.5) or #0000FF"></input>';
            html_part +='          <button id="styleJS_colorSelection_fs_button"> OK </button>';
            html_part +='      </fieldset>';


            html_part +='      <fieldset id="styleJS_cornerRadius_fs" style="display=none;">';
            html_part +='          <select id="styleJS_cornerRadius_fs_select">';
            html_part +='          <option>Choose Corner Style</option></select>';
            html_part +='          <input id="styleJS_cornerRadius_fs_input_border" placeholder="Border Width"></input>';
            html_part +='          <input id="styleJS_cornerRadius_fs_input_radius" placeholder="Radius eg. 10 or 10%"></input>';
            html_part +='          <button id="styleJS_cornerRadius_fs_button"> OK </button>';
            html_part +='      </fieldset>';


            html_part +='      <fieldset id="styleJS_displayStyle_fs" style="display=none;">';
            html_part +='          <textarea id="styleJS_displayStyle_fs_textarea" wrap="wrap" placeholder="Press Refresh Button to get CSS of element."></textarea>';
            html_part +='          <button id="styleJS_displayStyle_fs_button"> Refresh </button>';
            html_part +='      </fieldset>';


            html_part +='      <fieldset id="styleJS_fontPicker_fs" style="display=none;">';
            html_part +='          <select id="styleJS_fontPicker_fs_select">';
            html_part +='          <option>Choose Font</option></select>';
            html_part +='          <input id="styleJS_fontPicker_fs_input" placeholder="Font Size"></input>';
            html_part +='          <button id="styleJS_fontPicker_fs_button"> OK </button>';
            html_part +='      </fieldset>';
            
            html_part +='      <fieldset id="styleJS_wordWrap_fs" style="display=none;">';
            html_part +='          <select id="styleJS_wordWrap_fs_select">';
            html_part +='          <option>Choose Word Wrap</option>';
            html_part +='          <option>normal</option>';
            html_part +='          <option>break-word</option></select>';
            html_part +='          <button id="styleJS_wordWrap_fs_button"> OK </button>';
            html_part +='      </fieldset>';
            
            html_part +='      <fieldset id="styleJS_changeSizes_fs" style="display=none;">';
            html_part +='          <select id="styleJS_changeSizes_fs_select">';
            html_part +='          <option>Choose Position</option>';
            html_part +='          <option>static</option>';
            html_part +='          <option>relative</option>';
            html_part +='          <option>absolute</option>';
            html_part +='          <option>fixed</option>';
            html_part +='          <option>inherit</option></select>';
            html_part +='          <input id="styleJS_changeSizes_fs_input_top" placeholder="Top"></input>';
            html_part +='          <input id="styleJS_changeSizes_fs_input_bottom" placeholder="Bottom"></input>';
            html_part +='          <input id="styleJS_changeSizes_fs_input_left" placeholder="Left"></input>';
            html_part +='          <input id="styleJS_changeSizes_fs_input_right" placeholder="Right"></input>';
            html_part +='          <input id="styleJS_changeSizes_fs_input_height" placeholder="Height"></input>';
            html_part +='          <input id="styleJS_changeSizes_fs_input_width" placeholder="Width"></input>';
            html_part +='          <button id="styleJS_changeSizes_fs_button"> OK </button>';
            html_part +='      </fieldset>';
            
            html_part +='      <fieldset id="styleJS_alignMargin_fs" style="display=none;">';
            html_part +='          <select id="styleJS_alignMargin_fs_select">';
            html_part +='          <option>Choose Align</option>';
            html_part +='          <option>left</option>';
            html_part +='          <option>right</option>';
            html_part +='          <option>center</option>';
            html_part +='          <option>justify</option></select>';
            html_part +='          <select id="styleJS_alignMargin_fs_select_vertical">';
            html_part +='          <option>Choose Vertical Align</option>';
            html_part +='          <option>baseline</option>';
            html_part +='          <option>sub</option>';
            html_part +='          <option>super</option>';
            html_part +='          <option>text-top</option>';
            html_part +='          <option>text-bottom</option>';
            html_part +='          <option>middle</option>';
            html_part +='          <option>top</option>';
            html_part +='          <option>bottom</option></select>';
            html_part +='          <input id="styleJS_alignMargin_fs_input" placeholder="Margin"></input>';
            html_part +='          <input id="styleJS_alignMargin_fs_input_padding" placeholder="Padding"></input>';
            html_part +='          <button id="styleJS_alignMargin_fs_button"> OK </button>';
            html_part +='      </fieldset>';

            html_part +='   </div>';
           // TODO: file saving stuff !!!
           // html_part +=                '       <input type="file">';
            html_part +='<fieldset id="styleJS_tooltip1">';
            html_part +='</fieldset>';

          // html_part +=                '       </input>';
            html_part +='</div>';
            // END of Master Menu

        // Append the Menu to the Body
        $("body").append(html_part);

        // Fill-up after addition to HTML the Select Options for different border styles
        from_array_to_select("#styleJS_cornerRadius_fs_select", hardcoded_border_styles);

        // Fill-up after addition to HTML the Select Options for hardcoded fonts
        from_array_to_select("#styleJS_fontPicker_fs_select", hardcoded_font_families);

        $("fieldset#slider").hide();
        //hiding_wrapper("div#clickme","fieldset#slider");
        
        // TODO: test with jQuery-ui
        //
        $("#styleJS_master_menu").draggable();
        $("#styleJS_tooltip1").draggable();
        // dragDrop.initElement("styleJS_master_menu");
        // MUST READ!
        // hiding_wrapper must be executed AFTER the DragDrop initialized
        hiding_wrapper("div#clickme","fieldset#slider");
        //hiding_wrapper("button#first","fieldset#slider");


        $(".styleJS_buttons1").click(function(e) {
                $(".styleJS_buttons1.toggled").removeClass("toggled");
                $(this).toggleClass("toggled");
                var n = this.id;
                //$("#styleJS_tooltip1").hide();

                if (n === "styleJS_zero") {
                    toggle_visibility("#styleJS_submenu_1");
                    toggle_visibility("#styleJS_tooltip1");
                    $("#styleJS_submenu_2").hide();
               
                } else if (n === "styleJS_first") {
                    $("#slider").hide();
                
                } else if (n === "styleJS_second") {
                    $("#slider").show();
                }
                else {
                    
                    $("#styleJS_submenu_2").show();
                    $("#styleJS_submenu_2 > fieldset").hide();
                    toggle_visibility("#" + n + "_fs");
                    
                    $("#slider").toggleClass("styleJS_hidden");
                    // console.log("Tretji Button");
                }
                
                });

       $("#styleJS_colorSelection_fs_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.backgroundColor = $("#styleJS_colorSelection_fs_input")[0].value;
                    }
                });

       $("#styleJS_cornerRadius_fs_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.borderStyle = $("#styleJS_cornerRadius_fs_select")[0].value;
                        selected_item.style.borderWidth = $("#styleJS_cornerRadius_fs_input_border")[0].value;
                        selected_item.style.borderRadius = $("#styleJS_cornerRadius_fs_input_radius")[0].value;
                    }
                });

        $("#styleJS_displayStyle_fs_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        var temp_lookup = $("#styleJS_displayStyle_fs_textarea");
                        //console.log(temp_lookup[0].value);
                        var i,
                            output = "";
                        for (i in selected_item.style) {
                            if (selected_item.style.hasOwnProperty(i)) {
                                if (selected_item.style[i]) {
                                    output = output + i + " : " + selected_item.style[i] + ";\n ";
                                };
                            };
                        };
                        temp_lookup[0].value = output;
                        //console.log(output);
                        //console.log($("fieldset#slider > fieldset#styleJS_displayStyle > select#styleJS_dissty_select"));
                        //console.log($("fieldset#slider > fieldset#styleJS_displayStyle > select#styleJS_dissty_select")[0].value);
                    };
                });


       $("#styleJS_fontPicker_fs_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.fontFamily = $("#styleJS_fontPicker_fs_select")[0].value;
                        selected_item.style.fontSize = $("#styleJS_fontPicker_fs_input")[0].value;
                    }
                });

       $("#styleJS_wordWrap_fs_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.wordWrap = $("#styleJS_wordWrap_fs_select")[0].value;
                    }
                });

       $("#styleJS_changeSizes_fs_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.position = $("#styleJS_changeSizes_fs_select")[0].value;
                        selected_item.style.top = $("#styleJS_changeSizes_fs_input_top")[0].value;
                        selected_item.style.bottom = $("#styleJS_changeSizes_fs_input_bottom")[0].value;
                        selected_item.style.left = $("#styleJS_changeSizes_fs_input_left")[0].value;
                        selected_item.style.right = $("#styleJS_changeSizes_fs_input_right")[0].value;
                        selected_item.style.height = $("#styleJS_changeSizes_fs_input_height")[0].value;
                        selected_item.style.width = $("#styleJS_changeSizes_fs_input_width")[0].value;
                    }
                });


       $("#styleJS_alignMargin_fs_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.textAlign = $("#styleJS_alignMargin_fs_select")[0].value;
                        selected_item.style.verticalAlign = $("#styleJS_alignMargin_fs_select_vertical")[0].value;
                        selected_item.style.margin = $("#styleJS_alignMargin_fs_input")[0].value;
                        selected_item.style.padding = $("#styleJS_alignMargin_fs_input_padding")[0].value;
                    }
                });

       // console.log("MASTER ",$("#styleJS_master_menu").html(), document.getElementById("styleJS_master_menu").innerHTML);
       // console.log("MASTER ", document.getElementById("styleJS_master_menu").innerHTML);

        // <div id="content" class="content-text" role="main" contenteditable="true" style="">
        // Add a mouse control only to the parent
        // with the event.target we can see which child triggered the event
        $("div#content.content-text").mousemove(function(e) {
                var hover_output = "",
                    select_output = "";

                    hover_output += e.target.id ? " ID: " + e.target.id : "";
                    hover_output += e.target.className ? " Class: " + e.target.className : "";
                    hover_output += e.target.tagName ? " Tag: " + e.target.tagName : "";

                    if (selected_item !== null && selected_item !== undefined) {
                        select_output += selected_item.id ? " ID: " + e.target.id : "";
                        select_output += selected_item.className ? " Class: " + selected_item.className : "";
                        select_output += selected_item.tagName ? " Tag: " + selected_item.tagName : "";
                    } else {
                        select_output = "NO element selected."
                    }
                    //$("#styleJS_tooltip").text("ID: " + this.id + "\n Class: " + this.className);
                    //$("label#styleJS_tooltip").text("ID: " + e.target.id + "\n Class: " + e.target.className + "\n Tag: " + e.target.tagName);
                    $("#styleJS_tooltip1").html("Hovering ... " + hover_output + "<br>" + "Selected: " + select_output);
                    // console.log(e);
                });

        $("div#content.content-text").click(function(e) {
                    selected_item = e.target;
                });

        // Dynamic creation of individual helpers
        // Obsolete code TODO: delete

        var _styleJS = {
            getSelection : function() {
                               return selected_item;
                           }
        };

        return _styleJS;


    }();

    //  Puts styleJS under document object 
    //  access the methods with document.styleJS.method()
    // this.StyleJS = styleJS;

    // Expose to the public
    window.StyleJS = styleJS;

});
