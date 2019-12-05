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
      var result = "Label: " + this.label  + "Value: " + this.value  + "Description: " + this.description  + "Status: " + this.status  + "References:" ;
  
      this.references.forEach(function(element){
        result += element.toString();
      });
  
      return result;
    }
  }
