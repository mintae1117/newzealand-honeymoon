'use client';

import { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { LocationPin, dayCoordinates } from '@/lib/day-coordinates';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapSectionProps {
  dayNumber: number;
}

const MapSection = ({ dayNumber }: MapSectionProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'active' | 'error'>('idle');
  const [gpsError, setGpsError] = useState<string>('');
  const watchIdRef = useRef<number | null>(null);

  const pins: LocationPin[] = dayCoordinates[dayNumber] || [];

  useEffect(() => {
    if (!mapContainerRef.current || pins.length === 0) return;

    // 이미 맵이 있으면 제거
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    // 줌 컨트롤 오른쪽 하단
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 장소 마커
    const locationIcon = L.divIcon({
      className: '',
      html: `<div style="width:28px;height:28px;background:#10b981;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const markers: L.Marker[] = [];
    pins.forEach((pin) => {
      const marker = L.marker([pin.lat, pin.lng], { icon: locationIcon }).addTo(map);
      marker.bindPopup(
        `<div style="font-size:13px;font-weight:600;padding:2px 0">${pin.label}</div>`,
        { closeButton: false, offset: [0, -8] }
      );
      markers.push(marker);
    });

    // 뷰 맞추기
    if (pins.length === 1) {
      map.setView([pins[0].lat, pins[0].lng], 12);
    } else {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.3));
    }

    mapRef.current = map;

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      map.remove();
      mapRef.current = null;
    };
  }, [dayNumber, pins.length]);

  const startGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus('error');
      setGpsError('GPS를 지원하지 않는 브라우저입니다');
      return;
    }

    setGpsStatus('loading');

    const userIcon = L.divIcon({
      className: '',
      html: `<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(59,130,246,0.25),0 2px 4px rgba(0,0,0,0.2)"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    const onSuccess = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      setGpsStatus('active');

      if (mapRef.current) {
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([latitude, longitude]);
        } else {
          userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
            .addTo(mapRef.current)
            .bindPopup(
              '<div style="font-size:13px;font-weight:600;padding:2px 0">내 위치</div>',
              { closeButton: false, offset: [0, -4] }
            );
        }
      }
    };

    const onError = (err: GeolocationPositionError) => {
      setGpsStatus('error');
      if (err.code === 1) {
        setGpsError('위치 권한이 거부되었습니다');
      } else {
        setGpsError('위치를 가져올 수 없습니다');
      }
    };

    watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000,
    });
  };

  const goToMyLocation = () => {
    if (userMarkerRef.current && mapRef.current) {
      const latlng = userMarkerRef.current.getLatLng();
      mapRef.current.setView(latlng, 14);
    }
  };

  if (pins.length === 0) return null;

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <MapPin size={16} />
            위치
          </h2>
          {gpsStatus === 'idle' && (
            <button
              onClick={startGps}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-blue-500 active:opacity-60 transition-colors px-2 py-1 rounded-lg"
            >
              <Navigation size={12} />
              <span>내 위치</span>
            </button>
          )}
          {gpsStatus === 'loading' && (
            <span className="flex items-center gap-1 text-xs text-zinc-400 px-2 py-1">
              <Loader2 size={12} className="animate-spin" />
              <span>위치 확인 중...</span>
            </span>
          )}
          {gpsStatus === 'active' && (
            <button
              onClick={goToMyLocation}
              className="flex items-center gap-1 text-xs text-blue-500 active:opacity-60 transition-colors px-2 py-1 rounded-lg"
            >
              <Navigation size={12} />
              <span>내 위치로</span>
            </button>
          )}
          {gpsStatus === 'error' && (
            <span className="text-xs text-red-400 px-2 py-1">{gpsError}</span>
          )}
        </div>
        {/* 장소 태그 */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {pins.map((pin, i) => (
            <button
              key={i}
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.setView([pin.lat, pin.lng], 14);
                }
              }}
              className="text-[11px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md active:opacity-60 transition-opacity"
            >
              {pin.label}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={mapContainerRef}
        className="w-full h-52 z-0"
      />
    </section>
  );
};

export default MapSection;
