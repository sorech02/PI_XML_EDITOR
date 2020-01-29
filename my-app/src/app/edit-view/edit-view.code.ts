import { Reference } from './edit-view.reference';

//code class, has a value, a label, a description, a status and a list of references
export class Code {
  label:string;
  value:string;
  description: string;
  status: string;
  use_age: UseAge;
  use_date: UseDate;
  test_age: string;
  concept_type: string;
  reference : Reference[];
  
  constructor(value: string, label: string, description: string, status: string, use_age: UseAge, use_date: UseDate, test_age: string, concept_type: string) {
    this.label = label;
    this.value = value;
    this.description = description;
    this.status = status;
    this.use_age = use_age;
    this.use_date = use_date;
    this.test_age = test_age;
    this.concept_type = concept_type;
    this.reference = [];
  }

  addReference(ref: Reference) {
    this.reference.push(ref);
  }

  merge(initCode: Code, editedCode: Code) {
    //label:
    if(this.label == initCode.label) { //if we didn't edit the label, we can take the other one
      this.label = editedCode.label;

    } else if(editedCode.label!=initCode.label && editedCode.label!=this.label) { //if both labels have been edited
      this.label = prompt(
        "Auto merge failed for the label:\n"+
        "\tInitial label: " + initCode.label + "\n" +
        "\tYour label: " + this.label + "\n" +
        "\tOther source label: " + editedCode.label + "\n" +
        "\nPlease, select a value: ",
        this.label);
    }

    //description:
    if(this.description == initCode.description) { //if we didn't edit the description, we can take the other one
      this.description = editedCode.description;

    } else if(editedCode.description!=initCode.description && editedCode.description!=this.description){ //if both descriptions have been edited
      this.description = prompt(
        "Auto merge failed for the description:\n"+
        "\tInitial description: " + initCode.description + "\n" +
        "\tYour description: " + this.description + "\n" +
        "\tOther source description: " + editedCode.description + "\n" +
        "\nPlease, select a value: ",
        this.description);
    }

    //status:
    if(this.status == initCode.status) { //if we didn't edit the status, we can take the other one
      this.status = editedCode.status;

    } else if(editedCode.status!=initCode.status && editedCode.status!=this.status){ //if both status have been edited
      this.status = prompt(
        "Auto merge failed for the status:\n"+
        "\tInitial status: " + initCode.status + "\n" +
        "\tYour status: " + this.status + "\n" +
        "\tOther source status: " + editedCode.status + "\n" +
        "\nPlease, select a value: ",
        this.status);
    }

    //use age:
    //not before month
    if(this.use_age.not_before_month == initCode.use_age.not_before_month) { //if we didn't edit the not before month, we can take the other one
      this.use_age.not_before_month = editedCode.use_age.not_before_month;

    } else if(editedCode.use_age.not_before_month!=initCode.use_age.not_before_month && editedCode.use_age.not_before_month!=this.use_age.not_before_month){ //if both not before month have been edited
      this.use_age.not_before_month = +prompt(
        "Auto merge failed for use age: 'not before month':\n"+
        "\tInitial value: " + initCode.use_age.not_before_month + "\n" +
        "\tYour value: " + this.use_age.not_before_month + "\n" +
        "\tOther source value: " + editedCode.use_age.not_before_month + "\n" +
        "\nPlease, select a value: ",
        this.use_age.not_before_month.toString());
    }
    //not after month
    if(this.use_age.not_after_month == initCode.use_age.not_after_month) { //if we didn't edit the not after month, we can take the other one
      this.use_age.not_after_month = editedCode.use_age.not_after_month;

    } else if(editedCode.use_age.not_after_month!=initCode.use_age.not_after_month && editedCode.use_age.not_after_month!=this.use_age.not_after_month){ //if both not after month have been edited
      this.use_age.not_after_month = +prompt(
        "Auto merge failed for use age: 'not after month':\n"+
        "\tInitial value: " + initCode.use_age.not_after_month + "\n" +
        "\tYour value: " + this.use_age.not_after_month + "\n" +
        "\tOther source value: " + editedCode.use_age.not_after_month + "\n" +
        "\nPlease, select a value: ",
        this.use_age.not_after_month.toString());
    }

    //use date:
    //not before:
    if(this.use_date.not_before == initCode.use_date.not_before) { //if we didn't edit the not before, we can take the other one
      this.use_date.not_before = editedCode.use_date.not_before;

    } else if(editedCode.use_date.not_before!=initCode.use_date.not_before && editedCode.use_date.not_before!=this.use_date.not_before){ //if both not before have been edited
      this.use_date.not_before = +prompt(
        "Auto merge failed for use date: 'not before':\n"+
        "\tInitial value: " + initCode.use_date.not_before + "\n" +
        "\tYour value: " + this.use_date.not_before + "\n" +
        "\tOther source value: " + editedCode.use_date.not_before + "\n" +
        "\nPlease, select a value: ",
        this.use_date.not_before.toString());
    }
    //not expected before:
    if(this.use_date.not_expected_before == initCode.use_date.not_expected_before) { //if we didn't edit the not expected before, we can take the other one
      this.use_date.not_expected_before = editedCode.use_date.not_expected_before;

    } else if(editedCode.use_date.not_expected_before!=initCode.use_date.not_expected_before && editedCode.use_date.not_expected_before!=this.use_date.not_expected_before){ //if both not expected before have been edited
      this.use_date.not_expected_before = +prompt(
        "Auto merge failed for use date: 'not expected before':\n"+
        "\tInitial value: " + initCode.use_date.not_expected_before + "\n" +
        "\tYour value: " + this.use_date.not_expected_before + "\n" +
        "\tOther source value: " + editedCode.use_date.not_expected_before + "\n" +
        "\nPlease, select a value: ",
        this.use_date.not_expected_before.toString());
    }
    //not after:
    if(this.use_date.not_after == initCode.use_date.not_after) { //if we didn't edit the not after, we can take the other one
      this.use_date.not_after = editedCode.use_date.not_after;

    } else if(editedCode.use_date.not_after!=initCode.use_date.not_after && editedCode.use_date.not_after!=this.use_date.not_after){ //if both not after have been edited
      this.use_date.not_after = +prompt(
        "Auto merge failed for use date: 'not after':\n"+
        "\tInitial value: " + initCode.use_date.not_after + "\n" +
        "\tYour value: " + this.use_date.not_after + "\n" +
        "\tOther source value: " + editedCode.use_date.not_after + "\n" +
        "\nPlease, select a value: ",
        this.use_date.not_after.toString());
    }
    //not expected after:
    if(this.use_date.not_expected_after == initCode.use_date.not_expected_after) { //if we didn't edit the not expected after, we can take the other one
      this.use_date.not_expected_after = editedCode.use_date.not_expected_after;

    } else if(editedCode.use_date.not_expected_after!=initCode.use_date.not_expected_after && editedCode.use_date.not_expected_after!=this.use_date.not_expected_after){ //if both not expected after have been edited
      this.use_date.not_expected_after = +prompt(
        "Auto merge failed for use date: 'not expected after':\n"+
        "\tInitial value: " + initCode.use_date.not_expected_after + "\n" +
        "\tYour value: " + this.use_date.not_expected_after + "\n" +
        "\tOther source value: " + editedCode.use_date.not_expected_after + "\n" +
        "\nPlease, select a value: ",
        this.use_date.not_expected_after.toString());
    }

    //test age:
    if(this.test_age == initCode.test_age) { //if we didn't edit the test age, we can take the other one
      this.test_age = editedCode.test_age;

    } else if(editedCode.test_age!=initCode.test_age && editedCode.test_age!=this.test_age){ //if both test ages have been edited
      this.test_age = prompt(
        "Auto merge failed for the test age:\n"+
        "\tInitial test age: " + initCode.test_age + "\n" +
        "\tYour test age: " + this.test_age + "\n" +
        "\tOther source test age: " + editedCode.test_age + "\n" +
        "\nPlease, select a value: ",
        this.test_age);
    }

    //concept type:
    if(this.concept_type == initCode.concept_type) { //if we didn't edit the concept type, we can take the other one
      this.concept_type = editedCode.concept_type;

    } else if(editedCode.concept_type!=initCode.concept_type && editedCode.concept_type!=this.concept_type){ //if both concept types have been edited
      this.concept_type = prompt(
        "Auto merge failed for the concept type:\n"+
        "\tInitial concept type: " + initCode.concept_type + "\n" +
        "\tYour concept type: " + this.concept_type + "\n" +
        "\tOther source concept type: " + editedCode.concept_type + "\n" +
        "\nPlease, select a value: ",
        this.concept_type);
    }

    //references:
    editedCode.reference.forEach(ref => {
      var sameRef: boolean = false;
      ref = Object.assign(new Reference("",""), ref);

      sameRef = this.reference.some(refB => {
        return ref.equals(refB);
      });
      
      if(sameRef==false) {//if there is a different reference,
        sameRef = initCode.reference.some(refB => {
          return ref.equals(refB);
        });

        if(sameRef==false) {//and the ref wasn't already there, we add it
          this.reference.push(Object.assign({}, ref));
        }
      }
    });
    initCode.reference.forEach(ref => {
      var sameRef: boolean = false;
      ref = Object.assign(new Reference("",""), ref);

      sameRef = editedCode.reference.some(refB => {
        return ref.equals(refB);
      });

      if(sameRef==false) {//if a reference has been removed, we remove it
        var index = -1;
        for (let i = 0; i < this.reference.length; i++) {
          if(ref.equals(this.reference[i])) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          this.reference.splice(index, 1);
        }
      }
    });
  }

