import { Box, Image } from "@chakra-ui/react";

export const CardPhotos = (props) => {
    return (
        <Box
            borderRadius='10px'
            _hover={{ border: 'solid 1px', borderColor: 'yellow' }}
            overflow='hidden' // Para evitar que a imagem exceda o border-radius
            maxH='200px'
        >
            <Image 
                w='100%' 
                h='100%'
                maxH='200px'
                borderRadius='10px' 
                objectFit='cover'  
                src={props.src} 
                alt='Imagens convidados' 
            />
        </Box>
    );
};
