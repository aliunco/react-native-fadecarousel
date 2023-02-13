import React from "react";

export const clamp = (value: number, min: number, max: number) => {
    if (min > max) {
        throw Error(`clamping: min: ${min} is more than max: ${max}!`);
    }
    return Math.min(Math.max(value, min), max);
};

function useClamp<T extends number>({
  value,
  min,
  max,
}: {
  value: T;
  min?: number;
  max?: number;
}) {
  const [clampedValue, setClampedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const result = clamp(
      value,
      min === undefined ? value : min,
      max === undefined ? value : max,
    );
    setClampedValue(result as T);
  }, [value, min, max]);

  return clampedValue;
}

export default useClamp;
