"use client"
import BookForm from "@/components/BookForm";
import BookTable from "@/components/BookTable";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from 'notistack'
import { uploadFile } from "@/firebase/config";

const BookManagement = () => {

    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [bookToEdit, setBookToEdit] = useState({})

    const { data: session, status } = useSession()
    const { enqueueSnackbar } = useSnackbar()

    const fetchData = async () => {
        const res = await fetch(`/api/books`);
        const data = await res.json();
        setBooks(data.result)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchData()
    }, [])

    if (status == "loading") {
        return (
            <>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer - 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        )
    }

    if (status == "authenticated") {
        if (session.user.rol != "administrador") {
            return (
                <Box sx={{ textAlign: "center" }}>
                    <img src={"/images/unauthorized.svg"} alt="Sign up" style={{ width: "50%", maxWidth: "450px" }} />
                    <Typography variant="h5" color="secondary.main" pt={4} textAlign="center">
                        No tiene permisos para acceder a este módulo.
                    </Typography>
                </Box>
            )
        }
    }

    const addBook = async (data, callback) => {
        try {
            let upload = data.cover
            if(upload){
                upload = await uploadFile(data.cover, `${new Date().getTime()}-${data.cover.name}`)
            }else{
                upload = "https://firebasestorage.googleapis.com/v0/b/techlibrary-22.appspot.com/o/1695954226279-nocover.jpg?alt=media&token=45fa7974-b889-48a9-9341-6126f909d053"
            }
            const res = await axios.post('/api/books', {...data, cover: upload})
            if (res.request.status == 200) {
                enqueueSnackbar("Libro guardado correctamente.", { variant: "success" })
                fetchData()
            }
        } catch (error) {
            enqueueSnackbar("Error al guardar libro.", { variant: "error" })
            console.log("error al guardar el libro:", error)
        } finally {
            callback()
        }
    }
    const editBook = async (data, callback) => {
        try {
            let newData = Object.assign({}, data)
            if(typeof newData.cover == 'object'){
                const upload = await uploadFile(data.cover, `${new Date().getTime()}-${data.cover.name}`)
                newData.cover = upload
            }
            const res = await axios.put(`/api/books/${data.id}`, newData)
            if (res.request.status == 200) {
                enqueueSnackbar("Libro actualizado correctamente.", { variant: "success" })
                fetchData()
            }
        } catch (error) {
            enqueueSnackbar("Error al actualizar libro.", { variant: "error" })
            console.log("error al editar el libro:", error)
        } finally {
            callback()
        }
    }

    const deleteBook = async (id, callback) => {
        try {
            const res = await axios.delete(`/api/books/${id}`)
            if (res.request.status == 200) {
                enqueueSnackbar("Libro eliminado correctamente.", { variant: "success" })
                fetchData()
            }
        } catch (error) {
            enqueueSnackbar("Error al eliminar libro.", { variant: "error" })
            console.log("error al eliminar el libro:", error)
        } finally {
            callback()
        }
    }

    return (
        <>
            <BookForm onSave={addBook} bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} onEdit={editBook} />
            <BookTable books={books} setBookToEdit={setBookToEdit} onDelete={deleteBook}/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer - 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default BookManagement;