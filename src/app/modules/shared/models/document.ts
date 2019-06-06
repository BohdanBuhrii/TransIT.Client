import { IssueLog } from './issuelog';
import { TEntity } from '../../core/models/entity/entity';
import { User } from './user';

export class Document extends TEntity<Document> {
  name?: string;
  description?: string;
  issueLog?: IssueLog;
  file?: File;
  mod?: User;
  modDate?: Date;
  path?: string;

  constructor(document: Partial<Document>) {
    super(document);
    this.mod = new User(this.mod);
  }
}
