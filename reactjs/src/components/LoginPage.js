import React, { useState }  from 'react';
import {Input, Button, Stack, Box, FormControl, FormHelperText, Avatar} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import ApiPost from "../ApiInterface/ApiPost";

/**
 * 
 * @returns {JSX.Element}
 * @constructor
 */
function LoginPage() {

    // set initial state for email, password, and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')

    // define handleSubmit function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault() // prevent default form submission behavior

        // check if email and password are empty, update error message state if either is empty
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        setError('') // clear error message state


        // response.status === 500
        //         ? response
        //         : console.log(response) && doThrow(
        //             new Error(
        //             "Status was: " + response.statusText + " " + response.status + response
        //             )
        //         )


        // create an object containing the user's email and password
        const logInData = {
            email,
            password
        };

        // make an API request to log in the user
        // save the JWT token to local storage
        ApiPost.logIn(logInData)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.jwtToken);
               console.log("ROLE ID:" + response.role.id);

               if(response.status === 403){
                   console.log(response.ErrorMessage)
                   let error = response.ErrorMessage
                   setError(error)
               }

                const userRole = response.role.id;
                let pageHref;
                if (userRole === 1) {
                    pageHref = '/admin';
                } else if (userRole === 2) {
                    pageHref = '/applicants';
                } else {
                    pageHref = '/';
                }

                window.location.href = pageHref;
            })
            .catch(error => {
                console.log(error);
            });

    }

    // return the UI for the login page
    return (
        <Box
            as="form"
            onSubmit={handleSubmit}
            backgroundColor="white"
            p={8}
            borderWidth={1}
            borderRadius={4}
            boxShadow="xl"
            width="100%"
            maxWidth="400px"
            margin="0 auto"
            marginTop={150}
            rounded={18}
        >
            <Stack spacing={6}>
                <center>
                <Avatar bg='teal.500' />
                <Heading marginTop={3} >Sign in</Heading>
                </center>
                <FormControl>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <FormHelperText color="red.500">{error}</FormHelperText>
                    )}
                </FormControl>

                <Button type="submit" bg={"lightblue"}>Login</Button>
            </Stack>
            <center >
            <Text marginTop={5}>
                Are you new?{' '}
                <Link color='teal.500' href='/signup'>
                    create account
                </Link>
            </Text>
                </center>

        </Box>

    )
}

export default LoginPage;
