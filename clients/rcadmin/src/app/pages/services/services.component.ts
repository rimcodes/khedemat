import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

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
  // [
  //   {
  //     id: 's1',
  //     user: {
  //       id: 'u1',
  //       name: 'sidi',
  //       role: 'worker',
  //       active: true,
  //       phone: '41234567',
  //     },
  //     category: {
  //       id: 'c1',
  //       title: 'Painting',
  //       details: 'Painting houses and offices',
  //       active: true,
  //       image: 'assets/holders/cat2.jpg',
  //     },
  //     title: 'Painting',
  //     image: 'assets/holders/cat1.png'
  //   },
  //   {
  //     id: 's2',
  //     user: {
  //       id: 'u1',
  //       name: 'sidi',
  //       role: 'worker',
  //       active: true,
  //       phone: '41234567',
  //     },
  //     category: {
  //       id: 'c1',
  //       title: 'Painting',
  //       details: 'Painting houses and offices',
  //       active: true,
  //       image: 'assets/holders/cat2.jpg',
  //     },
  //     title: 'Plumming',
  //     image: 'assets/holders/cat2.png'
  //   },
  //   {
  //     id: 's3',
  //     user: {
  //       id: 'u1',
  //       name: 'sidi',
  //       role: 'worker',
  //       active: true,
  //       phone: '41234567',
  //     },
  //     category: {
  //       id: 'c1',
  //       title: 'Painting',
  //       details: 'Painting houses and offices',
  //       active: true,
  //       image: 'assets/holders/cat2.jpg',
  //     },
  //     title: 'Electricity',
  //     image: 'assets/holders/cat2.png'
  //   }
  // ]

  dataSource = new MatTableDataSource(this.services);

  columnsToDisplay = ['title', 'category', 'createdAt'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Service | null;

  constructor(private servicesService: ServicesService) {}

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

}
