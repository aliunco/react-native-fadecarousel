import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Bearing } from "react-native-fadeview-wrapper";
type Props = {
    loop?: boolean;
    autoPlay: {
        delay: number;
        enable: true;
    } | {
        enable: false;
    };
    leaveBearing?: Bearing;
    entranceBearing?: Bearing;
    style?: StyleProp<ViewStyle>;
    fadeAnimationDuration?: number;
    children: React.ReactElement[];
};
type FadeCaroselInstance = {
    next: () => void;
    prev: () => void;
    getCurrentIndex: () => number;
    switchToIndex: (index: number) => void;
};
export { Bearing };
declare const FadeCarousel: React.ForwardRefExoticComponent<Props & React.RefAttributes<FadeCaroselInstance>>;
export default FadeCarousel;
