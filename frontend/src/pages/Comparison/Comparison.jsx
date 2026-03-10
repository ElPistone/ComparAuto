// frontend/src/pages/Comparison/Comparison.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Chip,
  Button,
  IconButton,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Tooltip,
  CircularProgress,
  Alert,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { colors } from '../../utils/colors';

// ========== COMPOSANTS STYLISÉS ==========

const PageContainer = styled(Container)({
  paddingTop: '32px',
  paddingBottom: '64px'
});

const ComparisonHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  flexWrap: 'wrap',
  gap: '16px'
});

const BackButton = styled(Button)({
  color: colors.textSecondary,
  '&:hover': {
    color: colors.primary,
    backgroundColor: colors.tertiary
  }
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '8px'
});

const ActionIcon = styled(IconButton)({
  color: colors.textSecondary,
  '&:hover': {
    color: colors.primary,
    backgroundColor: colors.tertiary
  }
});

const ProfileSelector = styled(Paper)({
  padding: '16px 20px',
  borderRadius: '12px',
  boxShadow: `0 2px 8px ${colors.shadow}`,
  backgroundColor: colors.cardBg,
  marginBottom: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px'
});

const ProfileLabel = styled(FormLabel)({
  color: colors.textPrimary,
  fontWeight: 600,
  fontSize: '14px',
  marginRight: '16px'
});

const ProfileRadio = styled(Radio)({
  color: colors.border,
  '&.Mui-checked': {
    color: colors.primary
  }
});

const VehicleHeader = styled(Paper)({
  padding: '16px',
  borderRadius: '12px',
  boxShadow: `0 2px 8px ${colors.shadow}`,
  backgroundColor: colors.cardBg,
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
});

const VehicleColor = styled(Box)(({ bgcolor }) => ({
  width: '8px',
  height: '60px',
  backgroundColor: bgcolor,
  borderRadius: '4px'
}));

const VehicleImage = styled('img')({
  width: '100px',
  height: '60px',
  objectFit: 'cover',
  borderRadius: '8px'
});

const VehicleInfo = styled(Box)({
  flex: 1
});

const SectionTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: colors.textPrimary,
  marginBottom: '16px',
  marginTop: '24px'
});

const ChartCard = styled(Paper)({
  padding: '20px',
  borderRadius: '12px',
  boxShadow: `0 2px 8px ${colors.shadow}`,
  backgroundColor: colors.cardBg,
  height: '100%',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: `0 8px 16px ${colors.shadow}`
  }
});

const ChartTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: colors.textPrimary,
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const InfoTooltip = styled(Tooltip)({
  cursor: 'help'
});

const StyledAccordion = styled(Accordion)({
  boxShadow: 'none',
  border: `1px solid ${colors.border}`,
  marginBottom: '8px',
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: '0 0 8px 0'
  }
});