  copy(): Code {
    var use_age = new UseAge();
    use_age.setNotBeforeMonth(this.use_age.not_before_month);
    use_age.setNotAfterMonth(this.use_age.not_after_month);

    var use_date = new UseDate();
    use_date.setNotAfter(this.use_date.not_after);
    use_date.setNotBefore(this.use_date.not_before);
    use_date.setNotExpectedAfter(this.use_date.not_expected_after);
    use_date.setNotExpectedBefore(this.use_date.not_expected_before);

    var code:Code = new Code(this.value, this.label, this.description, this.status, use_age, use_date, this.test_age, this.concept_type);
    this.reference.forEach(ref => {
      code.addReference(ref);
    });

    return code;
  }

  equals(code: Code): boolean {
    var isEqual: boolean = this.value==code.value && this.label==code.label 
      && (this.description==code.description || (this.description!=null && this.description.length==0 && code.description==null) || (code.description!=null && code.description.length==0 && this.description==null))
      && (this.status==code.status || (this.status!=null && this.status.length==0 && code.status==null) || (code.status!=null && code.status.length==0 && this.status==null))
      && (this.test_age==code.test_age || (this.test_age!=null && this.test_age.length==0 && code.test_age==null) || (code.test_age!=null && code.test_age.length==0 && this.test_age==null))
      && (this.concept_type==code.concept_type || (this.concept_type!=null && this.concept_type.length==0 && code.concept_type==null) || (code.concept_type!=null && code.concept_type.length==0 && this.concept_type==null))
      && this.reference.length==code.reference.length;

    if(isEqual) {
      if(!this.use_age || !code.use_age) {
        isEqual = this.use_age==code.use_age;

      } else {
        isEqual = this.use_age.equals(code.use_age);
      }
    }

    if(isEqual) {
      if(!this.use_date || !code.use_date) {
        isEqual = this.use_date==code.use_date;

      } else {
        isEqual = this.use_date.equals(code.use_date);
      }
    }

    if(isEqual) {
      for (let i = 0; i < this.reference.length; i++) {
        var refA: Reference = this.reference[i];
        var sameRef: boolean = false;
        
        refA = Object.assign(new Reference("",""), refA);
        
        sameRef = code.reference.some(refB => {
          return refA.equals(refB);
        });

        if(sameRef == false) {
          isEqual = false;
          break;
        }
      }
    }
    
    return isEqual;
  }

