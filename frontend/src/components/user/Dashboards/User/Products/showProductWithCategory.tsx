import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { getAllPharmacyCartsWithCategory } from '../../../Api/api';

interface Product {
  id: number;
  medicineName: string;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  imageUrl?: string;
}

interface ProductWithCategoryProps {
  category: string;
}

const defaultImage =
  'https://img.freepik.com/free-photo/woman-s-hand-pours-medicine-pills-out-bottle_1150-14200.jpg?semt=ais_hybrid';

const ProductWithCategory: React.FC<ProductWithCategoryProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPageHorizontally = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await getAllPharmacyCartsWithCategory(category);
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
      }
    };

    fetchProducts();
  }, [category]);

  
  const indexOfLastProduct = currentPage * productsPerPageHorizontally;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPageHorizontally;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPageHorizontally)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" textAlign="left" gutterBottom>
        Category: {category}
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={2}
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {currentProducts.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 345, minWidth: 250 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={defaultImage} 
                alt={product.medicineName}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.medicineName || "Unnamed Medicine"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.medicineCategory || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.priceofonemedicineinTablet || "N/A"}
                </Typography>
                
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPageHorizontally)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProductWithCategory;
