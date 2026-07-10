import { Modal, Button } from "react-bootstrap";

const RequestRentalModal = ({
  show,
  onHide,
  onConfirm,
  bookTitle,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Book Rental</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to request:
        </p>

        <h5>{bookTitle}</h5>

        <p className="text-muted mt-3">
          Your request will be reviewed by the library administrator.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>

        <Button variant="dark" onClick={onConfirm}>
          Submit Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestRentalModal;