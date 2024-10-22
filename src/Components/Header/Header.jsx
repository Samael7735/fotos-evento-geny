import { Box,Image} from "@chakra-ui/react"
import Logo from '../../assets/Images/Logo.png'
import MenuDrawer from "../MenuDrawer/MenuDrawer"

export const Header = ()=>{
    return(
        <Box maxW='500px' zIndex='15' bgColor='rgba(6,9,15,0.2)' borderBottom=' solid 0.3px #151B26' backdropFilter="blur(5px)" w='100%' position='fixed' 
        h='10vh' color='textColor.100' display='flex' alignItems='center' justifyContent='space-between' p='0px 6%'>
            <Image h='60%' src={Logo} alt="Logomarca samuel dev"></Image>
            <Box display='inline-flex' gap='40px'>
                <MenuDrawer/>
            </Box>
        </Box>
    )
}
export default Header