import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Dialog from "../Dialog/Dialog";
import { useStore } from "../../../../application/utils/hooks";
import "./TransactionDialog.css";

const TransactionDialog = ({
  show,
  onClose,
  existing = null,
}) => {
  const [state, dispatch] = useStore();
  const { categories } = state;

  // form fields
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (existing) {
      setDescription(existing.description);
      setAmount(existing.amount);
      setDate(existing.date.slice(0, 10));
      setCategory(existing.category);
    } else if (show) {
      // reset for new
      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().slice(0, 10));
      setCategory(categories[0]?.name || "");
    }
  }, [existing, categories, show]);

  const canSubmit = description && amount && date && category;

  const handleSubmit = () => {
    const selCat = categories.find((c) => c.name === category);
    const payload = {
      id: existing?.id || Date.now().toString(),
      description,
      amount: parseFloat(amount),
      date,
      type: selCat?.type.toLowerCase() || "expense",
      category,
    };

    dispatch({
      type: existing ? "UPDATE_TRANSACTION" : "ADD_TRANSACTION",
      payload,
    });
    onClose();
  };

  return (
    <Dialog show={show} title={existing ? "Edit Transaction" : "New Transaction"} onClose={onClose} onSubmit={handleSubmit} submitLabel={existing ? "Update" : "Add"} canSubmit={canSubmit}>
      <Form>
        <Form.Group className="td-field">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="td-field">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Form.Group>

        <Form.Group className="td-field">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Form.Group>

        <Form.Group className="td-field">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </Dialog>
  );
};

export default TransactionDialog;
