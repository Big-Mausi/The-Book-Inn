import { useState } from "react";
import {Container,Row,Col,Spinner,Alert,} from "react-bootstrap";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import {useSearchAllBooksQuery,} from "../slices/bookApiSlice";

const BooksScreen = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const {data: books = [],isLoading,error,} = useSearchAllBooksQuery(searchTerm);
  const filteredBooks = books.filter((book) => {
    return (
      category === "All" ||
      book.category === category
    );
  });

  return (
    <Container className="py-4">
      <h1 className="mb-4">Library Collection</h1>
      <SearchBar searchTerm={searchTerm}setSearchTerm={setSearchTerm}/>
      <CategoryFilter category={category}setCategory={setCategory}/>

      <p className="text-muted">Showing {filteredBooks.length} book(s)</p>

      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && (<Alert variant="danger">Failed to load books.</Alert>)}

      {!isLoading && !error && (
        <Row>
          {filteredBooks.map((book) => (
            <Col md={4} lg={3} key={book._id || book.id} className="mb-4">
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BooksScreen;