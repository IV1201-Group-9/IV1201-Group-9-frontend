import React, { useState }  from 'react';
import {Input, Button, Stack, Box, FormControl, FormHelperText, Avatar} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import ApiPost from "../ApiInterface/ApiPost";

/**
 Represents the Login Page component with a login form that makes an API request to log in a user.
 @function LoginPage
 @returns {JSX.Element} JSX element that represents the login page component.
 */
function LoginPage() {

    // set initial state for email, password, and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')

    /**
     * Handles form submission.
     * @param {Object} e - The form submission event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault() // prevent default form submission behavior

        // check if email and password are empty, update error message state if either is empty
        if (!email && !password) {
            setError('Please enter email and password')
            return
        } else if (!email) {
            setError('Please enter email')
            return;
        } else if (!password) {
            setError('Please enter password')
            return;
        }
        setError('') // clear error message state

        // response.status === 500
        //         ? response
        //         : console.log(response) && doThrow(
        //             new Error(
        //             "Status was: " + response.statusText + " " + response.status + response
        //             )
        //         )

        const logInData = {
            email,
            password
        };

        ApiPost.logIn(logInData)
            .then(response => {
                console.log(response.status)
                console.log(response)
                localStorage.setItem('token', response.jwtToken);
               console.log("ROLE ID:" + response.role.id);


               if(response.status === 403){
                   console.log(response.ErrorMessage);
                   let error = response.ErrorMessage;
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
                if (error.response && error.response.data && error.response.data.ErrorMessage) {
                    setError(error.response.data.ErrorMessage);
                } else {
                    setError("Email or Password is wrong. Try again.");
                }
            });

    }

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
