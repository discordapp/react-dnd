import React, { useState, useCallback } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Box from './Box';
import ItemTypes from './ItemTypes';
import update from 'immutability-helper';
const Container = () => {
    const [dustbins, setDustbins] = useState([
        { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
        { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
        {
            accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
            lastDroppedItem: null,
        },
        { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
    ]);
    const [boxes] = useState([
        { name: 'Bottle', type: ItemTypes.GLASS },
        { name: 'Banana', type: ItemTypes.FOOD },
        { name: 'Magazine', type: ItemTypes.PAPER },
    ]);
    const [droppedBoxNames, setDroppedBoxNames] = useState([]);
    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }
    const handleDrop = useCallback((index, item) => {
        const { name } = item;
        setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
        setDustbins(update(dustbins, {
            [index]: {
                lastDroppedItem: {
                    $set: item,
                },
            },
        }));
    }, [droppedBoxNames, dustbins]);
    return (React.createElement("div", null,
        React.createElement("div", { style: { overflow: 'hidden', clear: 'both' } }, dustbins.map(({ accepts, lastDroppedItem }, index) => (React.createElement(Dustbin, { accepts: accepts, lastDroppedItem: lastDroppedItem, 
            // tslint:disable-next-line jsx-no-lambda
            onDrop: item => handleDrop(index, item), key: index })))),
        React.createElement("div", { style: { overflow: 'hidden', clear: 'both' } }, boxes.map(({ name, type }, index) => (React.createElement(Box, { name: name, type: type, isDropped: isDropped(name), key: index }))))));
};
export default Container;
