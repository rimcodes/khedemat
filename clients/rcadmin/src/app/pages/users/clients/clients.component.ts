import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { DeleteDialogueComponent } from 'src/app/ui/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {

  users!: User[]

  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplay = ['name', 'phone', 'address', 'createdAt', 'buttons'];
  dataSource = new MatTableDataSource(this.users);


  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClients()
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadClients() {
    this.usersService.getClients().subscribe({
      next: (res) => {
        this.users = res
        this.dataSource = new MatTableDataSource(this.users)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '250px',
      data: { type: 'user', model: user, name: user.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadClients()
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
