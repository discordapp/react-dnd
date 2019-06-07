"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Container_1 = __importDefault(require("./Container"));
function DragAroundNaive() {
    var _a = react_1.default.useState(true), hideSourceOnDrag = _a[0], setHideSourceOnDrag = _a[1];
    var toggle = react_1.default.useCallback(function () { return setHideSourceOnDrag(!hideSourceOnDrag); }, [hideSourceOnDrag]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "EXPERIMENTAL API"),
        react_1.default.createElement(Container_1.default, { hideSourceOnDrag: hideSourceOnDrag }),
        react_1.default.createElement("p", null,
            react_1.default.createElement("label", { htmlFor: "hideSourceOnDrag" },
                react_1.default.createElement("input", { id: "hideSourceOnDrag", type: "checkbox", checked: hideSourceOnDrag, onChange: toggle }),
                react_1.default.createElement("small", null, "Hide the source item while dragging")))));
}
exports.default = DragAroundNaive;