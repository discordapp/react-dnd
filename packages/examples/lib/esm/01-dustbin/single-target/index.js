import React from 'react';
import Dustbin from './Dustbin';
import Box from './Box';
const rowStyle = { overflow: 'hidden', clear: 'both' };
const Container = () => (React.createElement("div", null,
    React.createElement("div", { style: rowStyle },
        React.createElement(Dustbin, null)),
    React.createElement("div", { style: rowStyle },
        React.createElement(Box, { name: "Glass" }),
        React.createElement(Box, { name: "Banana" }),
        React.createElement(Box, { name: "Paper" }))));
export default Container;