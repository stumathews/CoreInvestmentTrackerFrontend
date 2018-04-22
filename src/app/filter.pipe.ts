import { Pipe, PipeTransform } from '@angular/core';
import { Investment } from './Models/Investment';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Investment[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => it.name.toLowerCase().includes(searchText));
   }
}
