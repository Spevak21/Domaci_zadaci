import './Header.scss';

const Header = ({incomeValues, expenseValues}) => {
    
    let incomesSum = incomeValues.reduce((a, b) => a + b, 0);
    let expensesSum = expenseValues.reduce((a, b) => a + b, 0);
    let totalSum = incomesSum - expensesSum;
    let totalExpPercentage = Math.ceil(expensesSum / incomesSum * 100);
    
    incomesSum = formatNumber(incomesSum, 'income');
    expensesSum = formatNumber(expensesSum, 'expense');
    totalSum = formatNumber(totalSum, totalSum<0? 'expense':'income');

    function generateDate() {
        let today, month, year;
        today = new Date();
        month = today.getMonth();
        year = today.getFullYear();
        let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return allMonths[month] + ' ' + year;
    };

    function formatNumber(number, type) {

        if(number === 0) {
            return number;
        }

        let strNum, part1, part2, sign;
    
        number = Math.abs(number); // To avoid double sign on display later
        number = number.toFixed(2); // For getting 2 decimals
    
        strNum = number.split('.'); // Separating integers and decimals
        part1 = strNum[0];
        part2 = strNum[1];
    
        // Putting comma before 3rd number from back in integer
        if(part1.length > 3) {
            part1 = part1.slice(0, part1.length - 3) + ',' + part1.slice(part1.length - 3);
        }
    
        // Deciding what sign needs to be added before number
        if(type === 'income') {
            sign = '+ ';
        }else {
            sign = '- ';
        }
    
        return sign + part1 + '.' + part2;
    };

    return (
        <div className="display">
            <div className="display__container">
                <p className="display__info">Available budget in {generateDate()}</p>
                <p className="display__sum">{totalSum}</p>
                <div className="display__income">
                    <p>INCOME</p>
                    <div className="display__total-income">
                        <p>{incomesSum}</p>
                    </div>
                </div>
                <div className="display__expenses">
                    <p>EXPENSES</p>
                    <div className="display__total-expenses">
                        <p>{expensesSum}</p>
                        <div className="display__percent">
                            <p>{isNaN(totalExpPercentage)? '/': totalExpPercentage} %</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Header;