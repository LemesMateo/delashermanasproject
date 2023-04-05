import { Typography } from '@mui/material';
import type { NextPage } from 'next';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';

import { useProducts } from '../hooks';

import { FullScreenLoading } from '../components/ui';
// import { initialData } from '../database/products';



const HomePage: NextPage = () => {

  
  const { products, isLoading } = useProducts('/products');


  return (
    <ShopLayout title={'Matts-Shop - Home'} pageDescription={'Encuentra los mejores productos de Matts aquí'}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

        {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={ products } />             
        }

    </ShopLayout>
  )
}

export default HomePage;
