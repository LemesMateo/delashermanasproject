import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import EscalatorWarningOutlined from '@mui/icons-material/EscalatorWarningOutlined';
// import AcUnitIcon from '@mui/icons-material/AcUnit';
import FemaleOutlined from '@mui/icons-material/FemaleOutlined';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
// import MaleOutlined from '@mui/icons-material/MaleOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined'
import abrigos from '../../public/icons/icons8-outlined-fireman-coat-50.png';
import outlinedpants from '../../public/icons/icons8-outlined-jeans-50.png';
import outlinedsweater from '../../public/icons/icons8-outlined-sweater-50.png';
import Image from "next/image"

import { AuthContext, UiContext } from "../../context"
import { DashboardOutlined } from "@mui/icons-material";


export const SideMenu = () => {

    const router = useRouter();
    const {isMenuOpen, toggleSideMenu} = useContext(UiContext);

    const { user, isLoggedIn, logout } = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;
        navigateTo(`/search/${searchTerm}`);
    }

    const navigateTo = (url:string) => {
        toggleSideMenu();
        router.push(url);
    }

    
  return (
    <Drawer
        open={ isMenuOpen }
        
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            <List>
                <ListItem>
                    <Input
                        autoFocus
                        value={searchTerm}
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onSearchTerm}
                                    aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                
                {/* <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem> */}
                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <Image
                            src={outlinedsweater} 
                            width={20} //56
                            height={20}
                            quality={100}
                            alt='Pants Logo'
                        />
                    </ListItemIcon>
                    <ListItemText primary={'Sweaters'} />
                </ListItem>
                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <Image
                            src={abrigos} 
                            width={20} //56
                            height={20}
                            quality={100}
                            alt='Pants Logo'
                        />
                    </ListItemIcon>
                    <ListItemText primary={'Abrigos'} />
                </ListItem>
                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <Image
                            src={outlinedpants} 
                            width={20} //56
                            height={20}
                            quality={100}
                            alt='Pants Logo'
                        />
                    </ListItemIcon>
                    <ListItemText primary={'Pantalones'} />
                </ListItem>
                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Nueva colección'} />
                </ListItem>


                {/* <ListItem button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/women')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem> */}

                {/* <ListItem button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/kid')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem> */}

                <Divider  sx={{ display: { xs: '', sm: 'none' } }} />

                {
                    isLoggedIn && (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo(`/orders/history`) } >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>
                    )

                }

                

                {
                    isLoggedIn
                    ? (
                        <ListItem button onClick={logout} >
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>       
                    )
                    : (
                        <ListItem 
                            button
                            onClick={ () => navigateTo(`/auth/login?p=${router.asPath}`) }
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                }

                {/* Admin */}
                {
                    user?.role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/') }
                            >
                                <ListItemIcon>
                                    <DashboardOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>

                            <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/products') }
                            >
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>

                            <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/orders') }
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>

                            <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/users') }
                            >
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>

                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}