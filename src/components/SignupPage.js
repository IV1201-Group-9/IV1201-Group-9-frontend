import React, { useState }  from 'react';
import {Input, Button, Stack, Box, FormControl, FormHelperText, Avatar} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import ApiPost from "../ApiInterface/ApiPost";


/**
 * Component for the signup page, which allows new users to register for the application.
 * This component renders a form with input fields for the user's email,
 * password, and password confirmation. Upon submission, it validates the
 * inputs and sends a POST request to the server to create a new user account.
 * @returns {JSX.Element} Returns a JSX element containing the signup form.
 */

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            setSuccess('');
            setError('Please enter email and password')
            return
        }
        setError('')

        if (password !== passwordConfirmation) {
            setSuccess('');
            setError('Password and confirm password should be same');
            return
        }
        setError('')

        if (!password) {
            setSuccess('');
            setError('Password should not be empty');
            return
        }
        setError('')


        const signUpData = {
            email,
            password
        };

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!passwordRegex.test(password)) {
            setSuccess("");
            setError(
                "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
            );
            return;
        }
        setError("");

        ApiPost.signUp(signUpData)
            .then(response => {
                localStorage.setItem('token', response.jwtToken);
                console.log(response);
                setSuccess("User successfully added.");

            })
            .catch(error => {
                console.error(error);
                setError('Error adding user.');
                setSuccess('');
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
                    <Heading marginTop={3} >Sign up</Heading>
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
                </FormControl>
                <FormControl>
                    <Input
                        type="password"
                        placeholder="Confirm password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    {error && (
                        <FormHelperText color="red.500">{error}</FormHelperText>
                    )}
                    {success && (
                        <FormHelperText color="green.500">{success}</FormHelperText>
                    )}
                </FormControl>

                <Button type="submit" bg={"lightblue"}>Sign up</Button>
            </Stack>
            <center >
                <Text marginTop={5}>
                    Already have an account?{' '}
                    <Link color='teal.500' href='/'>
                        Sign in
                    </Link>
                </Text>
            </center>

        </Box>
    )
}


export default SignupPage;
