// frontend/src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import { colors } from '../../utils/colors';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

/* ----------------------------- HERO SECTION ----------------------------- */

const HeroSection = styled(Box)({
  position: 'relative',
  height: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  backgroundImage: `url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#FFFFFF',
  marginBottom: '48px'
});

const HeroOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)'
});

const ScrollArrow = styled(Box)({
  position: 'absolute',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '32px',
  opacity: 0.8,
  animation: 'bounce 1.8s infinite',
  '@keyframes bounce': {
    '0%, 100%': { transform: 'translate(-50%, 0)' },
    '50%': { transform: 'translate(-50%, -10px)' }
  }
});

const HeroTitle = styled(Typography)({
  fontSize: '48px',
  fontWeight: 800,
  marginBottom: '16px',
  lineHeight: 1.2
});

const HeroSubtitle = styled(Typography)({
  fontSize: '18px',
  marginBottom: '32px',
  opacity: 0.9,
  maxWidth: '600px'
});

const HeroButton = styled(Button)({
  backgroundColor: '#FFFFFF',
  color: colors.primary,
  fontWeight: 600,
  padding: '12px 36px',
  fontSize: '16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: colors.tertiary
  }
});

/* ----------------------------- ANIMATED NUMBER ----------------------------- */

function AnimatedNumber({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ''));
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count.toLocaleString()}+</>;
}

/* ----------------------------- ADVANTAGES ----------------------------- */

const AdvantageCard = styled(Card)({
  height: '100%',
  padding: '24px',
  textAlign: 'center',
  borderRadius: '12px',
  boxShadow: `0 4px 12px ${colors.shadow}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 24px ${colors.shadow}`
  }
});

const IconWrapper = styled(Avatar)({
  backgroundColor: colors.tertiary,
  color: colors.primary,
  width: 64,
  height: 64,
  margin: '0 auto 16px'
});

/* ----------------------------- STATS ----------------------------- */

const StatBox = styled(Box)({
  textAlign: 'center',
  padding: '24px'
});

/* ----------------------------- FAQ ----------------------------- */

const StyledAccordion = styled(Accordion)({
  boxShadow: 'none',
  border: `1px solid ${colors.border}`,
  marginBottom: '8px',
  '&:before': {
    display: 'none'
  }
});

/* ----------------------------- PAGE ----------------------------- */

function Home() {
  const navigate = useNavigate();

  const statsRef = React.useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
        if (entries[0].isIntersecting) {
            setStatsVisible(true);
            observer.disconnect();
        }
        },
        { threshold: 0.3 }
    );

    if (statsRef.current) {
        observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
    }, []);



  const advantages = [
    { icon: <PsychologyIcon sx={{ fontSize: 32 }} />, title: 'Adapté à votre niveau', description: 'Débutant, intermédiaire ou expert : l’interface s’adapte à votre expérience' },
    { icon: <AutoGraphIcon sx={{ fontSize: 32 }} />, title: 'Visualisations intelligentes', description: 'Des graphiques dynamiques qui rendent les données techniques compréhensibles.' },
    { icon: <SpeedIcon sx={{ fontSize: 32 }} />, title: 'Décision éclairée', description: 'Tous les critères essentiels pour faire un choix réflechie' },
    { icon: <VisibilityIcon sx={{ fontSize: 32 }} />, title: 'Comparaison transparente', description: 'Comparer jusqu’à 4 véhicules chacun étant associé un code couleur unique.' },
    { icon: <SecurityIcon sx={{ fontSize: 32 }} />, title: 'Données fiables', description: 'Des informations viennent de sources officielles et de tests certifiés.' }
  ];

  const stats = [
    { value: '15000', label: 'Utilisateurs actifs' },
    { value: '500', label: 'Véhicules référencés' },
    { value: '98', label: 'Satisfaction' },
    { value: '4.8', label: 'Note moyenne' }
  ];

  const faqs = [
    { question: 'Comment fonctionne l’adaptation au niveau ?', answer: 'Vous choisissez votre niveau et l’interface s’adapte automatiquement.' },
    { question: 'Puis-je changer mon niveau ?', answer: 'Oui, à tout moment via le sélecteur de profil.' },
    { question: 'Les données sont-elles mises à jour ?', answer: 'Oui, en temps réel via les constructeurs et tests certifiés.' },
    { question: 'Combien de véhicules puis-je comparer ?', answer: 'Jusqu’à 4 véhicules côte à côte.' },
    { question: 'ComparAuto est-il gratuit ?', answer: 'Oui, toutes les fonctionnalités principales sont accessibles gratuitement.' },
    { question: 'Les données sont-elles fiables ?', answer: 'Elles proviennent de sources officielles et sont vérifiées régulièrement.' },
    { question: 'Puis-je utiliser ComparAuto sur mobile ?', answer: 'Oui, la plateforme est entièrement optimisée pour smartphones et tablettes.' }
  ];

  return (
    <Box>

      {/* ----------------------------- HERO ----------------------------- */}
      <HeroSection>
        <HeroOverlay />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{xs: 12, md: 6}}>
              <HeroTitle>Comparez intelligemment,<br />choisissez en confiance</HeroTitle>
              <HeroSubtitle>
                La première plateforme qui adapte la comparaison automobile à votre niveau d'expertise.
              </HeroSubtitle>
              <HeroButton onClick={() => navigate('/catalogue')}>
                Commencer la comparaison
              </HeroButton>
            </Grid>
          </Grid>
        </Container>

        <ScrollArrow><ArrowCircleDownIcon sx={{ fontSize: 48 }} /></ScrollArrow>
      </HeroSection>

      {/* ----------------------------- ADVANTAGES ----------------------------- */}
        <Typography variant="h2" align="center" sx={{ fontSize: '40px', fontWeight: 800, mb: 6 , mt: 8}}>
          Pourquoi choisir ComparAuto ?
        </Typography>
      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          {advantages.slice(0, 5).map((adv, index) => (
            <Grid size={{xs: 12, md: 4}} key={index}>
              <AdvantageCard>
                <IconWrapper>{adv.icon}</IconWrapper>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{adv.title}</Typography>
                <Typography sx={{ color: colors.textSecondary }}>{adv.description}</Typography>
              </AdvantageCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ----------------------------- STATS ----------------------------- */}
      <Typography variant="h2" align="center" sx={{ fontSize: '40px', fontWeight: 800, mb: 4 }}>
            Nos statistiques
      </Typography>      
      <Container maxWidth="xl" sx={{ mb: 8 }} ref={statsRef}>
        <Grid container spacing={2} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid size={{xs: 6, md: 3}} key={index}>
              <StatBox>
                <Typography variant="h3" sx={{ color: colors.primary, fontWeight: 700 }}>
                    {statsVisible ? <AnimatedNumber value={stat.value} /> : "0"}
                </Typography>
                <Typography sx={{ color: colors.textSecondary }}>
                  {stat.label}
                </Typography>
              </StatBox>
            </Grid>
          ))}
        </Grid>
      </Container>      

      {/* ----------------------------- FAQ ----------------------------- */}
      <Typography variant="h2" align="center" sx={{ fontSize: '40px', fontWeight: 800, mb: 4 }}>
            Questions Fréquemment Posées
      </Typography>      
      <Container maxWidth="lg" sx={{ mb: 8 }}>


        <Box>
          {faqs.map((faq, index) => (
            <StyledAccordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: colors.textSecondary }}>{faq.answer}</Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
      </Container>

    </Box>
  );
}

export default Home;
