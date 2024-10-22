import { Box, Image } from "@chakra-ui/react";
import BlueCircleImage from '../../assets/Images/blueCircle.png'

export const BlueCircle = (props)=>{
    return(
        <Box position='absolute' p='0px 6%' maxW='500px' top={props.top}>
            <Image src={BlueCircleImage} alt="circulo azul"/>
        </Box>
    )
}

export default BlueCircle