import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ServicesService } from 'src/app/services/services.service';
import { SnackMessageComponent } from 'src/app/ui/snack-message/snack-message.component';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  imageDisplay!: string | ArrayBuffer | null;
  categories$!: Observable<Category[]>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private locationService: Location,
    private servicesService: ServicesService,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.loadStores();
  }

  onSubmit() {
    this.isSubmitted = true;

    const productFormData = new FormData();

    Object.keys(this.serviceForm).map((key) => {
      productFormData.append(key, this.serviceForm[key].value);
    });

    if (this.editMode) {
      // update
      this.updateProduct(productFormData);
    } else {
      // create
      this.createProduct(productFormData);
    }
  }

  loadStores() {
    this.categories$ = this.categoriesService.getAllCategories();
  }

  private createProduct(productFormData: FormData) {
    this.servicesService.createService(productFormData).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.openSnackBar('تم انشاء خدمة جديدة', 'انشاء خدمة آخرى', 'success');
        timer(4000).subscribe(() => this.locationService.back());
      },
      error: (err) => {
        this.isSubmitted = false;
        this.openSnackBar('خطأ', 'حدث خطأ ما', 'warn');
      },
    });
  }

  private updateProduct(productFormData: FormData) {
    this.servicesService.updateService(productFormData).subscribe({
      next: (res) => {
        this.isSubmitted = false
        this.openSnackBar('تم تعديل خدمة جديدة', 'انشاء خدمة آخرى', 'success');
        timer(4000).subscribe(() => this.locationService.back());
      },
      error: (err) => {
        this.isSubmitted = false;
        this.openSnackBar('خطأ', 'حدث خطأ ما', 'success');
      },
    });
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.servicesService.getService(params['id']).subscribe((res) => {
          this.serviceForm['id'].setValue(res.id);
          this.serviceForm['category'].setValue(res.category.id);
          this.serviceForm['title'].setValue(res.title);
          this.serviceForm['price'].setValue(res.price);
          this.serviceForm['details'].setValue(res.details);
          this.serviceForm['active'].setValue(res.active);
          this.serviceForm['isFeatured'].setValue(res.isFeatured);
          this.serviceForm['image'].setValue(res.image);
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
      category: ['', Validators.required],
      title: ['', Validators.required],
      price: [''],
      details: [''],
      active: [true],
      isFeatured: [false],
      image: [''],
    });
  }

  openSnackBar(message: string, action: string, status: string) {
    this._snackBar.openFromComponent(SnackMessageComponent, {
      duration: 3 * 1000,
      data: { message, action, status },
    });
  }

  // refactoring getting form controls
  get serviceForm() {
    return this.form.controls;
  }
}
