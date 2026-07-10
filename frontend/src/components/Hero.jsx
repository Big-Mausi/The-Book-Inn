import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card
         className="border-0 shadow-lg text-center p-5"
          style={{
          maxWidth: "900px",
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          }}
        >
    
          <h1 className="display-3 fw-bold mb-3">
             Welcome to The Book Inn
          </h1>

         <p
          className="lead mb-5"
          style={{
            color: "#666",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
        Explore thousands of books, request rentals, and enjoy reading from your
        personal digital library all in one place.
        </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              as={Link}
              to="/books"
              style={{
                backgroundColor: "#5D4037",
                border: "none",
              }}
              size="lg"
            >
              Browse Books
            </Button>

            <Button
              as={Link}
              to="/register"
              variant="outline-dark"
              size="lg"
            >
              Join Library
            </Button>
          </div>

          <hr className="my-5" />

          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <h3> Read Anywhere</h3>
            </div>

            <div className="col-md-4 mb-3">
              <h3> Flexible Rentals</h3>
            </div>

            <div className="col-md-4 mb-3">
              <h3> Secure Access</h3>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;