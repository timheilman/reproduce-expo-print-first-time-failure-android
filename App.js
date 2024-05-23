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
           body {
            font-family: 'Space Grotesk', sans-serif;
            padding: 5px;
            position: relative;
            margin: 0;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAAoCAMAAAD61DXgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADPUExURQAAABAQMCAQIBgQKBsQKxgQLBYQKRUNKBUQKxgQKxcQKxYOKBYOKhYQKhUOKRcQKRYOKhYQKhYPKhcPKRcPKRcQKRYPKRYPKRcPKRYPKhYPKSQeJyUeJjMtJEE8IkI7IUI7IkI8IVBKH1BLH1FKH15ZHV9ZHF9ZHW1oGm5oGnt3GHx2F3x3F4qFFYuFFJiUE5mTEpmUEpqUEaeiEKejEKiiD6ijD7axDbayDbeyDMW/CsXACsXAC9POCNPPCNTPB+LdBeLeBfDsA/HsAv/7AFcyht4AAAAadFJOUwAQECAwQFBfYGBwf3+Aj4+fn6+vv7/P39/vr3C8dQAAAhRJREFUWMPl1m13mjAUB/BOjKtWp7Zs1ouZwCjGYrCxTLbBLOj9/p9p8emceUStdbt7sf/JC04g+XEJ4XB19T+EmdSiYQIQ19gGoDWZCUBqlq43IpnJ6l0ASrNUM+H3/HWwXN8FX2caZVZdp8KYUTpnY1RbXdjPiUG11qe9UffmXbNRZeVjeqlcbd4VeSdM1ryH49F6q9FYls+MVRirVGvNlnl84GvX/U/mAFnvAtCarANAa5Y+ABCbRgeozfddoDZvAKhNChL+AQkXk569bDvh3vbI4pbHj5qVN5Acn3Xb7YtwezTDIYpjpnHyjeWwvmmejyBOIMhn4cZ8SGYTSMJ+klhPXyMM8gk8Ber5UbnadINDZsG+9IU14s6AO4K7/oBLAd+FA44uTkKaufgtRn9lcvwpMZy9BHP0FnGESrNpno5TdDGc6qsPmLf7dY19aUv1Q05lYMdKcgFjKXtyY0ocq1SsTF9Xg4maqySfYqCfre5L5wBLE3F+6NkWvT+RBhzx4PqjvhUId2jDSPRDCT2cDbLMx4k3cjH+jLGLkwFGAnMVZ2jrIgMUabY2lY9esWkUrZ9T0Ncb6jWVmOopFWKqp5UZSrnAlPcQA6Wril70eb41RW+RFJtnf2SXU67St5btDfvz7J35Jcsu/CYYZ49Ti/BCsw2UWZHXQG926E3iMoHkZ2TfvAFy0+jSm20gN999JM8vLlNcRvr4fLUAAAAASUVORK5CYII=');
            background-size: auto;
            background-position: right bottom;
            background-repeat: no-repeat;
            -webkit-print-color-adjust:exact !important;
            print-color-adjust:exact !important;
          }
          @media {
            * {
                -webkit-print-color-adjust: exact !important;
              }
            }
          .section { margin-bottom: 20px;   page-break-after: avoid; }
          .section-title { font-weight: bold; text-decoration: underline; font-size: 24px; }
          .job-position, .education-item, .volunteer-item, .extracurricular-item { margin-left: 20px; margin-top: 10px; font-size: 14px; }
      </style>
        </head>
        <body>
          <h1>Tim Jobseeker</h1>
          <div class=\"section\">
          <div class=\"section-title\">Contact Information:</div>
          <div>Phone: +15033675167</div>
          </div>
          <div class=\"section\">
            <div class=\"section-title\">Education</div>
            <div class=\"education-item\">- University of California, Santa Cruz (UCSC) - 2000</div>
          </div>
          <div class=\"section\">
            <div class=\"section-title\">Work Experience</div>
            <div class=\"job-position\">- Tim Jobseeker has over 10 years of experience in the tech industry, specializing in software development and project management. He has worked for various companies, including Google and Microsoft, where he led teams to successfully launch new products and improve existing ones. Tim is skilled in programming languages such as Java, Python, and C++, and has a proven track record of delivering high-quality results on time and within budget.</div>
          </div>
          <div class=\"section\">
            <div class=\"section-title\">Extracurriculars</div>
            <div class=\"extracurricular-item\">- In addition to his professional experience, Tim Jobseeker is actively involved in his community through volunteering and mentoring programs. He has served as a mentor for aspiring software developers and has organized coding workshops for underprivileged youth. Tim is passionate about giving back and using his skills to make a positive impact on those around him.</div>
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
