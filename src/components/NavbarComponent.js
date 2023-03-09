import React from 'react';
import {Button, Flex, Text} from "@chakra-ui/react";
import ApiCall from "../ApiInterface/ApiCall";


/**
 * Remove the user's session data and redirect the user to the login page.
 * @function logout
 */
const logout = () => {
    // Remove the user's session data
    localStorage.removeItem("token");
    // Redirect the user to the login page
    window.location.replace("/");
};

/**

 A component that represents the navbar with a company logo and buttons for testing API and logging out.
 @function NavbarComponent
 @returns {JSX.Element} JSX element that represents the navbar component.
 */
export function NavbarComponent() {

    return (
        <Flex bg="cyan.800" p={4} justifyContent="space-between" alignItems="center">
            <Text fontFamily="Roboto, sans-serif" fontWeight="bold" color="white" fontSize={20}>
                HappyCoaster AB
            </Text>
            <Button bg="lightblue" variantcolor="white" mr={4} onClick={logout}>
                Logout
            </Button>
        </Flex>
    );

}

export default NavbarComponent;