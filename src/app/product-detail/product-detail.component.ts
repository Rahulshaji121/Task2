import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isInStock: boolean;
}
@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!:Product;
  relatedProducts:Product[]=[];

  showDescription=false;
  showSpecification=false;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService
  ){}
  ngOnInit(): void {
    const id=+this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductById(id).subscribe(p=>this.product=p);
     // Fetch related products
    this.productService.getRelatedProducts(id).subscribe(r => this.relatedProducts = r);
  }
 

 
}
