import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useGetMyRentalsQuery } from "../slices/rentalApiSlice";

const MyLibraryScreen = () => {
  const {
    data: rentals = [],
    isLoading,
    error,
  } = useGetMyRentalsQuery();

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Failed to load your library.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="page-title mb-4">
        My Library
      </h1>

      {rentals.length === 0 ? (
        <Alert variant="info">
          You have not requested or borrowed any books yet.
        </Alert>
      ) : (
        <Row>
          {rentals.map((rental) => (
            <Col
              md={4}
              lg={3}
              key={rental._id}
              className="mb-4"
            >
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={
                    rental.book.coverImage ||
                    "https://via.placeholder.com/250x350?text=No+Cover"
                  }
                />

                <Card.Body>
                  <Card.Title>
                    {rental.book.title}
                  </Card.Title>

                  <Card.Text>
                    {rental.book.author}
                  </Card.Text>

                  <Badge
                    bg={
                      rental.status === "approved"
                        ? "success"
                        : rental.status === "pending"
                        ? "warning"
                        : rental.status === "returned"
                        ? "info"
                        : rental.status === "expired"
                        ? "dark"
                        : "danger"
                    }
                    className="mb-2"
                  >
                    {rental.status.toUpperCase()}
                  </Badge>

                  {rental.dueDate && (
                    <p className="small text-muted">
                      Due:{" "}
                      {new Date(
                        rental.dueDate
                      ).toLocaleDateString()}
                    </p>
                  )}

                  {rental.status === "approved" &&
                    rental.book.pdfUrl && (
                      <div className="d-grid">
                        <Button
                          variant="dark"
                          href={rental.book.pdfUrl}
                          target="_blank"
                        >
                          Read Book
                        </Button>
                      </div>
                    )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyLibraryScreen;