import { Link } from "expo-router";
import {
  Dimensions,
  Pressable,
  ScaledSize,
  StyleSheet,
  Text,
} from "react-native";

const window: ScaledSize = Dimensions.get("window");

const HomeScreenButton = ({
  children,
  onPress,
}: {
  children: any;
  onPress: any;
}) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.navButton, styles.buttonPressed] : styles.navButton
      }
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

const HomeScreenNavButton = ({
  navigation,
  target,
  title,
}: {
  navigation: any;
  target: string;
  title: string;
}) => {
  return (
    <HomeScreenButton onPress={() => navigation.navigate(target)}>
      <Text style={styles.navButtonText}>{title}</Text>
    </HomeScreenButton>
  );
};

const HomeScreenNavLink = ({
  target,
  title,
}: {
  target: string;
  title: string;
}) => {
  return (
    <HomeScreenButton onPress={null}>
      <Link style={styles.realLink} href={target}>
        {title}
      </Link>
    </HomeScreenButton>
  );
};

const HomeScreenComicButton = ({
  onPress,
  children,
  title,
}: {
  onPress: any;
  title: string;
  children?: any;
}) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.comicButton, styles.buttonPressed]
          : styles.comicButton
      }
      onPress={onPress}
    >
      <Text style={styles.comicButtonText}>{title}</Text>
      {children != null && children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // NOTE: button sizes set via window dimension because flex property wasn't working right
  comicButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: window.width / 3,
  },
  buttonPressed: {
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
  },
  comicButtonText: {
    textAlign: "center",
  },
  navButton: {
    justifyContent: "center",
    borderWidth: 1,
    height: window.height / 12,
  },
  navButtonText: {
    textAlign: "center",
  },
  realLink: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export {
  HomeScreenButton,
  HomeScreenComicButton,
  HomeScreenNavButton,
  HomeScreenNavLink,
};
