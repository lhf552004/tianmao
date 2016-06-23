---
layout: translateXML
title: "Translate XML by XML"
categories: translate
modified: 2016-06-01T16:28:11-04:00
tags: [translate]
comments: true
ads: true
---

<div class="container">

    <div class="header-content">
        <div class="header-image">
            <div class="header-container">
                <div class="head-left">
                    <div class="logo">
                        <a href="/"><img src="{{ site.url }}/images/logo.png" /></a>
                    </div>
                </div>
                <div class="head-left">
                    <h1 class="header-text">Muehlbauer
                        <small class="header-text">Translate XML by XML</small>
                    </h1>
                </div>

            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-3 col-xs-3 col-sm-3">

            <span class="label label-default">Please choose target file</span>
            <input ng-model="targetUpload" type="file" onchange="angular.element(this).scope().readXML(this,'target')">
            <!--ng-change="readXML(this.files[0],{{targetXML}})"-->
            <!--onchange="readfile(this.files[0])-->
            <span class="label label-default">Please choose source file</span>
            <input id="source_upload" name="source_upload" type="file" onchange="angular.element(this).scope().readXML(this,'source')">
        </div>
        <div class="col-lg-2 col-xs-2 col-sm-3">
            <div class="dropdown">
                <button type="button" class="btn dropdown-toggle" id="identical"
                        data-toggle="dropdown">
                    Identical By {{identical}}
                    <span class="caret"></span>
                </button>
                <ul id="identicalUl" class="dropdown-menu" role="menu" aria-labelledby="identical">
                    <li role="presentation" ng-click = "identicalSelected('Label')">
                        Label
                    </li>
                    <li role="presentation" ng-click = "identicalSelected('ID')">
                        ID
                    </li>
                </ul>
            </div>

        </div>

        <div class=" col-lg-3 col-xs-3 col-sm-3">
            <button id="import" class="btn btn-primary" ng-click="importTarget()">Import Target XML</button>
        </div>
        <div class="col-lg-2 col-xs-2 col-sm-3">
            <button id="override" type="button" class="btn btn-primary" ng-click = "override()">Override</button>
        </div>

        <div class="col-lg-2 col-xs-2 col-sm-3">
            <button id="save" type="button" class="btn btn-primary" ng-click = "save()">Save</button>
            <button id="test" type="button" class="btn btn-primary" ng-click = "test()" >Test</button>
        </div>

    </div>
    <!--divider-->
    <hr>

    <div class="row remark">
        <div class="col-lg-12 col-xs-12 col-sm-12">
            <span >Filter</span>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-xs-3 col-sm-3">
            <div class="input-group">
                <span class="input-group-addon">ID</span>
                <input ng-model="idFilter" ng-change="idFilterChange()" type="text" class="form-control" placeholder="ID">
            </div>

        </div>
        <div class="col-lg-3 col-xs-3 col-sm-3">
            <div class="input-group">
                <span class="input-group-addon">Label</span>
                <input ng-model="labelFitler" ng-change="labelFilterChange()" type="text" class="form-control" placeholder="Label">
            </div>
        </div>
        <div class="col-lg-3 col-xs-3 col-sm-3">
            <div class="input-group">
                <span class="input-group-addon">OriginalText</span>
                <input ng-model="OriginalTextFitler" ng-change="OriginalTextFilterChange()" type="text" class="form-control" placeholder="OriginalText">
            </div>
        </div>
        <div class="col-lg-3 col-xs-3 col-sm-3">
            <div class="input-group">
                <span class="input-group-addon">TranslateText</span>
                <input ng-model="innerTextFilter" ng-change="innerTextFilterChange()" type="text" class="form-control" placeholder="TranslateText">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 col-xs-12 col-sm-12">
           <span class="label-info" id="status"></span>
        </div>
        <div class="col-lg-12 col-xs-12 col-sm-12 table">

            <table id="translationTable" class="table">
                <caption>To Translate</caption>
                <thead>
                <tr>
                    <th class="col-lg-1 col-xs-1 col-sm-1">ID</th>
                    <th class="col-lg-2 col-xs-2 col-sm-3">Label</th>
                    <th class="col-lg-4 col-xs-4 col-sm-4">Original Text</th>
                    <th class="col-lg-5 col-xs-5 col-sm-5">Translate Text</th>
                </tr>
                </thead>
                <tr ng-repeat=" text in texts">
                    <td>{{text.id}}</td>
                    <td>{{text.label}}</td>
                    <td>{{text.OriginalText}}</td>
                    <td><input type="text" label = {{text.label}} value={{text.innerText}} onchange="angular.element(this).scope().innerTextChange(this)"></td>
                </tr>
            </table>
        </div>
    </div>
    <pre id="output"></pre>
    <div class="row">
        <div class="col-lg-6 col-xs-6 col-sm-6">
            <div class="input-group">
                <label for="result">Results:</label>
                <textarea class="form-control" rows="20" cols="100%" ng-model="result"></textarea>
            </div>
        </div>
        <div class="col-lg-6 col-xs-6 col-sm-6">
            <div class="input-group">
                <label for="remark">Remark:</label>
                <textarea class="form-control" rows="20" cols="100%" id="remark">Puropse: This tool is to modify the mismatched texts.
                    1. some texts in Madarin translation files are not matched texts in English translation files with the same ID.
                    2. some texts have the same ID.
                    Instruction:
                    1. Open the target translation file. Normally,it's the 普通话_ErrorTexts.xml in the subfolder "D:\MBGUI\Language files\普通话",
                    Meanwhile, it can be the English file. when you choose English file, remember to choose TranslateOriention combox.
                    2. Open the source translation file. Normally,it's the English_ErrorTexts.xmlin the subfolder "D:\MBGUI\Language files\English"
                    3. Import the target translation to the list. It will delete duplicated text.
                    4. Overide it with source texts. It will correct the label,OriginalText and translation text with source texts.
                    5. Modify the translation text manually.
                    6. Save the file.
                    Attention:
                    1. Criteria is case sensitives</textarea>
            </div>
        </div>
    </div>


</div>