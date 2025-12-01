import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Msgpanel } from './msgpanel';

describe('Msgpanel', () => {
  let component: Msgpanel;
  let fixture: ComponentFixture<Msgpanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Msgpanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Msgpanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
