import { StatusBar } from "expo-status-bar";
import {
  //1:!8:26

  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Button,
  Alert,
  Platform,
} from "react-native"; //VIEW é Div e Text é um paragrafo
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function App() {
  const handlePress = () => console.log("Clicou");
  console.log(Platform.OS);
  console.log(Platform.Version);

  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress}>
        {" "}
        TEXTO!
      </Text>
      <TouchableOpacity
        //onPress={() => console.log("Clicou na Imagem")}
        onLongPress={() => console.log("Segurou na Imagem")}
      >
        <Image
          blurRadius={1}
          loadingIndicatorSource={require("./assets/homer.jpg")}
          fadeDuration={2000}
          resizeMode="contain"
          source={{
            width: 500,
            height: 500,
            uri: "https://picsum.photos/200/300",
          }}
        />
      </TouchableOpacity>
      <TouchableNativeFeedback
        onPress={() => console.log("Clicou no Botão Falso")}
      >
        <View
          style={{
            width: 250,
            height: 100,
            borderRadius: 5,
            backgroundColor: "green",
            margin: 20,
          }}
        >
          <Text
            style={{
              fontSize: 50,
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Botão
          </Text>
        </View>
      </TouchableNativeFeedback>
      <Button
        color={"red"}
        title="Clica Aqui"
        onPress={() =>
          Alert.alert("Hello", "Tá tudo?", [
            { text: "Tá pois", onPress: () => console.log("Clicou Tá Tudo") },
            { text: "Não", onPress: () => console.log("Clicou Não") },
          ])
        }
      />
      {/*  <Button             NÃO FUNCIONA NO ANDROID
        color={"grey"}
        title="Input"
        onPress={() =>
          Alert.prompt("Hello", "Tá tudo?", (text) => console.log(text))
        }
      /> */}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
