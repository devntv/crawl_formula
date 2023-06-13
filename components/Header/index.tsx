import { Grid, Typography } from "@mui/material"
import { DEFAULT_TEXT_HEADER } from "../../data"
import { useTextChange } from "../../hooks"
import Logo from "../Logo"
import stylesHeader from './stylesHeader.module.css'

function Header() {
    const changeText = useTextChange({ texts: DEFAULT_TEXT_HEADER, delay: 3500 })
    return (
        <header>
            <Grid className={stylesHeader.ctnLogo} container>
                <Grid xs={12} alignItems='center' justifyContent='center' item>
                    <Logo />
                    <Typography className={stylesHeader['rotating-text']}>{changeText}</Typography>
                    <Typography className={stylesHeader.bf} />
                </Grid>
            </Grid>
        </header>
    )
}

export default Header