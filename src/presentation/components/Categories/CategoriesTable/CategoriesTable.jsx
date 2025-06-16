import { useState } from "react";
import { Table, Form, Row, Col, Button, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import CategoryDialog from "../../common/CategoryDialog/CategoryDialog";
import "./CategoriesTable.css";

const CategoriesTable = () => {
  const { theme } = useTheme();
  const [{ categories }, dispatch] = useStore();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  const [showDialog, setShowDialog] = useState(false);
  const [editCat, setEditCat] = useState(null);

  const filtered = categories
    .filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = ("" + a[sortField]).toLowerCase();
      const bVal = ("" + b[sortField]).toLowerCase();
      if (aVal > bVal) return sortAsc ? 1 : -1;
      if (aVal < bVal) return sortAsc ? -1 : 1;
      return 0;
    });

  const handleAdd = (newCat) => dispatch({ type: "SET_CATEGORIES", payload: [newCat, ...categories] });

  const handleUpdate = (updated) =>
    dispatch({
      type: "SET_CATEGORIES",
      payload: categories.map((c) => (c.id === updated.id ? updated : c)),
    });

  const handleDelete = (id) =>
    dispatch({
      type: "SET_CATEGORIES",
      payload: categories.filter((c) => c.id !== id),
    });

  const openNew = () => {
    setEditCat(null);
    setShowDialog(true);
  };
  const openEdit = (cat) => {
    setEditCat(cat);
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
    setEditCat(null);
  };

  return (
    <>
      <div className={`categories-table card ${theme}-mode`}>
        <Row className="mb-3 gy-2 align-items-center">
          <Col md={4}>
            <Form.Control placeholder="Search category" value={search} onChange={(e) => setSearch(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Select value={sortField} onChange={(e) => setSortField(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
              <option value="createdAt">Sort by Date</option>
            </Form.Select>
          </Col>
          <Col md={1}>
            <Button variant="outline-primary" onClick={() => setSortAsc(!sortAsc)}>
              {sortAsc ? "Asc" : "Desc"}
            </Button>
          </Col>
          <Col md={4} className="text-end">
            <Button onClick={openNew}>
              <FaPlus /> Add Category
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive size="sm" className="ct-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.name}</td>
                <td>
                  <Badge bg={cat.type === "Income" ? "success" : "danger"}>{cat.type}</Badge>
                </td>
                <td>{cat.createdAt}</td>
                <td className="ct-actions">
                  <FaEdit className="action-icon" onClick={() => openEdit(cat)} />
                  <FaTrash className="action-icon" onClick={() => handleDelete(cat.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <CategoryDialog show={showDialog} onClose={closeDialog} existing={editCat} onAdd={handleAdd} onUpdate={handleUpdate} />
    </>
  );
};

export default CategoriesTable;
