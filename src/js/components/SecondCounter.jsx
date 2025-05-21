import { useState, useEffect, useRef } from 'react';
import "./SecondCounter.css"






function SecondCounter() {
    let clock = <i className="fa-regular fa-clock"></i>;
    const [inputValue, setInputValue] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [pause, setPause] = useState(false);
    let intervalRef = useRef(null);
    const [discount, setDiscount] = useState(false);


    //para descontar si quieren temporizador
    const discountHander = () => {
        setDiscount(prev => !prev);
    }


    //reiniciar el contador
    const RestartHandler = (value) => {
        setSeconds(value);
    }

    useEffect(() => {
        if (!pause) {
            if (!discount) {
                intervalRef.current = setInterval(() => {
                    setSeconds(prev => prev + 1);
                }, 1000);

            }
            else {
                if (seconds === null || seconds <= 0) {

                    clearInterval(intervalRef.current);
                    setDiscount(false);
                    togglePause(true);
                    
                    return;
                }

                intervalRef.current = setInterval(() => {
                    setSeconds((prev) => prev - 1);
                }, 1000);

            }
        } else {
            clearInterval(intervalRef.current);
        }

        // Limpieza del intervalo al desmontar o cambiar `pause`
        return () => clearInterval(intervalRef.current);
    }, [pause,seconds]);
    //pausa 
    const togglePause = () => {
        setPause(prev => !prev);
    };
    //para ingresar el temporizador y acivarlo
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const value = parseInt(inputValue, 10);
            if (!isNaN(value) && value > 0) {
                discountHander(true);
                RestartHandler(value)
            }
        }
    };

    const digits = seconds.toString().padStart(6, '0').split('');
    return (
        <div className="d-flex justify-content-center align-items-center gap-2 text-light px-5 ">
            <div className='number-box border-secondary border border-2 rounded '>{clock}</div>
            <div className=" d-flex justify-content-center  border-secondary align-items-center ">
                {digits.map((digit, index) => (
                    <div key={index} className=" border border-2 rounded  border-secondary  mx-3 number-box">
                        {digit}
                    </div>
                ))}
            </div>
            <div className='container'>
                <button onClick={() => pause ? togglePause(false) : togglePause(true)}>{pause ? "Resume" : "Pause"}</button>
                <button onClick={() => RestartHandler(0)}>Reset</button>
                <label>Temporizador</label>
                <input
                    type="number"
                    placeholder="¿Cuántos segundos?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

            </div>
        </div>
    );
}

export default SecondCounter;