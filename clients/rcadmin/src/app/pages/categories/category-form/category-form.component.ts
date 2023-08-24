import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { SnackMessageComponent } from 'src/app/ui/snack-message/snack-message.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  imageDisplay!: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;

    const categoryFormData = new FormData();

    Object.keys(this.categoryForm).map((key) => {
      categoryFormData.append(key, this.categoryForm[key].value);
    });

    if (this.editMode) {
      // update
      this.updateCategory(categoryFormData);
    } else {
      // create
      this.createCategory(categoryFormData);
    }
  }

  private createCategory(categoryFormData: FormData) {
    this.categoriesService.createCategory(categoryFormData).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.openSnackBar('تم انشاء فإة جديدة', 'انشاء فإة آخرى', 'success');
        timer(4000).subscribe(() => this.location.back());
      },
      error: (err) => {
        this.isSubmitted = false;
        this.openSnackBar('خطأ', 'حدث خطأ ما', 'warn');
        console.log(err);
      },
    });
  }

  private updateCategory(categoryFormData: FormData) {
    this.categoriesService.updateCategory(categoryFormData).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.openSnackBar('تم تعديل فإة جديدة', 'انشاء فإة آخرى', 'success');
        timer(4000).subscribe(() => this.location.back());
      },
      error: (err) => {
        this.isSubmitted = false;
        this.openSnackBar('خطأ', 'حدث خطأ ما', 'warn');
      },
    });
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.categoriesService.getCategory(params['id']).subscribe((res) => {
          this.categoryForm['id'].setValue(res.id);
          this.categoryForm['title'].setValue(res.title);
          this.categoryForm['details'].setValue(res.details);
          this.categoryForm['image'].setValue(res.image);
          this.imageDisplay = res.image;
          this.categoryForm['active'].setValue(res.active);
        });
      }
    });
  }

  // reused code for image upload
  onImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      details: [''],
      image: [''],
      color: [''],
      active: [true],
    });
  }

  openSnackBar(message: string, action: string, status: string) {
    this._snackBar.openFromComponent(SnackMessageComponent, {
      duration: 3 * 1000,
      data: { message, action, status },
    });
  }

  // refactoring getting form controls
  get categoryForm() {
    return this.form.controls;
  }
}