const AccordionHeader = styled(AccordionSummary)({
  backgroundColor: colors.cardBg,
  borderBottom: `1px solid ${colors.border}`,
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const StyledTable = styled(Table)({
  minWidth: 650
});

const StyledTableCell = styled(TableCell)({
  borderBottom: `1px solid ${colors.border}`,
  color: colors.textPrimary
});

const StyledTableHeadCell = styled(TableCell)({
  fontWeight: 600,
  backgroundColor: colors.tertiary,
  color: colors.textPrimary,
  borderBottom: `1px solid ${colors.border}`
});

const BestValue = styled(Box)({
  color: colors.success,
  fontWeight: 600,
  display: 'inline-block',
  padding: '2px 8px',
  backgroundColor: `${colors.success}20`,
  borderRadius: '16px',
  fontSize: '12px',
  marginLeft: '8px'
});

const GaugeContainer = styled(Box)({
  width: '100%',
  height: '8px',
  backgroundColor: colors.border,
  borderRadius: '4px',
  position: 'relative'
});

const GaugeFill = styled(Box)(({ value, max, color }) => ({
  width: `${(value / max) * 100}%`,
  height: '100%',
  backgroundColor: color,
  borderRadius: '4px',
  transition: 'width 0.3s ease'
}));

const RecommendationCard = styled(Paper)({
  padding: '24px',
  borderRadius: '12px',
  boxShadow: `0 4px 12px ${colors.primary}40`,
  backgroundColor: colors.cardBg,
  marginBottom: '32px',
  border: `1px solid ${colors.primary}`,
  textAlign: 'center'
});

const EquipmentList = styled(List)({
  padding: 0
});

const EquipmentListItem = styled(ListItem)({
  padding: '4px 0'
});

// ========== COMPOSANT PRINCIPAL ==========

function Comparison() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer les IDs des véhicules depuis l'URL
  const queryParams = new URLSearchParams(location.search);
  const vehicleIds = queryParams.get('ids')?.split(',') || [];

  // États
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState('debutant');
  const [expanded, setExpanded] = useState(null);

  // Couleurs pour chaque véhicule
  const vehicleColors = ['#2F80ED', '#FFA726', '#9B51E0', '#FFEB3B'];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ids = queryParams.get('ids')?.split(',') || [];

    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const promises = ids.map(id => 
          axios.get(`http://localhost:5000/api/vehicles/${id}`)
        );
        const responses = await Promise.all(promises);
        setVehicles(responses.map(r => r.data));
      } catch (err) {
        console.error('Erreur API:', err);
        setError('Impossible de récupérer les données du serveur.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [location.search]);

  // ========== FONCTIONS DE RÉCUPÉRATION DES VALEURS ==========

  const getVehicleValue = (vehicle, criteriaKey) => {
    switch (criteriaKey) {
      case 'price': return vehicle.price;
      case 'year': return vehicle.year;
      case 'power': return vehicle.performance?.power;
      case 'consumption': return vehicle.economic?.consumption;
      case 'acceleration': return vehicle.performance?.acceleration;
      case 'topSpeed': return vehicle.performance?.topSpeed;
      case 'torque': return vehicle.performance?.torque;
      case 'range': return vehicle.economic?.range;
      case 'weight': return vehicle.dimensions?.weight;
      case 'length': return vehicle.dimensions?.length;
      case 'width': return vehicle.dimensions?.width;
      case 'height': return vehicle.dimensions?.height;
      case 'trunk': return vehicle.general?.trunkCapacity;
      case 'warranty': return vehicle.warranty;
      case 'reliability': return vehicle.reliability?.rating;
      case 'reviewCount': return vehicle.reliability?.reviewCount;
      default: return 'N/A';
    }
  };

  const getBestValue = (criteriaKey, values) => {
    const numericValues = values.filter(v => v != null && !isNaN(parseFloat(v))).map(v => parseFloat(v));
    if (numericValues.length === 0) return null;
    
    const lowerIsBetter = ['price', 'consumption', 'acceleration'];
    return lowerIsBetter.includes(criteriaKey) 
      ? Math.min(...numericValues)
      : Math.max(...numericValues);
  };

  // Vérifier si une valeur est la meilleure
  const isBestValue = (value, criteriaKey, allValues) => {
    if (value == null || isNaN(parseFloat(value))) return false;
    const best = getBestValue(criteriaKey, allValues);
    return parseFloat(value) === best;
  };

  // ========== DONNÉES POUR LES GRAPHIQUES ==========

  // Données pour le nuage de points (Prix) - Axe Y vide
  const getPriceScatterData = () => {
    return vehicles.map((v, index) => ({
      prix: v.price,
      y: index * 0.5, // Pour espacer les points verticalement
      name: `${v.brand} ${v.model}`,
      fill: vehicleColors[index]
    }));
  };

  // Données pour le radar (Performance globale)
  const getRadarData = () => {
    return vehicles.map((v, index) => ({
      name: `${v.brand} ${v.model}`,
      Puissance: v.performance?.power || 0,
      Couple: v.performance?.torque || 0,
      Accélération: v.performance?.acceleration ? 10 - v.performance.acceleration : 0,
      'Vitesse max': v.performance?.topSpeed || 0,
      Efficacité: v.performance?.efficiency || 0,
      color: vehicleColors[index],
      fullMark: 10
    }));
  };

  // Données pour les barres
  const getBarData = (criteriaKey) => {
    return vehicles.map(v => ({
      name: `${v.brand} ${v.model}`,
      value: getVehicleValue(v, criteriaKey) || 0,
      fill: vehicleColors[vehicles.indexOf(v)]
    }));
  };

  // ========== CALCUL DU BEST CHOICE ==========

  const getBestVehicle = () => {
    if (vehicles.length < 2) return null;
    
    return vehicles.reduce((best, current) => {
      const bestScore = (best.performance?.efficiency || 0) * 0.4 + 
                       (best.economic?.consumption ? (10 - best.economic.consumption) : 0) * 0.3 +
                       (best.reliability?.rating || 0) * 0.3;
      const currentScore = (current.performance?.efficiency || 0) * 0.4 + 
                          (current.economic?.consumption ? (10 - current.economic.consumption) : 0) * 0.3 +
                          (current.reliability?.rating || 0) * 0.3;
      return currentScore > bestScore ? current : best;
    });
  };

  // ========== DÉFINITION DES CRITÈRES PAR PROFIL ==========

  const getCriteriaByProfile = () => {
    // Critères de base (Débutant)
    const baseSections = [
      { 
        id: 'price', 
        label: 'Prix de la voiture', 
        description: 'Coût total d\'acquisition incluant les taxes et frais obligatoires',
        type: 'scatter',
        data: getPriceScatterData()
      },
      { 
        id: 'performance', 
        label: 'Performance Globale', 
        description: 'Indice synthétique regroupant puissance, couple, accélération, vitesse et efficacité',
        type: 'radar',
        data: getRadarData()
      },
      { 
        id: 'year', 
        label: 'Année de sortie', 
        description: 'Année de première mise en circulation du modèle',
        type: 'bar',
        data: getBarData('year'),
        unit: '',
        format: (v) => v
      },
      { 
        id: 'general', 
        label: 'Caractéristiques Générales', 
        description: 'Caractéristiques physiques et mécaniques de base',
        type: 'table',
        columns: [
          { label: 'Critère', key: 'label' },
          ...vehicles.map(v => ({ label: `${v.brand} ${v.model}`, key: v._id }))
        ],
        rows: [
          { 
            label: 'Carrosserie', 
            key: 'bodyType',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.general?.bodyType || 'N/A' }), {})
          },
          { 
            label: 'Motorisation', 
            key: 'motorization',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.general?.motorization || 'N/A' }), {})
          },
          { 
            label: 'Type de véhicule', 
            key: 'vehicleType',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.general?.vehicleType || 'N/A' }), {})
          },
          { 
            label: 'Capacité coffre', 
            key: 'trunk',
            unit: 'L',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.general?.trunkCapacity || 'N/A' }), {})
          },
          { 
            label: 'Hybridation', 
            key: 'hybridization',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.general?.hybridization || 'N/A' }), {})
          },
          { 
            label: 'Boîte de vitesses', 
            key: 'transmission',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.general?.transmission || 'N/A' }), {})
          }
        ]
      },
      { 
        id: 'equipment', 
        label: 'Équipements de série notables', 
        description: 'Équipements inclus sans supplément de prix',
        type: 'equipment',
        data: vehicles.map(v => ({
          name: `${v.brand} ${v.model}`,
          equipment: v.equipment || [],
          color: vehicleColors[vehicles.indexOf(v)]
        }))
      },
      { 
        id: 'warranty', 
        label: 'Durée de Garantie', 
        description: 'Période pendant laquelle le constructeur prend en charge les défauts',
        type: 'bar',
        data: getBarData('warranty'),
        unit: 'ans',
        format: (v) => v
      },
      { 
        id: 'dimensions', 
        label: 'Dimensions extérieures', 
        description: 'Dimensions du véhicule - Importants pour stationnement et manœuvrabilité',
        type: 'table',
        columns: [
          { label: 'Dimension', key: 'label' },
          ...vehicles.map(v => ({ label: `${v.brand} ${v.model}`, key: v._id }))
        ],
        rows: [
          { 
            label: 'Longueur', 
            key: 'length',
            unit: 'mm',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.dimensions?.length || 'N/A' }), {})
          },
          { 
            label: 'Largeur', 
            key: 'width',
            unit: 'mm',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.dimensions?.width || 'N/A' }), {})
          },
          { 
            label: 'Hauteur', 
            key: 'height',
            unit: 'mm',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.dimensions?.height || 'N/A' }), {})
          }
        ]
      },
      { 
        id: 'economic', 
        label: 'Volet Économique', 
        description: 'Coûts récurrents annuels estimés',
        type: 'table',
        columns: [
          { label: 'Critère', key: 'label' },
          ...vehicles.map(v => ({ label: `${v.brand} ${v.model}`, key: v._id }))
        ],
        rows: [
          { 
            label: 'Consommation', 
            key: 'consumption',
            unit: 'L/100km',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.economic?.consumption || 'N/A' }), {})
          },
          { 
            label: 'Autonomie', 
            key: 'range',
            unit: 'km',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.economic?.range || 'N/A' }), {})
          },
          { 
            label: 'Entretien', 
            key: 'maintenance',
            unit: '€/an',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.economic?.maintenanceCost || 'N/A' }), {})
          },
          { 
            label: 'Fiscalité', 
            key: 'tax',
            unit: '€/an',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.economic?.taxCost || 'N/A' }), {})
          },
          { 
            label: 'Assurance', 
            key: 'insurance',
            unit: '€/an',
            ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.economic?.insuranceCost || 'N/A' }), {})
          }
        ]
      },
      { 
        id: 'reliability', 
        label: 'Fiabilité (Note Utilisateurs)', 
        description: 'Note basée sur les retours des propriétaires réels',
        type: 'reliability',
        data: vehicles.map(v => ({
          name: `${v.brand} ${v.model}`,
          rating: v.reliability?.rating || 0,
          reviewCount: v.reliability?.reviewCount || 0,
          color: vehicleColors[vehicles.indexOf(v)]
        }))
      }
    ];

    // Ajouter les critères Intermédiaire
    if (profile === 'intermediaire' || profile === 'expert') {
      baseSections.push(
        { 
          id: 'transmission', 
          label: 'Type de Transmission', 
          description: 'Système de transmission de la puissance aux roues',
          type: 'table',
          columns: [
            { label: 'Véhicule', key: 'label' },
            ...vehicles.map(v => ({ label: `${v.brand} ${v.model}`, key: v._id }))
          ],
          rows: [
            { 
              label: 'Transmission', 
              key: 'transmission',
              ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.general?.transmission || 'N/A' }), {})
            }
          ]
        },
        { 
          id: 'comfort', 
          label: 'Confort et Équipements Avancés', 
          description: 'Équipements de confort et qualité de vie à bord',
          type: 'table',
          columns: [
            { label: 'Équipement', key: 'label' },
            ...vehicles.map(v => ({ label: `${v.brand} ${v.model}`, key: v._id }))
          ],
          rows: [
            { 
              label: 'Sièges chauffants', 
              key: 'heatedSeats',
              ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.equipment?.some(e => e.name.includes('chauffant')) ? '✓' : '−' }), {})
            },
            { 
              label: 'Toit panoramique', 
              key: 'panoramicRoof',
              ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.equipment?.some(e => e.name.includes('Toit')) ? '✓' : '−' }), {})
            }
          ]
        }
      );
    }

    // Ajouter les critères Expert
    if (profile === 'expert') {
      baseSections.push(
        { 
          id: 'engine', 
          label: 'Motorisation Détaillée', 
          description: 'Caractéristiques techniques précises du groupe motopropulseur',
          type: 'table',
          columns: [
            { label: 'Caractéristique', key: 'label' },
            ...vehicles.map(v => ({ label: `${v.brand} ${v.model}`, key: v._id }))
          ],
          rows: [
            { 
              label: 'Cylindrée', 
              key: 'displacement',
              unit: 'cm³',
              ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.expert?.engine?.displacement || 'N/A' }), {})
            },
            { 
              label: 'Injection', 
              key: 'injection',
              ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.expert?.engine?.injection || 'N/A' }), {})
            },
            { 
              label: 'Taux compression', 
              key: 'compression',
              ...vehicles.reduce((acc, v) => ({ ...acc, [v._id]: v.expert?.engine?.compression || 'N/A' }), {})
            }
          ]
        }
      );
    }

    return baseSections;
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress sx={{ color: colors.primary }} />
        <Typography sx={{ mt: 2, color: colors.textSecondary }}>
          Chargement des véhicules...
        </Typography>
      </Container>
    );
  }

  if (error || vehicles.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Aucun véhicule à comparer'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/catalogue')}
          variant="contained"
        >
          Retour au catalogue
        </Button>
      </Container>
    );
  }

  const bestVehicle = getBestVehicle();

  return (
    <PageContainer maxWidth="xl">
      {/* En-tête */}
      <ComparisonHeader>
        <BackButton
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/catalogue')}
        >
          Retour au catalogue
        </BackButton>

        <ActionButtons>
          <ActionIcon>
            <ShareIcon />
          </ActionIcon>
          <ActionIcon>
            <PrintIcon />
          </ActionIcon>
          <ActionIcon>
            <DownloadIcon />
          </ActionIcon>
        </ActionButtons>
      </ComparisonHeader>

      {/* Sélecteur de profil */}
      <ProfileSelector>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ProfileLabel>Niveau d'expertise :</ProfileLabel>
          <RadioGroup
            row
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          >
            <FormControlLabel
              value="debutant"
              control={<ProfileRadio />}
              label="Débutant"
            />
            <FormControlLabel
              value="intermediaire"
              control={<ProfileRadio />}
              label="Intermédiaire"
            />
            <FormControlLabel
              value="expert"
              control={<ProfileRadio />}
              label="Expert"
            />
          </RadioGroup>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: colors.textSecondary }}>
            {vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} en comparaison
          </Typography>
        </Box>
      </ProfileSelector>

      {/* En-têtes des véhicules */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {vehicles.map((vehicle, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={vehicle._id}>
            <VehicleHeader>
              <VehicleColor bgcolor={vehicleColors[index]} />
              <VehicleImage 
                src={vehicle.imageUrl || 'https://via.placeholder.com/100x60'} 
                alt={vehicle.model}
              />
              <VehicleInfo>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {vehicle.brand} {vehicle.model}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                  {vehicle.year} • {vehicle.performance?.power} ch
                </Typography>
              </VehicleInfo>
            </VehicleHeader>
          </Grid>
        ))}
      </Grid>

      {/* Section "Best Choice" - DÉPLACÉE AVANT LES CRITÈRES */}
      {bestVehicle && (
        <RecommendationCard>
          <Chip
            label="Recommandation ComparAuto"
            sx={{ 
              backgroundColor: colors.secondary,
              color: '#FFFFFF',
              fontWeight: 600,
              mb: 2
            }}
          />
          <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 700, mb: 1 }}>
            {bestVehicle.brand} {bestVehicle.model}
          </Typography>
          <Typography variant="h6" sx={{ color: colors.textSecondary, mb: 2 }}>
            Meilleur choix selon votre profil {profile === 'debutant' ? 'Débutant' : profile === 'intermediaire' ? 'Intermédiaire' : 'Expert'}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 4 }}>
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                Performance
              </Typography>
              <Typography variant="h6" sx={{ color: colors.textPrimary }}>
                {bestVehicle.performance?.efficiency || 'N/A'}/10
              </Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                Consommation
              </Typography>
              <Typography variant="h6" sx={{ color: colors.textPrimary }}>
                {bestVehicle.economic?.consumption || 'N/A'} L
              </Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                Fiabilité
              </Typography>
              <Typography variant="h6" sx={{ color: colors.textPrimary }}>
                {bestVehicle.reliability?.rating || 'N/A'}/5
              </Typography>
            </Grid>
          </Grid>
        </RecommendationCard>
      )}

      {/* Section des critères en accordéon */}
      <SectionTitle>
        Critères de comparaison
        {profile === 'expert' && (
          <Chip 
            label="Mode expert" 
            size="small" 
            sx={{ ml: 2, backgroundColor: colors.secondary, color: '#FFFFFF' }}
          />
        )}
        {profile === 'intermediaire' && (
          <Chip 
            label="Mode intermédiaire" 
            size="small" 
            sx={{ ml: 2, backgroundColor: colors.primary, color: '#FFFFFF' }}
          />
        )}
      </SectionTitle>

      <Box sx={{ mb: 4 }}>
        {getCriteriaByProfile().map((section) => (
          <StyledAccordion
            key={section.id}
            expanded={expanded === section.id}
            onChange={handleAccordionChange(section.id)}
          >
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${section.id}-content`}
              id={`${section.id}-header`}
            >
              <Box>
                <Typography sx={{ fontWeight: 600, color: colors.textPrimary }}>
                  {section.label}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                  {section.description}
                </Typography>
              </Box>
            </AccordionHeader>
            <AccordionDetails>
              {/* Nuage de points pour le Prix */}
              {section.type === 'scatter' && (
                <ChartCard>
                  <ChartTitle>
                    {section.label}
                    <InfoTooltip title={section.description}>
                      <InfoIcon sx={{ fontSize: 16, color: colors.textSecondary }} />
                    </InfoTooltip>
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={200}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                      <CartesianGrid stroke={colors.border} />
                      <XAxis 
                        type="number" 
                        dataKey="prix" 
                        name="Prix" 
                        label={{ value: 'Prix (€)', position: 'bottom', offset: 20 }}
                        tick={{ fill: colors.textSecondary }}
                        tickFormatter={(value) => `${value.toLocaleString('fr-FR')} €`}
                        domain={['auto', 'auto']}
                      />
                      {/* YAxis avec ticks vides */}
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        hide={true}
                        domain={[0, vehicles.length]}
                      />
                      <RechartsTooltip 
                        formatter={(value, name, props) => {
                          if (name === 'Prix') return `${value.toLocaleString('fr-FR')} €`;
                          return value;
                        }}
                        labelFormatter={(label) => ''}
                      />
                      {vehicles.map((v, i) => (
                        <Scatter 
                          key={i} 
                          name={`${v.brand} ${v.model}`} 
                          data={[section.data[i]]} 
                          fill={vehicleColors[i]}
                          shape="circle"
                          legendType="circle"
                        />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                  {/* Légende manuelle */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                    {vehicles.map((v, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FiberManualRecordIcon sx={{ color: vehicleColors[i], fontSize: 12 }} />
                        <Typography variant="caption">{v.brand} {v.model}</Typography>
                      </Box>
                    ))}
                  </Box>
                </ChartCard>
              )}

              {/* Radar */}
              {section.type === 'radar' && (
                <ChartCard>
                  <ChartTitle>
                    {section.label}
                    <InfoTooltip title={section.description}>
                      <InfoIcon sx={{ fontSize: 16, color: colors.textSecondary }} />
                    </InfoTooltip>
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart outerRadius={150} data={section.data}>
                      <PolarGrid stroke={colors.border} />
                      <PolarAngleAxis 
                        dataKey="name" 
                        tick={{ fill: colors.textSecondary, fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 10]} 
                        tick={{ fill: colors.textSecondary }}
                      />
                      {vehicles.map((v, i) => (
                        <Radar
                          key={i}
                          name={`${v.brand} ${v.model}`}
                          dataKey="value"
                          stroke={vehicleColors[i]}
                          fill={vehicleColors[i]}
                          fillOpacity={0.3}
                        />
                      ))}
                      <Legend />
                      <RechartsTooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}

              {/* Barres */}
              {section.type === 'bar' && (
                <ChartCard>
                  <ChartTitle>
                    {section.label}
                    <InfoTooltip title={section.description}>
                      <InfoIcon sx={{ fontSize: 16, color: colors.textSecondary }} />
                    </InfoTooltip>
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={section.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                      <XAxis dataKey="name" tick={{ fill: colors.textSecondary, fontSize: 12 }} />
                      <YAxis tick={{ fill: colors.textSecondary }} />
                      <RechartsTooltip />
                      <Bar dataKey="value" name={section.label}>
                        {section.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}

              {/* Tableau avec valeurs colorées selon la meilleure */}
              {section.type === 'table' && section.rows.length > 0 && (
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <StyledTable>
                    <TableHead>
                      <TableRow>
                        {section.columns.map((col, index) => (
                          <StyledTableHeadCell key={index}>
                            {col.label}
                          </StyledTableHeadCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {section.rows.map((row, rowIndex) => {
                        // Récupérer toutes les valeurs numériques de cette ligne
                        const values = vehicles.map(v => {
                          const val = row[v._id];
                          return !isNaN(parseFloat(val)) ? parseFloat(val) : null;
                        }).filter(v => v !== null);
                        
                        const bestValue = getBestValue(row.key || '', values);
                        
                        return (
                          <TableRow key={rowIndex}>
                            <StyledTableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                              {row.label} {row.unit ? `(${row.unit})` : ''}
                            </StyledTableCell>
                            {vehicles.map((v, colIndex) => {
                              const value = row[v._id];
                              const isBest = !isNaN(parseFloat(value)) && parseFloat(value) === bestValue;
                              
                              return (
                                <StyledTableCell key={colIndex}>
                                  <span style={{ 
                                    color: isBest ? vehicleColors[colIndex] : colors.textPrimary,
                                    fontWeight: isBest ? 600 : 400
                                  }}>
                                    {value}
                                  </span>
                                  {isBest && (
                                    <BestValue>Meilleur</BestValue>
                                  )}
                                </StyledTableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              )}

              {/* Équipements (liste par véhicule) */}
              {section.type === 'equipment' && (
                <Grid container spacing={3}>
                  {section.data.map((vehicle, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                      <Paper sx={{ p: 2, backgroundColor: colors.tertiary }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <FiberManualRecordIcon sx={{ color: vehicle.color, fontSize: 16 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {vehicle.name}
                          </Typography>
                        </Box>
                        <EquipmentList>
                          {vehicle.equipment.length > 0 ? (
                            vehicle.equipment.map((item, i) => (
                              <EquipmentListItem key={i}>
                                <ListItemIcon sx={{ minWidth: 30 }}>
                                  <CheckCircleIcon sx={{ color: colors.success, fontSize: 18 }} />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                              </EquipmentListItem>
                            ))
                          ) : (
                            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                              Aucun équipement notable
                            </Typography>
                          )}
                        </EquipmentList>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Fiabilité (notes avec étoiles) */}
              {section.type === 'reliability' && (
                <Grid container spacing={3}>
                  {section.data.map((vehicle, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                      <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: colors.tertiary }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                          <FiberManualRecordIcon sx={{ color: vehicle.color, fontSize: 16 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {vehicle.name}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} style={{ 
                              color: star <= Math.round(vehicle.rating) ? '#FFB800' : colors.border,
                              fontSize: '24px',
                              marginRight: '2px'
                            }}>
                              ★
                            </span>
                          ))}
                        </Box>
                        <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 700 }}>
                          {vehicle.rating}/5
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                          (Basé sur {vehicle.reviewCount} avis)
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </PageContainer>
  );
}

export default Comparison;