import { Animated, Text, View } from "react-native";

import styles from "./HomeHero.styles";

export default function HomeHero({ opacity, translateY }) {
  return (
    <Animated.View
      style={[
        styles.hero,
        {
          opacity,
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}
    >
      <View style={styles.heroEyebrow}>
        <View style={styles.heroLine} />

        <Text style={styles.heroEyebrowText}>ПИВНИЦА</Text>

        <View style={styles.heroLine} />
      </View>

      <Text style={styles.heroTitle}>
        Вечера, которые{"\n"}
        <Text style={styles.heroAccent}>хочется повторить</Text>
      </Text>

      <Text style={styles.heroSubtitle}>
        Музыка, атмосфера и правильные люди.
      </Text>
    </Animated.View>
  );
}
