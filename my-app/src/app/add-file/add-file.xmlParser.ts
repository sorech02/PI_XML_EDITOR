import { Codeset } from '../edit-view/edit-view.codeset'; 
import { Code, UseAge, UseDate } from '../edit-view/edit-view.code'; 
import { Reference } from '../edit-view/edit-view.reference'; 

export class xmlParser {
  constructor() {
    
  }

  getCodesetWithUrl(url) {
    return loadAndParseFromUrl(url);
  }

  getCodesetWithFile(file){
    return loadAndParseFromFile(file)
  }
}

function loadAndParseFromFile(file){
  console.log("file" + file);
  var parser = new DOMParser();
  var xmlDoc1 = parser.parseFromString(file, "application/xml");

  var xmlCodeset = xmlDoc1.getElementsByTagName("codeset")[0];
  var codeset = createCodesetFromTree(xmlCodeset);
  return codeset;
}

function loadAndParseFromUrl(url){
  var xmlDoc = httpGet(url);
  console.log("url" + xmlDoc);
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
  var codeStatus = null;
  var codeUse_age = new UseAge();
  var codeUse_date = new UseDate();
  var codeTest_age = "";
  var codeConcept_type = "";

  if(xmlTree.getElementsByTagName("label").length > 0)
    codeLabel = xmlTree.getElementsByTagName("label")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("value").length > 0)
    codeValue = xmlTree.getElementsByTagName("value")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("description").length > 0)
    codeDescription = xmlTree.getElementsByTagName("description")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("status").length > 0)
    codeStatus = xmlTree.getElementsByTagName("status")[0].textContent.toString()=="Valid";

  if(xmlTree.getElementsByTagName("test-age").length > 0)
    codeTest_age = xmlTree.getElementsByTagName("test-age")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("concept-type").length > 0)
    codeConcept_type = xmlTree.getElementsByTagName("concept-type")[0].textContent.toString();

  if(xmlTree.getElementsByTagName("not-before").length > 0){
    codeUse_date.setNotBefore(+xmlTree.getElementsByTagName("not-before")[0].textContent.toString());
  }
  if(xmlTree.getElementsByTagName("not-after").length > 0)
    codeUse_date.setNotAfter(+xmlTree.getElementsByTagName("not-after")[0].textContent.toString());

  if(xmlTree.getElementsByTagName("not-expected-before").length > 0)
    codeUse_date.setNotExpectedBefore(+xmlTree.getElementsByTagName("not-expected-before")[0].textContent.toString());

  if(xmlTree.getElementsByTagName("not-expected-after").length > 0)
    codeUse_date.setNotExpectedAfter(+xmlTree.getElementsByTagName("not-expected-after")[0].textContent.toString());

  if(xmlTree.getElementsByTagName("not-before-month").length > 0)
    codeUse_age.setNotBeforeMonth(+xmlTree.getElementsByTagName("not-before-month")[0].textContent.toString());

  if(xmlTree.getElementsByTagName("not-after-month").length > 0)
    codeUse_age.setNotAfterMonth(+xmlTree.getElementsByTagName("not-after-month")[0].textContent.toString());

  var code = new Code( codeValue, codeLabel, codeDescription, codeStatus, codeUse_age, codeUse_date, codeTest_age, codeConcept_type);
  
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
function httpGet(theUrl){

  var xmlHttp = null;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}