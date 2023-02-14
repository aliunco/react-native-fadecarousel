# React Native Fade Carousel Wrapper

 A Fade Carousel for react native written in [TypeScript](https://www.typescriptlang.org/) in order to handle the Fade Carousel behavior for any react native components.

![](https://github.com/aliunco/react-native-fadecarousel/blob/main/demo.gif?raw=true)

## Installing

For the latest stable version:

using npm:
```bash
npm install --save react-native-fadecarousel
```

using yarn:
```bash
yarn add react-native-fadecarousel
```

## Usage Sample

```tsx
import React from 'react';
import FadeCarousel, { Bearing } from 'react-native-fadecarousel';
import { View, Text } from 'reat-native';

const FadeCarouselScreen = () => {
    return <FadeCarousel 
                loop 
                entranceBearing={Bearing.Left}
                fadeAnimationDuration={1000} 
                autoPlay={{enable: true , delay: 1000 }}>
        {[
            <View key={'slide one'} style={styles.slideItem}><Text style={styles.label}>Side One</Text></View>,
            <View key={'slide two'} style={styles.slideItem}><Text style={styles.label}>Side Two</Text></View>,
            <View key={'slide three'} style={styles.slideItem}><Text style={styles.label}>Side Three</Text></View>
        ]}
    </FadeCarousel>
}
```

Here is the properties and the descriptions of them: 


| Props Name | Default | Type | isRequired | Description |
| :--: | :----- | :--: | :--: | :------------------------- |
| loop | `false` | `boolean` | `No` | you can determine if the last slider would go back to the first one (and vise versa) or not |
| autoPlay | `{enable: false}` | { <br/>&ensp; "delay": number, <br/>&ensp; enable: true <br/>} <br/>\| { <br/>&ensp; enable: false <br/>} | `No` | if you need the carousel to slide childrens automatically, you can use this properly with a proper delay (between slides) |
| entranceBearing | `Bearing.Center` | `Bearing` | `No` | you can swith the entrance direction of slides of the carousel |
| leaveBearing | `Bearing.Center` | `Bearing` | `No` | you can swith the leave direction of slides of the carousel |
| style | `undefined` | `StyleProp<ViewStyle>` | `No` | you can set an optional style for the whole carousel |
| fadeAnimationDuration | `undefined` | `number` | `No` | transition animation duration of the fading action (entrance & leave) |
| children | `undefined` | `React.ReactElement[]` | `YES` | an array of the Elements that you want to use them as each slides |


You can also manage controlling the carousel using ref value and here is the type of the reference value: 

```tsx
type FadeCaroselInstance = {
  next: () => void;
  prev: () => void;
  getCurrentIndex: () => number,
  switchToIndex: (index: number) => void;
}
```

Example: 

```tsx
import FadeCarousel, { FadeCaroselInstance } from 'react-native-fadecarousel';

const carousel = React.useRef<FadeCaroselInstance>(null);

const wantsToGoNext = () => {
    carousel.current?.next();
}

<FadeCarousel ... ref={carousel}>
    ...
</FadeCarousel>
```