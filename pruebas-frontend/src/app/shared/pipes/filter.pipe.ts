import { Pipe, PipeTransform } from '@angular/core';
import { Player } from 'src/app/models/player';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<Player>, arg: string): Array<Player> {
    return value.filter(e => `${e.name}${e.federation}${e.ELO}`.includes(arg))
  }

}
