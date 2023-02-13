import React, { Children, cloneElement } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import FadeView, { Bearing } from "react-native-fadeview-wrapper";
import useClamp from "../helper/useClamp";

type Props = {
  loop?: boolean
  autoPlay?: { delay: number, enable: true } | { enable: false };
  leaveBearing?: Bearing;
  entranceBearing?: Bearing;
  style?: StyleProp<ViewStyle>;
  fadeAnimationDuration?: number;
  children: React.ReactElement[];
};

export type FadeCaroselInstance = {
  next: () => void;
  prev: () => void;
  getCurrentIndex: () => number,
  switchToIndex: (index: number) => void;
}

export { Bearing };

const FadeCarousel = React.forwardRef<FadeCaroselInstance, Props>(
  ({ 
    loop = false,
    style, 
    children, 
    autoPlay = { enable: false },
    leaveBearing,
    entranceBearing, 
    fadeAnimationDuration = 200, 
  }, ref) => {
  const childrenArray = Children.toArray(children).filter((child) => Boolean(child));
  const [currentVisibleIndex, setCurrentVisibleIndex] = React.useState<number>(0);
  const [transitioningCurrentIndex, setTransitioningCurrentIndex] =
    React.useState<number>(0);
  const latestTransitioningIndex = React.useRef<number>(0);

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
      let r = setInterval(next, fadeAnimationDuration * 2 + autoPlay.delay)
      return () => clearInterval(r);
    }
    return () => {}
  }, [autoPlay.enable, fadeAnimationDuration])

  const switchToIndex = (index: number) => {
    setTransitioningCurrentIndex(index);
    latestTransitioningIndex.current = index;
  }

  const next = () => {
    setTransitioningCurrentIndex(p => {
      let nextValue = Math.min(p + 1, children.length - 1);
      if (loop && nextValue === p) { nextValue = 0 }
      latestTransitioningIndex.current = nextValue;
      return nextValue
    });
  }

  const prev = () => {
    setTransitioningCurrentIndex(p => {
      let nextValue = Math.max(p - 1, 0);
      if (loop && nextValue === 0) { nextValue = children.length - 1 }
      latestTransitioningIndex.current = nextValue;
      return nextValue
    });
  }

  React.useImperativeHandle(
    ref, () => ({
      next,
      prev,
      getCurrentIndex: () => latestTransitioningIndex.current,
      switchToIndex,
  }),
  [next, prev, switchToIndex]);

  return (
    <View style={[{ width: "100%", position: "relative" }, style]}>
      {Children.map(
        childrenArray,
        (item, index) => {
          return (
            <FadeView
              key={`${index}`}
              fadeOutScale={1}
              duration = {fadeAnimationDuration}
              entranceBearing={entranceBearing}
              leaveBearing={leaveBearing}
              removeChildrenAfterDisapearance
              visible={
                clampedTransitioningCurrentIndex === index &&
                clampedCurrentVisibleIndex === index
              }
              animationFinished={() => {
                setCurrentVisibleIndex(latestTransitioningIndex.current);
              }}
            >
              {cloneElement(item as React.ReactElement)}
            </FadeView>
          );
        },
      )}
    </View>
  );
});

export default FadeCarousel;
