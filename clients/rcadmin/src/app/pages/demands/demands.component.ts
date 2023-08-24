import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Demand } from 'src/app/models/demand.model';
import { DemandsService } from 'src/app/services/demands.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DemandsComponent implements OnInit {
  demands: Demand[] = [
    {
      id: 'd1',
      service: {
        active: true,
        isFeatured: true,
        price: 5000,
        id: 's1',
        user: {
          id: 'u1',
          name: 'sidi',
          role: 'worker',
          active: true,
          phone: '41234567',
        },
        category: {
          id: 'c1',
          title: 'Painting',
          details: 'Painting houses and offices',
          active: true,
          image: 'assets/holders/cat2.jpg',
        },
        title: 'Painting',
        image: 'assets/holders/cat1.png'
      },
      worker: {
        id: 'u1',
        name: 'sidi',
        role: 'worker',
        phone: '48484848',
        active: true,
      },
      user: {
        id: 'u2',
        name: 'mohamed',
        role: 'client',
        active: true,
        phone: '41234567',
      },
    },
    {
      id: 'd2',
      service: {
        active: true,
        isFeatured: true,
        price: 5000,
        id: 's1',
        user: {
          id: 'u3',
          name: 'hamed',
          role: 'worker',
          active: true,
          phone: '22112233',
        },
        category: {
          id: 'c2',
          title: 'pluming',
          details: 'plumming houses and offices',
          active: true,
          image: 'assets/holders/cat2.jpg',
        },
        title: 'Painting',
        image: 'assets/holders/cat2.jpg'
      },
      worker: {
        id: 'u1',
        name: 'sidi',
        role: 'worker',
        active: true,
        phone: '41234567',
      },
      user: {
        id: 'u2',
        name: 'mohamed',
        role: 'client',
        active: true,
        phone: '41234567',
      },
    },
    {
      id: 'd2',
      service: {
        active: true,
        isFeatured: true,
        price: 5000,
        id: 's1',
        user: {
          id: 'u1',
          name: 'sidi',
          role: 'worker',
          active: true,
          phone: '41234567',
        },
        category: {
          id: 'c1',
          title: 'Painting',
          details: 'Painting houses and offices',
          active: true,
          image: 'assets/holders/cat2.jpg',
        },
        title: 'Painting',
        image: 'assets/holders/cat3.jpg'
      },
      worker: {
        id: 'u1',
        name: 'sidi',
        role: 'worker',
        active: true,
        phone: '41234567',
      },
      user: {
        id: 'u2',
        name: 'mohamed',
        role: 'client',
        active: true,
        phone: '41234567',
      },
    },
  ];

  // displayedColumns: string[] = ['title', 'client name', 'worker name', 'date', 'last update'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.demands);

  columnsToDisplay = ['id', 'title', 'service', 'client', 'worker', 'updated'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: PeriodicElement | null;

  constructor(private demandsService: DemandsService) {}

  ngOnInit(): void {
    // this.getDemands()
  }

  getDemands() {
    this.demandsService.getAllDemands().subscribe({
      next: (res) => {
        this.demands = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
