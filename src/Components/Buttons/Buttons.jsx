import { Button } from "@chakra-ui/react";

export const PrimaryButton=({children, ...props})=>{
    return (
        <Button display={props.display} mb={props.mb} w={props.w} mt={props.mt} variant='solid' colorScheme={props.scheme} fontWeight='400' fontSize={props.fontSize} 
        borderRadius='10px' p='20px'>{children}</Button>
    )
}
export const SecondaryButton=({children, ...props})=>{
    return(
        <Button display={props.display} color='white' w={props.w} mb={props.mb} mt={props.mt} variant='outline' colorScheme={props.scheme} fontWeight='400' fontSize={props.fontSize} 
        borderRadius='10px' p='20px' >{children}</Button>
    ) 
}
