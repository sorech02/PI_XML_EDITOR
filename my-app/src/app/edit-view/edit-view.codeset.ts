import { Code } from './edit-view.code'//codeset class, has a type, a label, and a list of codes

export class Codeset {

    label: string;
    type: string;
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
    
    update(str,code){
      var n=0
      for (let mycode of this.code){
          if(str==mycode.label){
            this.code[n]=code}
          n++;
      }
    }

    sortCodes() {
      this.code.sort((c1,c2) => {
        if(c1.label.toLowerCase() > c2.label.toLowerCase()) {
          return 1;
        } else if(c1.label.toLowerCase() < c2.label.toLowerCase()) {
          return -1;
        } else {
          return 0
        }
      });
    }

    toString() {
      var result = "Label: " + this.label + "<br>" + "Type: " + this.type + "<br>" + "Code:" + "<br>";

  
      this.code.forEach(function(element){
        result += element.toString();
      });
      return result;
    }
}