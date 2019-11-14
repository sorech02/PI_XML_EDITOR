export class Reference {
  
    type; 
    codeValue;
  
    constructor(type, codeValue) {
      this.type = type;
      this.codeValue = codeValue;
    }
  
    toString() {
      return "- Type: " + this.type + " - Code: " + this.codeValue + "<br>";
    }
  }