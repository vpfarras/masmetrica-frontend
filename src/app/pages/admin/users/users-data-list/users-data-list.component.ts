import { takeUntil } from 'rxjs/operators';
import { UsersService } from './../../services/users.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../../components/modal/modal.component';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-users-data-list',
  templateUrl: './users-data-list.component.html',
  styleUrls: ['./users-data-list.component.scss']
})
export class UsersDataListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'role', 'username', 'name', 'apellidos', 'sexo', 'provincia', 'municipio', 'codigo_postal', 'numero_hijos', 'ingresos_mensuales', 'condiciones_legales', 'resetToken', 'created_at', 'updated_at', 'telefono', 'is_valid', 'verifyToken', 'fecha_nacimiento', 'ccaa', 'ocupacion', 'vive_con', 'nivel_estudios', 'clase_social', 'fecha_nacimiento_hijo1', 'fecha_nacimiento_hijo2', 'fecha_nacimiento_hijo3', 'source', 'region', 'areas_nielsen', 'poblacion_2021', 'hombres', 'mujeres', 'user_invite', 'friend_register'];
  dataSource = new MatTableDataSource();
  name: string = 'listadoUsuarios.xlsx';
  newValue: string;
  private destroy$ = new Subject<any>();
  queryAll: any;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private userSvc: UsersService,
    public userForm: BaseFormUser, 
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userSvc.getAll().subscribe((users) => {
      this.dataSource.data = users;
      console.log('this.dataSource in table => ', this.dataSource);
    });
    this.newValue = 'userRepository.createQueryBuilder("user").where("user.name = :name", { name: "Vicente" }).andWhere("user.username = :id", { id: "user@test.com" }).getMany()'
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  exportToExcel(): void {
    let element = document.getElementById('tabla-listado-usuarios');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    console.log('book', book);

    XLSX.writeFile(book, this.name);
  }

  createQuery(all?: boolean): void {
  if (all) {
    const queryAll = {
      formQuery: "SELECT * FROM users"
    };
    this.userSvc.getQuery(queryAll).subscribe((users) => {
      this.queryAll = users;
      console.log('Resultados para "all":', this.queryAll);
      this.exportAllToExcel(this.queryAll);
    });
  } else {
    // Accede correctamente al control `formQuery` y obtén su valor
    const formValue = this.userForm.baseFormQuery.get('formQuery')?.value.trim();

    if (!formValue) {
      console.error("El campo de consulta está vacío.");
      return;
    }

    const query = {
      formQuery: formValue
    };

    console.log('Consulta enviada:', query);

    this.userSvc.getQuery(query).subscribe((users) => {
      this.dataSource.data = users;
      console.log('Resultados:', this.dataSource.data);
    });
  }
}

  
  
  

  onDelete(userId: number): void {
    if (window.confirm('Do you really want remove this user')) {
      this.userSvc
        .delete(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          
          // Update result after deleting the user.
          this.userSvc.getAll().subscribe((users) => {
            this.dataSource.data = users;
          });
        });
    }
  }

  onOpenModal(user = {}): void {
    console.log('User->', user);
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New user', user },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`, typeof result);
      // Update result after adding new user.
      this.userSvc.getAll().subscribe((users) => {
        this.dataSource.data = users;
      });
    });
  }

  // Método para exportar los datos a un archivo Excel
exportAllToExcel(usersData: any[]): void {
  // Preparar los datos para el archivo Excel
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(usersData);
  const workbook: XLSX.WorkBook = { Sheets: { 'Usuarios': worksheet }, SheetNames: ['Usuarios'] };

  // Generar archivo Excel
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Crear un objeto Blob con los datos del archivo Excel
  const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // Descargar el archivo Excel
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  link.href = url;
  link.download = 'usuarios.xlsx'; // Nombre del archivo
  link.click();
  window.URL.revokeObjectURL(url); // Limpiar la URL creada
}

}
