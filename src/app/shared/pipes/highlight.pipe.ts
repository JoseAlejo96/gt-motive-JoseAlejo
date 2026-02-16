import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'highlight',
    standalone: true
})
export class HighlightPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string, search: string): SafeHtml {
        if (!search || !value) {
            return value;
        }

        const normalizedValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedSearch = search
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

        if (!normalizedSearch) {
            return value;
        }

        const regex = new RegExp(`(${this.escapeRegex(normalizedSearch)})`, 'gi');
        const highlighted = value.replace(
            regex,
            '<mark class="highlight">$1</mark>'
        );

        return this.sanitizer.sanitize(1, highlighted) || value;
    }

    private escapeRegex(text: string): string {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}