import React, { createContext, useEffect } from "react";
import { useQuery } from "react-query";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:5000/transactions");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const fetchCustomers = async () => {
    const response = await fetch("http://localhost:5000/customers");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: errorTransactions,
  } = useQuery("trans", fetchTransactions);
  const {
    data: customers,
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers,
    error: errorCustomers,
  } = useQuery("Csts", fetchCustomers);

  if (isLoadingTransactions || isLoadingCustomers) {
    return <p>Loading...</p>;
  }

  if (isErrorTransactions) {
    return <p>Error: {errorTransactions.message}</p>;
  }

  if (isErrorCustomers) {
    return <p>Error: {errorCustomers.message}</p>;
  }

  return (
    <DataContext.Provider value={{ transactions, customers }}>
      {props.children}
    </DataContext.Provider>
  );
}
