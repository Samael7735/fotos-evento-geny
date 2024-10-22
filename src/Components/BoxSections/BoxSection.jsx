import { Box } from "@chakra-ui/react";

export const BoxSection = ({children, ...props})=>{
    return <Box margin='0 auto' minH='100vh' maxW='500px' position='relative' display='grid' bgColor={props.bgC} >{children}</Box>
}
export const BoxContent = ({children, ...props})=>{
    return <Box w='88%' margin='0 auto'>{children}</Box>
}
