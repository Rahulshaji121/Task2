import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Product{
  id:number;
  name:string;
  price:number;
  image:string;
}
@Component({
  selector: 'app-product-page',
  imports: [FormsModule,CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  products:Product[]=[
    {
      id:1,name:"Laptop",price:600,image:"img.jpg"
    },
     {
      id:2,name:"Laptop",price:900,image:"img.jpg"
    },
     {
      id:3,name:"Tablet",price:500,image:"img.jpg"
    },
     {
      id:4,name:"mobile",price:700,image:"img.jpg"
    },
     {
      id:5,name:"Headphone",price:800,image:"img.jpg"
    },
  ];

  filteredProducts:Product[]=[];
  searchTerm='';
  selectedPrice=1000;

  minPrice=500;
  maxPrice=1000;

  ngOnInit(): void {
    this.filteredProducts = [...this.products];
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
