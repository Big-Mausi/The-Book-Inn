import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Toast,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useGetBookDetailsQuery } from "../slices/bookApiSlice";
import {
  useRequestRentalMutation,
  useGetMyRentalsQuery,
} from "../slices/rentalApiSlice";

import RequestRentalModal from "../components/RequestRentalModal";

const BookDetailsScreen = () => {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Fetch book
  const {
    data: book,
    isLoading,
    error,
    refetch,
  } = useGetBookDetailsQuery(id);

  // Fetch user's rentals
  const {
    data: rentals = [],
    refetch: refetchRentals,
  } = useGetMyRentalsQuery();

  // Rental mutation
  const [requestRental, { isLoading: loadingRequest }] =
    useRequestRentalMutation();

  // Current rental for this book
  const currentRental = rentals.find(
    (rental) => rental.book?._id === book?._id
  );

  const requestStatus = currentRental?.status || "available";

  const handleRequest = async () => {
    try {
      await requestRental(book._id).unwrap();

      setShowModal(false);
      setShowToast(true);

      refetch();
      refetchRentals();
    } catch (err) {
      console.error(err);

      alert(
        err?.data?.message ||
          "Unable to submit rental request."
      );
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <h4>Loading...</h4>
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container className="py-5 text-center">
        <h4>Book not found.</h4>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Link to="/books" className="btn btn-light mb-4">
        ← Back to Books
      </Link>

      <Row>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Img
              src={
                book.coverImage ||
                "https://via.placeholder.com/300x450?text=No+Cover"
              }
              alt={book.title}
            />
          </Card>
        </Col>

        <Col md={8}>
          <h2>{book.title}</h2>

          <h5 className="text-muted">
            by {book.author}
          </h5>

          <p className="text-muted">
            Published: {book.publishedYear || "Unknown"}
          </p>

          <Badge bg="secondary" className="mb-3">
            {book.category}
          </Badge>

          <p>{book.description}</p>

          <h5 className="mb-3">
            Availability{" "}
            {book.available ? (
              <Badge bg="success">
                Available for Borrowing
              </Badge>
            ) : (
              <Badge bg="danger">
                Currently Unavailable
              </Badge>
            )}
          </h5>

          <hr />

          <h5>Rental Status</h5>

          {requestStatus === "available" && (
            <Badge bg="secondary" className="mb-4">
              No Request
            </Badge>
          )}

          {requestStatus === "pending" && (
            <Badge bg="warning" className="mb-4">
              Pending Approval
            </Badge>
          )}

          {requestStatus === "approved" && (
            <Badge bg="success" className="mb-4">
              Approved
            </Badge>
          )}

          {requestStatus === "returned" && (
            <Badge bg="info" className="mb-4">
              Returned
            </Badge>
          )}

          {requestStatus === "rejected" && (
            <Badge bg="danger" className="mb-4">
              Request Rejected
            </Badge>
          )}

          {requestStatus === "expired" && (
            <Badge bg="dark" className="mb-4">
              Rental Expired
            </Badge>
          )}

          <div className="mt-4">
            <Button
              variant="dark"
              disabled={
                !book.available ||
                loadingRequest ||
                requestStatus === "pending" ||
                requestStatus === "approved"
              }
              onClick={() => setShowModal(true)}
            >
              {loadingRequest
                ? "Submitting..."
                : requestStatus === "pending"
                ? "Request Pending"
                : requestStatus === "approved"
                ? "Already Borrowed"
                : "Request Rental"}
            </Button>

            {requestStatus === "approved" &&
              book.pdfUrl && (
                <Button
                  variant="outline-primary"
                  className="ms-2"
                  href={book.pdfUrl}
                  target="_blank"
                >
                  Read Book
                </Button>
              )}
          </div>
        </Col>
      </Row>

      <RequestRentalModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleRequest}
        bookTitle={book.title}
      />

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">
            The Book Inn
          </strong>
        </Toast.Header>

        <Toast.Body>
          Rental request submitted successfully!
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default BookDetailsScreen;