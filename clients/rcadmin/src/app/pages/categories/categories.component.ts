import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { DeleteDialogueComponent } from 'src/app/ui/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories$!: Observable<Category[]>

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.categories$ = this.categoriesService.getAllCategories()
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '250px',
      data: { type: 'category', model: category, name: category.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // user.id = result;
      this.categories$ = this.categoriesService.getAllCategories()
    });
  }


}
