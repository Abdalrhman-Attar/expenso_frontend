import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Dialog from "../Dialog/Dialog";
import { useStore } from "../../../../application/utils/hooks";
import "./CategoryDialog.css";

const predefinedCategories = [
  { name: "Salary", type: "Income" },
  { name: "Freelance", type: "Income" },
  { name: "Investment Returns", type: "Income" },
  { name: "Groceries", type: "Expense" },
  { name: "Dining Out", type: "Expense" },
  { name: "Transportation", type: "Expense" },
  { name: "Gas", type: "Expense" },
  { name: "Rent/Mortgage", type: "Expense" },
  { name: "Utilities", type: "Expense" },
  { name: "Internet", type: "Expense" },
  { name: "Phone Bill", type: "Expense" },
  { name: "Entertainment", type: "Expense" },
  { name: "Healthcare", type: "Expense" },
  { name: "Fitness", type: "Expense" },
  { name: "Education", type: "Expense" },
  { name: "Shopping", type: "Expense" },
  { name: "Clothing", type: "Expense" },
  { name: "Insurance", type: "Expense" },
  { name: "Pet Care", type: "Expense" },
];

const CategoryDialog = ({ show, onClose, existing }) => {
  const {
    state: { categories },
    addCategory,
    updateCategory,
  } = useStore();

  const [showCustom, setShowCustom] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    type: "Expense",
    created_at: "",
  });

  const availablePredefined = predefinedCategories.filter((p) => !categories.some((c) => c.name === p.name));

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name,
        type: existing.type,
      });
      setShowCustom(true);
    } else if (show) {
      setForm({
        name: "",
        type: "Expense",
      });
      setShowCustom(false);
    }
  }, [existing, show]);

  const handleQuickAdd = async (preset) => {
    await addCategory({
      name: preset.name,
      type: preset.type,
    });
    onClose();
  };

  const handleSubmit = async () => {
    const cat = {
      name: form.name,
      type: form.type,
    };
    if (existing) {
      await updateCategory(existing.id, cat);
    } else {
      await addCategory(cat);
    }
    onClose();
  };
  const canSubmit = showCustom && form.name.trim();

  return (
    <Dialog show={show} title={existing ? "Edit Category" : "Add Category"} onClose={onClose} onSubmit={handleSubmit} submitLabel={existing ? "Update" : "Add"} canSubmit={canSubmit}>
      {!showCustom && !existing ? (
        <>
          <h5>Quick Add</h5>
          <Row className="qp-row">
            {availablePredefined.length ? (
              availablePredefined.map((p) => (
                <Col key={p.name} xs={6} className="mb-2">
                  <Button variant="outline-primary" size="sm" className="w-100" onClick={() => handleQuickAdd(p)}>
                    {p.name} ({p.type})
                  </Button>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">All predefined categories added!</p>
            )}
          </Row>
          <hr />
          <div className="text-center">
            <Button variant="link" onClick={() => setShowCustom(true)}>
              Create Custom Category
            </Button>
          </div>
        </>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Form.Select>
          </Form.Group>
        </Form>
      )}
    </Dialog>
  );
};

export default CategoryDialog;
