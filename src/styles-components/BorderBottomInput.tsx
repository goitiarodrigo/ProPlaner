import styled from "styled-components";
import Input from '@mui/material/Input'

export const BorderBottomInput = styled(Input)`
  .css-1ptx2yq-MuiInputBase-root-MuiInput-root {
    color: white !important;
  }
  &::after {
    border-bottom: 1px solid #00a5ba !important;
  }
  &::before {
    border-bottom: 1px solid white !important;
  }
`