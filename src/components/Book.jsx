"use client"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RequestIcon from '@mui/icons-material/ContactSupport';
import Chip from '@mui/material/Chip';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useSnackbar } from 'notistack'
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

const Book = ({ data, updateStatus, isLoan, isFavoriteList, onRemoveFavoriteList }) => {
    const { id, title, description, author, year, available, cover } = data

    const [isLoading, setIsLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const session = useSession()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        const fetchSession = async () => {
            const info = await getSession()
            const user = info.user.id
            let favorites = JSON.parse(localStorage.getItem("favorites"))
            if (favorites && favorites[user]) {
                if (favorites[user].find(item => item == id)) {
                    setIsFavorite(true)
                }
            }
        }
        fetchSession()
    }, [])


    const handleRequest = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/loan", {
                userId: session.data.user.id,
                bookId: id,
                status: "Prestado"
            })
            if (res.request.status == 200) {
                updateStatus(id)
                enqueueSnackbar("Libro prestado correctamente.", { variant: "success" })
            }
        } catch (error) {
            console.log("Error al prestar libro:", error)
            enqueueSnackbar("No se pudo prestar el libro.", { variant: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    const handleReturn = async () => {
        try {
            setIsLoading(true)
            const res = await axios.put(`/api/loan/${data.idLoan}`, {
                bookId: id
            })
            if (res.request.status == 200) {
                updateStatus(id)
                enqueueSnackbar("Libro devuelto correctamente.", { variant: "success" })
            }
        } catch (error) {
            console.log("Error al devolver libro:", error)
            enqueueSnackbar("No se pudo devolver el libro.", { variant: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    const onFavoriteClick = () => {
        const user = session.data.user.id
        let favorites = localStorage.getItem("favorites")
        favorites = !favorites ? {} : JSON.parse(favorites)
        if (!favorites[user]) favorites[user] = []
        const newStatus = !isFavorite
        if (newStatus) {
            favorites[user].push(id)
        } else {
            favorites[user] = favorites[user].filter(bookId => bookId != id)
            if(onRemoveFavoriteList)onRemoveFavoriteList(id)
        }
        localStorage.setItem("favorites", JSON.stringify(favorites))
        setIsFavorite(newStatus)
    }

    return (
        <Card sx={{
            width: '350px'
        }}>
            <CardHeader
                title={title}
                subheader={`Author: ${author}`}
                sx={{
                    '& > div':{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }
                }}
            />
            <CardMedia
                component="img"
                alt={title}
                height="200"
                image={cover}
                sx={{
                    width: 'auto',
                    margin: '0 auto'
                }}
            />
            <CardContent>
                <Typography variant="body2" mb={2} color="textSecondary" component="p">
                    {description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Año de publicación: {year}
                </Typography>
                {!isLoan &&
                    <Chip
                        icon={<CircleIcon fontSize='12' />}
                        label={available ? "Disponible" : "No disponible"}
                        color={available ? "success" : "error"}
                        variant="outlined"
                        sx={{ marginTop: '10px' }}
                    />
                }
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                {isLoan ?
                    <LoadingButton
                        variant="contained"
                        color="success"
                        onClick={handleReturn}
                        startIcon={<SwapHorizontalCircleIcon />}
                        loading={isLoading}
                    >
                        Devolver
                    </LoadingButton>
                    :
                    !isFavoriteList &&
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        onClick={handleRequest}
                        disabled={!available}
                        startIcon={<RequestIcon />}
                        loading={isLoading}
                    >
                        Prestar
                    </LoadingButton>

                }
                <IconButton
                    aria-label="Add to favorites"
                    onClick={onFavoriteClick}
                >
                    {isFavorite ? <FavoriteIcon color="favorite" /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Book;
