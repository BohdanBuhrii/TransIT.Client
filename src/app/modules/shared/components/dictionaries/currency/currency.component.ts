import { Component, OnInit, ViewChild } from '@angular/core';
import { Currency } from '../../../models/currency';
import { CurrencyService } from '../../../services/currency.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  columnDefinitions: string[] = [
    'shortName',
    'fullName'
  ];
  columnNames: string[] = [
    'Абреавіатура',
    'Повна назва'
  ];
  ableToCreate = false;

  @ViewChild('table') table: MatFspTableComponent;
  @ViewChild('actionsTemplate') template: any;

  dataSource: EntitiesDataSource<Currency>;

  constructor(
    private currencyService: CurrencyService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Currency>(this.currencyService);
    if (this.authenticationService.getRole() === 'ADMIN') {
      this.ableToCreate = true;
      this.table.actionContentTemplate = this.template;
    }
  }

  addCurrency(currency: Currency) {
    this.table.loadEntitiesPage();
  }
  deleteCurrency(currency: Currency) {
    this.table.loadEntitiesPage();
  }
}
