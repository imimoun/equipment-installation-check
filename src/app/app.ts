import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Equipment Installation Check';
  
  equipments = ['equipment1', 'equipment2', 'equipment3', 'equipment4', 'equipment5'];
  selectedEquipment = signal('equipment1');
  
  // New: Signal to store the selected file
  selectedFile = signal<File | null>(null);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    }
  }

  async callN8n() {
    if (!this.selectedFile()) {
      alert('Please select a video file first.');
      return;
    }

    // Convert file to Base64 to send via JSON
    const base64File = await this.convertToBase64(this.selectedFile()!);

    fetch(
      'https://hillelsu.app.n8n.cloud/webhook-test/8d3f8c02-f6bc-496b-b4e9-fd6ef7d5762a',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          equipment: this.selectedEquipment(),
          timestamp: new Date().toISOString(),
          videoName: this.selectedFile()?.name,
          videoData: base64File // The encoded file
        })
      }
    ).then(response => {
      if (response.ok) alert('Webhook sent successfully!');
    }).catch(err => {
      alert('Error sending to n8n');
      console.error(err);
    });
  }

  // Helper to convert File to Base64 string
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}