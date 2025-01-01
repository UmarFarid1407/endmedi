import { useNavigate } from 'react-router-dom';


export const useNavigation = () => {
  const navigate = useNavigate();


  const navigateToHome = () => {
    navigate('/');
  };


  const navigateToLogin = () => {
    navigate('/signin');
  };

  
  const navigateToSignUp = () => {
    navigate('/sign-up');
  };


  const navigateToDashboard = () => {
    navigate('/throwuser');
  };

 
  const navigateToProfile = () => {
    navigate('/profile');
  };

 
  const navigateToProducts = () => {
    navigate('/products');
  };

 
  const navigateToThrowUser = () => {
    navigate('/throwuser');
  };
  const navigateToAdminUser = () => {
    navigate('/admin');
  };
  const navigateToPharmacistUser = () => {
    console.log('from pharm');
    navigate('/pharmacist');
  };
  const navigateToSellerUser = () => {
    navigate('/seller');
  };
  const navigateToPastPurchasing = () => {
    console.log('from purchasing');
    navigate("/pastpurchasing");
  };
  const navigateToUser = () => {
    navigate('/user');
  };

  return {
    navigateToHome,
    navigateToLogin,
    navigateToSignUp,
    navigateToDashboard,
    navigateToProfile,
    navigateToProducts,
    navigateToThrowUser,
    navigateToAdminUser,
    navigateToPharmacistUser,
    navigateToSellerUser,
    navigateToPastPurchasing,
  };
};
