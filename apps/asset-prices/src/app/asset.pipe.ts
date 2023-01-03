import { Pipe, PipeTransform } from '@angular/core';
import { IAsset } from '@asset-price-viewer/interfaces';

@Pipe({
  name: 'asset'
})
export class AssetPipe implements PipeTransform {

  transform(values: IAsset[], filter: string): IAsset[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: IAsset) => { 
      return (value.name.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1 
      || value.symbol.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1);
     });
  }

}
