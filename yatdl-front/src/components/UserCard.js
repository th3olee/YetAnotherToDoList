import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Typography } from '@mui/material';


const UserCard = () => {

    const imageStyle = {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
        borderRadius: '8px',
      };

    const card = (
        <CardContent>
            <img  width="100px" src="https://raw.githubusercontent.com/MKAbuMattar/fluentui-emoji/0.0.8/icons/modern/astronaut-light.svg" />
        

            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Username
            </Typography>
        </CardContent>
    )

    return(
        <Box sx={{ minWidth: 275, justifyContent: 'center', display:'flex'}}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );

};

export default UserCard;
