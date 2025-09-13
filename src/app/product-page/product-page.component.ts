import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
@Component({
  selector: 'app-product-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];

  filteredProducts: Product[] = [];
  searchTerm = '';
  selectedPrice = 1000;

  minPrice = 100;
  maxPrice = 1000;
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];

    })
  }

  filterProducts(): void {
    const search = this.searchTerm.toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search);
      const withinPrice = product.price <= this.selectedPrice;
      return matchesSearch && withinPrice;
    });
  }
}
