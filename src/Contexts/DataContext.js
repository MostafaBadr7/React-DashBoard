import React, { createContext } from "react";
import { useQuery } from "react-query";

export const DataContext = createContext();

const githubRawUrl =
  "https://raw.githubusercontent.com/MostafaBadr7/React-DashBoard/main/db.json";

const fetchData = async () => {
  const response = await fetch(githubRawUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function DataContextProvider(props) {
  const { data, isLoading, isError, error } = useQuery("data", fetchData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const { transactions, customers } = data;

  return (
    <DataContext.Provider value={{ transactions, customers }}>
      {props.children}
    </DataContext.Provider>
  );
}
