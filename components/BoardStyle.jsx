import { StyleSheet } from 'react-native';

// --------------------------------------------------------------------- Board component styles ---------------------------------------------------------------------

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  membersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cardContainer: {
    width: 350,
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "whitesmoke",
  },
  cardMemberContainer: {
    width: 350,
    height: 100,
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "whitesmoke",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 18,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cardScrollView: {
    marginBottom: 30,
  },
  innerCardContainer: {
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "whitesmoke",
  },
  IconContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
    gap: 2,
  },
  plusIconContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  memberName: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "green",
  },
  showMoreButton: {
    color: "gray",
  },
});