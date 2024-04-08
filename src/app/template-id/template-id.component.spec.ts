import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateIdComponent } from './template-id.component';

describe('TemplateIdComponent', () => {
  let component: TemplateIdComponent;
  let fixture: ComponentFixture<TemplateIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateIdComponent]
    });
    fixture = TestBed.createComponent(TemplateIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
