import { Form } from "react-bootstrap";

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <Form.Select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="mb-4"
    >
      <option value="All">All Categories</option>
      <option value="Programming">Programming</option>
      <option value="Finance">Finance</option>
      <option value="Self Help">Self Help</option>
      <option value="Education">Education</option>
      <option value="Science">Science</option>
    </Form.Select>
  );
};

export default CategoryFilter;