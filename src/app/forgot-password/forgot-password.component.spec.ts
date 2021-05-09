import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

import { ForgotPasswordComponent } from './forgot-password.component';

let component: ForgotPasswordComponent;
let fixture: ComponentFixture<ForgotPasswordComponent>;

describe('ForgotPasswordComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [ AngularFireAuth, AngularFirestore ],
      declarations: [ ForgotPasswordComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
