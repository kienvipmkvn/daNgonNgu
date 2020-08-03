import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLanguageComponent } from './grid-language.component';

describe('GridLanguageComponent', () => {
  let component: GridLanguageComponent;
  let fixture: ComponentFixture<GridLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
