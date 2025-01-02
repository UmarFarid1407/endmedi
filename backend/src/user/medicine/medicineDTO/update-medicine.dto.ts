import { IsString, IsOptional, IsInt, IsNumber, IsDate } from 'class-validator';

export class UpdateMedicineDto {
  @IsOptional()
  @IsString()
  medicineName?: string;

  @IsOptional()
  @IsInt()
  medicineQuantity?: number;

  @IsOptional()
  @IsString()
  medicineCategory?: string;

  @IsOptional()
  @IsNumber()
  priceofonemedicineinTablet?: number;

  @IsOptional()
  @IsNumber()
  medicinequantityinonetablet?: number;

  @IsOptional()
  @IsString()
  mediciinemadeIN?: string;

  @IsOptional()
  @IsDate()
  medicineExpiryDate?: Date;

  @IsOptional()
  @IsInt()
  sellerID?: number;

  @IsOptional()
  @IsDate()
  medicineManufacturingDate?: Date;

  @IsOptional()
  @IsNumber()
  mgs?: number;
}
