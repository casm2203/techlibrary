"use client"
import { Box, Button, TextField, Typography } from '@mui/material';
import NavBar from '@/components/NavBar'
import { useState } from 'react';
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingButton from '@mui/lab/LoadingButton';

const SignUp = () => {

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setIsLoading(true)
        try {
            const signupResponse = await axios.post("/api/auth/signup", {
                ...formData,
                rol: "usuario"
            });
            const res = await signIn("credentials", {
                email: signupResponse.data.data.email,
                password: formData.password,
                redirect: false,
            });

            if (res?.ok) return router.push("/dashboard/books");
        } catch (error) {
            console.log(error);
            if (error) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <NavBar />
            <Box className="signup-background1" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                height: "calc(100vh - 68.5px)",
                overflow: 'auto',
                backgroundColor: '#f5f5f5'
            }}>
                <Box sx={{
                    backgroundColor: '#FFF',
                    borderRadius: 2,
                    width: '65%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflow: 'hidden'
                }} boxShadow={4}>
                    <Box className='signup-background' sx={{
                        flexGrow: 1,
                        flexBasis: 0,
                        '&>img': {
                            minWidth: '300px'
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'primary.dark',
                    }}>
                        <img src={"images/mobile-signup.svg"} alt="Sign up" />
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                        flexBasis: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                padding: '4rem 2rem',
                                maxWidth: '400px'
                            }}>
                                <Box sx={{
                                    textAlign: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <Typography variant='h4' color="secondary.dark" fontWeight='bold'>Crea una cuenta</Typography>
                                    <Typography variant='p' color="secondary.main">Sé parte de nuestra comunidad y aprende junto a nosotros.</Typography>
                                </Box>
                                <TextField
                                    label="Nombre"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label="Apellido"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label="Correo electrónico"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {error && <Typography textAlign="center" color="error">{error}</Typography>}
                                <LoadingButton loading={isLoading} variant="contained" type="submit" color="primary" sx={{ marginTop: '20px' }}>
                                    Registrarse
                                </LoadingButton>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default SignUp;