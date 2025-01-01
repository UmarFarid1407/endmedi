import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  medicineName: string;

  @IsNumber()
  medicineQuantity: number;

  @IsString()
  medicineCategory: string;

  @IsNumber()
  priceofonemedicineinTablet: number;

  @IsOptional()
  @IsNumber()
  medicinequantityinonetablet?: number;

  @IsString()
  mediciinemadeIN: string;

  @IsDate()
  medicineExpiryDate: Date;

  @IsNumber()
  sellerID: number;

  @IsDate()
  medicineManufacturingDate: Date;

  @IsOptional()
  @IsNumber()
  mgs?: number;
}
