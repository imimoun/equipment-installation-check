import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // Added FormsModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Equipment Installation Check';
  
  // List of equipment
  equipments = ['equipment1', 'equipment2', 'equipment3', 'equipment4', 'equipment5'];
  
  // Track selected value
  selectedEquipment = signal('equipment1');

  callN8n() {
    fetch(
      'https://hillelsu.app.n8n.cloud/webhook-test/8d3f8c02-f6bc-496b-b4e9-fd6ef7d5762a',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          equipment: this.selectedEquipment(),
          timestamp: new Date().toISOString()
        })
      }
    ).then(response => {
      if (response.ok) alert('Webhook sent successfully!');
    });
  }
}