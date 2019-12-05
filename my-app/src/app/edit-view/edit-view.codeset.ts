import { Code } from './edit-view.code'//codeset class, has a type, a label, and a list of codes
import { Identifiers } from '@angular/compiler';
export class Codeset {
    label;
    type;
    code: Code[];

  
    constructor(label, type) {
      this.label = label;
      this.type = type;
      this.code = [];
    
    }
    
    setLabel(str){
      this.label = str;
    }

    addCode(code) {
      this.code.push(code)
    }
  
    toString() {
      var result = "Label: " + this.label + "<br>" + "Type: " + this.type + "<br>" + "Code:" + "<br>";

  
      this.code.forEach(function(element){
        result += element.toString();
      });
      return result;
    }
}