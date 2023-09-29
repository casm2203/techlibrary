"use client"
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import LoadingButton from '@mui/lab/LoadingButton';

const BookForm = ({ onSave, bookToEdit, setBookToEdit, onEdit }) => {
    const [formData, setFormData] = useState({
        cover: '',
        title: '',
        description: '',
        author: '',
        year: '',
        available: false,
    });
    const [isLoading, setIsLoading] = useState(false)
    const [previewCover, setPreviewCover] = useState()

    useEffect(() => {
        if (Object.keys(bookToEdit).length) {
            setPreviewCover(bookToEdit.cover)
            setFormData({
                cover: bookToEdit.cover,
                title: bookToEdit.title || "",
                description: bookToEdit.description || "",
                author: bookToEdit.author || "",
                year: bookToEdit.year || "",
                available: bookToEdit.available == 1 ? true : false,
            })
        }
    }, [bookToEdit])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            cover: file
        })
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewCover(e.target.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        if (!Object.keys(bookToEdit).length) {
            onSave(formData, () => {
                setIsLoading(false)
                handleNew()
            });
        } else {
            onEdit({ ...formData, id: bookToEdit.id }, () => { setIsLoading(false) })
        }
    };

    const handleNew = () => {
        setFormData({
            cover: '',
            title: '',
            description: '',
            author: '',
            year: '',
            available: false,
        })
        setBookToEdit({})
        setPreviewCover(null)
        document.getElementById("image").value = null
    }

    return (
        <form onSubmit={handleSubmit} >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                marginBottom: '30px'
            }}>
                <Box sx={{
                    width: "30%"
                }}>
                    <Card sx={{
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            name="cover"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="image">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                            >
                                Cargar Imagen
                            </Button>
                        </label>
                        {previewCover ? (
                            <img
                                src={previewCover}
                                alt="Vista Previa"
                                style={{ maxWidth: '100%', marginTop: '16px' }}
                            />
                        ) :
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '25px 0',
                                color: 'secondary.light'
                            }}>
                                <ImageIcon />
                                <Typography variant='body2' fontStyle='italic'>
                                    Vista previa
                                </Typography>
                            </Box>
                        }
                    </Card>
                </Box>
                <Box sx={{
                    width: "70%"
                }}>
                    <Card sx={{ padding: '30px' }}>
                        <TextField
                            label="Título"
                            variant="outlined"
                            fullWidth
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Autor"
                            variant="outlined"
                            fullWidth
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Año de Publicación"
                            variant="outlined"
                            fullWidth
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <Box mt={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="available"
                                        checked={formData.available}
                                        onChange={handleChange}
                                    />
                                }
                                label="Disponible"
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            gap: 2
                        }}>
                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                size="large"
                                style={{ marginTop: '16px' }}
                                onClick={handleNew}
                            >
                                Nuevo
                            </Button>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                style={{ marginTop: '16px' }}
                            >
                                Guardar Libro
                            </LoadingButton>
                        </Box>
                    </Card>

                </Box>
            </Box>


        </form>
    );
};

export default BookForm;
