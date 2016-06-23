/**
 * Created by Operator on 5/13/2016.
 */

var app = angular.module('TranslateXMLByXMLapp', []);

app.controller('TranslateXMLByXMLCtrl', function ($scope, $filter) {

    //internal variables
    var targetXML = {};
    var resourceXML = {};
    var filterList = {
        id: '',
        label: '',
        OriginalText: '',
        innerText: ''
    };
    var log = "";
    var targetTexts = [];
    var resourceTexts = [];
    var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;

    //$scope variables
    $scope.identical = "";

    //$scope.idFilter = "";
    //$scope.labelFitler = "";
    //$scope.OriginalTextFilter = "";
    //$scope.innerTextFilter = "";
    $scope.texts = [];
    $scope.result = "";

    //$scope functions
    $scope.readXML = readXML;
    $scope.importTarget = importTarget;
    $scope.idFilterChange = idFilterChange;
    $scope.labelFilterChange = labelFilterChange;
    $scope.OriginalTextFilterChange = OriginalTextFilterChange;
    $scope.innerTextFilterChange = innerTextFilterChange;
    $scope.identicalSelected = identicalSelected;
    $scope.innerTextChange = innerTextChange;
    $scope.override = override;
    $scope.save = save;
    $scope.test = test;

    //function defintions
    function readXML(theFile, type) {
        var file = theFile.files[0];
        var XML;

        var reader = new FileReader();  // Create a FileReader object
        reader.readAsText(file);           // Read the file
        reader.onload = function () {    // Define an event handler
            var text = reader.result;   // This is the file contents
            XML = $.parseXML(text);
            if (type == "target") {
                targetXML = XML;
            }
            else {
                resourceXML = XML;
                importSource();
            }
            $scope.result = $scope.result + "target XML has been imported <br>";
            //$("#result").append(log);
        };
        reader.onerror = function (e) {  // If anything goes wrong
            console.log("Error", e);    // Just log it
            $scope.result = $scope.result + e;
        };
    }

    function importTarget() {
        if (identical == null) {
            alert("Please select Identical!");
            return;
        }
        try {
            if (targetXML == null) {
                log = "target XML hasn't been imported <br>";
                $scope.result = $scope.result + log;
                alert(log);
                throw "quit";
            }
            if ($scope.identical == "Label") {

            }
            else if ($scope.identical == "ID") {

            }
            else {
                log = "Please select identical \n";
                $scope.result = $scope.result + log;
                alert(log);
                return;
            }
            $scope.texts = [];
            var xml = $(targetXML);
            var n = $(xml).find("Text").length;
            var i =0;
            var per = 0;
            $(xml).find("Text").each(function () {

                var $text = $(this);
                var text = {};
                var flag_add = true;

                var id = $text.attr("id");
                var label = $text.attr("label");
                var OriginalText = $text.attr("OriginalText");
                var translationText = $text.text();
                var $deferReady = new $.Deferred();
                $deferReady.done(function(){
                    $("#status").text("import completed");
                }).fail( console.error );
                text = new Text(id, label, OriginalText, translationText);
                $scope.texts.push(text);
                log = "added text: " + label + " <br>";
                $scope.result = $scope.result + log;
                targetTexts = $scope.texts;
                i++;
                per = (i/n)*100;
                if(per>=100)
                {
                    $deferReady.resolve();
                }
            });
        }
        catch (e) {
            $("#result").append(e);
        }
    }

    function importSource() {

        try {


            var xml = $(resourceXML);


            $(xml).find("Text").each(function () {

                var $text = $(this);
                var text = {};
                var flag_add = true;

                var id = $text.attr("id");
                var label = $text.attr("label");
                var OriginalText = $text.attr("OriginalText");
                var translationText = $text.text();
                text = new Text(id, label, OriginalText, translationText);
                resourceTexts.push(text);


            });
        }
        catch (e) {
            $("#result").append(e);
        }
    }

    function idFilterChange() {
        updateTexts($scope.idFilter, "id");
    }
    function updateProgressBar(value){

        if(value>=100)
        {
            $("#progressbar").attr("style","width:0%");
            $("#progressbar").text("0%");
        }
        else {
            $("#progressbar").attr("style","width:" +value+"%");
            $("#progressbar").text(value+"%");
        }
    }
    function labelFilterChange() {

        updateTexts($scope.labelFitler, "label");
    }

    function OriginalTextFilterChange() {
        updateTexts($scope.OriginalTextFitler, "OriginalText");
    }

    function innerTextFilterChange() {
        updateTexts($scope.innerTextFilter, "innerText");
    }

    function identicalSelected(identical) {
        $scope.identical = identical;
    }

    function innerTextChange(context) {
        var $context = $(context);
        var newValue = $context.val();
        var label = $context.attr("label");
        var text = $filter('getByLabel')(targetTexts, label);
        $(targetXML).find("Text[label=" + label + "]").each(function () {
            var $text = $(this);
            $text.text(newValue);
            return;
        });

        text.innerText = newValue;
    }

    function updateTexts(criteriaString, attributeName) {
        try {
            if (criteriaString != null) {
                filterList[attributeName] = criteriaString;
            }
            $scope.texts = targetTexts.filter(function (text) {
                //var $text = $(text);
                var flag_add = true;
                var id = text.id;
                var label = text.label;
                var OriginalText = text.OriginalText;
                var translationText = text.innerText;
                if (filterList.id != '') {
                    if (id.toLowerCase().indexOf(filterList.id.toLowerCase()) == -1) {
                        flag_add = false;
                    }
                }
                if (filterList.label != '') {
                    if (label.toLowerCase().indexOf(filterList.label.toLowerCase()) == -1) {
                        flag_add = false;
                    }
                }
                if (filterList.OriginalText != '') {
                    if (OriginalText.toLowerCase().indexOf(filterList.OriginalText.toLowerCase()) == -1) {
                        flag_add = false;
                    }
                }
                if (filterList.innerText != '') {
                    if (translationText.toLowerCase().indexOf(filterList.innerText.toLowerCase()) < 0) {
                        flag_add = false;
                    }
                }
                return flag_add;
            });

        }
        catch (e) {
            $("#result").append(e);
        }


    }

    function override() {
        targetTexts.forEach(function (text) {
            var label = text.label;
            var textFromRes = $filter('getByLabel')(resourceTexts, label);
            if (textFromRes != null && text.label == textFromRes.label) {
                text.innerText = textFromRes.innerText;
                $(targetXML).find("Text[label=" + label + "]").each(function () {
                    var $text = $(this);
                    $text.text(textFromRes.innerText);
                    return;
                });
            }
        });

    }
    function $requestFileSystem() {
        var $deferReady = new $.Deferred();
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem( PERSISTENT,             // Or TEMPORARY for cache files
            5 * 1024 * 1024,           // We'd like 10 megabytes, please
            function ( fs ) {          // When done, call this function
                filesystem = fs;    // Just save the filesystem into
                $deferReady.resolve();
            },                      // a global variable.
            logerr );
        return $deferReady;
    }
    function logerr() {
        console.log( e );
    }
    function save(){
        //$requestFileSystem().done( function () {
        //    doSave();
        //} );
        var blob;
        var value = "";
        if(typeof window.XMLSerializer == "undefined") {
            throw new Error("No modern XML serializer found.");
        }
        var s = new XMLSerializer();
        var type = "text/plain;charset=utf-16";

        var name = "Chinese.XML";

        value = s.serializeToString( targetXML );
        blob = new Blob([value], {type: type});

        saveAs(blob, name);
    }
    function doSave() {
        var blob;
        var value = "";
        if(typeof window.XMLSerializer == "undefined") {
            throw new Error("No modern XML serializer found.");
        }
        var s = new XMLSerializer();
        var type = "text/plain;charset=utf-16";

        var name = "Chinese.XML";

        value = s.serializeToString( targetXML );
        blob = new Blob([value], {type: "text/xml"});

        saveAs(blob, name);
        //if ( typeof window.Blob == "function" ) {
        //
        //    blob = new Blob( [value], { type: type } );
        //
        //} else {
        //
        //    var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
        //
        //    var bb = new BlobBuilder();
        //
        //    bb.append( value );
        //
        //    blob = bb.getBlob( type );
        //
        //}
        //
        //var URL = window.URL || window.webkitURL;
        //
        //var bloburl = URL.createObjectURL( blob );
        //
        //var anchor = document.createElement( "a" );
        //
        //if ( 'download' in anchor ) {
        //
        //    anchor.style.visibility = "hidden";
        //
        //    anchor.href = bloburl;
        //
        //    anchor.download = name;
        //
        //    document.body.appendChild( anchor );
        //
        //    var evt = document.createEvent( "MouseEvents" );
        //
        //    evt.initEvent( "click", true, true );
        //
        //    anchor.dispatchEvent( evt );
        //
        //    document.body.removeChild( anchor );
        //
        //} else if ( navigator.msSaveBlob ) {
        //
        //    navigator.msSaveBlob( blob, name );
        //
        //} else {
        //
        //    location.href = bloburl;
        //
        //}
    }
    function writeFile(writer) {
        function done(evt) {
            alert("Write completed.");
        }
        function error(evt) {
            alert("Write failed:" + evt);
        }

        var bb = new BlobBuilder();
        bb.append("Lorem ipsum");
        writer.onwrite = done;
        writer.onerror = error;
        writer.write(bb.getBlob());
    }

    function test() {
        var text = '<?xml version="1.0" encoding="UTF-16"?> <Bundle info="Bundle" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <Comment>;;----From File .\McCommon\System\Language\ENGLISH_McBase.LGF</Comment> <Text id="" label="MENUE_SAVE_P_TXT" length="4" OriginalText="Save">Save</Text> <Text id="" label="MENUE_LOAD_P_TXT" length="4" OriginalText="Load">Load</Text> <Text id="" label="MENUE_PARA_TXT2" length="9" OriginalText="Parameter">Parameter</Text> <Text id="" label="MENUE_BACK_TXT" length="4" OriginalText="Back">Back</Text> <Text id="" label="MENUE_ERRORMSG_TXT" length="8" OriginalText="Messages">Messages</Text> <Text id="" label="MENUE_SUPPLY_TXT" length="11" OriginalText="Main Supply">Main Supply</Text> <Text id="" label="MENUE_KV_TXT" length="15" OriginalText="Kartenzuführung">Kartenzuführung</Text><Text id="" label="MENUE_TRSP_TXT" length="14" OriginalText="Card Transport">Card Transport</Text> <Text id="" label="MENUE_PUNCH_TXT" length="8" OriginalText="Punching">Punching</Text></Bundle>';   // This is the file contents
        targetXML = $.parseXML(text);
        $scope.result = $scope.result + "test XML has been imported. \n";
    }
});

app.filter('getByLabel', function () {
    return function (input, label) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (input[i].label == label) {
                return input[i];
            }
        }
        return null;
    }
});


