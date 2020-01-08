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
    this.references.forEach(reference => {
      code.addReference(reference);
    });

    return code;
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

    this.use_age.removeUndifinedAttributes();
    this.use_date.removeUndifinedAttributes();
    this.use_age = Object.assign({}, this.use_age);
    this.use_date = Object.assign({}, this.use_date);
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

  removeUndifinedAttributes() {
    if(!this.not_after_month) {
      this.not_after_month = null;
    }
    if(!this.not_before_month) {
      this.not_before_month = null;
    }
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
}