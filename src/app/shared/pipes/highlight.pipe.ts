import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'highlight',
    standalone: true
})
export class HighlightPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string, search: string): SafeHtml {
        if (!search?.trim() || !value) {
            return value;
        }

        const normalizedValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedSearch = search
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

        // Buscar la posición de la coincidencia en el texto normalizado
        const index = normalizedValue.toLowerCase().indexOf(normalizedSearch);

        if (index === -1) {
            return value;
        }

        // Extraer la parte exacta del texto original
        const before = value.substring(0, index);
        const match = value.substring(index, index + normalizedSearch.length);
        const after = value.substring(index + normalizedSearch.length);

        const highlighted = `${before}<mark class="highlight">${match}</mark>${after}`;

        return this.sanitizer.bypassSecurityTrustHtml(highlighted);
    }
}