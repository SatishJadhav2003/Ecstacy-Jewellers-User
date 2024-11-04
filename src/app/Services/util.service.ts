import { inject, Injectable, signal, Signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  Title = signal("Jeweller's King");
  titleServices = inject(Title)
  readonly _toastr = inject(ToastrService);

  changeTitle(newTitle: string) {
    this.Title.set(newTitle);
    this.titleServices.setTitle(this.Title());
  }

  // Notifications
  success(message:string,time?:number)
  {
    this._toastr.success(message,'',{
      timeOut: time?time:1500,
      positionClass:'toast-bottom-center',
      
    })
  }

  error(message:string,time?:number)
  {
    this._toastr.error(message,'',{
      timeOut: time?time:1500,
      positionClass:'toast-bottom-center',
      
    })
  }

  warn(message:string,time?:number)
  {
    this._toastr.warning(message,'',{
      timeOut: time?time:1500,
      positionClass:'toast-bottom-center',
      
    })
  }


}
