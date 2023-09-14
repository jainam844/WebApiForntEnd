import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResourceMenuComponent } from './user-resource-menu.component';

describe('UserResourceMenuComponent', () => {
  let component: UserResourceMenuComponent;
  let fixture: ComponentFixture<UserResourceMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserResourceMenuComponent]
    });
    fixture = TestBed.createComponent(UserResourceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
