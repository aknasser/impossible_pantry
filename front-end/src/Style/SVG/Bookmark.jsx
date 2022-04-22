import StyleContext from "../../Context/StyleContext";
import * as React from 'react';



const Bookmark = ({fill_color}) => {

    return (
        <>
            <defs>
            </defs>
            <title>BOOKMARK</title>
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <path fill={fill_color} stroke="#000" stroke-miterlimit="10" stroke-width = "2px" d="M1.5,30.34V2.7A1.2,1.2,0,0,1,2.7,1.5H23.8A1.2,1.2,0,0,1,25,2.7V30.26a1.2,1.2,0,0,1-2.05.85l-8.63-8.64a1.2,1.2,0,0,0-1.68,0L3.53,31.2A1.2,1.2,0,0,1,1.5,30.34Z"/>
                    </g>
                </g>
        </>
    );
};

export default Bookmark;