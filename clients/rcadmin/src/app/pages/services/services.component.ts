import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';
import { DeleteDialogueComponent } from 'src/app/ui/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ServicesComponent implements OnInit {
  services!: Service[]

  dataSource = new MatTableDataSource(this.services);

  columnsToDisplay = ['title', 'category', 'createdAt', 'buttons'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Service | null;

  constructor(private servicesService: ServicesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadServices()

  }

  loadServices() {
    this.servicesService.getAllServices().subscribe({
      next: (res) => {
        this.services = res
        this.dataSource = new MatTableDataSource(this.services);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteService(service: Service) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '250px',
      data: { type: 'service', model: service, name: service.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadServices()
    });
  }
}
