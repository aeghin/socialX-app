import {
    Box,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";



const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(mind-width: 1000px)");


    return <Box>
        <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
                "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                },
            }}
        >
            SocialX
        </Typography>
    </Box>
};

export default LoginPage;