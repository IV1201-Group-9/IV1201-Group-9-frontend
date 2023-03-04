import React, {useEffect} from 'react';
import {Box, Text, Flex, Stack,} from '@chakra-ui/react';
import {Select} from "@chakra-ui/react";
import {NavbarComponent} from './NavbarComponent';
import ApiCall from "../ApiInterface/ApiCall";
import ApiPost from "../ApiInterface/ApiPost";


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function AdminPage() {

    const [users, setUsers] = React.useState([]);



    useEffect(() => {
        ApiCall.getApplications()
            .then(response => {
                console.log(response);
                setUsers(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleChange = (status, id) => {

        const statusData = {
            status,
            id: id + 1,
        };
        console.log(`${status} was clicked`);
        console.log(`${id+1} was index`);


        ApiPost.setStatus(statusData)
            .then(response => {
                console.log(response);


            })
            .catch(error => {
                console.error(error);
            });

    }

    return (
        <>
            <NavbarComponent />
            <Box bg="gray.200" p={4} minHeight="100vh">
                <Text fontFamily="Roboto, sans-serif" fontWeight="bold" fontSize={24}>
                    WELCOME ADMIN!
                </Text>
                <Box mt={4}>
                    <Flex mt={2} alignItems="center">
                        <Text fontFamily="Roboto, sans-serif" fontWeight="bold" fontSize={16}>
                            Applications:
                        </Text>
                    </Flex>
                </Box>

                <Box p={4} >
                    {users.map((name, id) => (
                        <Flex
                            key={id}
                            p={2}
                            alignItems="center"
                            bg={id % 2 === 0 ? "white" : "gray.300"}

                            cursor="pointer"
                            justifyContent="space-between"
                            _hover={{ bg: "gray.200" }}
                            transition="background-color 0.2s ease-in-out"
                        >
                            <Text fontFamily="Roboto, sans-serif" mr={5} fontWeight="bold">{name.firstname}</Text>
                            <Text fontFamily="Roboto, sans-serif" mr={5} fontWeight="bold">{name.surname}</Text>
                            <Text fontFamily="Roboto, sans-serif"fontWeight="bold">{name.age}</Text>
                            <Stack ml="auto">
                                <Select variant='filled' placeholder={name.status} onChange={(status) => handleChange(status.target.value, id)}>
                                    <option value="Accepted" style={{ display: name.status === 'Accepted' ? 'none' : 'block' }}>Accepted</option>
                                    <option value="Rejected" style={{ display: name.status === 'Rejected' ? 'none' : 'block' }}>Rejected</option>
                                    <option value="Unhandled" style={{ display: name.status === 'Unhandled' ? 'none' : 'block' }}>Unhandled</option>
                                </Select>
                            </Stack>
                        </Flex>
                    ))}

                </Box>


            </Box>



        </>
    );
}
    export default AdminPage;