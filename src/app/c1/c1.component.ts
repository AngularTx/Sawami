import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClarityIcons, userIcon, homeIcon, addTextIcon, plusIcon, trashIcon, checkIcon } from '@cds/core/icon';
import { ClrDatagrid, ClrDatagridColumn } from '@clr/angular';
import { Observable } from 'rxjs';
import { DialogService } from '../dialog.service';
import { IProduct, ProductService } from '../product.service';
@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class C1Component implements OnInit {
  @ViewChild('dg', { static: true }) datagrid!: ClrDatagrid;
  @ViewChildren(ClrDatagridColumn) columns!: QueryList<ClrDatagridColumn>;
  form: FormGroup;
  show: boolean = false;
  selected!: IProduct;
  mode!: string;
  products$: Observable<IProduct[]> = this.productsService.products$;
  editProducts: boolean = false;
  addProducts: boolean = false;
  deleteProduct: boolean = false;

  constructor(private dialog: DialogService, private formBuilder: FormBuilder,
    private productsService: ProductService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      barcode: ['', Validators.required],
      active: ['', Validators.required],
      description: ['', []],
      taxes: ['', []],
      cost: ['', [Validators.required]],
      saleprice: ['', [Validators.required]],
      priceIncludeTax: ['', []],
      updated: [''],
      created: ['']
    });
  }
  ngOnInit(): void {
    ClarityIcons.addIcons(userIcon, homeIcon, addTextIcon, plusIcon, trashIcon, checkIcon);
  }

  onAdd() {
    this.show = true;
    this.addProducts = true;
  }

  trackById(index: any, item: any) {
    return item.code;
  }

  isFormValid(): boolean {
    return this.form.invalid;
  }

  cancel() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.show = false;
    this.editProducts = false;
    this.addProducts = false;
    this.deleteProduct = false;
  }

  save() {
    if (this.addProducts) {
      this.form.controls["updated"].setValue(new Date());
      this.form.controls["created"].setValue(new Date());
      this.productsService.addProduct(this.form.value);
    } else {
      this.productsService.editProduct(this.form.controls["code"].value, this.form.value);
    }
    this.show = false;
    this.form.reset();
  }

  onEdit(product: IProduct) {
    this.editProducts = true;
    this.form.reset();
    this.show = true;
    this.form.controls["name"].setValue(product.name);
    this.form.controls["code"].setValue(product.code);
    this.form.controls["barcode"].setValue(product.barcode);
    this.form.controls["active"].setValue(product.active);
    this.form.controls["description"].setValue(product.description);
    this.form.controls["taxes"].setValue(product.taxes);
    this.form.controls["cost"].setValue(product.cost);
    this.form.controls["saleprice"].setValue(product.saleprice);
    this.form.controls["priceIncludeTax"].setValue(product.priceIncludeTax);
    this.form.controls["updated"].setValue(new Date());
    this.form.controls["created"].setValue(product.created);
    this.form.markAllAsTouched();
  }

  onDelete(product: IProduct) {
    this.deleteProduct = true;
    this.selected = product;
  }

  clearFilters() {
   this.columns.forEach(column => column.filterValue = "");
  }

  delete() {
    this.productsService.removeProduct(this.selected);
    this.deleteProduct = false;
  }
}