  removeUndifinedAttributes() {
    if(!this.label) {
      this.label = null;
    }
    if(!this.value) {
      this.value = null;
    }
    if(!this.description) {
      this.description = null;
    }
    if(!this.status) {
        this.status = null;
    }
    if(!this.test_age) {
      this.test_age = null;
    }
    if(!this.concept_type) {
      this.concept_type = null;
    }
    if(!this.use_age || this.use_age==null) {
      this.use_age = new UseAge();
    }
    if(!this.use_date || this.use_date==null) {
      this.use_date = new UseDate();
    }

    this.use_age.removeUndifinedAttributes();
    this.use_date.removeUndifinedAttributes();
    this.use_age = Object.assign({}, this.use_age);
    this.use_date = Object.assign({}, this.use_date);
  }

  toString() {
    var result = "Label: " + this.label  + "Value: " + this.value  + "Description: " + this.description  + "Status: " + this.status  + "Reference:" ;
    this.reference.forEach(function(element){
      result += element.toString();
    });
    return result;
  }
}

export class UseAge {
  not_before_month: number;
  not_after_month: number;

  constructor() {
  }

  setNotBeforeMonth(n:number) {
    this.not_before_month = n;
  }

  setNotAfterMonth(n:number) {
    this.not_after_month = n;
  }

  removeUndifinedAttributes() {
    if(!this.not_after_month) {
      this.not_after_month = null;
    }
    if(!this.not_before_month) {
      this.not_before_month = null;
    }
  }

  equals(use_age: UseAge): boolean {
    return this.not_after_month==use_age.not_after_month 
      && this.not_before_month==use_age.not_before_month;
  }

  toString():string{
    return(" not_after_month : " + this.not_after_month + " not_before_month : "+this.not_before_month)
  }
}

export class UseDate {
  not_expected_before: number;
  not_expected_after: number;
  not_before: number;
  not_after: number;
  
  constructor() {

  }

  setNotExpectedBefore(n: number) {
    this.not_expected_before = n;
  }

  setNotExpectedAfter(n: number) {
    this.not_expected_after = n;
  }

  setNotBefore(n: number) {
    this.not_before = n;
  }

  setNotAfter(n: number) {
    this.not_after = n;
  }

  equals(use_date: UseDate): boolean {
    return this.not_after==use_date.not_after && this.not_before==use_date.not_before
      && this.not_expected_after==use_date.not_expected_after && this.not_expected_before==use_date.not_expected_before;
  }

  removeUndifinedAttributes() {
    if(!this.not_after) {
      this.not_after = null;
    }
    if(!this.not_before) {
      this.not_before = null;
    }
    if(!this.not_expected_after) {
      this.not_expected_after = null;
    }
    if(!this.not_expected_before) {
      this.not_expected_before = null;
    }
  }
  
  toString():string{
    return( "not_after :" + this.not_after + " not_before: " + this.not_before +" not_expected_after: " + this.not_expected_after  + " not_expected_before : " + this.not_expected_before);
  }
}