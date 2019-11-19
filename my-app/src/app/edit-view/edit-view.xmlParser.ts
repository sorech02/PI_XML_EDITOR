import { Codeset } from './edit-view.codeset'; 
import { Code } from './edit-view.code'; 
import { Reference } from './edit-view.reference'; 

export class xmlParser {
  url;

  constructor(url) {
    this.url = url;
  }

  getCodeset() {
    return loadAndParseFromUrl(this.url);
  }
}

function loadAndParseFromUrl(url){
  var xmlDoc = httpGet(url);
  var parser = new DOMParser();
  var xmlDoc1 = parser.parseFromString(xmlDoc, "application/xml");

  var xmlCodeset = xmlDoc1.getElementsByTagName("codeset")[0];
  var codeset = createCodesetFromTree(xmlCodeset);
  return codeset;
}

function createReferenceFromTree(xmlTree) {
  var type = "";
  var codeValue = "";

  type = xmlTree.attributes[0].textContent.toString();
  codeValue = xmlTree.textContent.toString();

  var reference = new Reference(type, codeValue);

  return reference;
}

function createCodeFromTree(xmlTree) {
  var codeValue = "";
  var codeLabel = "";
  var codeDescription = "";
  var codeStatus = "";

  if(xmlTree.getElementsByTagName("label").length > 0)
    codeLabel = xmlTree.getElementsByTagName("label")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("value").length > 0)
    codeValue = xmlTree.getElementsByTagName("value")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("description").length > 0)
    codeDescription = xmlTree.getElementsByTagName("description")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("status").length > 0)
    codeStatus = xmlTree.getElementsByTagName("status")[0].textContent.toString();

    var code = new Code( codeValue, codeLabel, codeDescription, codeStatus);
  
  if(xmlTree.getElementsByTagName("reference").length > 0)
  {
    var referencesArray = Array.from(xmlTree.getElementsByTagName("reference")[0].children);
    referencesArray.forEach(function(element) {
      var reference = createReferenceFromTree(element);
      code.addReference(reference);
    });
  }

  return code;
}

function createCodesetFromTree(xmlTree) {
  var label = "";
  if(xmlTree.getElementsByTagName("label").length > 0)
    label = xmlTree.getElementsByTagName("label")[0].textContent.toString();

  var type = "";
  if(xmlTree.getElementsByTagName("type").length > 0)
    type = xmlTree.getElementsByTagName("type")[0].textContent.toString();

  var codeset = new Codeset(label, type);

  var codesArray = Array.from(xmlTree.getElementsByTagName("code"));
  codesArray.forEach(function(element) {
    var code = createCodeFromTree(element);
    codeset.addCode(code);
  });

  return codeset;
}

//load a XML from an URL
function httpGet(theUrl)
{
  var xmlHttp = null;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}