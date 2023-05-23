import React from 'react';
import { useState, useEffect } from "react";

function Popup() {
    const [isChecked, setIsChecked] = useState(true);

    return (
        <div className="App">
            <div>
                <input
                    type="checkbox"
                    id="check"
                    checked={isChecked}
                    onChange={() => setIsChecked(prevState => !prevState)}
                />
                <label htmlFor="check">
                    チェック：
                </label>
            </div>
        </div>
    );
}

export default Popup;