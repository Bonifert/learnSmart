import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Outlet, useNavigate} from "react-router-dom";
import {useUser} from "../../context/userContext/userContextImport.ts";


export const ResponsiveAppBar = () => {
  const {logout} = useUser();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pages: Option[] = [
    {
      optionText: "Topics",
      navigate: () => navigate("/")
    },
  ];
  const settings: Option[] = [
    {
      optionText: "Log out",
      navigate: () => {
        logout();
        navigate("/home");
      }
    },
  ];

  interface Option {
    readonly optionText: string;
    readonly navigate: () => void;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <Box height="100%" sx={{display:"flex", flexFlow:"column"}} minWidth="270px">
        <AppBar position="static" sx={{bgcolor: "#469ca3"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                  p={0.8}
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 6,
                    bgcolor: "#18838c",
                    display: {xs: 'none', md: 'flex'},
                    fontWeight: 700,
                    color: 'white',
                    textDecoration: 'none',
                    border: "1px solid white",
                    borderRadius: 3
                  }}
              >
                learnSmart
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                >
                  {pages.map((page) => (
                      <MenuItem key={page.optionText} onClick={page.navigate}>
                        <Typography textAlign="center">{page.optionText}</Typography>
                      </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                  p={0.8}
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    display: {xs: 'flex', md: 'none'},
                    mr: 6,
                    bgcolor: "#18838c",
                    fontWeight: 700,
                    color: 'white',
                    textDecoration: 'none',
                    border: "1px solid white",
                    borderRadius: 3
                  }}
              >
                learnSmart
              </Typography>
              <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages.map((page) => (
                    <Button
                        key={page.optionText}
                        onClick={page.navigate}
                        sx={{my: 2, color: 'white', display: 'block', textTransform: "none"}}
                    >
                      <Typography variant="h6">{page.optionText}</Typography>
                    </Button>
                ))}
              </Box>

              <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <MenuIcon/>
                  </IconButton>
                </Tooltip>

                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                      <MenuItem key={setting.optionText} onClick={setting.navigate}>
                        <Typography textAlign="center">{setting.optionText}</Typography>
                      </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Outlet/>
      </Box>
  );
}