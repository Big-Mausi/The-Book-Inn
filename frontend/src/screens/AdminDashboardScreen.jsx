import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";

import {
  useGetAllRentalsQuery,
  useApproveRentalMutation,
  useRejectRentalMutation,
} from "../slices/rentalApiSlice";

const AdminDashboardScreen = () => {
  const {
    data: rentals = [],
    isLoading,
    error,
  } = useGetAllRentalsQuery();

  const [approveRental] = useApproveRentalMutation();
  const [rejectRental] = useRejectRentalMutation();

  const [showReject, setShowReject] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [message, setMessage] = useState("");

  const handleApprove = async (id) => {
    try {
      await approveRental(id).unwrap();
      alert("Rental approved successfully.");
    } catch (err) {
      alert(err?.data?.message || "Unable to approve rental.");
    }
  };

  const openRejectModal = (id) => {
    setSelectedRental(id);
    setMessage("");
    setShowReject(true);
  };

  const handleReject = async () => {
    try {
      await rejectRental({
        rentalId: selectedRental,
        message,
      }).unwrap();

      setShowReject(false);
    } catch (err) {
      alert(err?.data?.message || "Unable to reject rental.");
    }
  };

  const totalBooks = new Set(
    rentals.map((r) => r.book?._id)
  ).size;

  const totalUsers = new Set(
    rentals.map((r) => r.user?._id)
  ).size;

  const activeRentals = rentals.filter(
    (r) => r.status === "approved"
  ).length;

  const pendingRentals = rentals.filter(
    (r) => r.status === "pending"
  ).length;

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
          Unable to load dashboard.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="page-title mb-4">
        Admin Dashboard
      </h1>

      <Row className="mb-5">
        <Col md={3}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <h6>Books</h6>
              <h2>{totalBooks}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <h6>Users</h6>
              <h2>{totalUsers}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <h6>Active Rentals</h6>
              <h2>{activeRentals}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <h6>Pending Requests</h6>
              <h2>{pendingRentals}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <h4 className="mb-4">
            Rental Requests
          </h4>

          <Table responsive hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Status</th>
                <th>Requested</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rentals.map((rental) => (
                <tr key={rental._id}>
                  <td>{rental.user?.name}</td>

                  <td>{rental.book?.title}</td>

                  <td>
                    <Badge
                      bg={
                        rental.status === "approved"
                          ? "success"
                          : rental.status === "rejected"
                          ? "danger"
                          : rental.status === "returned"
                          ? "info"
                          : rental.status === "expired"
                          ? "dark"
                          : "warning"
                      }
                    >
                      {rental.status}
                    </Badge>
                  </td>

                  <td>
                    {new Date(
                      rental.requestDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {rental.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            handleApprove(rental._id)
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            openRejectModal(
                              rental._id
                            )
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal
        show={showReject}
        onHide={() => setShowReject(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Reject Rental
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Reason (optional)
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowReject(false)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleReject}
          >
            Reject Request
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboardScreen;