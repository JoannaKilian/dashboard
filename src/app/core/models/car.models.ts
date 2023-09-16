export interface Car {
  id: string,
  brand: string,
  model: string,
  productionYear: number,
  color?: string,
  insuranceDate: string,
  carInspection: string;
  engineCapacity?: number,
  registrationNumber?: number,
}