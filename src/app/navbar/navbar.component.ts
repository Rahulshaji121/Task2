import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    cartCount=0;
    constructor(
      private cartService:CartService
    ){}
    ngOnInit(): void {
      this.cartService.cartCoun$.subscribe(count=>{
        this.cartCount=count;
      })
    }
}
