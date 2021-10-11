import './Item.scss'

const Item = ({element, setArray, incomes}) => {
    
    let incomeValues = incomes.map(inc => inc.value);
    let incomesSum = incomeValues.reduce((a, b) => a + b, 0);
    let expPercentage = Math.ceil(element.value/incomesSum * 100);

    let borderClasses = 'item__border item__border--green';
    let valueClasses = 'item__value item__value--green';
    let btnDelClasses = 'item__btn-delete item__btn-delete--green';
    if(element.type === 'expense'){
        borderClasses = 'item__border item__border--red';
        valueClasses = 'item__value item__value--red';
        btnDelClasses = 'item__btn-delete item__btn-delete--red';
    }

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
        <div className="item">
            <div className={borderClasses}>
                <p className="item__description">{element.description}</p>
                <div className="item__info">
                    <p className={valueClasses}>{formatNumber(element.value, element.type)}</p>
                    {element.type === 'expense'? <div className="item__percentage"><p>{incomesSum !== 0?expPercentage:'/'} %</p></div>:''}
                    <button className={btnDelClasses} onClick={() => {

                        setArray((prev) => {
                            let copy = [...prev];
                            let index = copy.indexOf(element);
                            copy.splice(index, 1);
                            return copy
                            // return prev.filter(el => el.id !== element.id)
                        });
                    }}>x</button>
                </div>
            </div>
        </div>
    );
}
 
export default Item;