import {
    Box,
    Grid,
    GridItem,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Image,
    Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { BoxSection } from "../../Components/BoxSections/BoxSection";
import { CardPhotos } from "../../Components/CardPhotos/CardPhotos";
import Ghost from '../../assets/Images/ghost.png';
import { NavLink } from "react-router-dom";
import photoImports from "./imports"; // Importa o array de imagens

export const ViewPhotos2 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [imageLinks, setImageLinks] = useState([]); // Array para armazenar os links de imagens

    // Função para gerar os links de imagens
    const generateImageLinks = (photoNames) => {
        const baseUrl = "https://raw.githubusercontent.com/Samael7735/fotos-evento-geny/main/src/assets/Fotos"; // URL base para as imagens
        const links = photoNames.map(name => `${baseUrl}/${name}`); // Cria links completos
        return links;
    };

    useEffect(() => {
        const storedLinks = localStorage.getItem('imageLinks');

        if (storedLinks) {
            setImageLinks(JSON.parse(storedLinks));
        } else {
            const photoNames = photoImports.map(photo => photo.replace(/"/g, '')); // Limpa aspas do array importado
            const newLinks = generateImageLinks(photoNames); // Cria novos links
            setImageLinks(newLinks); // Atualiza o estado com os novos links
            localStorage.setItem('imageLinks', JSON.stringify(newLinks)); // Armazena os links no local storage
        }
    }, []); // Este efeito roda apenas uma vez na montagem

    const handleOpenModal = (foto) => {
        setSelectedPhoto(foto);
        onOpen();
    }
    
    return (
        <>
            <Header />
            <BoxSection bgC="dark.300">
                <Box id='topo' w="88%" padding="15vh 0px 10% 0px" textAlign='center' justifySelf="center">
                    <Text
                        mb='2%'
                        color="textColor.200"
                        textAlign="center"
                        fontSize="clamp(1.8rem, 1vw, 2vw)"
                        fontWeight="300"
                    >
                        Melhores momentos 🍻
                    </Text>
                    <Text
                        mb='10%'
                        color="textColor.200"
                        textAlign="center"
                        fontSize="clamp(1.2rem, 1vw, 2vw)"
                        fontWeight="300"
                    >
                        Baixe suas fotos favoritas!
                    </Text>
                    <Grid 
                        w='100%' 
                        templateColumns='repeat(auto-fit, minmax(150px, 1fr))' // Use o valor de templateColumns dinâmico
                        gap={3} 
                        mb='10%'
                    >
                    {imageLinks.length <= 0 ? (
                        <GridItem
                            key="ghost"
                            borderRadius="10px"
                            maxH="500px"
                            objectFit='contain'
                            display='flex' 
                            alignItems='center' 
                            justifyContent='center' 
                            flexDir='column'
                        >
                            <Image src={Ghost} alt='fantasminha' />
                            <Text mb='5%' textAlign='center' color='orange'>
                                Ainda não há fotos, volte mais tarde e atualize a página
                            </Text>
                            <Text textAlign='center' color='white'>
                                <NavLink to='/'>Inicio</NavLink>
                            </Text>
                        </GridItem>
                    ) : (
                        imageLinks.map((foto) => (
                            <GridItem
                                onClick={() => handleOpenModal(foto)}
                                key={foto} // Use o link da foto como key
                                borderRadius="10px"
                                h="200px"
                                maxH='200px'
                            >
                                <CardPhotos src={foto} />
                            </GridItem>
                        ))
                    )}
                    </Grid>

                    <Link display={imageLinks.length <= 0 ? 'none' : 'block'} href="#topo" textAlign='center' fontSize='1.3rem' color='orange'>
                        Voltar ao topo
                    </Link>
                </Box>
            </BoxSection>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign='center'>
                        {selectedPhoto && (
                            <Image mb='4%' h="100%" maxH='400px' w="100%" objectFit="cover" src={selectedPhoto} />
                        )}
                        <Text fontWeight='500' fontSize='1.3rem'>Boteco SME 02/10/2024</Text>
                    </ModalBody>
                    <ModalFooter display='flex' justifyContent='space-between'>
                        <Button w='49%' colorScheme="blue" onClick={() => {}}>
                            Baixar Foto
                        </Button>
                        <Button w='49%' colorScheme="yellow" onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ViewPhotos2;
