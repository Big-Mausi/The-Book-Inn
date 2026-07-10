import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const image =
    book.coverImage;

  const isLibraryBook = !!book._id;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={image}
        style={{
          height: "320px",
          objectFit: "cover",
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{book.title}</Card.Title>

        <Card.Text className="text-muted">
          {book.author}
        </Card.Text>

        {book.source && (
          <small className="text-muted mb-2">
            Source: {book.source}
          </small>
        )}

        {isLibraryBook ? (
          <Button
            as={Link}
            to={`/books/${book._id}`}
            variant="dark"
            className="mt-auto"
          >
            View Details
          </Button>
        ) : (
          <Button
            href={book.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-dark"
            className="mt-auto"
            disabled={!book.externalUrl}
          >
            {book.externalUrl ? "View Book" : "Preview Unavailable"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookCard;