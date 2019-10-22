import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedActuComponent } from './feed-actu.component';

describe('FeedActuComponent', () => {
  let component: FeedActuComponent;
  let fixture: ComponentFixture<FeedActuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedActuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
