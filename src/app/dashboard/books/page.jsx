"use client";

import Book from "@/components/Book";
import { useEffect, useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/books`);
      const data = await res.json();
      setBooks(data.result);
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    const booksToView = books.filter((book) => {
      const matchName = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (availabilityFilter === "all") {
        return matchName;
      } else if (availabilityFilter === "available") {
        return matchName && book.available;
      } else {
        return matchName && !book.available;
      }
    });
    setFilteredBooks(booksToView);
  }, [searchTerm, availabilityFilter, books]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.value);
  };

  const updateStatusBook = async (id) => {
    setFilteredBooks((prev) =>
      prev.map((book) => {
        if (book.id == id) {
          return {
            ...book,
            available: !book.available,
          };
        } else {
          return book;
        }
      })
    );
  };

  if (books && books.length === 0 && !isLoading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <img
          src={"/images/Empty.svg"}
          alt="empty"
          style={{ width: "50%", maxWidth: "450px" }}
        />
        <Typography
          variant="h5"
          color="secondary.main"
          pt={4}
          textAlign="center"
        >
          No hay libros.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        <TextField
          label="Buscar..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
        />
        <TextField
          size="small"
          label="Filtrar por disponibilidad"
          variant="outlined"
          select
          value={availabilityFilter}
          onChange={handleAvailabilityChange}
          style={{ width: "200px", marginLeft: "16px" }}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="available">Disponible</MenuItem>
          <MenuItem value="unavailable">No Disponible</MenuItem>
        </TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <Book key={book.id} data={book} updateStatus={updateStatusBook} />
          ))
        ) : (
          <Typography color="secondary.main" mt={4}>
            No se encontró resultados.
          </Typography>
        )}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Books;
