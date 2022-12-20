import { Component, QueryList, ViewChildren } from '@angular/core';
import { CryptoService } from '../crypto.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IAsset, CryptoAsset } from '../../../../../libs/interfaces/src/lib/crypto-asset';
import { SortableHeaderDirective, SortEvent, compare } from '../sortable-header.directive';

@Component({
  selector: 'asset-price-viewer-assets-table',
  template: `
    <div class='table-container'>
      <div class="form-group">
        <input type="search" class="form-control" [(ngModel)]="filter" placeholder="Filter by name or symbol"
        (input)='p = 1'>
      </div>
      <table class='asset-table'>
        <thead>
          <tr>
            <th scope='col' sortable='name' (sort)='onSort($event)'>Name</th>
            <th scope='col' sortable='symbol' (sort)='onSort($event)'>Symbol</th>
            <th scope='col' sortable='price' (sort)='onSort($event)'>Price</th>
            <th scope='col' sortable='market_cap' (sort)='onSort($event)'>Market Cap</th>
            <th scope='col' sortable='percent_change_24h' (sort)='onSort($event)'>24h% Change</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor='let crypto of cryptoListings | asset:filter | paginate: { itemsPerPage: 10, currentPage: p }'>
            <td class='asset-name'>{{ crypto.name }}</td>
            <td>{{ crypto.symbol }}</td>
            <td>{{ '$' + (crypto.price | number: '1.2-2')?.toString() }}</td>
            <td>{{ '$' + (crypto.market_cap | number: '1.2-2')?.toString() }}</td>
            <td>{{ crypto.percent_change_24h | number: '1.2-2' }}%</td>
         </tr>
        </tbody>
      </table>
    </div>
    <pagination-controls class="table-pagination" (pageChange)="p = $event"></pagination-controls>
  `,
  styleUrls: ['./assets-table.component.scss'],
})
export class AssetsTableComponent {
  public cryptoListings: Array<IAsset>;
  public cryptoListingsCopy: Array<IAsset>;
  public filter: string;
  public p: number;

  @ViewChildren(SortableHeaderDirective)
  private headers!: QueryList<SortableHeaderDirective>;

  constructor(private cryptoService: CryptoService) {
    this.cryptoListings = []
    this.cryptoListingsCopy = []
    this.filter = "";
    this.p = 1
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.fetchAllCryptos();
  }

  fetchAllCryptos() {
    this.cryptoService.getCryptos().subscribe( (res: any) => {
      res.data.forEach((val: CryptoAsset) => {
        const listing: IAsset = Object.create(null);

        listing.id = val.id;
        listing.name = val.name;
        listing.symbol = val.symbol;
        listing.price = val.quote.USD.price;
        listing.market_cap = val.quote.USD.market_cap;
        listing.percent_change_24h = val.quote.USD.percent_change_24h;
        
        this.cryptoListings.push(listing);
      });

      this.cryptoListingsCopy = this.cryptoListings;
    });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  
    if (direction === '' || column === '') {
      this.cryptoListings = this.cryptoListingsCopy;
    } else {
      this.cryptoListings = [...this.cryptoListingsCopy].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
