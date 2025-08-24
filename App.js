import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.moziBox}>
          <Text style={styles.Text}>犬です。</Text>
          <Text style={styles.subText}>黒い</Text>
        </View>
        <View style={styles.gazoBox}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "https://picsum.photos/id/237/200/300",
            }}
          />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.moziBox}>
          <Text style={styles.Text}>テスト。</Text>
          <Text style={styles.subText}>サブテスト</Text>
        </View>
        <View style={styles.gazoBox}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "https://picsum.photos/id/230/200/300",
            }}
          />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.moziBox}>
          <Text style={styles.Text}>test</Text>
          <Text style={styles.subText}>subtest</Text>
        </View>
        <View style={styles.gazoBox}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "https://picsum.photos/id/210/200/300",
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // 배경색
    alignItems: "flex-start", // 가로 배치
    justifyContent: "space-between", // 세로 배치
  },

  box: {
    height: 100,
    width: "100%",
    borderColor: "lightblue",
    borderWidth: 1,
    flexDirection: "row",
  },

  moziBox: {
    flex: 1,
    backgroundColor: "steelblue",
    padding: 16,
    justifyContent: "space-between",
  },

  gazoBox: {
    width: 100,
    backgroundColor: "powderblue",
  },

  Text: {
    fontsize: 16,
  },

  subText: {
    fontSize: 12,
    color: "red",
  },
});
