/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersDataListComponent } from './users-data-list.component';

describe('UsersDataListComponent', () => {
  let component: UsersDataListComponent;
  let fixture: ComponentFixture<UsersDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
