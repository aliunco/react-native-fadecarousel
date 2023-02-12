import React, { Children, cloneElement } from "react";
import { View } from "react-native";
import FadeView, { Bearing } from "react-native-fadeview-wrapper";
import useClamp from "../helper/useClamp";
export { Bearing };
const FadeCarousel = React.forwardRef(({ loop = false, style, children, autoPlay, leaveBearing, entranceBearing, fadeAnimationDuration = 200, }, ref) => {
    const childrenArray = Children.toArray(children).filter((child) => Boolean(child));
    const [currentVisibleIndex, setCurrentVisibleIndex] = React.useState(0);
    const [transitioningCurrentIndex, setTransitioningCurrentIndex] = React.useState(0);
    const latestTransitioningIndex = React.useRef(0);
    const clampedTransitioningCurrentIndex = useClamp({
        value: transitioningCurrentIndex,
        min: 0,
        max: childrenArray.length - 1,
    });
    const clampedCurrentVisibleIndex = useClamp({
        value: currentVisibleIndex,
        min: 0,
        max: childrenArray.length - 1,
    });
    React.useEffect(() => {
        if (autoPlay.enable) {
            let r = setInterval(next, fadeAnimationDuration * 2 + autoPlay.delay);
            return () => clearInterval(r);
        }
        return () => { };
    }, [autoPlay.enable, fadeAnimationDuration]);
    const switchToIndex = (index) => {
        setTransitioningCurrentIndex(index);
        latestTransitioningIndex.current = index;
    };
    const next = () => {
        setTransitioningCurrentIndex(p => {
            let nextValue = Math.min(p + 1, children.length - 1);
            if (loop && nextValue === p) {
                nextValue = 0;
            }
            latestTransitioningIndex.current = nextValue;
            return nextValue;
        });
    };
    const prev = () => {
        setTransitioningCurrentIndex(p => {
            let nextValue = Math.max(p - 1, 0);
            if (loop && nextValue === 0) {
                nextValue = children.length - 1;
            }
            latestTransitioningIndex.current = nextValue;
            return nextValue;
        });
    };
    React.useImperativeHandle(ref, () => ({
        next,
        prev,
        getCurrentIndex: () => latestTransitioningIndex.current,
        switchToIndex,
    }), [next, prev, switchToIndex]);
    return (React.createElement(View, { style: [{ width: "100%", position: "relative" }, style] }, Children.map(childrenArray, (item, index) => {
        return (React.createElement(FadeView, { key: `${index}`, fadeOutScale: 1, duration: fadeAnimationDuration, entranceBearing: entranceBearing, leaveBearing: leaveBearing, removeChildrenAfterDisapearance: true, visible: clampedTransitioningCurrentIndex === index &&
                clampedCurrentVisibleIndex === index, animationFinished: () => {
                setCurrentVisibleIndex(latestTransitioningIndex.current);
            } }, cloneElement(item)));
    })));
});
export default FadeCarousel;
