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

      <div class='table-responsive'>
        <table class='asset-table'>
          <thead>
            <tr>
              <th scope='col' sortable='name' (sort)='onSort($event)'>Name</th>
              <th scope='col' sortable='symbol' (sort)='onSort($event)'>Symbol</th>
              <th scope='col' sortable='price' (sort)='onSort($event)'>Price</th>
              <th scope='col' sortable='market_cap' (sort)='onSort($event)'>Market Cap</th>
              <th scope='col' sortable='percent_change_24h' (sort)='onSort($event)'>24H% Change</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor='let crypto of cryptoListings | asset:filter | paginate: { itemsPerPage: 25, currentPage: p }'>
              <th scope='row' class='asset-name'>{{ crypto.name }}</th>
              <td data-label='Symbol'>{{ crypto.symbol }}</td>
              <td data-label='Price'>{{ '$' + (crypto.price | number: '1.2-2')?.toString() }}</td>
              <td data-label='Market Cap'>{{ '$' + abbreviateNumber(crypto.market_cap) }}</td>
              <td data-label='24H% Change' [ngStyle]="{'color': crypto.percent_change_24h >= 0 ? 'green' : 'red'}">{{ crypto.percent_change_24h | number: '1.2-2' }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Temp, loading indicator -->
    <div *ngIf='isLoading' class="center-page">
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
      </div>
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
  public isLoading: boolean;

  @ViewChildren(SortableHeaderDirective)
  private headers!: QueryList<SortableHeaderDirective>;

  constructor(private cryptoService: CryptoService) {
    this.cryptoListings = []
    this.cryptoListingsCopy = []
    this.filter = "";
    this.p = 1;
    this.isLoading = true;
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
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
      this.isLoading = false;
    });
  }

  abbreviateNumber(val: number) {
    // Nine Zeroes for Billions
    return Math.abs(Number(val)) >= 1.0e+9

    ? (Math.abs(Number(val)) / 1.0e+9).toFixed(2) + 'B'
    // Six Zeroes for Millions 
    : Math.abs(Number(val)) >= 1.0e+6

    ? (Math.abs(Number(val)) / 1.0e+6).toFixed(2) + 'M'
    // Three Zeroes for Thousands
    : Math.abs(Number(val)) >= 1.0e+3

    ? (Math.abs(Number(val)) / 1.0e+3).toFixed(2) + 'K'

    : Math.abs(Number(val));
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
