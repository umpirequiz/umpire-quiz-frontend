import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Subject} from "rxjs";

@Injectable()
export class MyPaginatorConfig implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = $localize `:@@MyPaginatorConfig.firstPageLabel:First`;
  lastPageLabel = $localize`:@@MyPaginatorConfig.lastPageLabel":Last`;
  previousPageLabel = $localize `:@@MyPaginatorConfig.previousPageLabel:Previous`;
  nextPageLabel = $localize `:@@MyPaginatorConfig.nextPageLabel:Next`;
  itemsPerPageLabel = `#`;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return ``;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `${page + 1}/${amountPages}`;
  }
}
