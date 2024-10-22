import {Box, Heading, Text, Image} from '@chakra-ui/react'
import Header from '../../Components/Header/Header'
import {BoxSection} from '../../Components/BoxSections/BoxSection'
import BlueCircle from '../../Components/BlueCircle/BlueCircle'
import Person from '../../assets/Images/logoSme.jpg'
import { PrimaryButton, SecondaryButton } from '../../Components/Buttons/Buttons'
import { NavLink } from 'react-router-dom'

export const Home = ()=>{
    return(
        <BoxSection bgC='dark.100'>
            <Header/>
            <BlueCircle top='-10%'/>
            <Box w='88%' justifySelf='center' alignSelf='center' zIndex={10} maxW='500px'>
                <Box mb='25%' display='flex' flexDir='column' alignItems='center'>
                    <Image src={Person} mb='10%' boxSize='150px' borderRadius='100%' border='solid 2px' borderColor='blue.400' alt='img cara bonito e simpático'/>
                    <Heading mb='5%' textAlign="center" color="textColor.100" fontWeight="600" 
                        fontSize="clamp(1.8rem, 1.8vw, 1.8vw)">Seja bem vindo a área do convidado</Heading>
                    <Text color='textColor.200' textAlign='center' fontSize="clamp(1.1rem, 1vw, 2vw)" fontWeight='300'>
                        Aqui você terá acesso as fotos registradas no evento, baixe- as se quiser
                    </Text>
                </Box>
                <Box display='flex' flexDir='column'>
                    <PrimaryButton fontSize='1.1rem' mb='20px' w='100%' scheme='blue'>
                    <NavLink to='/Fotos'>Ver fotos do evento</NavLink>
                    </PrimaryButton>
                    <SecondaryButton scheme='transparent' fontSize='1rem'>
                        <NavLink to='/Contato'>Desenvolvedor</NavLink>
                    </SecondaryButton>
                </Box>
            </Box>
        </BoxSection>
    )
}
export default Home