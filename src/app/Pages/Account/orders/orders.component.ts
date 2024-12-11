import { Component, inject } from '@angular/core';
import { AccountService } from '../account.service';
import { OrderInputOutput, Order_Description } from './Order';
import { CommonModule } from '@angular/common';
import { OrderDescComponent } from './order-desc/order-desc.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderDescComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  accountService = inject(AccountService);

  pendingOrderList: OrderInputOutput[] = [];
  deliveredOrderList: OrderInputOutput[] = [];
  selectedOrder_Item_ID: number = 0;
  isPopupVisible: boolean = false;
  ngOnInit() {
    this.accountService.getOrders().subscribe((res) => {
      this.pendingOrderList = res.filter((d) => d.Is_Delivered == false);
      this.deliveredOrderList = res.filter((d) => d.Is_Delivered == true);
      // if (this.pendingOrderList?.length > 0) {
      //   this.getOrderDescription(this.pendingOrderList[0].Order_Item_ID);
      //   console.log(res);
      // }
    });
  }

  getOrderDescription(Order_Item_ID: number) {
    this.selectedOrder_Item_ID = Order_Item_ID;
    if (window.innerWidth < 768) {
      this.isPopupVisible = true;
    }
  }

  isCurrentOrder(Order_Item_ID: number) {
    return Order_Item_ID === this.selectedOrder_Item_ID
      ? true
      : false;
  }
  closePopup(): void {
    this.isPopupVisible = false;
  }
}