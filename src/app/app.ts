import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Equipment Installation Check';

  callN8n() {
    fetch(
      'https://hillelsu.app.n8n.cloud/webhook-test/8d3f8c02-f6bc-496b-b4e9-fd6ef7d5762a',
      {
        method: 'POST'
      }
    );
  }
}