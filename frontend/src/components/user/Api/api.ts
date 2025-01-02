import axios from 'axios';
import { Medicine , CartItemType, SignInData,SignUpData, MedicineData } from '../Dashboards/types/types';
import { decodeToken } from '../../../sharedimports/auth';
import { Console } from 'console';
import CartItem from '../MedCart/CartItem/CartItem';
const API_URL_SIGN_IN = 'http://localhost:5000/users/login';
const API_URL_SIGN_UP = 'http://localhost:5000/users/sign-up';
const API_URL_MEDICINES = 'http://localhost:5000/medicines'; 
const API_URL_ORDER = 'http://localhost:5000/cart'; 
const API_URL_USER = 'http://localhost:5000/users';
const API_URL= 'http://localhost:5000/webhook';

//for all members

export const signIn = async (data: SignInData) => {
  try {
    const response = await axios.post(API_URL_SIGN_IN, data);
    const token = response.data.accessToken;

    localStorage.setItem('authToken', token);
    return response.data;
  } catch (error: any) {
    console.error('Error during sign-in:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

export const signUp = async (data: SignUpData) => {
  try {
    const response = await axios.post(API_URL_SIGN_UP, data);
    return response.data;
  } catch (error: any) {
    console.error('Error during sign-up:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};


//for picture


export const getProfilePicture = async (id: number) => {
  try {
    const shouldDecode=false;
    const getdecodedToken= decodeToken( shouldDecode);
    const response =  await axios.get(`http://localhost:5000/upload/${id}`
    
    );
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching picture:', error);
    
  }
};

export const getPreviewPicture = async (userId: number) => {
  try {
    const shouldDecode=false;
    const getdecodedToken= decodeToken( shouldDecode);
    const response =  await axios.get(`http://localhost:5000/upload/userimage/${userId}`, 
      {
        
        headers: {
          Authorization: `Bearer ${getdecodedToken}`, 
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching picture:', error);
    
  }
};
// profile



export const addUserDetails = async (userDetails: any,userID: number) => {
  
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.put(`${API_URL_USER}/userdetail/${userID}`, userDetails, {
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user details:');
    throw error;
  }
};
export const getUserProfileById = async (userId: number) => {

  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_USER}/${userId}/profile`,  {
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    console.log('res after ',response);
    return response.data;
  } catch (error) {
    console.error('Error adding user details:');
    throw error;
  }
};

// for cart 

export const  triggerWebhook = async (sessionId: string) => {
  console.log('session id from api ', sessionId);
  try {
  
    await axios.post(`${API_URL}`, { sessionId });
    console.log('Webhook called successfully!');
  } catch (error) {
    console.error('Error triggering webhook:', error);
  }
};


export const submitOrder = async (orderData: { cartItems: CartItemType[], totalAmount: number, userID: number }) => {
  console.log(orderData);
  try {
   
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.post(`${API_URL_ORDER}/add`, orderData,
      {
        headers: {
          Authorization: `Bearer ${getdecodedToken}`, 
        },
      }
    );

    if (response.data.sessionId) {
      const sessionId = response.data.sessionId;
      console.log('Session ID:', sessionId);

     
     
    }

    return response.data;
  } catch (error: any) {
    console.error('Error during submitting order:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong while submitting the order');
  }
};
//need to see 
export const getCheckoutSession = async (sessionId: string) => {
  try {
    const response = await axios.get(`/api/order/checkout-session/${sessionId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching session data:', error);
    throw new Error(error.response?.data?.message || 'Error while fetching session data');
  }
};





// for user
export const getAllPharmacyCartsWithCategory = async (category: string) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
   
    const response = await axios.get(`${API_URL_ORDER}/cartcategory/${category}`,
      {
        headers: {
          Authorization: `Bearer ${getdecodedToken}`, 
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error during fetchingproducts with category :', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch products with category .');
  }
};


// for admin  
// for admin and user 

export const getAllPharmacyCarts = async () => {
  try {
    const shouldDecode=false;
    const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_ORDER}/all`,
      {
        headers: {
          Authorization: `Bearer ${getdecodedToken}`, 
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users.');
  }
};



export const getAllUsers = async () => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_USER}/allusers`, {
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error during fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users.');
  }
};


// get all users carts for admin


export const getAllUsersCarts = async () => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_ORDER}/admin/all`, {
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error during fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users.');
  }
};



//for seller and admin 
export const getMedicines = async () => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_MEDICINES}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching medicines:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};








// for seller 

export const createMedicine = async (data: MedicineData) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
const response = await axios.post(`${API_URL_MEDICINES}/createmedicine`, data, {
  headers: {
    Authorization: `Bearer ${getdecodedToken}`, 
  },
});
    return response.data;
  } catch (error: any) {
    console.error('Error during creating medicine:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};


export const getMedicineById = async (medid: number) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_MEDICINES}/getmedbyid/${medid}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    console.log('api',response);
    return response.data;

  } catch (error: any) {
    console.error('Error during fetching medicine by ID:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

export const updateMedicine = async (id: number, data: Partial<Medicine>) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.put(`${API_URL_MEDICINES}/medicineupdate/${id}`, data,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error during updating medicine:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};


export const getMedicinesBySellerID = async (sellerID: number) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
   
    const response = await axios.get(`${API_URL_MEDICINES}/seller/${sellerID}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error: any) {
  
    console.error('Error during fetching medicines by Seller ID:', error);

   
    throw new Error(error.response?.data?.message || 'Failed to fetch medicines.');
  }
};

export const deleteMedicine = async (id: number) => {
  
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.delete(`${API_URL_MEDICINES}/deletemedicine/${id}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    console.log('del data', response);
    return response.data;
  } catch (error: any) {
    console.error('Error during deleting medicine:', error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};


export const getCartBySellerID = async (userId: number) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_ORDER}/cartwithsellerid/${userId}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching cart by Pharmacy ID:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cart.');
  }
};








//for pharmacist

export const getCartByPharmacistID = async (userId: number) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_ORDER}/cartwithpharmacistid/${userId}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching cart by Pharmacy ID:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cart.');
  }
};

export const removeCartByPharmacistCartID = async (cartItemId: number) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.delete(`${API_URL_ORDER}/remove/${cartItemId}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error during deleting cart by Pharmacy cart ID:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete cart of pharmacy .');
  }

  
};


export const getCartByPharmacistIDForUserCart = async (userId: number) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_ORDER}/cartwithuseridforpharmacist/${userId}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching cart by Pharmacy ID:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cart.');
  }
};

export const getCartByUserIDForUserCart = async (userId: number) => {
  try {
    const shouldDecode=false;
const getdecodedToken= decodeToken( shouldDecode);
    const response = await axios.get(`${API_URL_ORDER}/cartwithuseridforuser/${userId}`,{
      headers: {
        Authorization: `Bearer ${getdecodedToken}`, 
      },
    });
    console.log('from api ',response);
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching cart by User ID:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cart.');
  }
};


// for user not sign in 
export const getAllPharmacyCartsNotSignin = async () => {
  try {
   
    const response = await axios.get(`${API_URL_ORDER}/allnotsignin `
    );
    return response.data;
  } catch (error: any) {
    console.error('Error during fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users.');
  }
};