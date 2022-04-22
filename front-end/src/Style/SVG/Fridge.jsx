const Fridge = ({fill_color}) => {

    return (
        <>
            <defs>
            </defs>
            <title>FRIDGE</title>
            <g id="Layer_2" data-name="Layer 2">
                <g id="FRIDGE">
                    <path id="HIGHER_PART" data-name="HIGHER PART" fill={fill_color} stroke="#000" stroke-miterlimit="10" stroke-width="2px" d="M71,1H5A4,4,0,0,0,1,5V81H75V5A4,4,0,0,0,71,1Z"/>
                    <path id="LOWER_PART" data-name="LOWER PART" fill={fill_color} stroke="#000" stroke-miterlimit="10" stroke-width="2px" d="M75,85v40a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V85Z"/>
                    <path id="HANDLE" fill="#fff" stroke="#000" stroke-miterlimit="10" d="M5,29.81V62.19A.92.92,0,0,0,6,63H6a.92.92,0,0,0,1-.81V29.81A.92.92,0,0,0,6,29H6A.92.92,0,0,0,5,29.81Z"/>
                    <path id="HANDLE-2" data-name="HANDLE" fill="#fff" stroke="#000" stroke-miterlimit="10" d="M5,89.38v15.24c0,.21.45.38,1,.38H6c.55,0,1-.17,1-.38V89.38c0-.21-.45-.38-1-.38H6C5.45,89,5,89.17,5,89.38Z"/>
                </g>
            </g>
        </>
    );
};

export default Fridge;