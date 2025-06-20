import { StyleSheet } from 'react-native';

// --------------------------------------------------------------------- Organization component styles ---------------------------------------------------------------------

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    organizationContent: {
      width: "90%",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      borderRadius: 10,
      backgroundColor: "#B8B8F3",
      marginTop: 10,
    },
    organizationOptions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    organizationName: {
      fontSize: 16,
    },
});