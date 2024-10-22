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
  Button, Image,
  Link
} from "@chakra-ui/react";
import React from "react";
import Header from "../../Components/Header/Header";
import { BoxSection } from "../../Components/BoxSections/BoxSection";
import photoImports from "./imports";
import { CardPhotos } from "../../Components/CardPhotos/CardPhotos";
import Ghost from '../../assets/Images/ghost.png'
import { NavLink } from "react-router-dom";

export const ViewPhotos = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure fora do modal
  const [selectedPhoto, setSelectedPhoto] = React.useState(null); // estado para a foto selecionada
  const vazio = photoImports.length <= 0 ? "repeat(auto-fit, minmax(150px, 500px));" : "repeat(auto-fit, minmax(150px, 180px));"
  const margin = photoImports.length <= 0 ? "0px" : "10%"

  const handleOpenModal = (foto) => {
    setSelectedPhoto(foto);
    onOpen();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = selectedPhoto; // URL da imagem
    link.download = selectedPhoto.split('/').pop(); // Nome do arquivo
    document.body.appendChild(link);
    link.click(); // Simula o clique no link
    document.body.removeChild(link); // Remove o link do DOM
    onClose()
  };

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
          {photoImports.length <= 0 ? (
              <GridItem
                key="ghost" // Adicione uma chave única para o item ghost
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
              photoImports.map((foto, index) => (
                <GridItem
                  onClick={() => handleOpenModal(foto)} // abre o modal com a foto selecionada
                  key={index}
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
          <Link href="#topo" textAlign='center' fontSize='1.3rem' color='orange'>Voltar ao topo</Link>
        </Box>
      </BoxSection>
      {/* Modal para exibir a foto */}
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign='center'>
            {selectedPhoto && ( // Verifica se existe uma foto selecionada
              <Image mb='4%'h="100%" maxH ='400px'w="100%" objectFit="cover" src={selectedPhoto} />
            )}
            <Text fontWeight='500' fontSize='1.3rem'>Boteco SME 02/10/2024</Text>
          </ModalBody>
          <ModalFooter display='flex' justifyContent='space-between'>
            <Button w='49%'colorScheme="blue" onClick={handleDownload}>
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

export default ViewPhotos;
