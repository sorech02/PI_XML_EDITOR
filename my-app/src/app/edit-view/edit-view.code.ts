import { Reference } from './edit-view.reference';

//code class, has a value, a label, a description, a status and a list of references
export class Code {
  label:string;
  value:string;
  description: string;
  status: boolean;
  use_age: UseAge;
  use_date: UseDate;
  test_age: string;
  concept_type: string;
  references : Reference[];
  
  constructor(value: string, label: string, description: string, status: boolean, use_age: UseAge, use_date: UseDate, test_age: string, concept_type: string) {
    this.label = label;
    this.value = value;
    this.description = description;
    this.status = status;
    this.use_age = use_age;
    this.use_date = use_date;
    this.test_age = test_age;
    this.concept_type = concept_type;

    this.references = [];
  }
  addReference(reference: Reference) {
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

  
}