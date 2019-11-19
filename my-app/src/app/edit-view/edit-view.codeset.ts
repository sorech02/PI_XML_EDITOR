import { Code } from './edit-view.code'//codeset class, has a type, a label, and a list of codes
import { Identifiers } from '@angular/compiler';
export class Codeset {
    label;
    type;
    codes: Code[];

  
    constructor(label, type) {
      this.label = label;
      this.type = type;
      this.codes = [];
    
    }
    
    setLabel(str){
      this.label = str;
    }

    addCode(code) {
      this.codes.push(code)
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