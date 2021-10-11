import { useEffect, useState } from "react";
import StyledCalculator from "./StyledCalculator"

const Calculator = () => {

    const [result, setResult] = useState(0);
    const [current, setCurrent] = useState('');
    const [str, setStr] = useState('');

    useEffect(() => {
        setCurrent('');
        document.querySelector('.current').focus();
    }, [result])

    return (
        <>
            <StyledCalculator>
                <input value={result} type="text" readOnly/>
                <input value={current} type="text" className="current" onChange={event => {
                    if(!isNaN(Number(event.target.value))) {
                        setCurrent(event.target.value);
                    }
                }}/>

                <button onClick={() => {
                    if(current !== '' && Number(current) !== 0) {
                        setResult(prev => prev + Number(current));
                        setStr(prev => prev + '+' + current);
                    }else if(Number(current) === 0) {
                        setCurrent('');
                    }
                }}>+</button>
                <button onClick={() => {
                    if(current !== '' && Number(current) !== 0) {
                        setResult(prev => prev - Number(current));
                        setStr(prev => prev + '-' + current);
                    }else if(Number(current) === 0) {
                        setCurrent('');
                    }
                }}>-</button>
                <button onClick={() => {
                    if(current !== '' && Number(current) !== 0) {
                        setResult(prev => prev * Number(current));
                        setStr(prev => prev + '*' + current);
                    }else if(Number(current) === 0) {
                        setResult(0);
                        setCurrent('');
                    }
                }}>*</button>
                <button onClick={() => {
                    if(current !== '' && Number(current) !== 0) {
                        setResult(prev => prev / Number(current));
                        setStr(prev => prev + '/' + current);
                    }else if(Number(current) === 0) {
                        setCurrent('');
                    }
                }}>/</button>
                <button onClick={event => {
                        setResult(0);
                        setStr('');
                }}>Clear</button>
            </StyledCalculator>
            <p style={{fontSize: '2rem'}}>Memo: {str}</p>
        </>
    );
}
 
export default Calculator;