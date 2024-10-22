import { Box,Heading, Text, Image} from "@chakra-ui/react"
import Profile from '../../assets/Images/profile.jpg'
import Insta from '../../assets/Icons/insta.png'
import Whats from '../../assets/Icons/whats.png'
import Linkedin from '../../assets/Icons/linkedin.png'
import { BoxSection } from "../../Components/BoxSections/BoxSection"
import BlueCircle from "../../Components/BlueCircle/BlueCircle"
import Header from "../../Components/Header/Header"
import { NavLink } from "react-router-dom"

const Socials = [
    {icon: Insta , link:'https://www.instagram.com/samuu2735'},
    {icon: Whats , link:'https://wa.me/5588999195489?text=Ol%C3%A1%2C%20preciso%20de%20um%20projeto%20ou%20foto'},
    {icon: Linkedin , link:'https://www.linkedin.com/in/samueldev03'}
]

export const Contact = ()=>{
    const handleClick = (link)=>{
        window.open(link)
    }
    return(
        <BoxSection bgC='dark.300'>
            <Header/>
            <BlueCircle top='-10%'/>
            <Box w='88%' justifySelf='center' alignSelf='center' zIndex={10} maxW='500px'>
                <Box mb='8%' w='100%' display='flex' justifyContent='center'>
                    <Image boxSize='150px' border='solid 1px' borderColor='blueGradient.100' 
                    src={Profile} alt='logomarca samuel' borderRadius='100'/>
                </Box>
                <Box textAlign='center' mb='3%'>
                    <Heading fontSize="clamp(2rem, 1.8vw, 2vw)" color='textColor.100' 
                    fontWeight='400'>Samuel Sena</Heading>
                </Box>
                <Box mb='15%' textAlign='center'>
                    <Text fontSize="clamp(1.3rem, 1vw, 2vw)" color='textColor.100' 
                    fontWeight='200'>Criação de sites, design e fotografia profissional &#128293;</Text>
                </Box>
                <Box display='flex' gap='10px' mb='20%' justifyContent='center'>
                    {Socials.map((icon,index)=>{
                        return(
                            <Image key={index} boxSize='40px' src={icon.icon} alt='social icon' onClick={()=>{handleClick(icon.link)}}/>
                        )
                    })}
                </Box>
                <Box w='100%' textAlign='center'>
                    <Text mb='3%' fontSize="clamp(1.3rem, 1.5vw, 2vw)" color='textColor.100' 
                        fontWeight='400'>Obrigado pela visita ;)</Text> 
                    <Text color='blue.400'><NavLink to='/'>Voltar ao inicio</NavLink></Text>
                </Box>
            </Box>   
        </BoxSection>
    )
}
export default Contact