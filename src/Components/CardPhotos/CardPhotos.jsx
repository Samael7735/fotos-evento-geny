import { Box, Image} from "@chakra-ui/react";

export const CardPhotos = (props)=>{
    return(
        <Box w='100%' h='100%' borderRadius='10px' _hover={{border:'solid 1px', borderColor:'yellow'}}>
            <Image w='100%' h='100%' borderRadius='10px' objectFit='cover'  src={props.src} alt='Imagens convidados'/>
        </Box>
    )
}