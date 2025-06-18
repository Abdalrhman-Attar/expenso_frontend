import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Dialog from "../Dialog/Dialog";
import { useStore } from "../../../../application/utils/hooks";
import "./TransactionDialog.css";

const TransactionDialog = ({ show, onClose, existing = null }) => {
  const {
    state: { categories },
    addTransaction,
    updateTransaction,
  } = useStore();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category_id, setcategory_id] = useState("");

  useEffect(() => {
    if (existing) {
      setDescription(existing.description);
      setAmount(existing.amount.toString());
      setDate(new Date(existing.date).toISOString().slice(0, 10));
      setcategory_id(existing.category_id); // use entity field
    } else if (show) {
      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().slice(0, 10));
      setcategory_id(categories[0]?.id || "");
    }
  }, [existing, categories, show]);

  const canSubmit = description.trim() && amount && date && category_id;

  const handleSubmit = async () => {
    const selCat = categories.find((c) => c.id === category_id);

    if (!selCat) {
      alert("Invalid category selected.");
      return;
    }

    const payload = {
      description: description.trim(),
      amount: parseFloat(amount),
      date,
      type: selCat.type,
      category_id: selCat.id,
    };

    if (existing) {
      await updateTransaction(existing.id, payload);
    } else {
      await addTransaction(payload);
    }

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
          <Form.Select value={category_id} onChange={(e) => setcategory_id(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
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
