import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInComponent } from './sign-in.component';

let component: SignInComponent;
let fixture: ComponentFixture<SignInComponent>;

describe('SignInComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [ AngularFireAuth, AngularFirestore ],
      declarations: [ SignInComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
