import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface BusState {
  id: number;
  plaka: string;
  mesafe: number;
  hiz: number;
  konum: {
    enlem: string;
    boylam: string;
  };
  color: string;
  tarih: string;
  adres: string;
  type: 'add' | 'update';
}

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private busState = new BehaviorSubject<BusState[] | []>([]);
  busState$ = this.busState.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<BusState[]>('/data/vehicles.json').subscribe({
      next: (data) => {
        this.busState.next(data);
      },
      error: (error) => {
        console.error('Error loading vehicle data:', error);
        this.busState.next([]);
      },
    });
  }

  addVehicle(vehicle: BusState) {
    const currentVehicles = this.busState.value;
    const newVehicle = {
      ...vehicle,
      id: currentVehicles.length + 1 
    };
    this.busState.next([newVehicle,...currentVehicles]);
  }

  updateVehicle(vehicle: BusState) {
    const updatedVehicle = vehicle;
    this.busState.next(this.busState.value.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
  }

  deleteVehicle(id: number) {
    const currentVehicles = this.busState.value;
    this.busState.next(currentVehicles.filter(v => v.id !== id));
  }
}
