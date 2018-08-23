import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Usuario } from '../model/usuario';

// TODO: Replace this with your own data model type
export interface UsuariosItem {
  name: string;
  id: number;
  email: string;
  admin: boolean;
  ultimoLogin: Date;
  ativo: boolean;
  acoes: string;

}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UsuariosItem[] = [
  {id: 1, name: 'Hydrogen', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'icluir'},
  {id: 2, name: 'Helium', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 3, name: 'Lithium', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 4, name: 'Beryllium', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 5, name: 'Boron', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 6, name: 'Carbon', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 7, name: 'Nitrogen', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 8, name: 'Oxygen', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 9, name: 'Fluorine', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 10, name: 'Neon', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 11, name: 'Sodium', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 12, name: 'Magnesium', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 13, name: 'Aluminum', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 14, name: 'Silicon', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 15, name: 'Phosphorus', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 16, name: 'Sulfur', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 17, name: 'Chlorine', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 18, name: 'Argon', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 19, name: 'Potassium', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
  {id: 20, name: 'Calcium', email: 'gpe@gpetec.com.br', admin: true, ultimoLogin: new Date(), ativo: true, acoes:  'incluir'},
];

/**
 * Data source for the Usuarios view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsuariosDataSource extends DataSource<Usuario> {
  // data: UsuariosItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort, private data: Usuario[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Usuario[]> {
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
  private getPagedData(data: Usuario[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Usuario[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.nome, b.nome, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
