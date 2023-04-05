import { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';

import { AuthLayout } from "../../components/layouts";
import { validations } from '../../utils';

import { AuthContext } from '../../context';

type FormData = {
    name    : string;
    email   : string;
    password: string;
};

const RegisterPage = () => {

    const router = useRouter();
    const {registerUser} = useContext(AuthContext);
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const onRegisterForm = async ({name, email, password}: FormData) => {
        
        setShowError(false);
        
        const {hasError, message} = await registerUser(name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(()=> setShowError(false), 4000);
            return;
        }

        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);

        await signIn('credentials', { email, password });




        //Codigo más viejo todavía
        // try {
        //     const { data } = await tesloApi.post('/user/register', { name, email, password });
        //     const { token, user } = data;
        //     console.log({token, user});


        // } catch (error) {
        //     console.log('Error en las credenciales', error);
        //     setShowError(true);
        //     setTimeout(()=> setShowError(false), 4000);
        // }
    }


  return (
    <AuthLayout title={'Registrarse'} >
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate >
            <Box sx={{width: 350, padding: '10px 20px'}} >
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <Typography variant='h1' component='h1' >Crear Cuenta</Typography>
                        <Chip 
                            label="No reconocemos ese usuario / contraseña"
                            color='error'
                            icon={ <ErrorOutline/> }
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} >
                        <TextField 
                            label='Nombre' 
                            variant='filled' 
                            id='name' 
                            fullWidth 
                            {
                                ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: {value: 4, message: 'Mínimo 4 caracteres'}
                                })}
                            error={ !!errors.name }
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            label='Correo' 
                            variant='filled' 
                            type='email' 
                            id='email' 
                            fullWidth 
                            {
                                ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                            error={ !!errors.email }
                            helperText={errors.email?.message}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField 
                            label='Contraseña' 
                            type='password' 
                            variant='filled' 
                            fullWidth 
                            {
                                ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: {value: 6, message: 'Mínimo 6 caracteres'}
                                })}
                            error={ !!errors.password }
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button 
                            type='submit'
                            color='secondary' 
                            className='circular-btn' 
                            size='large' 
                            fullWidth 
                        >
                            Confirmar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end' >
                        <NextLink 
                            href={ router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login' } 
                            passHref 
                        >
                            <Link underline='always' >
                                ¿Ya tienes cuenta? Ingresa aquí!
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default RegisterPage