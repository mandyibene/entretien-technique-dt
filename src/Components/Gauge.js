import React, { useState } from 'react';

const Gauge = () => {

    const [percentage, setPercentage] = useState(200);
    const fullAngle = 270;
    const fullPercentage = 200;

    const getGaugeValue = () => {
        return percentage / (fullPercentage/100) * (fullAngle/360);
    }

    const getGaugeCursorValue = () => {
        return percentage * fullAngle / fullPercentage;
    }

    const increase = (val) => {
        if (percentage + val <= fullPercentage) {
            return setPercentage(percentage + val);
        }
        return setPercentage(fullPercentage);
    }

    // 
    const decrease = (val) => {
        if (percentage - val >= 0) {
            return setPercentage(percentage - val);
        }
        return setPercentage(0);
    }

    const gaugeGradient = () => {
        let gaugeValue = getGaugeValue();
        let gradient = "";
        let thres = [27.5, 47.5]; let cols = ["red", "yellow", "green"];
        if (gaugeValue <= thres[0]) {
            gradient = `red ${gaugeValue}%`;
        } else if (gaugeValue <= thres[1]) {
            gradient = `${cols[0]} ${thres[0]}%, ${cols[1]} ${thres[0]}%, ${cols[1]} ${gaugeValue}%`;
        } else {
            gradient = `${cols[0]} ${thres[0]}%, ${cols[1]} ${thres[0]}%, ${cols[1]} ${thres[1]}%, ${cols[2]} ${thres[1]}%, ${cols[2]} ${gaugeValue}%`;
        }
        return {background: `conic-gradient(from 225deg, ${gradient}, transparent ${gaugeValue}%)`};
    }

    const cursorRotation = () => {
        return {transform: `rotate(225deg) rotate(${getGaugeCursorValue()}deg)`};
    }

    return (
        <div className="gauge">

            <div className="gauge-bg" />
            <div className="gauge-gradient" style={gaugeGradient()} />
            <div className="gauge-inner">
                <div className="gauge-cursor" style={cursorRotation()} />
                <div className="gauge-indicator">{percentage}%</div>
            </div>
            
            <div className='gauge-buttons'>
                <button onMouseDown={() => decrease(10)} disabled={percentage === 0}>--</button>
                <button onMouseDown={() => decrease(1)} disabled={percentage === 0}>-</button>
                <button onMouseDown={() => increase(1)} disabled={percentage === fullPercentage}>+</button>
                <button onMouseDown={() => increase(10)} disabled={percentage === fullPercentage}>++</button>
            </div>
            
        </div>
    )

}

export default Gauge