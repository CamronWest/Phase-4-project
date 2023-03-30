import React, { useState } from "react";



function Dropdown({stateList}) {
    const [selectedState, setSelectedState] = useState("");

    function handleChange(event) {
        setSelectedState(event.target.value);
    }

    return (
        <div>
            <label htmlFor="state">Select a state:</label>
            <select id="state" value={selectedState} onChange={handleChange}>
                <option value="">--Please select a state--</option>
                {stateList.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            {selectedState && <p>You selected: {selectedState}</p>}
        </div>
    );
}

export default Dropdown;
