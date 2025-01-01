export {}; 

export interface Medicine {
  medicineID: number;
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet?: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string;
  medicineManufacturingDate: string; 
}

export interface CartItemType {
  medicineID: number;
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet?: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string; 
  medicineManufacturingDate: string;
  amount: number;        
}
export interface CartItem {
  amount: number;                           
  medicineID: number;                     
  medicineName: string;                    
  medicineQuantity: number;                  
  medicineCategory: string;                 
  priceofonemedicineinTablet: number;       
  medicinequantityinonetablet?: number;      
  mediciinemadeIN: string;                   
  medicineExpiryDate: string;             
  medicineManufacturingDate: string;        
  sellerID: number;                        
  mgs?: number;     
  paymentStatus: string;                     
}

export interface CartItem {
  id: number;
  cartItems: CartItem[];                     
  totalAmount: number;                       
  userID: number;                            
}

export interface UserProfile {
  // title: string;
  // dt1: number;
  // dt2: number;
  // dt3: number;
  firstName: string; 
  lastName: string;
  middleName: string;
  gender: string;
  phoneNumber: string ;
  email: string ;
  password: string ;
  role:string;
  id: number,
}



export interface SignInData {
  email: string;
  password: string;
  role: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: string;

}

export interface MedicineData {
 
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet?: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string; 
  sellerID: number;
  medicineManufacturingDate: string;
}
export interface MedicineFormData {
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet?: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string; 
  sellerID: number;
  medicineManufacturingDate: string;
  medicineID: number; 
}
export interface MedicineFormCreateData {
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet?: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string;
  sellerID: number;
  medicineManufacturingDate: string;
}
export interface Product {
  id: number;
  amount: number;
  userId: number;
  totalAmount: number;
  medicineID: number;
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string;
  sellerID: number;
  medicineManufacturingDate: string;
  mgs: string | null;
  paymentStatus: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}