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
        console.log('Generated image links:', links); // Debug: mostra os links gerados
        return links;
    };

    useEffect(() => {
        const storedLinks = localStorage.getItem('imageLinks');
        console.log('Stored links from localStorage:', storedLinks); // Debug: mostra os links armazenados

        if (storedLinks) {
            // Se os links estão armazenados, parseia e atualiza o estado
            setImageLinks(JSON.parse(storedLinks));
            console.log('Loaded links from localStorage:', JSON.parse(storedLinks)); // Debug: mostra os links carregados
        } else {
            // Se não há links armazenados, gera novos links
            const photoNames = photoImports.map(photo => photo.replace(/"/g, '')); // Limpa aspas do array importado
            const newLinks = generateImageLinks(photoNames); // Cria novos links

            setImageLinks(newLinks); // Atualiza o estado com os novos links
            localStorage.setItem('imageLinks', JSON.stringify(newLinks)); // Armazena os links no local storage
        }
    }, []); // Este efeito roda apenas uma vez na montagem

    // Este useEffect monitora mudanças em photoImports
    useEffect(() => {
        if (photoImports.length > 0) {
            console.log('photoImports has changed:', photoImports); // Debug: mostra as mudanças em photoImports
            const photoNames = photoImports.map(photo => photo.replace(/"/g, '')); // Limpa aspas do array importado
            const newLinks = generateImageLinks(photoNames); // Cria novos links

            setImageLinks(newLinks); // Atualiza o estado com os novos links
            localStorage.setItem('imageLinks', JSON.stringify(newLinks)); // Armazena os links no local storage
            console.log('Updated image links:', newLinks); // Debug: mostra os novos links gerados
        }
    }, [photoImports]); // Executa sempre que photoImports muda

    const handleOpenModal = (foto) => {
        setSelectedPhoto(foto);
        onOpen();
    };

    const handleDownload = async () => {
        if (!selectedPhoto) {
            console.error('Nenhuma foto selecionada para download');
            return;
        }

        try {
            const response = await fetch(selectedPhoto); // Faz uma requisição para obter a imagem
            const blob = await response.blob(); // Converte a resposta em um Blob
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // Cria um URL para o Blob
            link.download = selectedPhoto.split('/').pop(); // Nome do arquivo
            document.body.appendChild(link);
            link.click(); // Simula o clique para iniciar o download
            document.body.removeChild(link); // Remove o link do DOM após o download
            URL.revokeObjectURL(link.href); // Libera a memória do Blob
            onClose(); // Fecha o modal após o download
        } catch (error) {
            console.error('Erro ao baixar a foto:', error);
        }
    };

    const vazio = imageLinks.length <= 0 ? "repeat(auto-fit, minmax(150px, 500px));" : "repeat(auto-fit, minmax(150px, 180px));";
    const margin = imageLinks.length <= 0 ? "0px" : "10%";
    const display = imageLinks.length <= 0 ? 'none' : 'block';

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
                        mb={margin}
                        color="textColor.200"
                        textAlign="center"
                        fontSize="clamp(1.2rem, 1vw, 2vw)"
                        fontWeight="300"
                    >
                        Baixe suas fotos favoritas!
                    </Text>
                    <Grid templateColumns={vazio} gap={3} mb='10%'>
                        {imageLinks.length <= 0 ? (
                            <GridItem
                                key="ghost"
                                borderRadius="10px"
                                w="100%"
                                maxH="500px"
                                objectFit='contain'
                                display='flex' alignItems='center' justifyContent='center' flexDir='column'
                            >
                                <Image src={Ghost} alt='fantasminha' />
                                <Text mb='5%' textAlign='center' color='orange'>Ainda não há fotos, volte mais tarde e atualize a página</Text>
                                <Text textAlign='center' color='white'><NavLink to='/'>Inicio</NavLink></Text>
                            </GridItem>
                        ) : (
                            imageLinks.map((foto) => (
                                <GridItem
                                    onClick={() => handleOpenModal(foto)}
                                    key={foto} // Use o link da foto como key
                                    borderRadius="10px"
                                    w="100%"
                                    h="200"
                                    maxH="200px"
                                >
                                    <CardPhotos src={foto} />
                                </GridItem>
                            ))
                        )}
                    </Grid>
                    <Link display={display} href="#topo" textAlign='center' fontSize='1.3rem' color='orange'>Voltar ao topo</Link>
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
                        <Button w='49%' colorScheme="blue" onClick={handleDownload}>
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
