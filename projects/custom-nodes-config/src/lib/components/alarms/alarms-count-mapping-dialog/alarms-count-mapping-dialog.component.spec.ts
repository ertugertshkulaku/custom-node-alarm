import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsCountMappingDialogComponent } from './alarms-count-mapping-dialog.component';

describe('AlarmsCountMappingDialogComponent', () => {
  let component: AlarmsCountMappingDialogComponent;
  let fixture: ComponentFixture<AlarmsCountMappingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsCountMappingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsCountMappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
