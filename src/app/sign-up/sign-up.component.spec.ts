import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { SignUpComponent } from './sign-up.component';

let component: SignUpComponent;
let fixture: ComponentFixture<SignUpComponent>;

describe('SignUpComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [ AngularFireAuth, AngularFirestore ],
      declarations: [ SignUpComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
