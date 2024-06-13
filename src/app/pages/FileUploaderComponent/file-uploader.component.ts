import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-FileUploaderComponent',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponentComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }  

  // Inyecta el servicio HttpClient en el constructor


uploadFile(file: File) {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);

  this.http.post('/api/upload', formData).subscribe(
    (response) => {
      console.log('Archivo subido correctamente');
      // Realiza las acciones adicionales después de la carga exitosa
    },
    (error) => {
      console.error('Error al subir el archivo:', error);
      // Maneja el error de carga de archivo
    }
  );
}

}




