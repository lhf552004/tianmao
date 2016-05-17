var PCP = PCP || {};
PCP.Importer = PCP.Importer || {};

PCP.Importer.XMLExporter = function () {

}

PCP.Importer.XMLExporter.prototype = (function () {
    var tagName = "",
        prefix = "",
        tagNames = [],
        level = 0,
        rootName = "",
        unitArray = [],
        finalNodeArray = [],
        filesystem;
    var recursionTagName = function ( parent ) {
            if ( !parent ) {
                return;
            }
            var max = parent.children.length;
            var newTagName = "";
            var newFinalNode = {};
            tagName = rootName;
            for ( var i = 0; i < max; i++ ) {
                //every command or status or parameter should be created a finalNode for it
                //the parent is not needed
                var child = parent.children[ i ];
                child[ "uber" ] = parent;
                if ( child.children.length == 0 ) {
                    newTagName = getFullTagName( child );
                    newTagName = prefix + "." + newTagName;
                    newFinalNode = new PCP.Importer.FinalNode();
                    newFinalNode.tagName = newTagName;
                    newFinalNode.address = getAddress();
                    newFinalNode.dataType = PCP.Importer.NodeDataType[ child.dataType ];
                    newFinalNode.clientAccess = child.clientAccess;
                    finalNodeArray.push( newFinalNode );
                }
                else {

                    recursionTagName( child );
                }
            }
            //console.log( finalNodeArray );
        },
        getFullTagName = function ( unit ) {

            if ( unit.uber ) {
                return getFullTagName( unit.uber ) + "." + unit.browseName;
            }
            else {
                return unit.browseName
            }
        },
        getNodes = function () {
            var $deferReady = new $.Deferred();
            webMI.data.call( 'GetObjectsStructure', {}, function ( units ) {
                if ( units.error ) {
                    alert( JSON.stringify( units ) );
                    $deferReady.reject( units );
                } else {
                    unitArray = units;
                    $deferReady.resolve();
                }
            } )
            return $deferReady;
        },
        getAddress = function () {
            //todo
            return "";
        },
        getContents = function () {
            var nodeStr = PCP.Importer.FinalNode.Title;
            var finalNode = {};
            var lineEndSymbol = "\r\n";
            for ( var i = 0, max = finalNodeArray.length; i < max; i++ ) {
                finalNode = finalNodeArray[ i ];
                nodeStr += "\"" + finalNode.tagName + "\"," +
                "\"" + finalNode.address + "\"," +
                finalNode.dataType + "," +
                finalNode.respectDataType + "," +
                finalNode.clientAccess + "," +
                finalNode.scanRate + "," +
                finalNode.scaling + "," +
                finalNode.rawLow + "," +
                finalNode.rawHigh + "," +
                finalNode.scaledLow + "," +
                finalNode.scaledHigh + "," +
                finalNode.scaledDataType + "," +
                finalNode.clampLow + "," +
                finalNode.clampHigh + "," +
                finalNode.engUnits + "," +
                "\"" + finalNode.description + "\"," +
                finalNode.negateValue +
                lineEndSymbol;
            }
            return nodeStr;
        },
        $requestFileSystem = function () {
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
        },
        logerr = function () {
            console.log( e );
        },
        doSave = function ( value, type, name ) {

            var blob;

            if ( typeof window.Blob == "function" ) {

                blob = new Blob( [ value ], { type: type } );

            } else {

                var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;

                var bb = new BlobBuilder();

                bb.append( value );

                blob = bb.getBlob( type );

            }

            var URL = window.URL || window.webkitURL;

            var bloburl = URL.createObjectURL( blob );

            var anchor = document.createElement( "a" );

            if ( 'download' in anchor ) {

                anchor.style.visibility = "hidden";

                anchor.href = bloburl;

                anchor.download = name;

                document.body.appendChild( anchor );

                var evt = document.createEvent( "MouseEvents" );

                evt.initEvent( "click", true, true );

                anchor.dispatchEvent( evt );

                document.body.removeChild( anchor );

            } else if ( navigator.msSaveBlob ) {

                navigator.msSaveBlob( blob, name );

            } else {

                location.href = bloburl;

            }

        };
    return {
        exportToCSVFile: function () {
            getNodes().done( function () {
                var fileName = "plc.csv";
                var type = "text/plain;charset=utf-8";
                var theContents = [];
                var parent = {};
                for ( var i = 0, max = unitArray.length; i < max; i++ ) {
                    tagName = "";
                    prefix = "";
                    parent = unitArray[ i ];
                    level = 0;
                    prefix = "Unit." + parent.typeName;
                    tagNames[ level ] = parent.browseName;
                    rootName = parent.browseName;
                    recursionTagName( parent );
                }
                theContents = getContents();
                $requestFileSystem().done( function () {
                    doSave( theContents, type, fileName );
                } );

            } );

        }
    }
})();
PCP.Importer.NodeDataType = {
    "i=1": "Boolean",
    "i=5": "Word",
    "i=7": "DWord"
}