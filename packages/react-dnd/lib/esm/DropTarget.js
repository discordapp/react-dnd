import checkDecoratorArguments from './utils/checkDecoratorArguments';
import decorateHandler from './decorateHandler';
import registerTarget from './registerTarget';
import createTargetFactory from './createTargetFactory';
import isValidType from './utils/isValidType';
import DropTargetMonitorImpl from './DropTargetMonitorImpl';
import TargetConnector from './TargetConnector';
import { isPlainObject } from './utils/discount_lodash';
const invariant = require('invariant');
export default function DropTarget(type, spec, collect, options = {}) {
    checkDecoratorArguments('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);
    let getType = type;
    if (typeof type !== 'function') {
        invariant(isValidType(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' +
            'a string, an array of strings, or a function that returns either given ' +
            'the current props. Instead, received %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', type);
        getType = () => type;
    }
    invariant(isPlainObject(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' +
        'a plain object. Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', spec);
    const createTarget = createTargetFactory(spec);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' +
        'a function that returns a plain object of props to inject. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    invariant(isPlainObject(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' +
        'a plain object when specified. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    return function decorateTarget(DecoratedComponent) {
        return decorateHandler({
            containerDisplayName: 'DropTarget',
            createHandler: createTarget,
            registerHandler: registerTarget,
            createMonitor: (manager) => new DropTargetMonitorImpl(manager),
            createConnector: (backend) => new TargetConnector(backend),
            DecoratedComponent,
            getType,
            collect,
            options,
        });
    };
}