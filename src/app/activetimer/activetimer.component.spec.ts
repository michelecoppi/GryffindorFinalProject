import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivetimerComponent } from './activetimer.component';

describe('ActivetimerComponent', () => {
  let component: ActivetimerComponent;
  let fixture: ComponentFixture<ActivetimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivetimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivetimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
