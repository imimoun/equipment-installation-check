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
    console.log('Calling n8n workflow...');
    // Add your webhook logic here:
    // fetch('YOUR_N8N_WEBHOOK_URL', { method: 'POST' });
  }
}