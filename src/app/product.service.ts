import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isInStock: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl="http://localhost:5046/api/products";
  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl)
  }
  
  
  getProductById(id: number): Observable<Product> {
    // Filter client-side if API doesn't provide single product endpoint
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.find(p => p.id === id)!)
    );
  }
    getRelatedProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${id}/related`);
  }
  getCategories(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/categories`);
}

  getFilteredProducts(search?: string, category?: string, minPrice?: number, maxPrice?: number): Observable<Product[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set("search", search);
    }
    if (category) {
      params = params.set("category", category);
    }
    if (minPrice !== undefined) {
      params = params.set("minPrice", minPrice.toString());
    }
    if (maxPrice !== undefined) {
      params = params.set("maxPrice", maxPrice.toString());
    }

    return this.http.get<Product[]>(this.apiUrl, { params });
  }}
