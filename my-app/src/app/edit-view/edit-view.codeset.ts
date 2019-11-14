//codeset class, has a type, a label, and a list of codes
export class Codeset {
    label;
    type;
    codes;
  
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