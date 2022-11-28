
import Input from "@/components/common/input/Input";
import { Context } from "@/context/Context";
import { IUser } from "@/interfaces/IUser";
import { initialState, UserReducer } from "@/reducer/UserReducer";
import { handleLogin } from "@/services/Login.service";
import { BorderBottomInput } from "@/styles-components/BorderBottomInput";
import { StylizedButton } from "@/styles-components/StylizedButton";
import { validateData } from '@/utils/validateData';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { ChangeEvent, useReducer, useState, useContext, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

interface IErrorUser {
    errorPassword: string,
    errorEmail: string
}

const Login = () => {

    const navigate = useNavigate()
    const { handleLogin } = useContext(Context)

    const [hasError, setHasError] = useState<IErrorUser | undefined>(undefined)
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState<IUser>({
        email: '',
        password: ''
    })
    
    const handleSubimit = async () => {
        const hasErrorEmail = validateData(userData.email!, 'email')
        const hasErrorPassword = validateData(userData.password!, 'password')
        if (hasErrorEmail || hasErrorPassword) {
           return setHasError({errorEmail: hasErrorEmail ?? '', errorPassword: hasErrorPassword ?? ''})
        }
        const response = await handleLogin(userData)
        if (response.message) return setHasError({errorEmail: response.message, errorPassword: response.message}) 
        navigate('/home')
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setHasError(undefined)
        const { name, value } = event.target
        setUserData({...userData, [name]: value})
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.key === 'Enter' && handleSubimit()
    }

    return (
        <div className={styles['login-container']}>
            <div className={styles['form-container']}>
                <img src="https://assets.website-files.com/629e16486a8d874a94433d97/62a2775d86e66a72feb0261e_proplanner-new.svg" alt="logo"/>
                <h2>Sign In</h2>
                <Input
                    handleKeyPress={handleKeyPress}
                    handleOnChange={handleOnChange}
                    name='email'
                    type="text"
                    inputProps={{role: 'email-input', style:{color: 'white'}}}
                    hasError={hasError?.errorEmail ?? undefined}
                    endAdornment={
                        <InputAdornment position="start">
                            <AccountCircle style={{color: 'white'}} color="action" />
                        </InputAdornment>
                    }
                />
                <Input
                    handleKeyPress={handleKeyPress}
                    handleOnChange={handleOnChange}
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    inputProps={{role: 'password-input', style:{color: 'white'}}}
                    hasError={hasError?.errorPassword ?? undefined}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                aria-describedby="component-error-password"
                                role='visibility-password'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? <Visibility style={{color: 'white'}} /> : <VisibilityOff style={{color: 'white'}} />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <StylizedButton onClick={handleSubimit} variant="contained">Login</StylizedButton>
            </div>
        </div>
    )
}

export default Login