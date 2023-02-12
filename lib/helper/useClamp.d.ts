export declare const clamp: (value: number, min: number, max: number) => number;
declare function useClamp<T extends number>({ value, min, max, }: {
    value: T;
    min?: number;
    max?: number;
}): T;
export default useClamp;
