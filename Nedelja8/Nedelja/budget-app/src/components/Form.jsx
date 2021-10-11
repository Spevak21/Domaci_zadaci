import { useState } from 'react';
import './Form.scss';


const Form = ({setIncomes, setExpenses}) => {

    const [type, setType] = useState('income');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);

    function typeChange(target) {
        setType(target.value);
    }

    function descriptionChange(target) {
        setDescription(target.value);
    }

    function valueChange(target) {

        if(!isNaN(Number(target.value))) {
            setValue(Number(target.value));
        }
    }

    function btnSub() {
        
        if(description === '' || value === 0 || value < 0) {
            return
        }

        let newTransaction = {
            id: Math.random(),
            type: type,
            description: description,
            value: Number(value)
        }

        if(type === 'income') {
            setIncomes((prev) => [...prev, newTransaction])
        }else if(type === 'expense') {
            setExpenses((prev) => [...prev, newTransaction])
        }

        setType('income');
        setDescription('');
        setValue(0);
    }


    return (
        <div className="form">
            <div className="form__container">
                <select className="form__type" value={type} onChange={event => typeChange(event.target)}>
                    <option value="income">+</option>
                    <option value="expense">&#8211;</option>
                </select>
                <input value={description} className ="form__description" placeholder="Add description" onChange={event => descriptionChange(event.target)} />
                <input value={value === 0?'':value} className ="form__value" placeholder="value" min="0" onChange={event => valueChange(event.target)}/>
                <button className="form__btn" onClick={() => btnSub()}>&#10003;</button>
            </div>
        </div>
    );
}
 
export default Form;