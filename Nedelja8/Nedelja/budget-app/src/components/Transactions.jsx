import './Transactions.scss'

import Item from './Item';

const Transactions = ({incomes, expenses, setIncomes, setExpenses}) => {



    return (
        <div className="lists">
            <div className="lists-left">
                <p className="lists-left__header">INCOMES</p>
                {incomes.map(income => <Item key = {income.id} element = {income} setArray = {setIncomes} incomes = {incomes}/>)}
            </div>
            <div className="lists-right">
                <p className="lists-right__header">EXPENSES</p>
                {expenses.map(expense => <Item key = {expense.id} element = {expense} setArray = {setExpenses} incomes = {incomes}/>)}
            </div>
        </div>
    );
}
 
export default Transactions;