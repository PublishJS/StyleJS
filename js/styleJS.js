$(document).ready(function() {

    var styleJS = function(){
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
            $(action_trig).click(function(e) {
                    var temp_lookup = $(action_recieve);
                    if(temp_lookup.is(":hidden")) {
                        temp_lookup.slideDown("slow"); 
                    } else {
                        temp_lookup.hide();
                    }
            });
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

        console.log("Running!", this);
        // console.log(css_style_attributes);

        // Create a CSS style for the Floating Menu.
        $("body").before("<style> .styleJS_buttons { color: white; padding: 5px; border: 1px solid white; }\
                                .styleJS_buttons:hover { cursor: pointer; }\
                        #styleJS_tooltip { border:1px solid #333; background:#f7f5d1; padding:2px 5px; color:#333; }</style>");

        // Create the floating Menu.
        $("body").append('<div id="clickme" class="styleJS_buttons" style="position:fixed;left: 20px;top:70px;">CSS editing</div>\
                            <fieldset id="slider" style="position: fixed; left: 20px; top: 100px; display: none; ">\
                            <div id="showIDClass" class="styleJS_buttons">Show ID Class</div>\
                            <div id="changeBackgroundColor" class="styleJS_buttons">Choose Background Colour</div>\
                            <div id="changeCornerRadius" class="styleJS_buttons">Change Corner Radius</div>\
                            <div id="displayStyle" class="styleJS_buttons">Display Style</div>\
                            <div id="fontPicker" class="styleJS_buttons">Choose Font</div>\
                            </fieldset>');
        $("fieldset#slider").hide();
        hiding_wrapper("div#clickme","fieldset#slider");



        // <div id="content" class="content-text" role="main" contenteditable="true" style="">
        // Add a mouse control only to the parent
        // with the event.target we can see which child triggered the event
        $("div#content.content-text").mousemove(function(e) {
                    //$("#styleJS_tooltip").text("ID: " + this.id + "\n Class: " + this.className);
                    $("label#styleJS_tooltip").text("ID: " + e.target.id + "\n Class: " + e.target.className + "\n Tag: " + e.target.tagName);
                    // console.log(e);
                });

        $("div#content.content-text").click(function(e) {
                    selected_item = e.target;
                });

        // Dynamic creation of individual helpers

        $("fieldset#slider > div#showIDClass").after('<label id="styleJS_tooltip" style="display=none;"></label>');
        $("fieldset#slider > label#styleJS_tooltip").hide();

        hiding_wrapper("fieldset#slider > div#showIDClass","label#styleJS_tooltip");
       
        $("fieldset#slider > div#changeBackgroundColor").after('<fieldset id="styleJS_colorselection" style="display=none;">\
                <input id="styleJS_colsel_input" style="display=none;" placeholder="eg. blue or rgba(0,0,255,0.5) or #0000FF"></input>\
                <button id="styleJS_colsel_button" style="display=none;"> OK </button>\
                </filedset>');
        $("fieldset#slider > fieldset#styleJS_colorselection").hide();
        
        $("fieldset#slider > fieldset#styleJS_colorselection > button#styleJS_colsel_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.backgroundColor = $("fieldset#slider > fieldset#styleJS_colorselection > input#styleJS_colsel_input")[0].value;
                    }
                });

        hiding_wrapper("fieldset#slider > div#changeBackgroundColor","fieldset#styleJS_colorselection");

        $("fieldset#slider > div#changeCornerRadius").after('<fieldset id="styleJS_cornerRadius" style="display=none;">\
                <select id="styleJS_corrad_select_border" style="display=none;"><option>Choose Corner Style</option></select>\
                <input id="styleJS_corrad_input_border" style="display=none;" placeholder="Border Width"></input>\
                <input id="styleJS_corrad_input_radius" style="display=none;" placeholder="Radius eg. 10 or 10%"></input>\
                <button id="styleJS_corrad_button" style="display=none;"> OK </button>\
                </filedset>');
        $("fieldset#slider > fieldset#styleJS_cornerRadius").hide();
        from_array_to_select("select#styleJS_corrad_select_border", hardcoded_border_styles);
        
        $("fieldset#slider > fieldset#styleJS_cornerRadius > button#styleJS_corrad_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.borderStyle = $("fieldset#slider > fieldset#styleJS_cornerRadius > select#styleJS_corrad_select_border")[0].value;
                        selected_item.style.borderWidth = $("fieldset#slider > fieldset#styleJS_cornerRadius > input#styleJS_corrad_input_border")[0].value;
                        selected_item.style.borderRadius = $("fieldset#slider > fieldset#styleJS_cornerRadius > input#styleJS_corrad_input_radius")[0].value;
                    }
                });

        hiding_wrapper("fieldset#slider > div#changeCornerRadius","fieldset#styleJS_cornerRadius");

        $("fieldset#slider > div#displayStyle").after('<fieldset id="styleJS_displayStyle" style="display=none;">\
                <textarea id="styleJS_dissty_textarea" wrap="wrap"></textarea>\
             // <!--  <select id="styleJS_dissty_select"><option>Choose CSS attribute</option></select> -->\
                <button id="styleJS_dissty_button" style="display=none;"> Refresh </button>\
                </filedset>');
        $("fieldset#slider > fieldset#styleJS_displayStyle").hide();

        // To use the following code you need to uncomment the select above
        // from_array_to_select("select#styleJS_dissty_select", css_style_attributes);
        
        $("fieldset#slider > fieldset#styleJS_displayStyle > button#styleJS_dissty_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        var temp_lookup = $("fieldset#slider > fieldset#styleJS_displayStyle > textarea#styleJS_dissty_textarea");
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

        hiding_wrapper("fieldset#slider > div#displayStyle","fieldset#styleJS_displayStyle");

        $("fieldset#slider > div#fontPicker").after('<fieldset id="styleJS_fontPicker" style="display=none;">\
                <select id="styleJS_fntpick_select_font" style="display=none;"><option>Choose Font</option></select>\
                <input id="styleJS_fntpick_input_size" style="display=none;">Font Size</input>\
                <button id="styleJS_fntpick_button" style="display=none;"> OK </button>\
                </filedset>');
        $("fieldset#slider > fieldset#styleJS_fontPicker").hide();

        from_array_to_select("select#styleJS_fntpick_select_font", hardcoded_font_families);

        $("fieldset#slider > fieldset#styleJS_fontPicker > button#styleJS_fntpick_button").click(function(e) {
                    if (selected_item !== null && selected_item !== undefined) {
                        selected_item.style.fontFamily = $("fieldset#slider > fieldset#styleJS_fontPicker > select#styleJS_fntpick_select_font")[0].value;
                        selected_item.style.fontSize = $("fieldset#slider > fieldset#styleJS_fontPicker > input#styleJS_fntpick_input_size")[0].value;
                    }
                });

        hiding_wrapper("fieldset#slider > div#fontPicker","fieldset#styleJS_fontPicker");

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
