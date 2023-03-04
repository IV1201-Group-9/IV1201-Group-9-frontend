import React, {useEffect, useState} from 'react';
import { Box, Button, Input, Stack, Heading, VStack, StackDivider, Select, CloseButton, Text, HStack, Flex, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react'
import {NavbarComponent} from './NavbarComponent';
import ApiPost from "../ApiInterface/ApiPost";
import ApiCall from "../ApiInterface/ApiCall";

// The form allows the user to input personal information, experience, and availability.
function ApplicationPage() {
    const [currentSection, setCurrentSection] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [email, setEmail] = useState('');
    const [items, setItems] = useState([]);
    const [options, setOptions] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [dateRanges, setDateRanges] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        ApiCall.getCompetence()
            .then(response => {
                console.log(response);
                setOptions(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);



    const handleChange = (competence) => {
        const competenceData = {
            competence,
        };

        ApiPost.setOptions(competenceData)
            .then(response => {
                console.log(response);
                setOptions([...options, response.competence]);
            })
            .catch(error => {
                console.error(error);
            });
    };


    const chooseOptions = (e) => {
        const option = e.target.value;
        if (availability.includes(option)) {
            setAvailability(availability.filter(o => o !== option));
        } else {
            setAvailability([...availability, option]);
        }
    }

    const cancel = () => {
        setFirstName('')
        setLastName('')
        setPersonalNumber('')
        setEmail('')
        setItems([])
        setAvailability([])
    }

    const addItem = () => {
        const newOption = document.getElementById("select-option").value;
        const newYears = document.getElementById("years-of-experience").value;
        const newItem = { option: newOption, years: newYears };
        setItems([...items, newItem]);
    };

    const removeItem = (index) => {
        setItems(items.filter((item, i) => i !== index));
    };

    const startDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const endDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const addDateRange = () => {
        if (startDate !== "" && endDate !== "") {
            setDateRanges([...dateRanges, { startDate, endDate }]);
            setStartDate("");
            setEndDate("");
        }
    };

    const sections = [
        <Box>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >
                <Box h='40px'>
                    <Heading as='h3' size='lg'>
                        Info
                    </Heading>
                </Box>
                <Box>
                    <FormControl h='80px' isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>

                    <FormControl h='80px' isRequired>
                        <FormLabel>Last name</FormLabel>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>

                    <FormControl h='80px' isRequired>
                        <FormLabel>Personal number</FormLabel>
                        <Input value={personalNumber} onChange={(e) => setPersonalNumber(e.target.value)} />
                    </FormControl>
                </Box>
            </VStack>
        </Box>,
        <Box p="6">
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >
                <Box h='40px'>
                    <Heading as='h3' size='lg'>
                        Experience
                    </Heading>
                </Box>
            <Stack spacing="4">
                <FormControl id="Area of expertise">
                    <FormLabel>Area of expertise</FormLabel>
                    <Select  placeholder="Select an option" onChange={(e) => handleChange(e.target.value)}>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option.competence}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl id="years">
                    <FormLabel>Years of experience</FormLabel>
                    <Input type="number" id="years-of-experience" />
                </FormControl>
                <Button colorScheme="blue" onClick={addItem}>
                    Add to list
                </Button>
            </Stack>
            <Box height="80px" overflowY="scroll">
                {items.length > 0 && (
                    <Stack mt="6" spacing="4">
                        {items.map((item, index) => (
                            <Box key={index} p="4" shadow="md" borderWidth="1px">
                                <Stack direction="row" justify="space-between">
                                    <Text>
                                        {item.option} ({item.years} years)
                                    </Text>
                                    <CloseButton onClick={() => removeItem(index)} />
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>
            </VStack>
        </Box>,
        <Box mt={8}>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >
            <Box h='40px'>
                <Heading as='h3' size='lg'>
                    Availability
                </Heading>
            </Box>
            <Flex>
                <InputGroup>
                    <InputLeftAddon children="From" />
                    <Input
                        type="date"
                        value={startDate}
                        onChange={startDateChange}
                    />
                </InputGroup>
                <InputGroup ml={4}>
                    <InputLeftAddon children="To" />
                    <Input type="date" value={endDate} onChange={endDateChange} />
                </InputGroup>
                <Button ml={4} size='md' colorScheme="blue" onClick={addDateRange}>
                    +
                </Button>
            </Flex>
            <Stack height="80px" overflowY="scroll" mt={4}>
                {dateRanges.map((dateRange, index) => (
                    <Flex key={index}>
                        <Text>{dateRange.startDate}</Text>
                        <Text mx={2}>-</Text>
                        <Text>{dateRange.endDate}</Text>
                    </Flex>
                ))}
            </Stack>
            </VStack>
        </Box>,
        <Box>
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
            >
                <Box h="40px">
                    <Heading as="h3" size="lg">
                        Summary
                    </Heading>
                </Box>
                <Box>
                    <Text>
                        Name: {firstName} {lastName}
                    </Text>
                    <Text>
                        Personal number: {personalNumber}
                    </Text>
                    {items.length > 0 && (
                        <Box>
                            <Text fontWeight="bold">Experience:</Text>
                            {items.map((item, index) => (
                                <Text key={index}>
                                    {item.option} ({item.years} years)
                                </Text>
                            ))}
                        </Box>
                    )}
                    {availability.length > 0 && (
                        <Box>
                            <Text fontWeight="bold">Availability:</Text>
                            {availability.map((option, index) => (
                                <Text key={index}>{option}</Text>
                            ))}
                        </Box>
                    )}
                    <Box>
                        <FormControl>
                            Availability:
                            {dateRanges.map((item, index) => (
                                <HStack key={index}>
                                    <Text>{item.startDate}</Text>
                                    <Text>-</Text>
                                    <Text>{item.endDate}</Text>
                                </HStack>
                            ))}
                        </FormControl>
                    </Box>
                </Box>
                <HStack justify="flex-end">
                    <Button colorScheme="red" onClick={cancel}>
                        Cancel
                    </Button>
                    <Button colorScheme="green" >
                        Submit
                    </Button>
                </HStack>
            </VStack>
        </Box>
    ];
    return (
        <>
            <NavbarComponent />
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                minHeight='100vh'
                backgroundColor='gray.50'
            >
                <Box width='80%' maxWidth='800px' backgroundColor='white' p={6} borderRadius='lg'>
                    <Box mb={6}>
                        <Heading as='h1' size='xl'>
                            Welcome to the Application
                        </Heading>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        {sections[currentSection]}
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            width='100%'
                            mt={6}
                        >
                            {currentSection > 0 && (
                                <Button
                                    onClick={() => setCurrentSection(currentSection - 1)}
                                    disabled={currentSection === 0}
                                >
                                    Back
                                </Button>
                            )}
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <Stack direction='row' spacing={2}>
                                    {sections.map((_, i) => (
                                        <Box
                                            key={i}
                                            h='12px'
                                            w='12px'
                                            bg={i === currentSection ? 'blue.500' : 'gray.200'}
                                            borderRadius='full'
                                            cursor='pointer'
                                            onClick={() => setCurrentSection(i)}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                            {currentSection < sections.length - 1 && (
                                <Button
                                    onClick={() => setCurrentSection(currentSection + 1)}
                                    disabled={currentSection === sections.length - 1}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ApplicationPage;