import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterstatus',
  standalone: true
})
export class FilterStatusPipe implements PipeTransform {
  transform(rides: any[], status: string): any[] {
    return rides.filter(ride => ride.rideStatus === status);
  }
}