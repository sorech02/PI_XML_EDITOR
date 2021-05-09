//codeset class, has a type, a label, and a list of codes
export class Codeset {
  constructor(label, type) {
    this.label = label;
    this.type = type;
    this.codes = [];
  }


  addCode(code) {
    this.codes.push(code);
  }

  toString() {
    var result = "Label: " + this.label + "<br>" + "Type: " + this.type + "<br>" + "Codes:" + "<br>";

    this.codes.forEach(function(element){
      result += element.toString();
      result += "<br>";
      result += "<br>";
    });
    return result;
  }
}

//code class, has a value, a label, a description, a status and a list of references
class Code {
  constructor(value, label, description, status) {
    this.label = label;
    this.value = value;
    this.description = description;
    this.status = status;
    this.references = [];
  }

  addReference(reference) {
    this.references.push(reference);
  }

  toString() {
    var result = "Label: " + this.label + "<br>" + "Value: " + this.value + "<br>" + "Description: " + this.description + "<br>" + "Status: " + this.status + "<br>" + "References:" + "<br>";

    this.references.forEach(function(element){
      result += element.toString();
    });

    return result;
  }
}

//reference class, has a type and the value of a code
class Reference {
  constructor(type, codeValue) {
    this.type = type;
    this.codeValue = codeValue;
  }

  toString() {
    return "- Type: " + this.type + " - Code: " + this.codeValue + "<br>";
  }
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
  

function createCodesetFromTree(xmlTree) {
  var label = "";
  if(xmlTree.getElementsByTagName("label").length > 0)
    label = xmlTree.getElementsByTagName("label")[0].textContent.toString();

  var type = "";
  if(xmlTree.getElementsByTagName("type").length > 0)
    type = xmlTree.getElementsByTagName("type")[0].textContent.toString();

  codeset = new Codeset(label, type);

  var codesArray = Array.from(xmlTree.getElementsByTagName("code"));
  codesArray.forEach(function(element) {
    code = createCodeFromTree(element);
    codeset.addCode(code);
  });

  return codeset;
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

  code = new Code(codeValue, codeLabel, codeDescription, codeStatus);
  
  if(xmlTree.getElementsByTagName("reference").length > 0)
  {
    var referencesArray = Array.from(xmlTree.getElementsByTagName("reference")[0].children);
    referencesArray.forEach(function(element) {
      reference = createReferenceFromTree(element);
      code.addReference(reference);
    });
  }

  return code;
}

function createReferenceFromTree(xmlTree) {
  var type = "";
  var codeValue = "";

  type = xmlTree.attributes[0].textContent.toString();
  codeValue = xmlTree.textContent.toString();

  reference = new Reference(type, codeValue);

  return reference;
}

function loadAndParseFromUrl(url){
  var xmlDoc = httpGet("https://raw.githubusercontent.com/immregistries/codebase/master/base/sets/Vaccination%20CVX%20Code.xml");
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlDoc, "application/xml");

  var xmlCodeset = xmlDoc.getElementsByTagName("codeset")[0];
  var codeset = createCodesetFromTree(xmlCodeset);
return codeset;
}

 

//we load the xml file and parse it, we get a tree representing the xml
/* 
var xmlDoc = httpGet("https://raw.githubusercontent.com/immregistries/codebase/master/base/sets/Vaccination%20CVX%20Code.xml");
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlDoc, "application/xml");

var xmlCodeset = xmlDoc.getElementsByTagName("codeset")[0];

codeset = createCodesetFromTree(xmlCodeset);
*/
//document.write(codeset.toString());