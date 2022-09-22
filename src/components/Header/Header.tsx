import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import { User } from 'interfaces';
import { useContext } from 'react';
import { AuthContext, AuthContextConfig } from 'store';

interface HeaderProps {
  user?: User;
}
const boxStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Header = ({ user }: HeaderProps): JSX.Element => {
  const { logout } = useContext<AuthContextConfig>(AuthContext);

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Grid container justifyContent="space-between" height="110px">
          <Grid item>
            <Typography
              variant="h3"
              m={3}
              sx={{
                textTransform: 'uppercase',
                fontWeight: '700',
                letterSpacing: '5px',
              }}
            >
              Insurance app
            </Typography>
          </Grid>
          {user && (
            <Grid item>
              <Box {...boxStyles} height="110px">
                <Typography variant="h6" color="inherit" mr={5}>
                  Hello, {user.username}!
                </Typography>
                <Button
                  variant="text"
                  color="inherit"
                  href="/"
                  onClick={logout}
                >
                  <Typography
                    sx={{
                      textTransform: 'none',
                      fontWeight: '900',
                      marginRight: 1,
                    }}
                  >
                    Log out
                  </Typography>
                  <LogoutIcon />
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
