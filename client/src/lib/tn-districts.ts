// File: client/src/lib/tn-districts.ts
// Description: Canonical list of Tamil Nadu districts with approximate centroid coordinates
// Author: Assistant
// Created: 2025-10-20

export type District = {
  name: string;
  lat: number;
  lon: number;
};

// Approximate district centroids (latitude, longitude). These are close-enough for distance estimation.
export const TAMIL_NADU_DISTRICTS: District[] = [
  { name: "Ariyalur", lat: 11.1400, lon: 79.0700 },
  { name: "Chengalpattu", lat: 12.6928, lon: 79.9766 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Coimbatore", lat: 11.0168, lon: 76.9558 },
  { name: "Cuddalore", lat: 11.7447, lon: 79.7680 },
  { name: "Dharmapuri", lat: 12.1357, lon: 78.1587 },
  { name: "Dindigul", lat: 10.3673, lon: 77.9803 },
  { name: "Erode", lat: 11.3410, lon: 77.7172 },
  { name: "Kallakurichi", lat: 11.7361, lon: 78.9600 },
  { name: "Kanchipuram", lat: 12.8352, lon: 79.7001 },
  { name: "Kanyakumari", lat: 8.0883, lon: 77.5385 },
  { name: "Karur", lat: 10.9601, lon: 78.0766 },
  { name: "Krishnagiri", lat: 12.5192, lon: 78.2138 },
  { name: "Madurai", lat: 9.9252, lon: 78.1198 },
  { name: "Mayiladuthurai", lat: 11.1047, lon: 79.6524 },
  { name: "Nagapattinam", lat: 10.7639, lon: 79.8449 },
  { name: "Namakkal", lat: 11.2190, lon: 78.1674 },
  { name: "Nilgiris", lat: 11.4064, lon: 76.6932 },
  { name: "Perambalur", lat: 11.2333, lon: 78.8833 },
  { name: "Pudukkottai", lat: 10.3810, lon: 78.8200 },
  { name: "Ramanathapuram", lat: 9.3716, lon: 78.8308 },
  { name: "Ranipet", lat: 12.9447, lon: 79.3196 },
  { name: "Salem", lat: 11.6643, lon: 78.1460 },
  { name: "Sivaganga", lat: 9.8450, lon: 78.4810 },
  { name: "Tenkasi", lat: 8.9590, lon: 77.3153 },
  { name: "Thanjavur", lat: 10.7867, lon: 79.1378 },
  { name: "Theni", lat: 10.0104, lon: 77.4768 },
  { name: "Thoothukudi (Tuticorin)", lat: 8.7642, lon: 78.1348 },
  { name: "Tiruchirappalli (Trichy)", lat: 10.7905, lon: 78.7047 },
  { name: "Tirunelveli", lat: 8.7139, lon: 77.7567 },
  { name: "Tirupathur", lat: 12.4966, lon: 78.5718 },
  { name: "Tiruppur", lat: 11.1085, lon: 77.3411 },
  { name: "Thiruvallur", lat: 13.1444, lon: 79.9089 },
  { name: "Thiruvannamalai", lat: 12.2253, lon: 79.0747 },
  { name: "Tiruvarur", lat: 10.7720, lon: 79.6368 },
  { name: "Vellore", lat: 12.9165, lon: 79.1325 },
  { name: "Viluppuram", lat: 11.9394, lon: 79.4924 },
  { name: "Virudhunagar", lat: 9.5851, lon: 77.9579 },
];

export function filterDistricts(query: string): District[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TAMIL_NADU_DISTRICTS.filter(d => d.name.toLowerCase().includes(q)).slice(0, 8);
}

export function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const aa = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}


