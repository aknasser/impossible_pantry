

const Tick = ({fill_color, tick_color}) => {

    return (
        <>
            <defs>
            </defs>
            <g id="Calque_2" data-name="Calque 2">
                <g id="Calque_1-2" data-name="Calque 1">
                    <circle fill={fill_color} stroke={tick_color} stroke-miterlimit="10" stroke-width="4px" cx="38.91" cy="38.91" r="36.91"/>
                    <path id="Path_79" data-name="Path 79" fill="none" stroke={tick_color} stroke-miterlimit="10" stroke-width="4px" d="M11.91,39.48,18.38,46,29.51,57.1l7.93-7.92,9.79-9.79L66.38,20.25"/>
                </g>
            </g>
        </>
    );
};

export default Tick;