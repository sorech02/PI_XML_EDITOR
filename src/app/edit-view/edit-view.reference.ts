export class Reference {  
    type: string; 
    codeValue: string;
  
    constructor(type: string, codeValue: string) {
      this.type = type;
      this.codeValue = codeValue;
    }
  
    toString() {
      return "- Type: " + this.type + " - Code: " + this.codeValue ;
    }

    equals(ref: Reference): boolean {
      return this.type==ref.type && this.codeValue==ref.codeValue;
    }
  }