import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category.model';
import { Demand } from 'src/app/models/demand.model';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { SnackMessageComponent } from '../snack-message/snack-message.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { ServicesService } from 'src/app/services/services.service';

export interface DialogData {
  type: string
  name: string
  model: User | Category | Service | Demand
}

@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.scss']
})
export class DeleteDialogueComponent implements OnInit {
  durationInSeconds = 3

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private servicesService: ServicesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(id: string ) {
    switch (this.data.type) {
      case 'user':
        this.usersService.deleteUser(id)
          .subscribe({
            next: (res) => {
              this.openSnackBar('لم تمت عمليت الحذف ', 'الذهاب الى لوحة التحكم', 'warning')
              // timer(2000).subscribe(() => this.location.back())
              this.dialogRef.close()
            },
            error: (error) => {
              this.openSnackBar(error.message, 'حدث خطء ما!', 'warning')
              console.log(error)
              // timer(2000).subscribe(() => this.location.back())
            },
          })
        break;
      case 'category':
        this.categoriesService.deleteCategory(id)
          .subscribe({
            next: (res) => {
              this.openSnackBar('لقد تمت عمليت الحذف ', 'الذهاب الى لوحة التحكم', 'success')
              // timer(2000).subscribe(() => this.location.back())
              this.dialogRef.close()
            },
            error: (error) => {
              this.openSnackBar('حدث خطء ما!\n' + error.error.message, 'العودة','warning')
              console.log(error)
              // timer(2000).subscribe(() => this.location.back())
            },
          })
        break;
      case 'service':
        this.servicesService.deleteService(id)
          .subscribe({
            next: (res) => {
              this.openSnackBar('لقد تمت عمليت الحذف ', 'الذهاب الى لوحة التحكم', 'success')
              // timer(2000).subscribe(() => this.location.back())
              this.dialogRef.close()
            },
            error: (error) => {
              this.openSnackBar('حدث خطء ما!\n' + error.error.message, 'العودة','warning')
              console.log(error)
              // timer(2000).subscribe(() => this.location.back())
            },
          })
        break;
      default:
        console.log("No item has been deleted");
        break;
    }
  }

  openSnackBar(message: string, action: string, status: string) {
    this._snackBar.openFromComponent(SnackMessageComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message, action, status}
    });
  }

}
