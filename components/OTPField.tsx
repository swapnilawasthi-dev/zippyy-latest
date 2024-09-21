import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import * as Animatable from "react-native-animatable";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const CELL_SIZE = 46;
const CELL_BORDER_RADIUS = 16;
const DEFAULT_CELL_BG_COLOR = "#fff";
const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const { Value, Text: AnimatedText } = Animated;
const CELL_COUNT = 4;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({
  hasValue,
  index,
  isFocused,
}: {
  hasValue: any;
  index: any;
  isFocused: any;
}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 1 : 1,
      // duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OTPField = ({ value, setValue }: { value: any; setValue: any }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: any;
    symbol: any;
    isFocused: any;
  }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[otpStyle.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <CodeField
      {...props}
      ref={ref}
      value={value}
      autoFocus
      autoComplete="sms-otp"
      onChangeText={(value) => {
        setValue(value);
      }}
      cellCount={CELL_COUNT}
      rootStyle={otpStyle.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={renderCell}
    />
  );
};

const otpStyle = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    justifyContent: "center",
    marginBottom: 36,
    marginTop: 10,
  },

  cell: {
    marginHorizontal: 12,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 1,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 20,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",
    borderColor: "#007BFF",
    borderWidth: 1,

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});

const VerifyOtpStyle = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  OtpContainer: {
    // backgroundColor: AppTheme.Light,
    marginHorizontal: 18,
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
    // color: AppTheme.Dark,
    fontFamily: "Sequel Sans Heavy Head",
    // borderColor: AppTheme.Medium,
  },

  underlineStyleHighLighted: {
    // borderColor: AppTheme.Primary,
  },

  loginHeader: {
    padding: 20,
    textAlign: "center",
  },
  linkStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default OTPField;
