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

const data = [
  { Name: "Dara", "Roll Number": "Malvin", Marks: 68, "Total Marks": 66 },
  { Name: "Ariadne", "Roll Number": "Carie", Marks: 58, "Total Marks": 8 },
  { Name: "Katinka", "Roll Number": "Lesli", Marks: 79, "Total Marks": 98 },
  { Name: "Millisent", "Roll Number": "Henrik", Marks: 48, "Total Marks": 61 },
  { Name: "Coleen", "Roll Number": "Goldarina", Marks: 25, "Total Marks": 41 },
  {
    Name: "Anestassia",
    "Roll Number": "Lorinda",
    Marks: 100,
    "Total Marks": 95,
  },
  { Name: "Mathilde", "Roll Number": "Jervis", Marks: 83, "Total Marks": 74 },
  { Name: "Dahlia", "Roll Number": "Rhonda", Marks: 51, "Total Marks": 93 },
  { Name: "Lura", "Roll Number": "Melli", Marks: 52, "Total Marks": 64 },
  { Name: "Viviyan", "Roll Number": "Therine", Marks: 96, "Total Marks": 33 },
  { Name: "Alla", "Roll Number": "Ciel", Marks: 45, "Total Marks": 62 },
  { Name: "Chickie", "Roll Number": "Darrell", Marks: 16, "Total Marks": 87 },
  { Name: "Shana", "Roll Number": "Melany", Marks: 23, "Total Marks": 82 },
  { Name: "Vonnie", "Roll Number": "Ruby", Marks: 92, "Total Marks": 44 },
  {
    Name: "Marigold",
    "Roll Number": "Jacquelyn",
    Marks: 14,
    "Total Marks": 66,
  },
  { Name: "Dani", "Roll Number": "Joshua", Marks: 8, "Total Marks": 85 },
  { Name: "Merissa", "Roll Number": "Gabey", Marks: 54, "Total Marks": 30 },
  { Name: "Dulcea", "Roll Number": "Jerrie", Marks: 56, "Total Marks": 69 },
  { Name: "Belinda", "Roll Number": "Zorina", Marks: 87, "Total Marks": 49 },
  { Name: "Lyn", "Roll Number": "Hercules", Marks: 62, "Total Marks": 51 },
  { Name: "Jerry", "Roll Number": "Clary", Marks: 57, "Total Marks": 72 },
  { Name: "Quinta", "Roll Number": "Caddric", Marks: 63, "Total Marks": 89 },
  { Name: "Linette", "Roll Number": "Jerry", Marks: 79, "Total Marks": 19 },
  { Name: "Nickie", "Roll Number": "Vivia", Marks: 29, "Total Marks": 19 },
  { Name: "Tobye", "Roll Number": "Antin", Marks: 47, "Total Marks": 24 },
  { Name: "Adah", "Roll Number": "Kurt", Marks: 60, "Total Marks": 17 },
  { Name: "Margalit", "Roll Number": "Hilario", Marks: 33, "Total Marks": 95 },
  { Name: "Tatiania", "Roll Number": "Liva", Marks: 94, "Total Marks": 35 },
  { Name: "Ami", "Roll Number": "Carlin", Marks: 6, "Total Marks": 27 },
  { Name: "Coralyn", "Roll Number": "Fransisco", Marks: 24, "Total Marks": 22 },
  { Name: "Uta", "Roll Number": "Theo", Marks: 56, "Total Marks": 10 },
  { Name: "Emlynn", "Roll Number": "Peter", Marks: 19, "Total Marks": 28 },
  { Name: "Gillie", "Roll Number": "Cass", Marks: 65, "Total Marks": 89 },
  { Name: "Carly", "Roll Number": "Earlie", Marks: 25, "Total Marks": 42 },
  { Name: "Darryl", "Roll Number": "Lissa", Marks: 28, "Total Marks": 27 },
  { Name: "Keriann", "Roll Number": "Francois", Marks: 98, "Total Marks": 41 },
  { Name: "Loleta", "Roll Number": "Pamella", Marks: 94, "Total Marks": 94 },
  { Name: "Millie", "Roll Number": "Bondie", Marks: 20, "Total Marks": 25 },
  { Name: "Rosaline", "Roll Number": "Dusty", Marks: 60, "Total Marks": 63 },
  { Name: "Datha", "Roll Number": "Nessie", Marks: 5, "Total Marks": 55 },
  { Name: "Melisandra", "Roll Number": "Ede", Marks: 65, "Total Marks": 79 },
  { Name: "Nertie", "Roll Number": "Elwood", Marks: 58, "Total Marks": 23 },
  { Name: "Allissa", "Roll Number": "Joannes", Marks: 42, "Total Marks": 78 },
  { Name: "Lorianna", "Roll Number": "Isa", Marks: 60, "Total Marks": 75 },
  { Name: "Guendolen", "Roll Number": "Sigrid", Marks: 43, "Total Marks": 75 },
  { Name: "Koressa", "Roll Number": "Torrie", Marks: 47, "Total Marks": 100 },
  { Name: "Joellen", "Roll Number": "Lorrie", Marks: 67, "Total Marks": 94 },
  { Name: "Tammy", "Roll Number": "Leopold", Marks: 88, "Total Marks": 37 },
  { Name: "Teena", "Roll Number": "Sibeal", Marks: 18, "Total Marks": 2 },
];

export default React.memo(ResponsePdf);
