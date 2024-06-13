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
  displayedColumns: string[] = ['id', 'role', 'username', 'name', 'apellido1', 'apellido2', 'actions'];
  dataSource = new MatTableDataSource();
  name: string = 'listadoUsuarios.xlsx';
  newValue: string;
  private destroy$ = new Subject<any>();


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

    XLSX.writeFile(book, this.name);
  }

  createQuery(): void {
    const formValue = this.userForm.baseFormQuery.value;
    console.log('formValue = ',formValue)
    this.userSvc.getQuery(formValue).subscribe((users) => {
      this.dataSource.data = users;
      console.log('this.dataSource in query => ', this.dataSource);
    });
  }

  onDelete(userId: number): void {
    if (window.confirm('Do you really want remove this user')) {
      this.userSvc
        .delete(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert(res);
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

}
