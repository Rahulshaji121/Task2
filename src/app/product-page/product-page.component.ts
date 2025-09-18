import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';


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
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  categories: string[] = [];
  selectedCategory = "";
  searchTerm = '';
  selectedPrice = 1000;

  currentPage = 1;
  itemPerPage = 4;
  totalPages = 1;
  paginatedProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,

  ) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;

      this.filteredProducts = [...this.products];


      this.categories = [...new Set(this.products.map(p => p.category))]
      this.updatePagination();

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
    this.currentPage=1;
    this.updatePagination();
  }
 updatePagination() {
  this.totalPages = Math.ceil(this.filteredProducts.length / this.itemPerPage);
  const start = (this.currentPage - 1) * this.itemPerPage;
  const end = start + this.itemPerPage;
  this.paginatedProducts = this.filteredProducts.slice(start, end);
  console.log(this.paginatedProducts);
  
}
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

   changePageSize(event: any): void {
    this.itemPerPage = +event.target.value;
    this.currentPage = 1;
    this.updatePagination();
  }
}

