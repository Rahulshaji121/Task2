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
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadCategories(); // fetch categories first
    this.loadProducts();   // fetch products
  }

  // ✅ Load categories from backend
  loadCategories(): void {
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  // ✅ Fetch products with filters
  loadProducts(): void {
    this.productService
      .getFilteredProducts(this.searchTerm, this.selectedCategory, 0, this.selectedPrice)
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.currentPage = 1;
        this.updatePagination();
      });
  }

  // ✅ Filter handlers
  onCategoryChange(): void {
    this.loadProducts();
  }

  onSearchChange(): void {
    this.loadProducts();
  }

  onPriceChange(): void {
    this.loadProducts();
  }

  // ✅ Add product to cart
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // ✅ Pagination logic
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemPerPage);
    const start = (this.currentPage - 1) * this.itemPerPage;
    const end = start + this.itemPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
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
