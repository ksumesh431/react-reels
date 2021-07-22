import React, { useState, ReactNode, useRef, useEffect } from 'react'
import {
    Box,
    Button,
    Container,
    Stack,
    useColorMode,
    useColorModeValue,
    Tooltip,
    IconButton,
    Input,
    InputGroup,
    Progress
} from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { v4 as getId } from 'uuid'
import { storage, database } from '../firebase'


export default function Footer(props) {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark'

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);

    const types = ['video/mp4', 'video/webm', 'video/ogg'];

    const fileInputRef = useRef();



    const onChange = (e) => {
        const file = e?.target?.files[0];
        // console.log(file);

        if (!file) {
            setError('Please select a file');
            setTimeout(() => {
                setError(null)
            }, 2000);
            return;
        }
        if (types.indexOf(file.type) === -1) {
            setError('Please select a "Video" file');
            setTimeout(() => {
                setError(null)
            }, 2000);
            return;
        }
        if (file.size / (1024 * 1024) > 100) {

            setError('Selected file is too big!');
            setTimeout(() => {
                setError(null)
            }, 2000);
            return;
        }

        const id = getId();

        //add video file to firebase storage
        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);


        let fn1 = snapshot => {
            //started uloading and progress callback
            setLoading(true);
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('upload is ' + progress + '% done');
            setProgressPercent(progress);
        }
        let fn2 = error => {
            //error callback
            setError(error);
            setTimeout(() => {
                setError(null);
            }, 2000);
            setLoading(false);
            setProgressPercent(0);
        }
        let fn3 = async () => {
            //upload success callback
            try {
                //fetch url of file stored in fb storage
                const url = await uploadTask.snapshot.ref.getDownloadURL();


                //create "post" object to be pushed in posts database
                const obj = {
                    comments: [],
                    likes: [],
                    pId: id,
                    pURL: url,

                    uName: props?.userData?.username,
                    uProfile: props?.userData?.profileUrl,
                    userId: props?.userData?.userId,
                    createdAt: database.getCurrentTimeStamp()
                }

                //add the post object to posts collection in db
                const docRef = await database.posts.add(obj);
                //docRef will have a docref.id which is auto gen unique id of the post added



                //add this post to respective user's collection in db 
                const res = await database.users.doc(props.userData.userId).update({
                    postIds: [...props.userData.postIds, docRef.id]
                })
                setLoading(false);
                setProgressPercent(0);

            } catch (error) {
                setError(error);
                setTimeout(() => {
                    setError(null);
                }, 2000);
                setLoading(false);
                setProgressPercent(0);
            }
        }
        uploadTask.on('state_changed', fn1, fn2, fn3);


    }

    return (


        <>
            <Box
                style={{
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    maxHeight: '6rem'
                }}
                bg={useColorModeValue('gray.50', 'gray.900')}
                color={useColorModeValue('gray.700', 'gray.200')}>
                {/* <Progress size="xs" colorScheme="purple" value={progressPercent} /> */}
                {loading ? <Progress size="xs" isIndeterminate /> : <></>}

                <Box
                    borderTopWidth={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Container
                        as={Stack}
                        maxW={'6xl'}
                        py={4}
                        direction={{ base: 'column', md: 'row' }}
                        spacing={4}
                        justify={{ base: 'center', md: 'space-between' }}
                        align={{ base: 'center', md: 'center' }}>

                        <Stack direction={'row'} spacing={6}>
                            <Tooltip hasArrow label="Switch Theme" placement="top">
                                <IconButton
                                    icon={isDark ? <SunIcon /> : <MoonIcon />} onClick={toggleColorMode} colorScheme='gray' isRound="true" size='sm'
                                    style={{

                                    }}
                                />
                            </Tooltip>


                            <input
                                ref={fileInputRef}
                                type='file'
                                onChange={onChange}
                                multiple='false'
                                hidden
                            />
                            <Tooltip hasArrow label={error !== null ? `${error}` : ` `} isOpen={error !== null} placement="top">
                                <label
                                    htmlFor='file-upload-input'
                                >
                                    <Button disabled={loading} size='sm' leftIcon={<FaUpload />} colorScheme="purple" variant="solid"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        Upload
                                    </Button>
                                </label>
                            </Tooltip>





                        </Stack>
                    </Container>
                </Box>
            </Box>
        </>
    );
}