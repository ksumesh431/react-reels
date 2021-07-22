import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { NavLink, useHistory } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
    Button,
    Spacer,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    InputGroup,
    useColorMode,
    InputRightElement,
    Text,
    IconButton,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import instaImg from '../images/newReel.gif'
import d1 from '../images/d1.gif'

export default function SigninC() {

    const [show, setShow] = React.useState(false)
    const handlePassShow = () => setShow(!show)

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const { login, currentUser } = useContext(AuthContext);

    const handleLogin = async e => {
        try {
            e.preventDefault();
            setLoading(true);
            let res = await login(email, password);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 2000)
            setLoading(false);
        }
    }
    useEffect(() => {
        if (currentUser) {
            history.push('/');
        } else {
            setLoading(false);
        }
    }, [currentUser])

    return (
        <>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>

                <Flex style={!isDark ? { backgroundColor: '#EBF8FF' } : {}} p={8} flex={1} align={'center'} justify={'center'}>

                    <Stack spacing={4} w={'full'} maxW={'md'}>

                        <Heading fontSize={'3xl'} bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text"
                            style={{
                                paddingBottom: "0.1rem"
                            }}
                        >Sign in to your Reelify account </Heading>

                        <FormControl isRequired id="email">

                            <FormLabel >Email address</FormLabel>
                            <Input variant='filled' type="email" value={email} onChange={e => setEmail(e.target.value)} />

                        </FormControl>

                        <FormControl isRequired id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input variant='filled' type={show ? "text" : "password"} onChange={e => setPassword(e.target.value)} />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handlePassShow}>
                                        <Text>{show ? "Hide" : "Show"}</Text>
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Stack spacing={6}>
                            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>

                                {error ? <Alert status="error">
                                    <AlertIcon />
                                    <b>Incorrect password. </b> &nbsp; Please try again
                                </Alert> : <></>}

                            </Stack>

                            <Button
                                style={{
                                    backgroundColor: '#F00075',
                                }} isLoading={loading} loadingText="Logging In" variant={'solid'} onClick={handleLogin} >
                                <Text style={{ color: 'white' }}>Sign in</Text>
                            </Button>

                            <Flex>
                                <Text>New to Reelify?&nbsp; <Link><NavLink to="/signup" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Sign up</NavLink></Link></Text>
                                <Spacer />
                                <IconButton
                                    icon={isDark ? <SunIcon /> : <MoonIcon />} onClick={toggleColorMode} colorScheme='gray' isRound="true" size='md'
                                    style={{
                                        maxWidth: '1rem',
                                        marginLeft: '1rem'
                                    }}
                                />
                            </Flex>
                        </Stack>
                    </Stack>
                </Flex>

                <Flex flex={1} style={!isDark ? { backgroundImage: `url(${d1})`, objectFit: 'contain' } : {}} >
                    {<img src={instaImg} alt="Canvas Logo"
                        style={{
                            maxHeight: '400px',
                            margin: 'auto',
                        }}
                    />}
                </Flex>
            </Stack>
        </>
    );
}