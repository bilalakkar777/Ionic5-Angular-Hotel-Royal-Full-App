import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../Model/place.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( users: Place[], text: string ): Place[] {

    if ( text.length === 0 ) { return users; }

    text = text.toLocaleLowerCase();

    return users.filter( user => {
      return user.title.toLocaleLowerCase().includes(text);
    });

  }

}
