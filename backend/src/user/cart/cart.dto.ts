import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';

export class CartItemDTO {
  @IsInt()
  @IsNotEmpty()
  medicineID: number;

  @IsInt()
  @IsNotEmpty()
  id: number;

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
  @IsOptional()
  paymentStatus: string;

  @IsDate()
  @IsNotEmpty()
  medicineExpiryDate: Date;

  @IsDate()
  @IsNotEmpty()
  medicineManufacturingDate: Date;

  @IsInt()
  @IsNotEmpty()
  sellerID: number;

  @IsOptional()
  @IsInt()
  mgs?: number;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}

export class CartDTO {
  @IsArray()
  @IsNotEmpty()
  cartItems: CartItemDTO[];

  @IsInt()
  @IsNotEmpty()
  totalAmount: number;

  @IsInt()
  @IsNotEmpty()
  userID: number;
}
