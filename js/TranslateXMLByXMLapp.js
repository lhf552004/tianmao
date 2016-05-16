/**
 * Created by Operator on 5/13/2016.
 */

var app = angular.module('TranslateXMLByXMLapp', []);

app.controller('TranslateXMLByXMLCtrl', function ($scope, $filter) {

    //internal variables
    var targetXML = {};
    var sourceXML = {};
    var filterList = {
        id: '',
        label: '',
        OriginalText: '',
        innerText: ''
    };
    var log ="";

    //$scope variables
    $scope.identical = "";

    $scope.idFilter = "";
    $scope.labelFilter = "";
    $scope.OriginalTextFilter = "";
    $scope.innerTextFilter = "";
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
                sourceXML = XML;
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
        updateDataGridView(null, null);
    }

    function idFilterChange() {
        updateDataGridView($scope.idFilter, "id");
    }

    function labelFilterChange() {
        updateDataGridView($scope.labelFilter, "label");
    }

    function OriginalTextFilterChange() {
        updateDataGridView($scope.OriginalTextFilter, "OriginalText");
    }

    function innerTextFilterChange() {
        updateDataGridView($scope.innerTextFilter, "innerText");
    }

    function identicalSelected(identical) {
        $scope.identical = identical;
    }
    function innerTextChange(context){
        var $context = $(context);
        var newValue = $context.val();
        var label = $context.attr("label");
        var text = $filter('getById')($scope.texts, label);
    }
    function updateDataGridView(criteriaString, attributeName) {
        try {
            if (targetXML == null) {
                log = "target XML hasn't been imported <br>";
                $scope.result = $scope.result +log;
                alert(log);
                throw "quit";
            }
            if ($scope.identical == "Label") {

            }
            else if ($scope.identical == "ID") {

            }
            else {
                log = "Please select identical <br>";
                $scope.result = $scope.result +log;
                alert(log);
                return;
            }
            $scope.texts = [];
            var xml = $(targetXML);
            var idXML;
            var labelXML;
            var originalTextXML;
            if (criteriaString != null) {
                filterList[attributeName] = criteriaString;
            }
            var filterString = '';
            if (filterList.id != '') {
                filterString = "[id^='" + filterList.id + "']";
            }
            if (filterList.label != '') {
                filterString = filterString + "[label^='" + filterList.label + "']";

            }
            if (filterList.OriginalText != '') {
                filterString = filterString + "[OriginalText^='" + filterList.OriginalText + "']";
            }

            filterString = "Text" + filterString;
            $(xml).find(filterString).each(function () {

                var $text = $(this);
                var text = {};
                var flag_add = true;

                var id = $text.attr("id");
                var label = $text.attr("label");
                var originalText = $text.attr("OriginalText");
                var translationText = $text.text();
                if (filterList.innerText != '') {
                    if (translationText.toLowerCase().indexOf(filterList.innerText) < 0) {
                        flag_add = false;
                    }

                }
                if (flag_add) {
                    text = new Text(id, label, originalText, translationText);
                    $scope.texts.push(text);
                    log = "added text: " + label + " <br>";
                    $scope.result = $scope.result +log;
                    //var htmlStr = '<tr>' +
                    //    '<td>' + id + '</td>' +
                    //    '<td>' + label + '</td>' +
                    //    '<td>' + originalText + '</td>' +
                    //    '<td><input type="text" name="' + label + '" value='+ translationText + '></td>' +
                    //    '</tr>';
                    //
                    //$('#translationTable tr:last').after(htmlStr);
                }


            });
        }
        catch (e) {
            $("#result").append(e);
        }


    }

});

app.filter('getByLabel', function() {
    return function(input, label) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (input[i].label == label) {
                return input[i];
            }
        }
        return null;
    }
});


