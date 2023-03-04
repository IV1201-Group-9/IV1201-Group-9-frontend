import React from 'react';
import {Button, Flex, Text} from "@chakra-ui/react";
import ApiCall from "../ApiInterface/ApiCall";

const test = () => {
    ApiCall.getApplications().then(response =>{
        console.log(response);
    }).catch(error => {
        console.error(error);
    });
};
const logout = () => {
    // Remove the user's session data
    localStorage.removeItem("token");
    // Redirect the user to the login page
    window.location.replace("/");
};
export function NavbarComponent() {

    return (
        <Flex bg="cyan.800" p={4} justifyContent="space-between" alignItems="center">
            <Text fontFamily="Roboto, sans-serif" fontWeight="bold" color="white" fontSize={20}>
                HappyCoaster AB
            </Text>
            <Button bg="lightblue" variantcolor="white" mr={4} onClick={test}>
                Test API
            </Button>
            <Button bg="lightblue" variantcolor="white" mr={4} onClick={logout}>
                Logout
            </Button>
        </Flex>
    );

}

export default NavbarComponent;