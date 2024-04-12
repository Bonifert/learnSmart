import * as React from 'react';
import {ReactNode} from 'react';
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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Outlet, useNavigate} from "react-router-dom";
import {useUser} from "../../context/userContext/userContextImport.ts";
import {grey} from "@mui/material/colors";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const ResponsiveAppBar = () => {
  const {logout} = useUser();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pages: Option[] = [
    {
      optionText: "My topics",
      navigate: () => navigate("/"),
    },
    {
      optionText: "AI",
      navigate: ()=> navigate("/ai/options"),
      icon: <AutoAwesomeIcon fontSize="small"/>
    }
  ];
  const settings: Option[] = [
    {
      optionText: "Log out",
      navigate: () => {
        logout();
        navigate("/home");
      },
    },
  ];

  interface Option {
    readonly optionText: string;
    readonly navigate: () => void;
    readonly icon?: ReactNode;
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
        <AppBar position="static" sx={{bgcolor: "#d1e6e8", boxShadow: 0, borderBottom: `1px solid ${grey[300]}`}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{paddingLeft: 3}}>
              <Box display="flex" p={0.5} sx={{
                mr: 6,
                display: {xs: 'none', md: 'flex'},
                color: '#469ca3',
                textDecoration: 'none',
                borderRadius: 3,
                alignItems: "center"
              }}>
                <LightbulbOutlinedIcon fontSize="large"/>
                <Typography
                    ml={0.5}
                    pt="2px"
                    fontFamily="poppins"
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{fontWeight: 700, height: "100%", verticalAlign: "middle"}}
                >
                  learnSmart
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    sx={{color:grey[800]}}

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
                        <Typography textAlign="center">{page.optionText} {page.icon}</Typography>
                      </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box display="flex" p={0.5} sx={{
                mr: 6,
                display: {xs: 'flex', md: 'none'},
                color: '#469ca3',
                textDecoration: 'none',
                borderRadius: 3,
                alignItems: "center"
              }}>
                <LightbulbOutlinedIcon fontSize="large"/>
                <Typography
                    ml={0.5}
                    pt="2px"
                    fontFamily="poppins"
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{fontWeight: 700, height: "100%", verticalAlign: "middle"}}
                >
                  learnSmart
                </Typography>
              </Box>
              <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages.map((page) => (
                    <Button
                        key={page.optionText}
                        onClick={page.navigate}
                        sx={{m: 2, color: 'black', display: 'block', textTransform: "none"}}
                    >

                      <Typography variant="h6">{page.optionText} {page.icon}</Typography>
                    </Button>
                ))}
              </Box>

              <Box sx={{flexGrow: 0}}>
                <Tooltip title="Profile menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0, color:grey[800]}}>
                    <AccountCircleOutlinedIcon/>
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