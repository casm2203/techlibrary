"use client"
import { Box, Button, TextField, Typography } from '@mui/material';
import NavBar from '@/components/NavBar'
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingButton from '@mui/lab/LoadingButton';

const SignUp = () => {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
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
        setIsLoading(true)
        setError("")
        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res?.error) return setError(res.error);

            if (res?.ok) return router.push("/dashboard/books");
        } catch (error) {
            console.log(error);
            if (error) {
                setError(error.response?.data.message);
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
                    width: '60%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflow: 'hidden'
                }} boxShadow={4}>
                    <Box sx={{
                        flexGrow: 1,
                        flexBasis: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <form onSubmit={handleSubmit} style={{
                            width: '85%'
                        }}>
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
                                    <Typography variant='h4' color="secondary.dark" fontWeight='bold'>Iniciar sesión</Typography>
                                </Box>
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
                                    Ingresar
                                </LoadingButton>
                            </Box>
                        </form>
                    </Box>
                    <Box className='signup-background' sx={{
                        flexGrow: 1,
                        flexBasis: 0,
                        '&>img': {
                            width: '60%',
                            minWidth: '300px'
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'primary.dark',
                        padding: '20px'
                    }}>
                        <img src={"/images/back-signin.svg"} alt="Sign up" />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default SignUp;