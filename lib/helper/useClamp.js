import React from "react";
export const clamp = (value, min, max) => {
    if (min > max) {
        throw Error(`clamping: min: ${min} is more than max: ${max}!`);
    }
    return Math.min(Math.max(value, min), max);
};
function useClamp({ value, min, max, }) {
    const [clampedValue, setClampedValue] = React.useState(value);
    React.useEffect(() => {
        const result = clamp(value, min === undefined ? value : min, max === undefined ? value : max);
        setClampedValue(result);
    }, [value, min, max]);
    return clampedValue;
}
export default useClamp;
