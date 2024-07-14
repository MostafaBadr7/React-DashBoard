import React, { useContext, useEffect, useState } from 'react';
import styles from './DashBoard.module.css'; 
import { DataContext } from '../../Contexts/DataContext';
import PieChart from '../PieChart/PieChart';
import CstsTable from '../CstsTable/CstsTable';

const CustomersTable = () => {
  const { transactions, customers } = useContext(DataContext);
  const [trans, setTrans] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState({});

  useEffect(() => {
    if (transactions) {
      setTrans(transactions);
    }
  }, [transactions]);

  const handleFilter = () => {
    if (transactions) {
      let filtered = transactions;
      if (filterName) {
        filtered = filtered.filter(transaction => {
          const customer = customers.find(cst => cst.id === transaction.customer_id);
          return customer?.name.toLowerCase().includes(filterName.toLowerCase());
        });
      }
      if (filterAmount) {
        filtered = filtered.filter(transaction =>
          transaction.amount.toString().includes(filterAmount)
        );
      }
      setTrans(filtered);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [filterName, filterAmount]);

  useEffect(() => {
    if (selectedCustomer) {
      const filtered = transactions.filter(transaction => transaction.customer_id == selectedCustomer.id);
      const groupedByDate = filtered.reduce((acc, transaction) => {
        if (acc[transaction.date]) {
          acc[transaction.date] += transaction.amount;
        } else {
          acc[transaction.date] = transaction.amount;
        }
        return acc;
      }, {});
      setFilteredTransactions(groupedByDate);
    } else {
      setFilteredTransactions({});
    }
  }, [selectedCustomer, transactions]);

  if (!trans) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={`${styles.tableContainer} d-flex justify-content-around`}>
      <div>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Filter by Customer Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className={styles.filterInput}
          />
          <input
            type="text"
            placeholder="Filter by Transaction Amount"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.customerSelect}>
          <label>Select Customer: </label>
          <select onChange={(e) => setSelectedCustomer(customers.find(cst => Number(cst.id) === Number(e.target.value)))}>
            <option value="">-- Select a Customer --</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCustomer && (
          <PieChart data={filteredTransactions} />
        )}
      </div>
        <CstsTable trans={trans} customers={customers} />
    </div>
  );
};

export default CustomersTable;
