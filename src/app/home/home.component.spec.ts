import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { HomeComponent } from './home.component';

let component: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;

describe('HomeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [ AngularFireAuth, AngularFirestore ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
