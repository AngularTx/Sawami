import { ChangeDetectionStrategy, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClarityIcons, userIcon, homeIcon, addTextIcon, plusIcon, filterOffIcon, refreshIcon, importIcon, exportIcon, trashIcon, checkIcon, plusCircleIcon, recycleIcon, filterGridIcon, listIcon, dollarIcon, imageIcon, timesCircleIcon } from '@cds/core/icon';
import { ClrDatagrid, ClrDatagridColumn } from '@clr/angular';
import { Observable } from 'rxjs';
import { DialogService } from '../dialog.service';
import { IProduct, ProductService } from '../product.service';
import * as JsonToXML from "js2xmlparser";
import { NotificationService } from '../notification.service';
import { NotificationType } from '../notification';
@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.scss'],
})
export class C1Component implements OnInit {
  @ViewChild('dg', { static: true }) datagrid!: ClrDatagrid;
  @ViewChild('downloadLink', { static: true }) downloadLink!: ElementRef;
  @ViewChild('file', { static: true }) file!: ElementRef;
  @ViewChildren(ClrDatagridColumn) columns!: QueryList<ClrDatagridColumn>;

  form: FormGroup;
  show: boolean = false;
  selected!: IProduct;
  mode!: string;
  products$: Observable<IProduct[]> = this.productsService.products$;
  editProducts: boolean = false;
  addProducts: boolean = false;
  deleteProduct: boolean = false;
  barcode!: string;
  code!: string;
  imagePath!: any;
  imgURL: any;
  message!: string;
  exportFile!: boolean;

  constructor(private dialog: DialogService, private formBuilder: FormBuilder,
    private productsService: ProductService, private renderer: Renderer2,
    private notificationService: NotificationService) {
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
      created: [''],
      exportType: ['', []]
    });
  }
  ngOnInit(): void {
    ClarityIcons.addIcons(userIcon, homeIcon, addTextIcon, plusIcon, trashIcon, checkIcon, plusCircleIcon, recycleIcon, filterGridIcon, filterOffIcon, refreshIcon, importIcon, exportIcon, listIcon, dollarIcon, imageIcon, timesCircleIcon);
  }

  onAdd() {
    this.show = true;
    this.addProducts = true;
    this.editProducts = false;
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
    this.imgURL = null;
    this.message = '';
    this.exportFile = false;
  }

  save() {
    if (this.addProducts) {
      this.form.controls["updated"].setValue(new Date());
      this.form.controls["created"].setValue(new Date());
      this.productsService.addProduct(this.form.value);
      this.notificationService.sendMessage({
        message: 'Product added successfully',
        type: NotificationType.success
      });
    } else {
      this.productsService.editProduct(this.form.controls["code"].value, this.form.value);
      this.notificationService.sendMessage({
        message: 'Product edited successfully',
        type: NotificationType.success
      });
    }
    this.show = false;
    this.cancel();
    this.imgURL = null;
    this.message = '';

  }

  onEdit(product: IProduct) {
    this.editProducts = true;
    this.addProducts = false;
    this.imgURL = null;
    this.message = '';
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
    this.notificationService.sendMessage({
      message: 'Product deleted successfull',
      type: NotificationType.success
    });
  }

  exporttoExcel() {
    const data = this.datagrid.items.displayed.map((column, index) => {
      return Object.values(column).join(",");
    }).join("\n");

    let anchor = this.renderer.createElement('a');
    this.renderer.setStyle(anchor, 'visibility', 'hidden');
    this.renderer.setAttribute(anchor, 'href', 'data:text/csv;charset=utf-8,' + data);
    this.renderer.setAttribute(anchor, 'target', '_blank');
    this.renderer.setAttribute(anchor, 'download', 'products.csv');
    anchor.click();
    setTimeout(() => {
      this.renderer.removeAttribute(anchor, 'click');
      this.renderer.removeAttribute(anchor, 'remove');
      this.notificationService.sendMessage({
        message: 'Export to excel completed',
        type: NotificationType.success
      });
    }, 5);
  }

  exporttoXml() {
    let anchor = this.renderer.createElement('a');
    this.renderer.setStyle(anchor, 'visibility', 'hidden');
    this.renderer.setAttribute(anchor, 'href', 'data:/xml;charset=utf-8,' + JsonToXML.parse("products", this.datagrid.items.displayed));
    this.renderer.setAttribute(anchor, 'target', '_blank');
    this.renderer.setAttribute(anchor, 'download', 'products.xml');
    anchor.click();
    setTimeout(() => {
      this.renderer.removeAttribute(anchor, 'click');
      this.renderer.removeAttribute(anchor, 'remove');
      this.notificationService.sendMessage({
        message: 'Export to XML completed',
        type: NotificationType.success
      });
    }, 5);
  }

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  cancelexport() {
    this.cancel();
  }

  continueexport() {
    let typeOfExport = this.form.get('exportType')?.value;
    if (typeOfExport) {
      if (typeOfExport === 'csv') {
        this.exporttoExcel();
      } else {
        this.exporttoXml();
      }
      this.exportFile = false;
    }
  }

  exportFiles() {
    this.cancel();
    this.exportFile = true;
  }
}
