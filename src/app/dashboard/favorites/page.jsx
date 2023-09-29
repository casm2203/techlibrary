"use client"
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Book from "@/components/Book";

const Favorites = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [filtredBooks, setFiltredBooks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession()
            const user = session.user.id
            let favorites = JSON.parse(localStorage.getItem("favorites"))
            if (favorites && favorites[user]) {
                const res = await fetch(`/api/books`);
                const dataRes = await res.json();
                setBooks(dataRes.result.filter(book => favorites[user].includes(book.id)))
                setIsLoading(false)
            }
        }
        setIsLoading(true)
        fetchData()
    }, [])

    const updateBooksList = (id) => {
        setBooks(prev => prev.filter(book => book.id != id))
    }

    return (
        <>
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
                                isFavoriteList
                                onRemoveFavoriteList={updateBooksList}
                            />
                        ))
                        : <Typography color="secondary.main" mt={4}>No hay favoritos.</Typography>
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

export default Favorites;