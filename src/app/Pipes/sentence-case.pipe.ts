import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase',
})
export class SentenceCasePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    const lines = value.split('. ');
    let capitalizedText = '';

    lines.forEach((item: string, index: number) => {
      capitalizedText += item.charAt(0).toUpperCase() + item.slice(1);

      if (index < lines.length - 1) {
        capitalizedText += '. ';
      }
    });

    return capitalizedText;
  }
}
