// src/presentation/components/Dashboard/RecentTransactions/RecentTransactions.jsx
import { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import TransactionDialog from "../../../components/common/TransactionDialog/TransactionDialog";
import Dialog from "../../../components/common/Dialog/Dialog";
import "./RecentTransactions.css";

const RecentTransactions = () => {
  const {
    theme,
    state: { transactions },
    removeTransaction,
  } = useStore();
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const [showTxDialog, setShowTxDialog] = useState(false);
  const [editTxn, setEditTxn] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const openNew = () => {
    setEditTxn(null);
    setShowTxDialog(true);
  };
  const openEdit = (txn) => {
    setEditTxn(txn);
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
  const confirmDelete = async () => {
    await removeTransaction(toDeleteId);
    setShowConfirm(false);
    setToDeleteId(null);
  };
  const cancelDelete = () => {
    setShowConfirm(false);
    setToDeleteId(null);
  };

  return (
    <>
      <div className={`recent-transactions card ${theme}-mode`}>
        <div className="rt-header">
          <h4>Recent Transactions</h4>
          <button className="rt-add-btn" onClick={openNew} aria-label="Add Transaction">
            <FaPlus />
          </button>
        </div>

        <ul className="transaction-list">
          {recent.map((t) => (
            <li key={t.id} className="transaction-item">
              <div className="info">
                <span className="desc">{t.description}</span>
                <span className={`amount ${t.isIncome() ? "income" : "expense"}`}>
                  {t.isIncome() ? "+" : "-"}${t.amount.toFixed(2)}
                </span>
                <span className="date">{t.date.toLocaleDateString()}</span>
              </div>
              <div className="actions">
                <FaEdit onClick={() => openEdit(t)} />
                <FaTrash onClick={() => askDelete(t.id)} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <TransactionDialog show={showTxDialog} onClose={closeTxDialog} existing={editTxn} />

      <Dialog show={showConfirm} title="Confirm Delete" onClose={cancelDelete} onSubmit={confirmDelete} submitLabel="Delete" canSubmit={true}>
        <p>Are you sure you want to delete this transaction?</p>
      </Dialog>
    </>
  );
};

export default RecentTransactions;
