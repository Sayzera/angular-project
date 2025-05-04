import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { BottomActionsComponent } from './components/bottom-actions.component';
import { BusService, BusState } from '../../services/bus.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-anasayfa',
  standalone: true,
  templateUrl: './anasayfa.component.html',
  styleUrl: './anasayfa.component.scss',
  imports: [BottomActionsComponent],
})
export class AnasayfaComponent implements OnInit, OnDestroy {
  private map: L.Map | null = null;
  private destroy$ = new Subject<void>();
  private markers: L.Marker[] = [];
  busState: BusState[] = [];
  
  constructor(private busService: BusService) {}

  private generateOffsetCoordinates(baseLat: number, baseLng: number, index: number): [number, number] {
    // Generate small random offsets (within ~100 meters)
    const latOffset = (Math.random() - 0.5) * 0.002;
    const lngOffset = (Math.random() - 0.5) * 0.002;
    
    // Add a small systematic offset based on index to ensure some spread
    const systematicOffset = index * 0.0005;
    
    return [
      baseLat + latOffset + systematicOffset,
      baseLng + lngOffset + systematicOffset
    ];
  }

  ngOnInit() {
    if (!this.map) {
      this.map = L.map('map').setView([39.925533, 32.866287], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);
    }

    this.busService.busState$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.busState = data;
      this.updateMarkers();
    });
  }

  private updateMarkers() {
    // Clear existing markers
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Add new markers for each bus
    this.busState.forEach((bus, index) => {
      const baseLat = parseFloat(bus.konum.enlem);
      const baseLng = parseFloat(bus.konum.boylam);
      const [lat, lng] = this.generateOffsetCoordinates(baseLat, baseLng, index);

      const markerIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<i class="pi pi-car" style="color: #2196F3; font-size: 24px;"></i>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(this.map!);

      // Add popup with bus information
      marker.bindPopup(`
        <strong>Plaka:</strong> ${bus.plaka}<br>
        <strong>Hız:</strong> ${bus.hiz} km/s<br>
        <strong>Adres:</strong> ${bus.adres}
      `);

      this.markers.push(marker);
    });
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
