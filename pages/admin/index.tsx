import { useEffect, useState } from 'react';

import useSWR from 'swr';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'

import { Grid, Typography } from '@mui/material'
import { AdminLayout } from '../../components/layouts'
import { SummaryTile } from '../../components/admin'
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 60 * 1000 // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(60);

    useEffect(() => {
      const interval = setInterval(()=>{
        console.log('Tick');
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 60 );
      }, 1000);
    
      return () => clearInterval(interval)
    }, []);
    

    if (!error && !data) {
        return <></>
    }

    if (error){
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;


  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined/> }
    >
        <Grid container spacing={2} >

            <SummaryTile
                title={ numberOfOrders }
                subTitle='Ordenes totales'
                icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> }
            />
            <SummaryTile
                title={ paidOrders }
                subTitle='Ordenes pagadas'
                icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} /> }
            />
            <SummaryTile
                title={ notPaidOrders }
                subTitle='Ordenes pendientes'
                icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} /> }
            />
            <SummaryTile
                title={ numberOfClients }
                subTitle='Clientes'
                icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} /> }
            />
            <SummaryTile
                title={ numberOfProducts }
                subTitle='Productos'
                icon={ <CategoryOutlined color='success' sx={{ fontSize: 40 }} /> }
            />
            <SummaryTile
                title={ productsWithNoInventory }
                subTitle='Productos sin stock'
                icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} /> }
            />
            <SummaryTile
                title={ lowInventory }
                subTitle='Bajo Inventario'
                icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} /> }
            />
            <SummaryTile
                title={ refreshIn }
                subTitle='Actualización en:'
                icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} /> }
            />
            
            
            

        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage