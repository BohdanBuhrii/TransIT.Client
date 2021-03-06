import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Malfunction } from '../models/malfunction';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionService extends CrudService<Malfunction> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunction`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/malfunction`;

  protected mapEntity(entity: Malfunction): Malfunction {
    return new Malfunction(entity);
  }
}
