import { Component } from '@angular/core';
import { CryptoService } from '../crypto.service';
//import { Test } from '../../../../../libs/interfaces/src/lib/test';

@Component({
  selector: 'asset-price-viewer-assets-table',
  template: `
    <p>assets-table works!</p>
    <p>{{ cryptoListings }}</p>
  `,
  styleUrls: ['./assets-table.component.scss'],
})
export class AssetsTableComponent {
  public cryptoListings: string | undefined;
  constructor(private cryptoService: CryptoService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.cryptoService.getCryptos().subscribe( (res) => {
      this.cryptoListings = JSON.stringify(res);
      console.log(res);
    });
  }
}
