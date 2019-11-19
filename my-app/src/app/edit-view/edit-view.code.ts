import { Reference } from './edit-view.reference';
import { Codeset } from './edit-view.codeset';

//code class, has a value, a label, a description, a status and a list of references
export class Code {

    
    label:string;
    value:string;
    description: [];
    status;
    references : Reference[];
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
