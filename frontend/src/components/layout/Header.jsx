// frontend/src/components/layout/Header.jsx
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../../utils/colors';

// Header qui se cache au scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Header collant personnalisé
const StyledAppBar = styled(AppBar)({
  backgroundColor: colors.cardBg,
  boxShadow: `0 2px 8px ${colors.shadow}`,
  borderBottom: `1px solid ${colors.border}`
});

const Logo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

const LogoText = styled(Typography)({
  fontWeight: 700,
  fontSize: '24px',
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginLeft: '8px'
});

// 🔥 NavButton avec style actif
const NavButton = styled(Button)(({ active }) => ({
  color: active ? colors.primary : colors.textPrimary,
  fontWeight: active ? 700 : 500,
  marginLeft: '24px',
  borderBottom: active ? `2px solid ${colors.primary}` : 'none',
  borderRadius: 0,
  transition: '0.2s ease',
  '&:hover': {
    color: colors.primary,
    backgroundColor: colors.tertiary
  }
}));

const StartButton = styled(Button)({
  backgroundColor: colors.primary,
  color: '#FFFFFF',
  fontWeight: 600,
  padding: '8px 24px',
  borderRadius: '8px',
  boxShadow: `0 4px 12px ${colors.primary}80`,
  '&:hover': {
    backgroundColor: colors.secondary
  }
});

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 route actuelle

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Accueil', path: '/' },
    { text: 'Catalogue', path: '/catalogue' },
    { text: 'FAQ', path: '/faq' }
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.text} 
          onClick={() => {
            navigate(item.path);
            setMobileOpen(false);
          }}
        >
          <ListItemText 
            primary={item.text}
            sx={{
              color: location.pathname === item.path ? colors.primary : colors.textPrimary,
              fontWeight: location.pathname === item.path ? 700 : 500
            }}
          />
        </ListItem>
      ))}
      <ListItem button onClick={() => navigate('/catalogue')}>
        <ListItemText 
          primary="Commencer la comparaison" 
          sx={{ color: colors.primary, fontWeight: 600 }} 
        />
      </ListItem>
    </List>
  );

  return (
    <HideOnScroll>
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            
            {/* Logo */}
            <Logo onClick={() => navigate('/')}>
              <DirectionsCarIcon sx={{ color: colors.primary, fontSize: 32 }} />
              <LogoText variant="h5">ComparAuto</LogoText>
            </Logo>

            {/* Menu Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {menuItems.map((item) => (
                <NavButton
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  active={location.pathname === item.path} // 👈 style actif
                >
                  {item.text}
                </NavButton>
              ))}
            </Box>

            {/* Menu Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: colors.textPrimary }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
                }}
              >
                {drawer}
              </Drawer>
            </Box>

          </Toolbar>
        </Container>
      </StyledAppBar>
    </HideOnScroll>
  );
}

export default Header;
