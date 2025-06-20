import { View, Text, TouchableOpacity, StyleSheet, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../apis/OrganizationAPI';
import OrgForm from './_OrgForm';
import OrgEdit from "./_OrgEdit";
import styles from './OrganizationStyle';

const Organization = () => {
  const [organizations, setOrganizations] = useState([]);
  const navigation = useNavigation();

  const [showOrgForm, setShowOrgForm] = useState(false);
  const [showOrgEdit, setShowOrgEdit] = useState(false);

  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedOrgName, setSelectedOrgName] = useState(null);


  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      const orgsWithBoards = await fetchOrganizations();
      setOrganizations(orgsWithBoards);
    } catch (error) {
      console.log("Fetch Organization : ", error);
    }
  };

  const goToWorkSpace = (orgId) => {
    navigation.navigate("Workspace", { orgId });
  };

  const newOrg = async (displayName) => {
    try {
      await createOrganization(displayName);
      setShowOrgForm(false);
      fetchOrgData();
    } catch (error) {
      console.log("Error creating organization : ", error);
    }
  };

  const handleNewOrgButton = () => {
    setShowOrgForm(true);
  };

  const handleUpdateOrg = async (displayName) => {
    try {
      await updateOrganization(selectedOrgId, displayName);
      setShowOrgEdit(false);
      fetchOrgData();
    } catch (error) {
      console.log("Error Update Org : ", error);
    }
  };

  const handleEditOrgButtonClick = (orgId, displayName) => {
    setSelectedOrgId(orgId);
    setSelectedOrgName(displayName);
    setShowOrgEdit(true);
  };

  const deleteOrg = async (orgId) => {
    try {
      await deleteOrganization(orgId);
      fetchOrgData();
    } catch (error) {
      console.log("Error deleting organization: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>Organizations: </Text>
      <View style={{ marginLeft: 10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between', gap: 5, marginTop: 10 }}>
        <Text style={{ fontSize: 18 }}>Add new</Text>
        <Pressable onPress={() => handleNewOrgButton()}>
          <MaterialCommunityIcons name="plus-circle" size={24} color="black" />
        </Pressable>
      </View>
      {organizations.map((org, index) => (
          <TouchableOpacity key={index} onPress={() => goToWorkSpace(org.id)}>
            <View style={styles.organizationContent}>
              <Text style={styles.organizationName}>{org.displayName}</Text>
              <View style={styles.organizationOptions}>
                <Pressable onPress={() => handleEditOrgButtonClick(org.id, org.displayName)}>
                  <MaterialIcons name="edit" size={24} color="black" />
                </Pressable>
                <Pressable onPress={() => deleteOrg(org.id)}>
                  <MaterialIcons name="delete" size={30} color="black" />
                </Pressable>
              </View>
            </View>
          </TouchableOpacity>
      ))}
      <OrgForm
        visible={showOrgForm}
        onClose={() => setShowOrgForm(false)}
        onSubmit={(name) => newOrg(name)}
      />
      <OrgEdit
        visible={showOrgEdit}
        onClose={() => setShowOrgEdit(false)}
        onUpdate={handleUpdateOrg}
        initialValue={selectedOrgName}
      />
    </View>
  );
};

export default Organization;
