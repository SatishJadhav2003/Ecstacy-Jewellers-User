import { Component, inject } from '@angular/core';
import { AccountService } from '../account.service';
import { OrderInputOutput } from './Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  accountService = inject(AccountService);

  pendingOrderList: OrderInputOutput[] = [];
  deliveredOrderList: OrderInputOutput[] = [];

  ngOnInit()
  {
    this.accountService.getOrders().subscribe((res)=>{
      this.pendingOrderList =res.filter((d)=>d.Status != 'Delivered');
      this.deliveredOrderList =res.filter((d)=>d.Status == 'Delivered');
    })
  }
}
