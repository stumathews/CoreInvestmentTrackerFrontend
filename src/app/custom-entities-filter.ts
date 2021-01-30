import { Pipe, PipeTransform } from '@angular/core';
import { Investment } from './Models/Investment';
import { DbEntity } from './Models/DbEntity';
import { CustomEntityType } from './Models/CustomEntityType';
import { CustomEntity } from './Models/CustomEntity';

@Pipe({
  name: 'FilterByType',
  pure: false /* performance hit but going to deal with it */
})
export class FilterByType implements PipeTransform {
  transform(items: CustomEntity[], Type: string): any[] {
    if (!items) { return []; }
    if (!Type) { return items; }
    const i =  items.filter( (it: CustomEntity) => it.customEntityType.name === Type);
    return i;
   }
}
