import './App.css';

import Header from './components/Header';
import Form from './components/Form';
import Transactions from './components/Transactions';
import { useState } from 'react';


function App() {
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])


  return (
    <>
      <section className = 'top'>
        <Header incomeValues = {incomes.map(inc => inc.value)} expenseValues = {expenses.map(exp => exp.value)}/>
      </section>
      <section className = 'bottom'>
        <Form setIncomes = {setIncomes} setExpenses = {setExpenses}/>
        <Transactions incomes = {incomes} expenses = {expenses} setIncomes = {setIncomes} setExpenses = {setExpenses}/>
      </section>
    </>
  );
}

export default App;
