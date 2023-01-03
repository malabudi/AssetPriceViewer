import { Directive, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';
import { IAsset } from '@asset-price-viewer/interfaces';

export type SortColumn = keyof IAsset | '';
export type SortDirection = 'asc' | 'desc' | '';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export const compare = (
  v1: string | number | { USD: { price: number; market_cap: number; percent_change_24h: number; }; },
  v2: string | number | { USD: { price: number; market_cap: number; percent_change_24h: number; }; }
) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'th[sortable]'
})
export class SortableHeaderDirective {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc')
  get asc(): boolean {
    return this.direction === 'asc';
  }

  @HostBinding('class.desc')
  get desc(): boolean {
    return this.direction === 'desc';
  } 

  @HostListener('click') 
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
