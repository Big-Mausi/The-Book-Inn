import {
  Container,
  Table,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetMyRentalsQuery } from "../slices/rentalApiSlice";

const RentalRequestsScreen = () => {
  const {
    data: rentals = [],
    isLoading,
    error,
  } = useGetMyRentalsQuery();

  const getBadge = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      case "returned":
        return "info";
      case "expired":
        return "dark";
      default:
        return "warning";
    }
  };

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
          Failed to load rental requests.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="page-title mb-4">
        My Rental Requests
      </h1>

      {rentals.length === 0 ? (
        <Alert variant="info">
          You have not made any rental requests yet.
        </Alert>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Book</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Due Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.book.title}</td>

                <td>
                  {new Date(
                    rental.requestDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  <Badge bg={getBadge(rental.status)}>
                    {rental.status.toUpperCase()}
                  </Badge>
                </td>

                <td>
                  {rental.dueDate
                    ? new Date(
                        rental.dueDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <Button
                    as={Link}
                    to={`/books/${rental.book._id}`}
                    size="sm"
                    variant="outline-dark"
                  >
                    View Book
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RentalRequestsScreen;