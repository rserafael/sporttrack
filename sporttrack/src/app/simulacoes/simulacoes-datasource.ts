import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface SimulacoesItem {
  id: number;
  criacao: string;
  execucao: string;
  entidades: number;
  indicadores: number;
  acoes: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: SimulacoesItem[] = [
  {id: 1, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 2, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 3, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 4, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 5, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 6, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 7, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 8, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 9, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 10, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 11, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 12, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 13, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 14, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 15, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 16, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 17, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 18, criacao: 'Argo2108-06-08n', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 19, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
  {id: 20, criacao: '2108-06-08', execucao: '2108-06-08', entidades: 33, indicadores: 20, acoes: 'todas'},
];

/**
 * Data source for the Simulacoes view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SimulacoesDataSource extends DataSource<SimulacoesItem> {
  // data: SimulacoesItem[] = EXAMPLE_DATA;
  constructor(private paginator: MatPaginator, private sort: MatSort, private data: any[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SimulacoesItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SimulacoesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SimulacoesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'criacao': return compare(a.criacao, b.criacao, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/criacao columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
