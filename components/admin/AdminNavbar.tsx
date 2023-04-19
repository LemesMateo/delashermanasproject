import { FC, useContext} from "react"
import NextLink from 'next/link'

import { AppBar,  Box, Button, Link, Toolbar, Typography } from "@mui/material";


import { UiContext } from "../../context"



export const AdminNavbar: FC = () => {
     
    const {toggleSideMenu} = useContext(UiContext)
   

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center' >
                    {/* <Image 
                        src={shopLogo} 
                        width={220} //56
                        height={95} //25
                        quality={100}
                        style={{ 
                            marginTop: '11px'
                         }}
                        alt='Shop Logo'
                    /> */}
                    <Typography variant="h5" sx={{ display: { xs: 'none', sm:'block' } }}>  De las Hermanas |</Typography>
                    <Typography variant="h6" sx={{ display: { xs: '', sm: 'none' } }} >  De las Hermanas </Typography>
                    <Typography sx={{ ml: 0.5, display: { xs: 'none', sm:'block' } }}  variant="body1" >Indumentaria</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />

            <Button onClick={ toggleSideMenu } >
                Menú
            </Button>

        </Toolbar>
    </AppBar>
    
  )
}
