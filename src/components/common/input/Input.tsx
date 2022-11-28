import { ChangeEvent, KeyboardEvent } from 'react'
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { BorderBottomInput } from "@/styles-components/BorderBottomInput";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { InputBaseComponentProps } from '@mui/material';

interface IErrorUser {
    errorPassword: string,
    errorEmail: string
}

interface IProps {
    handleOnChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleKeyPress?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    hasError: any,
    endAdornment?: React.ReactNode,
    inputProps?: InputBaseComponentProps,
    type: string,
    name: string
}

const Input = ({handleOnChange, handleKeyPress, hasError, type, name, endAdornment, inputProps}: IProps) => {
    return (
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel style={{color: 'white', textTransform: 'capitalize'}} htmlFor="standard-adornment-password">{name}</InputLabel>
            <BorderBottomInput
                onChange={handleOnChange}
                onKeyDown={handleKeyPress}
                autoComplete='off'
                name={name}
                type={type}
                inputProps={inputProps}
                endAdornment={endAdornment}
            />
            <FormHelperText style={{color: 'red'}} id="component-error-text">{hasError ?? ''}</FormHelperText>
        </FormControl>
    )
}

export default Input