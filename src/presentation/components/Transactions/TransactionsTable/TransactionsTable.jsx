import  { useState } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import TransactionDialog from "../../common/TransactionDialog/TransactionDialog";
import Dialog from "../../common/Dialog/Dialog";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const { theme } = useTheme();
  const [state, dispatch] = useStore();
  const { transactions, categories } = state;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortAsc, setSortAsc] = useState(false);

  const [showTxDialog, setShowTxDialog] = useState(false);
  const [editTxn, setEditTxn] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const filtered = transactions
    .filter(
      (tx) => (typeFilter === "All" || tx.type === typeFilter) && (!categoryFilter || tx.category === categoryFilter) && (!startDate || new Date(tx.date) >= new Date(startDate)) && (!endDate || new Date(tx.date) <= new Date(endDate)) && tx.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = sortField === "amount" ? a.amount : new Date(a.date);
      const bVal = sortField === "amount" ? b.amount : new Date(b.date);
      return sortAsc ? aVal - bVal : bVal - aVal;
    });

  const openNew = () => {
    setEditTxn(null);
    setShowTxDialog(true);
  };
  const openEdit = (tx) => {
    setEditTxn(tx);
    setShowTxDialog(true);
  };
  const closeTxDialog = () => {
    setShowTxDialog(false);
    setEditTxn(null);
  };

  const askDelete = (id) => {
    setToDeleteId(id);
    setShowConfirm(true);
  };
  const confirmDelete = () => {
    dispatch({ type: "REMOVE_TRANSACTION", payload: toDeleteId });
    setShowConfirm(false);
    setToDeleteId(null);
  };
  const cancelDelete = () => {
    setShowConfirm(false);
    setToDeleteId(null);
  };

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setCategoryFilter("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <div className={`transactions-table card ${theme}-mode`}>
        <div className="tt-header">
          <h4>All Transactions</h4>
          <Button variant="primary" size="sm" className="tt-add-btn" onClick={openNew}>
            <FaPlus /> Add
          </Button>
        </div>

        <Form className="tt-filters mb-3">
          <Row className="gy-2 align-items-center">
            <Col md={3}>
              <Form.Control type="text" placeholder="Search description" value={search} onChange={(e) => setSearch(e.target.value)} />
            </Col>
            <Col md={2}>
              <Form.Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="All">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>{" "}
            </Col>
            <Col md={2}>
              <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Col>
            <Col md={2}>
              <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Col>
            <Col md={1}>
              <Button variant="secondary" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="tt-sort mb-3 d-flex align-items-center">
          <Form.Select value={sortField} onChange={(e) => setSortField(e.target.value)} size="sm">
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </Form.Select>
          <Button variant="outline-primary" size="sm" className="tt-sort-btn" onClick={() => setSortAsc(!sortAsc)}>
            {sortAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </Button>
        </div>

        <Table striped hover responsive size="sm" className="tt-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount ($)</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.description}</td>
                <td className={`amount ${tx.type.toLowerCase()}`}>{tx.amount.toFixed(2)}</td>

                <td>{tx.type}</td>
                <td>{tx.category}</td>
                <td>{tx.date}</td>
                <td className="tt-actions">
                  <FaEdit className="action-icon" onClick={() => openEdit(tx)} />
                  <FaTrash className="action-icon" onClick={() => askDelete(tx.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <TransactionDialog show={showTxDialog} onClose={closeTxDialog} existing={editTxn} />

      <Dialog show={showConfirm} title="Confirm Delete" onClose={cancelDelete} onSubmit={confirmDelete} submitLabel="Delete" canSubmit={true}>
        <p>Are you sure you want to delete this transaction?</p>
      </Dialog>
    </>
  );
};

export default TransactionsTable;
