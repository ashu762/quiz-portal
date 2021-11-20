import React from "react";

import {
  Page,
  View,
  Document,
  PDFViewer,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    padding: 20,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 0.5,
    borderRadius: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  heading: {
    textAlign: "center",
    width: "100%",
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    height: 100,
    width: 100,
  },
  subjectName: {
    fontSize: 14,
    marginTop: 10,
  },
});

const ResponsePdf = (props) => {
  const { subjectName } = props;

  return (
    <Document>
      <Page style={styles.body}>
        <View>
          <View style={styles.heading}>
            <Text>NATIONAL INSTITUTE OF TECHNOLOGY</Text>
          </View>
          <View style={styles.heading}>
            <Text>JAMSHEDPUR - 831014, JHARKHAND</Text>
          </View>

          <View style={styles.heading}>
            <Text style={styles.subjectName}>Marks of {subjectName}</Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Roll Number</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total Marks</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Marks</Text>
              </View>
            </View>

            {props?.report?.map((val) => {
              return (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{val["name"]}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{val["rollNumber"]}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{val["totalCorrect"]}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{val["totalMarks"]}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// const ResponseTable = () => {
//   return (
//     <Table variant="simple">
//       <Thead>
//         <Tr>
//           <Th>Name</Th>
//           <Th>Roll No</Th>
//           <Th isNumeric>Marks</Th>
//           <Th>Total Marks</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {data?.map((val) => {
//           return (
//             <Tr key={val["Roll Number"]}>
//               <Td>{val["Name"]}</Td>
//               <Td>{val["Roll Number"]}</Td>
//               <Td isNumeric>{val["Marks"]}</Td>
//               <Td>{val["Total Marks"]}</Td>
//             </Tr>
//           );
//         })}
//       </Tbody>
//     </Table>
//   );
// };

export default React.memo(ResponsePdf);
