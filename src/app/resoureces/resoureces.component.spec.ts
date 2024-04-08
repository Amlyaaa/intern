import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourecesComponent } from './resoureces.component';

describe('ResourecesComponent', () => {
  let component: ResourecesComponent;
  let fixture: ComponentFixture<ResourecesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourecesComponent]
    });
    fixture = TestBed.createComponent(ResourecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
