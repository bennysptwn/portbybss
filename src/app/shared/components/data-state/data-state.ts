import { Component, input } from '@angular/core';

@Component({
  selector: 'app-data-state',
  standalone: true,
  templateUrl: './data-state.html',
  styleUrl: './data-state.css'
})
export class DataStateComponent {
  readonly loading = input<boolean>(false);
  readonly error = input<unknown>(null);
  readonly errorMessage = input<string>('Failed to load data.');

  get errorDetails(): string | null {
    const err = this.error();
    if (!err) return null;
    if (typeof err === 'object' && err !== null && 'message' in err) {
      return (err as Error).message;
    }
    return String(err);
  }
}
