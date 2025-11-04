import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignIn } from './auth-sign-in';

describe('AuthSignIn', () => {
  let component: AuthSignIn;
  let fixture: ComponentFixture<AuthSignIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSignIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
