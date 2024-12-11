import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { Order_Description } from '../Order';
import { AccountService } from '../../account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-desc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-desc.component.html',
  styleUrl: './order-desc.component.css'
})
export class OrderDescComponent {
@Input() Order_Item_ID:number =0;

  accountService = inject(AccountService);
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Order_Item_ID'] && !changes['Order_Item_ID'].isFirstChange()) {
      const newOrderID = changes['Order_Item_ID'].currentValue;
      this.getOrderDescription(newOrderID);
    }
  }

  ngOnInit()
  {
    this.getOrderDescription(this.Order_Item_ID);
  }

  orderDescription: Order_Description[] = [];
  getOrderDescription(Order_Item_ID: number) {
    this.accountService.getOrdersDescription(Order_Item_ID).subscribe((res) => {
      if (res.length > 0) {
        this.orderDescription = res;
        console.log(res);
      }
    });
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
