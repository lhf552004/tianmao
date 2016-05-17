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
    var log = "";
    var rawTexts = [];
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


            $(xml).find("Text").each(function () {

                var $text = $(this);
                var text = {};
                var flag_add = true;

                var id = $text.attr("id");
                var label = $text.attr("label");
                var OriginalText = $text.attr("OriginalText");
                var translationText = $text.text();
                text = new Text(id, label, OriginalText, translationText);
                $scope.texts.push(text);
                log = "added text: " + label + " <br>";
                $scope.result = $scope.result + log;
                rawTexts = $scope.texts;

            });
        }
        catch (e) {
            $("#result").append(e);
        }
    }

    function idFilterChange() {
        updateTexts($scope.idFilter, "id");
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
        var text = $filter('getByLabel')($scope.texts, label);
        text.innerText = newValue;
    }

    function updateTexts(criteriaString, attributeName) {
        try {
            if (criteriaString != null) {
                filterList[attributeName] = criteriaString;
            }
            $scope.texts = rawTexts.filter(function (text) {
                var $text = $(text);
                var flag_add = true;
                var id = $text.attr("id");
                var label = $text.attr("label");
                var OriginalText = $text.attr("OriginalText");
                var translationText = $text.text();
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


