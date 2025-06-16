import AppLayout from "../layout/AppLayout/AppLayout";
import TransactionsTable from "../components/Transactions/TransactionsTable/TransactionsTable";

const Transactions = () => (
  <AppLayout pageTitle="Transactions">
    <TransactionsTable />
  </AppLayout>
);

export default Transactions;
