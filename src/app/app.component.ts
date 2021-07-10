import { Component } from '@angular/core';
// import { DataService } from 'src/data.service';
// import { productData } from 'src/product_data_services';
// import { product } from 'src/product_data';
// import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../app/products.service'
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  category: any;
  loaded!: boolean;
// holiday:any=[];
  listdata!: MatTableDataSource<any>;
 displayedColumns: string[] = ['product_name','product_cost','product_availability','product_details','product_category'];
  constructor( private fb:FormBuilder, 
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private ProductService: ProductService,
    private actRoute: ActivatedRoute, 
    private ngZone: NgZone,  
    
    ) { }

  ngOnInit(): void {
    this.ProductService.getProduct().subscribe((data: any) => {
      this.category = data;
      this.changeDetectorRefs.detectChanges();
      this.listdata= new MatTableDataSource(this.category);  
      //console.log('HIIII'+this.listdata);
      this.loaded=false;
      console.log(this.category)
    });
  }
  title = 'angularshop';
 
}
