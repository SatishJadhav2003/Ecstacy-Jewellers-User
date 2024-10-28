import { Component, inject } from '@angular/core';
import { AccountService } from '../account.service';
import { OrderInputOutput, Order_Description } from './Order';
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

  orderDescription: Order_Description[] = [];

  ngOnInit() {
    this.accountService.getOrders().subscribe((res) => {
      this.pendingOrderList = res.filter((d) => d.Is_Delivered == false);
      this.deliveredOrderList = res.filter((d) => d.Is_Delivered == true);
      if (this.pendingOrderList?.length > 0) {
        this.getOrderDescription(this.pendingOrderList[0].Order_ID);
      }
    });
  }

  getOrderDescription(Order_ID: number) {
    this.accountService.getOrdersDescription(Order_ID).subscribe((res) => {
      this.orderDescription = res;
    });
  }

  isCurrentOrder(Order_ID: number) {
    return this.orderDescription.find((o) => (o.Order_ID === Order_ID)) ? true:false;
  }
}
