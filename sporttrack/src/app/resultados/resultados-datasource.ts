import { DataSource } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ResultadosItem {
  entidade: string;
  grupo: string;
  ptsPeso: number;
  investimento: number;
  invProporcional: number;
  valorPonto: number;
  agio: number;
}

/**
 * Data source for the Resultados view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ResultadosDataSource extends MatTableDataSource<ResultadosItem> {
  /**
   * Extending MatTableDataSource thus we had to change from private to public access
   * @param paginator 
   * @param sort 
   */
  constructor(public paginator: MatPaginator, public sort: MatSort, public data: ResultadosItem[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   * Bellow methos is commented because we started using this datasource extendo DataSource and not MatTableDataSource
   */
  // connect(): Observable<ResultadosItem[]> {
  //   // Combine everything that affects the rendered data into one update
  //   // stream for the data-table to consume.
  //   const dataMutations = [
  //     observableOf(this.data),
  //     this.paginator.page,
  //     this.sort.sortChange
  //   ];

  //   // Set the paginators length
  //   this.paginator.length = this.data.length;

  //   return merge(...dataMutations).pipe(map(() => {
  //     return this.getPagedData(this.getSortedData([...this.data]));
  //   }));
  // }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ResultadosItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ResultadosItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'entidade': return compare(a.entidade, b.entidade, isAsc);
        case 'id': return compare(+a.ptsPeso, +b.ptsPeso, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/entidade columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
