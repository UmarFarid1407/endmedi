import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CartItemDTO {
  @IsInt()
  @IsNotEmpty()
  userID: number;

  @IsInt()
  @IsNotEmpty()
  medicineID: number;

  @IsString()
  @IsNotEmpty()
  medicineName: string;

  @IsInt()
  @IsNotEmpty()
  medicineQuantity: number;

  @IsString()
  @IsNotEmpty()
  medicineCategory: string;

  @IsInt()
  @IsNotEmpty()
  priceofonemedicineinTablet: number;

  @IsOptional()
  @IsInt()
  medicinequantityinonetablet?: number;

  @IsString()
  @IsNotEmpty()
  mediciinemadeIN: string;

  @IsString()
  @IsNotEmpty()
  medicineExpiryDate: string;

  @IsString()
  @IsNotEmpty()
  medicineManufacturingDate: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;
}
