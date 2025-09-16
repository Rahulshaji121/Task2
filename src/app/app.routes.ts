import { Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


export const routes: Routes = [
    {path:'', component:ProductPageComponent},
    {path:'cart', component:CartPageComponent},
    {path:'product/:id', component:ProductDetailComponent}

];
