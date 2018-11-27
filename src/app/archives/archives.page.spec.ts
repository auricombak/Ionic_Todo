import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ArchivesPage } from './archives.page';

describe('ArchivesPage', () => {
  let component: ArchivesPage;
  let fixture: ComponentFixture<ArchivesPage>;
  let archivesPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(ArchivesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    archivesPage = fixture.nativeElement;
    const items = archivesPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
