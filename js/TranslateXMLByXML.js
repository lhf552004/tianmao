/**
 * Created by Operator on 5/13/2016.
 */
$(function () {


    $("#target_upload").change(function () {
        var file = $('#target_upload')[0].files[0];
        var reader = new FileReader();  // Create a FileReader object
        reader.readAsText(file);           // Read the file
        reader.onload = function () {    // Define an event handler
            var text = reader.result;   // This is the file contents
            targetXML = $.parseXML(text);
            log = "target XML has been imported ";
            $("#result").append(log);
        };
        reader.onerror = function (e) {  // If anything goes wrong
            console.log("Error", e);    // Just log it
            $("#result").append(e);
        };

    });
    $("#source_upload").change(function () {
        var file = $('#source_upload')[0].files[0];
        var reader = new FileReader();  // Create a FileReader object
        reader.readAsText(file);           // Read the file
        reader.onload = function () {    // Define an event handler
            var text = reader.result;   // This is the file contents
            sourceXML = $.parseXML(text);
            log = "source XML has been imported ";
        };
        reader.onerror = function (e) {  // If anything goes wrong
            console.log("Error", e);    // Just log it
            $("#result").append(e);
        };

    });

    //$("#identical").click(function(){
    //    identical =  $("#identical:selected").text();
    //});
    //$("#identicalUl li").click(function(){
    //    identical =  $("this").text();
    //});
    $("#identicalUl li").on("click", function () {
        identical = $(this).text().trim();

    });

    $("#import").click(function () {
        if (identical == null) {
            alert("Please select Identical!");
            return;
        }
        updateDataGridView(null, null);
    });
    $("#id_fitler").on("change paste keyup", function() {
        updateDataGridView($(this).val(), "id");
    });
    $("#label_fitler").on("change paste keyup", function() {
        updateDataGridView($(this).val(), "label");
    });
    $("#OriginalText_fitler").on("change paste keyup", function() {
        updateDataGridView($(this).val(), "OriginalText");
    });
    $("#TranslateText_fitler").on("change paste keyup", function() {
        updateDataGridView($(this).val(), "innerText");
    });

    $("#test").click(function () {
        $("#translationTable tr").remove();
    });

});
var targetXML;
var sourceXML;
var identical;
var log="";
var filterList ={
    id : '',
    label : '',
    OriginalText : '',
    innerText: ''
};

function updateDataGridView(criteriaString, attributeName) {
    try
    {
        if (targetXML == null) {
            log = "target XML hasn't been imported ";
            $("#result").append(log);
            throw "quit";
        }
        if (identical == "Label") {

        }
        else if (identical == "ID") {

        }
        else {
            log = "Please select identical ";
            $("#result").append(log);
            return;
        }
        var xml = $(targetXML);
        var idXML;
        var labelXML;
        var originalTextXML;
        if(criteriaString!=null)
        {
            filterList[attributeName] = criteriaString;
        }
        var filterString = '';
        if(filterList.id!='')
        {
            filterString = "[id^='"+ filterList.id + "']";
        }
        if(filterList.label!='')
        {
            filterString = filterString + "[label^='"+ filterList.label + "']";

        }
        if(filterList.OriginalText!='')
        {
            filterString = filterString + "[OriginalText^='"+ filterList.OriginalText + "']";
        }

        filterString = "Text" + filterString;
        $(xml).find(filterString).each(function () {

            var text = $(this);
            var flag_add = true;

            var id = text.attr("id");
            var label = text.attr("label");
            var originalText = text.attr("OriginalText");
            var translationText = text.text();
            if(filterList.innerText!='')
            {
                if(translationText.toLowerCase().indexOf(filterList.innerText) < 0)
                {
                    flag_add =false;
                }

            }
            if (flag_add)
            {
                var htmlStr = '<tr>' +
                    '<td>' + id + '</td>' +
                    '<td>' + label + '</td>' +
                    '<td>' + originalText + '</td>' +
                    '<td><input type="text" name="' + label + '" value='+ translationText + '></td>' +
                    '</tr>';

                $('#translationTable tr:last').after(htmlStr);
            }


        });
    }
    catch (e)
    {
        $("#result").append(e);
    }


}

// Read the specified text file and display it in the <pre> element below
function readfile() {
    var file = $('#target_upload')[0].files[0];
    var reader = new FileReader();  // Create a FileReader object
    reader.readAsText(file);           // Read the file
    reader.onload = function () {    // Define an event handler
        var text = reader.result;   // This is the file contents
        var out = document.getElementById("output");    // Find output element
        out.innerHTML = "";                             // Clear it
        out.appendChild(document.createTextNode(text)); // Display file contents
    };
    reader.onerror = function (e) {  // If anything goes wrong
        console.log("Error", e);    // Just log it
    };
}