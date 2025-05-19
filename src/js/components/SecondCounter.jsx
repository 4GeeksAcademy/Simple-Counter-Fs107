import { useState, useEffect } from 'react';
import NumberComponent from "./NumberComponent";

function SecondCounter() {
    const [count, setCount] = useState(0);
    let seconds = count;
    let secondToSend = seconds.toString().padStart(6, '0').split('');
    let clock = <i className="fa-regular fa-clock"></i>;


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(count + 1);
            console.log(secondToSend); // Quieres incrementar el contador cada segundo...
        }, 1000)
        return () => clearInterval(intervalId);
    }, [count]);





    return (
        <div className=" d-flex justify-content-center align-items-center text-light px-5 ">
            <NumberComponent number={clock} />
            <NumberComponent number={secondToSend}/>
        </div>
    );
}

export default SecondCounter;