"use client"
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Book from "@/components/Book";

const BookLoan = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession()
            const res = await fetch(`/api/loan/user/${session.user.id}`);
            const dataRes = await res.json();
            setBooks(dataRes.result)
            setIsLoading(false)
        }
        setIsLoading(true)
        fetchData()
    }, [])

    const updateBooksList = (id) => {
        setBooks(prev => prev.filter(book => book.id != id))
    }

    return (
        <>
            <Box>
                <Typography variant="h5" p={3}>Libros Prestados ({!books ? 0 : books.length})</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {
                    books?.length
                        ? books.map((book) => (
                            <Book
                                key={book.id}
                                data={book}
                                isLoan
                                updateStatus={updateBooksList}
                            />
                        ))
                        : <Typography color="secondary.main" mt={4}>No se encontró resultados.</Typography>
                }
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer - 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default BookLoan;