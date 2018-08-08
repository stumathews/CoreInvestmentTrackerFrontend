import { Pipe, PipeTransform } from '@angular/core';
import { Investment } from './Models/Investment';
import { DbEntity } from './Models/DbEntity';
import { CustomEntityType } from './Models/CustomEntityType';
import { CustomEntity } from './Models/CustomEntity';
@Pipe({
  name: 'FilterByType'
})
export class FilterByType implements PipeTransform {
  transform(items: CustomEntity[], Type: string): any[] {
    if (!items) { return []; }
    if (!Type) { return items; }
    console.log('filtering out type ' + Type);
    console.log('number of items to filer is: ' + items.length);
    items.forEach(item => console.log('got to filter ' + item.customEntityType.name));
    return items.filter( (it: CustomEntity) => it.customEntityType.name === Type);
   }
}
