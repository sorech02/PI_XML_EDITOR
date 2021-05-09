import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

import { AddFileComponent } from './add-file.component';

let component: AddFileComponent;
let fixture: ComponentFixture<AddFileComponent>;

describe('AddFileComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [ AngularFireAuth, AngularFirestore ],
      declarations: [ AddFileComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddFileComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
