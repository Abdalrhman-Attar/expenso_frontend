// src/presentation/components/Transactions/TransactionsTable/TransactionsTable.jsx
import { useState } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import TransactionDialog from "../../../components/common/TransactionDialog/TransactionDialog";
import Dialog from "../../../components/common/Dialog/Dialog";
import Transaction from "../../../../domain/entities/Transaction";
import Category from "../../../../domain/entities/Category";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  // pull theme separately
  const { theme } = useTheme();
  // state + methods from your store
  const {
    state: { transactions: rawTx, categories: rawCats },
    removeTransaction,
  } = useStore();

  // wrap in entity classes once
  const transactions = rawTx.map((t) => new Transaction(t));
  const categories = rawCats.map((c) => new Category(c));

  console.log("Transations: ", transactions);
  console.log("Categories: ", categories);

  // filter/sort UI state
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortAsc, setSortAsc] = useState(false);

  // dialog state
  const [showTxDialog, setShowTxDialog] = useState(false);
  const [editTxn, setEditTxn] = useState(null);

  // delete confirm
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  // prepare filtered + sorted data
  const filtered = transactions
    .filter((tx) => {
      // type
      if (typeFilter !== "All" && tx.type !== typeFilter) return false;
      // category
      if (categoryFilter && tx.category_id !== categoryFilter) return false;
      // date range
      if (startDate && tx.date < new Date(startDate)) return false;
      if (endDate && tx.date > new Date(endDate)) return false;
      // text search
      if (!tx.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const aVal = sortField === "amount" ? a.amount : a.date;
      const bVal = sortField === "amount" ? b.amount : b.date;
      return sortAsc ? aVal - bVal : bVal - aVal;
    });

  // dialog handlers
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

  // delete handlers
  const askDelete = (id) => {
    setToDeleteId(id);
    setShowConfirm(true);
  };
  const confirmDelete = async () => {
    await removeTransaction(toDeleteId);
    setShowConfirm(false);
    setToDeleteId(null);
  };
  const cancelDelete = () => {
    setShowConfirm(false);
    setToDeleteId(null);
  };

  // reset filters
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
        <div className="tt-header d-flex align-items-center justify-content-between">
          <h4>All Transactions</h4>
          <Button variant="primary" size="sm" onClick={openNew}>
            <FaPlus /> Add
          </Button>
        </div>

        {/* Filters */}
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
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
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

        {/* Sort */}
        <div className="tt-sort mb-3 d-flex align-items-center">
          <Form.Select value={sortField} onChange={(e) => setSortField(e.target.value)} size="sm" className="me-2">
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </Form.Select>
          <Button variant="outline-primary" size="sm" onClick={() => setSortAsc((prev) => !prev)}>
            {sortAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </Button>
        </div>

        {/* Table */}
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
                <td className={`amount ${tx.isIncome() ? "income" : "expense"}`}>{Number(tx.amount).toFixed(2)}</td>

                <td>{tx.type}</td>
                {/* look up category name by ID */}
                <td>{categories.find((c) => c.id === tx.category_id)?.name || "—"}</td>
                <td>{tx.date.toLocaleDateString()}</td>
                <td className="tt-actions">
                  <FaEdit className="action-icon me-2" onClick={() => openEdit(tx)} />
                  <FaTrash className="action-icon" onClick={() => askDelete(tx.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Transaction Dialog */}
      <TransactionDialog show={showTxDialog} onClose={closeTxDialog} existing={editTxn} />

      {/* Confirm Delete */}
      <Dialog show={showConfirm} title="Confirm Delete" onClose={cancelDelete} onSubmit={confirmDelete} submitLabel="Delete" canSubmit>
        <p>Are you sure you want to delete this transaction?</p>
      </Dialog>
    </>
  );
};

export default TransactionsTable;
