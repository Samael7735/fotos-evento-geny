import './Hamburguer.css'
import { Box } from '@chakra-ui/react'

export const Hamburguer = (props)=>{
    const openOrClosed = props.value
    const handleClick = (e) => {
        e.preventDefault();
        props.onClick();
      };
    return(
        <>
            <Box onClick={props.onClick} display={props.display}>
                <input type="checkbox" readOnly onClick={handleClick} checked={openOrClosed} id='hamburguer' style={{display:'none'}}/>
                <label htmlFor="hamburguer" aria-label="Menu de navegação">
                    <div className="hamburguer"></div>
                </label>
            </Box>
        </>
    )
}
export default Hamburguer