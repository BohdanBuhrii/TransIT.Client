import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Issue } from '../../models/issue';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { MatPaginator, MatSort } from '@angular/material';
import { TranslateService, TranslateDefaultParser } from '@ngx-translate/core';
import { MatPaginatorIntlCustom } from '../../paginator-extentions/mat-paginator-intl-custom';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: [
    '../tables/mat-fsp-table/mat-fsp-table.component.scss',
    './issue.component.scss',
  ]
})
export class IssueComponent implements OnInit, AfterViewInit {
  issue: Issue;

  columnDefinitions: string[] = [
    "number",
    "state",
    "malfunctionGroup",
    "malfunctionSubgroup",
    "malfunction",
    "priority",
    "warranty",
    "vehicle",
    "assignee",
    "deadline",
    "location",
    "summary",
    "created",
    "updated"
  ];

  columnsToDisplay: string[];

  dataSource: EntitiesDataSource<Issue>;
  
  sortedColumn: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private issueService: IssueService,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Issue>(this.issueService);
    this.columnsToDisplay = this.columnDefinitions;
    this.columnsToDisplay.push("buttonsColumn");
    this.paginator._intl = new MatPaginatorIntlCustom(this.translate, new TranslateDefaultParser());
    
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.refreshTable();
      })
    ).subscribe();

    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.refreshTable())
    ).subscribe();
  }

  setForAnalyst() {

  }

  setForRegister() {

  }

  setForEngeneer() {

  }

  refreshTable() {
    this.dataSource.loadEntities(
      this.input.nativeElement.value,
      { direction: this.sort.direction, columnDef: this.sort.active },
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.paginator
    );
  }
}
