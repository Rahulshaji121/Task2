import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductPageComponent } from './product-page/product-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,ProductPageComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  searchText:string="";
  priceLimit:number=1000;
}
