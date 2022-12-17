import { Component } from '@angular/core';
import { CryptoService } from '../crypto.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CryptoAsset } from '../../../../../libs/interfaces/src/lib/crypto-asset';

@Component({
  selector: 'asset-price-viewer-assets-table',
  template: `
    <table class='asset-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>24h% Change</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor='let crypto of cryptoListings'>
          <td class='asset-name'>{{ crypto.name }}</td>
          <td>{{ crypto.symbol }}</td>
          <td>{{ '$' + (crypto.quote.USD.price | number: '1.2-2')?.toString() }}</td>
          <td>{{ '$' + (crypto.quote.USD.market_cap | number: '1.2-2')?.toString() }}</td>
          <td>{{ crypto.quote.USD.percent_change_24h | number: '1.2-2' }}%</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./assets-table.component.scss'],
})
export class AssetsTableComponent {
  public cryptoListings: CryptoAsset[] | undefined;

  constructor(private cryptoService: CryptoService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.fetchAllCryptos();
  }

  fetchAllCryptos() {
    this.cryptoService.getCryptos().subscribe( (res: any) => {
      this.cryptoListings = res.data;
      console.log(res.data);
    });
  }
}
