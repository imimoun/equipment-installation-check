import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  title = 'Equipment Installation Check';
  
  // Initialize as empty array
  equipments: string[] = [];
  selectedEquipment = signal('');
  
  selectedFile = signal<File | null>(null);

  ngOnInit() {
    this.fetchEquipments();
  }

fetchEquipments() {
    const apiUrl = 'https://yad-sarah.net/lending/wp-json/custom/v1/get_products';
    
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        // 1. Determine if the response itself is the array or if it's inside a property
        let dataArray = Array.isArray(response) ? response : (response.data || response.products || []);

        // 2. Map the data to get the 'name' field
        if (Array.isArray(dataArray)) {
          this.equipments = dataArray.map((item: any) => item.name).filter(name => !!name);
          
          // 3. Set default selection
          if (this.equipments.length > 0) {
            this.selectedEquipment.set(this.equipments[0]);
          }
        } else {
          console.error('API response format not recognized', response);
          this.equipments = ['Format Error'];
        }
      },
      error: (err) => {
        console.error('Failed to load equipments', err);
        this.equipments = ['Error loading equipment'];
      }
    });
  }

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
          videoData: base64File
        })
      }
    ).then(response => {
      if (response.ok) alert('Webhook sent successfully!');
    }).catch(err => {
      alert('Error sending to n8n');
      console.error(err);
    });
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}