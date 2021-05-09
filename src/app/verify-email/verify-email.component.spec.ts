import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

import { VerifyEmailComponent } from './verify-email.component';

let component: VerifyEmailComponent;
let fixture: ComponentFixture<VerifyEmailComponent>;

describe('VerifyEmailComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [ AngularFireAuth, AngularFirestore ],
      declarations: [ VerifyEmailComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
