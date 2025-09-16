import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isInStock: boolean;
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
  categories: string[] = [];
  selectedCategory = "";
  cart: Product[] = [];
  searchTerm = '';
  selectedPrice = 1000;
  minPrice = 100;
  maxPrice = 1000;

 
  constructor(
    private productService: ProductService,
    private cartService:CartService,

  ) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;

      this.filteredProducts = [...this.products];


      this.categories = [...new Set(this.products.map(p => p.category))]


    })
  }
  onCategoryChange() {
    this.selectedCategory;
    this.filterProducts();
    console.log(this.selectedCategory);

  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    

  }
  filterProducts(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search);
      const checkCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const withinPrice = product.price <= this.selectedPrice;
      return matchesSearch && withinPrice && checkCategory;
    });
  }

}

