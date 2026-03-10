// frontend/src/components/layout/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { colors } from '../../utils/colors';

const FooterContainer = styled(Box)({
  backgroundColor: colors.cardBg,
  borderTop: `1px solid ${colors.border}`,
  boxShadow: `0 -2px 8px ${colors.shadow}`,
  paddingTop: '48px',
  paddingBottom: '24px',
  marginTop: '48px'
});


const FooterLink = styled(Link)({
  color: colors.textSecondary,
  textDecoration: 'none',
  display: 'block',
  marginBottom: '8px',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: colors.primary
  }
});

const SocialIcon = styled(IconButton)({
  color: colors.textSecondary,
  '&:hover': {
    color: colors.primary,
    backgroundColor: colors.tertiary
  }
});

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="flex-start">

        {/* Colonne gauche */}
        <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DirectionsCarIcon sx={{ color: colors.primary, fontSize: 32 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, ml: 1, color: colors.textPrimary }}>
                ComparAuto
            </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 2, lineHeight: 1.6 }}>
            La plateforme intelligente de comparaison automobile qui révolutionne l'experience
            </Typography>

            <Box sx={{ mt: 2 }}>
            <SocialIcon size="small"><FacebookIcon fontSize="small" /></SocialIcon>
            <SocialIcon size="small"><TwitterIcon fontSize="small" /></SocialIcon>
            <SocialIcon size="small"><LinkedInIcon fontSize="small" /></SocialIcon>
            <SocialIcon size="small"><InstagramIcon fontSize="small" /></SocialIcon>
            <SocialIcon size="small"><GitHubIcon fontSize="small" /></SocialIcon>
            </Box>
        </Grid>
        <Grid item xs={6} md={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                
                </Typography>
                <FooterLink href="/"></FooterLink>
                <FooterLink href="/catalogue"></FooterLink>
                <FooterLink href="/comparaison"></FooterLink>
                <FooterLink href="/faq"></FooterLink>
        </Grid>
        <Grid item xs={6} md={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                
                </Typography>
                <FooterLink href="/"></FooterLink>
                <FooterLink href="/catalogue"></FooterLink>
                <FooterLink href="/comparaison"></FooterLink>
                <FooterLink href="/faq"></FooterLink>
        </Grid>        


        {/* Colonnes droites regroupées */}
        <Grid item xs={12} md={8}>
            <Grid
            container
            spacing={4}
            justifyContent="flex-end"
            sx={{ textAlign: { xs: 'left', md: 'right' } }}
            >

            {/* Navigation */}
            <Grid item xs={6} md={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                Navigation
                </Typography>
                <FooterLink href="/">Accueil</FooterLink>
                <FooterLink href="/catalogue">Catalogue</FooterLink>
                <FooterLink href="/comparaison">Comparer</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
            </Grid>

            {/* Légal */}
            <Grid item xs={6} md={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                Légal
                </Typography>
                <FooterLink href="/mentions-legales">Mentions légales</FooterLink>
                <FooterLink href="/confidentialite">Politique de confidentialité</FooterLink>
                <FooterLink href="/cookies">Cookies</FooterLink>
                <FooterLink href="/cgv">CGV</FooterLink>
            </Grid>

            {/* Contact */}
            <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                Contact
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                ✉️ contact@comparauto.fr
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                📞 06 73 75 66 71
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 2 }}>
                🏢 90000 Belfort, France
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                Lundi - Vendredi : 9h - 18h
                </Typography>
            </Grid>

            </Grid>
        </Grid>

        </Grid>


        <Divider sx={{ my: 3, borderColor: colors.border }} />

        <Typography variant="body2" align="center" sx={{ color: colors.textSecondary }}>
          © {new Date().getFullYear()} ComparAuto - Tous droits réservés.
        </Typography>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
