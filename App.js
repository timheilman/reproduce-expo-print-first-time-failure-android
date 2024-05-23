import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { printToFileAsync } from "expo-print";
import { useState, useEffect } from "react";
import Pdf from "react-native-pdf";

export default function App() {
  console.log("rendering App");
  const [pdfUri, setPdfUri] = useState(null);
  useEffect(() => {
    printToFileAsync({
      html: `<html>
      <meta name=\"viewport\">
        <head>
        <link href='https://fonts.googleapis.com/css?family=Space Grotesk' rel='stylesheet'>
        <style>
           h1 {
            font-family: 'Space Grotesk', sans-serif;
            text-decoration: underline;
          }
      </style>
        </head>
        <body>
          <h1>ONE</h1>
          <h1>TWOTWO</h1>
          <h1>THREETHREETHREE</h1>
          <h1>FOURFOURFOURFOUR</h1>
          <h1>FIVEFIVEFIVEFIVEFIVE</h1>
          <h1>SIXSIXSIXSIXSIXSIX</h1>
        </body>
      </html>`,
      width: 612,
      height: 792,
      base64: false,
    })
      .then((res) => {
        console.log(`Setting pdfUri to ${res.uri}`);
        setPdfUri(res.uri);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      {pdfUri && (
        <>
          <Text>PdfUriSet</Text>
          <Pdf
            trustAllCerts={false}
            source={{
              uri: pdfUri,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(
                `Number of pages: ${numberOfPages}; filePath: ${filePath}`,
              );
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}/${numberOfPages}`);
            }}
            onError={(error) => {
              console.log("error");
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{
              borderWidth: 2,
              borderColor: "red",
              borderRadius: 8,
              padding: 5,
              margin: 10,
              width: "100%",
              height: "100%",
            }}
          />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
