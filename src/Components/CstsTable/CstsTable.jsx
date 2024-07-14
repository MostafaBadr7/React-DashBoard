import React from 'react'
import styles from '../CstsTable/CstsTable.module.css'
const CstsTable = ({trans, customers}) => {
  return (
    <table className='bg-secondary'>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={`${styles.tableCell}`}>Customer Name</th>
            <th className={styles.tableCell}>Transaction Date</th>
            <th className={styles.tableCell}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {trans.map((transaction, index) => {
            const customer = customers.find((cst) => Number(cst.id) === Number(transaction.customer_id));
            return (
              <tr key={`${transaction.customer_id}-${transaction.date}-${index}`} className={index % 2 === 0 ? styles.tableRow : ''}>
                <td className={styles.tableCell}>{customer?.name || "Unknown"}</td>
                <td className={styles.tableCell}>{transaction.date}</td>
                <td className={styles.tableCell}>{transaction.amount} LE</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  )
}

export default CstsTable