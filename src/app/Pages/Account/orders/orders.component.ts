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
        this.getOrderDescription(this.pendingOrderList[0].Order_Item_ID);
        console.log(res);

      }
    });
  }

  getOrderDescription(Order_Item_ID: number) {
    this.accountService.getOrdersDescription(Order_Item_ID).subscribe((res) => {
      if (res.length > 0) {
        this.orderDescription = res;
        console.log(res);
      }
    });
  }

  isCurrentOrder(Order_Item_ID: number) {
    return this.orderDescription.find((o) => o.Order_Item_ID === Order_Item_ID)
      ? true
      : false;
  }

  getClass(stage: string) {
    const is_Present = this.orderDescription.find(
      (o) => o.Status.toLocaleLowerCase() == stage.toLocaleLowerCase()
    );
    return is_Present ? 'bg-gold-400' : 'bg-gray-400';
  }

  getStageDot(stage: string) {
    const is_Present = this.orderDescription.find(
      (o) => o.Status.toLocaleLowerCase() == stage.toLocaleLowerCase()
    );
    return is_Present ? 'bg-gold-400' : 'bg-gray-400';
  }

  getDateTime(stage:string)
  {
    return this.orderDescription.find((o)=>o.Status.toLocaleLowerCase() == stage.toLocaleLowerCase())?.Status_Timestamp;
  }
  getLocation(stage:string)
  {
    return this.orderDescription.find((o)=>o.Status.toLocaleLowerCase() == stage.toLocaleLowerCase())?.Location;
  }
  
}
