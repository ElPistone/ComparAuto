// frontend/src/pages/Catalogue/Catalogue.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Pagination,
  FormControlLabel,
  Checkbox,
  Drawer,
  Badge,
  Fab,
  Paper,
  Divider,
  useMediaQuery,
  Alert,
  Snackbar
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ClearIcon from '@mui/icons-material/Clear';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { colors } from '../../utils/colors';

// ========== COMPOSANTS STYLISÉS ==========

const PageContainer = styled(Container)({
  paddingTop: '32px',
  paddingBottom: '64px'
});

const FilterSidebar = styled(Paper)({
  padding: '20px',
  borderRadius: '12px',
  boxShadow: `0 2px 8px ${colors.shadow}`,
  backgroundColor: colors.cardBg,
  position: 'sticky',
  top: '88px',
  maxHeight: 'calc(100vh - 120px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: colors.border
  },
  '&::-webkit-scrollbar-thumb': {
    background: colors.primary,
    borderRadius: '4px'
  }
});

const FilterTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: colors.textPrimary,
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const FilterSection = styled(Box)({
  marginBottom: '20px',
  borderBottom: `1px solid ${colors.border}`,
  paddingBottom: '16px',
  '&:last-child': {
    borderBottom: 'none',
    marginBottom: 0,
    paddingBottom: 0
  }
});

const FilterLabel = styled(Typography)({
  fontSize: '13px',
  fontWeight: 600,
  color: colors.textSecondary,
  marginBottom: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
});

const PriceSlider = styled(Slider)({
  color: colors.primary,
  height: 4,
  '& .MuiSlider-thumb': {
    width: 14,
    height: 14,
    backgroundColor: colors.cardBg,
    border: `2px solid ${colors.primary}`,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${colors.primary}20`
    }
  },
  '& .MuiSlider-rail': {
    color: colors.border
  }
});

const BrandCheckbox = styled(FormControlLabel)({
  marginLeft: 0,
  marginRight: 0,
  width: '100%',
  '& .MuiCheckbox-root': {
    padding: '2px 8px'
  },
  '& .MuiTypography-root': {
    fontSize: '13px',
    color: colors.textSecondary
  }
});

const ActiveFilterChip = styled(Chip)({
  backgroundColor: colors.tertiary,
  color: colors.primary,
  borderColor: colors.primary,
  margin: '2px',
  height: '24px',
  '& .MuiChip-deleteIcon': {
    color: colors.primary,
    fontSize: '16px'
  }
});

const VehicleCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  boxShadow: `0 2px 8px ${colors.shadow}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 24px ${colors.shadow}`
  }
});

const CardBadge = styled(Box)({
  position: 'absolute',
  top: 8,
  left: 8,
  zIndex: 1
});

const PriceTag = styled(Typography)({
  fontSize: '18px',
  fontWeight: 700,
  color: colors.primary
});

const ResultsHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: `1px solid ${colors.border}`
});

const CompareFab = styled(Fab)({
  position: 'fixed',
  bottom: 24,
  right: 24,
  backgroundColor: colors.primary,
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: colors.secondary
  },
  zIndex: 1000,
  width: '120px',
  height: '48px',
  borderRadius: '24px'
});

const SelectionDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 300,
    padding: 20,
    backgroundColor: colors.cardBg
  }
});

const SelectedVehicleChip = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  backgroundColor: colors.tertiary,
  borderRadius: '8px',
  marginBottom: '8px'
});

const MobileFilterButton = styled(Button)({
  width: '100%',
  marginBottom: '16px',
  borderColor: colors.border,
  color: colors.textSecondary,
  '&:hover': {
    borderColor: colors.primary,
    color: colors.primary,
    backgroundColor: colors.tertiary
  }
});

// ========== COMPOSANT PRINCIPAL ==========

function Catalogue() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // États
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // États des filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [yearRange, setYearRange] = useState([2000, 2026]);
  const [selectedMotorizations, setSelectedMotorizations] = useState([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
  const [sortBy, setSortBy] = useState('price-asc');
  
  // États pour la sélection de comparaison
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  // États pour les filtres avancés (mobile)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Récupération des données
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/vehicles');
      setVehicles(response.data);
      setFilteredVehicles(response.data);
      
      if (response.data.length > 0) {
        const prices = response.data.map(v => v.price);
        const years = response.data.map(v => v.year);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
        setYearRange([Math.min(...years), Math.max(...years)]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setSnackbar({
        open: true,
        message: 'Erreur lors du chargement des véhicules',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrage
  useEffect(() => {
    let filtered = [...vehicles];

    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(v => selectedBrands.includes(v.brand));
    }

    filtered = filtered.filter(v => 
      v.price >= priceRange[0] && v.price <= priceRange[1]
    );

    filtered = filtered.filter(v => 
      v.year >= yearRange[0] && v.year <= yearRange[1]
    );

    if (selectedMotorizations.length > 0) {
      filtered = filtered.filter(v => 
        v.general?.motorization && selectedMotorizations.includes(v.general.motorization)
      );
    }

    if (selectedBodyTypes.length > 0) {
      filtered = filtered.filter(v => 
        v.general?.bodyType && selectedBodyTypes.includes(v.general.bodyType)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'power-desc':
        filtered.sort((a, b) => b.performance.power - a.performance.power);
        break;
      default:
        break;
    }

    setFilteredVehicles(filtered);
    setPage(1);
  }, [vehicles, searchTerm, selectedBrands, priceRange, yearRange, selectedMotorizations, selectedBodyTypes, sortBy]);

  const toggleVehicleSelection = (vehicle) => {
    const isSelected = selectedVehicles.some(v => v._id === vehicle._id);
    
    if (isSelected) {
      setSelectedVehicles(selectedVehicles.filter(v => v._id !== vehicle._id));
      setSnackbar({
        open: true,
        message: `${vehicle.brand} ${vehicle.model} retiré de la comparaison`,
        severity: 'info'
      });
    } else {
      if (selectedVehicles.length >= 4) {
        setSnackbar({
          open: true,
          message: 'Vous ne pouvez comparer que 4 véhicules maximum',
          severity: 'warning'
        });
        return;
      }
      setSelectedVehicles([...selectedVehicles, vehicle]);
      setSnackbar({
        open: true,
        message: `${vehicle.brand} ${vehicle.model} ajouté à la comparaison`,
        severity: 'success'
      });
    }
  };

  const removeFromSelection = (vehicleId) => {
    setSelectedVehicles(selectedVehicles.filter(v => v._id !== vehicleId));
  };

  const clearSelection = () => {
    setSelectedVehicles([]);
    setDrawerOpen(false);
  };

  const startComparison = () => {
    if (selectedVehicles.length < 2) {
      setSnackbar({
        open: true,
        message: 'Sélectionnez au moins 2 véhicules pour comparer',
        severity: 'warning'
      });
      return;
    }
    const ids = selectedVehicles.map(v => v._id).join(',');
    navigate(`/comparison?ids=${ids}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedMotorizations([]);
    setSelectedBodyTypes([]);
    setSortBy('price-asc');
    if (vehicles.length > 0) {
      const prices = vehicles.map(v => v.price);
      const years = vehicles.map(v => v.year);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
      setYearRange([Math.min(...years), Math.max(...years)]);
    }
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleMotorizationChange = (motorization) => {
    setSelectedMotorizations(prev =>
      prev.includes(motorization)
        ? prev.filter(m => m !== motorization)
        : [...prev, motorization]
    );
  };

  const handleBodyTypeChange = (bodyType) => {
    setSelectedBodyTypes(prev =>
      prev.includes(bodyType)
        ? prev.filter(b => b !== bodyType)
        : [...prev, bodyType]
    );
  };

  const brandCounts = vehicles.reduce((acc, v) => {
    acc[v.brand] = (acc[v.brand] || 0) + 1;
    return acc;
  }, {});
  
  const uniqueBrands = Object.keys(brandCounts).sort();
  
  const motorizationCounts = vehicles.reduce((acc, v) => {
    const m = v.general?.motorization;
    if (m) {
      acc[m] = (acc[m] || 0) + 1;
    }
    return acc;
  }, {});
  
  const motorizations = Object.keys(motorizationCounts).sort();
  
  const bodyTypeCounts = vehicles.reduce((acc, v) => {
    const b = v.general?.bodyType;
    if (b) {
      acc[b] = (acc[b] || 0) + 1;
    }
    return acc;
  }, {});
  
  const bodyTypes = Object.keys(bodyTypeCounts).sort();

  const paginatedVehicles = filteredVehicles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const pageCount = Math.ceil(filteredVehicles.length / itemsPerPage);

  const selectionColors = ['#2F80ED', '#FFA726', '#9B51E0', '#FFEB3B'];

  const hasActiveFilters = searchTerm || selectedBrands.length > 0 || 
    selectedMotorizations.length > 0 || selectedBodyTypes.length > 0;

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Chargement des véhicules...</Typography>
      </Container>
    );
  }

  return (
    <>
      <PageContainer maxWidth="xl">
        {/* Titre de la page */}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Catalogue des véhicules
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 3 }}>
          {filteredVehicles.length} véhicules disponibles • Sélectionnez jusqu'à 4 modèles à comparer
        </Typography>

        {isMobile && (
          <MobileFilterButton
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterDrawerOpen(true)}
          >
            Afficher les filtres
          </MobileFilterButton>
        )}

        {/* Disposition principale avec filtres à gauche et catalogue à droite */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* Sidebar des filtres - à gauche */}
          {!isMobile && (
            <Box sx={{ flex: '0 0 320px', minWidth: '280px' }}>
              <FilterSidebar>
                <FilterTitle>
                  <FilterListIcon sx={{ color: colors.primary, fontSize: 20 }} />
                  Filtres
                  {hasActiveFilters && (
                    <Chip 
                      label="Actifs" 
                      size="small" 
                      sx={{ 
                        backgroundColor: colors.primary,
                        color: '#FFFFFF',
                        fontSize: '11px',
                        height: '20px'
                      }} 
                    />
                  )}
                </FilterTitle>

                {/* Barre de recherche */}
                <FilterSection>
                  <FilterLabel>Recherche</FilterLabel>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Marque, modèle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.textSecondary, fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: colors.background,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.border
                        }
                      }
                    }}
                  />
                </FilterSection>

                {/* Tri */}
                <FilterSection>
                  <FilterLabel>Trier par</FilterLabel>
                  <FormControl fullWidth size="small">
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      sx={{ backgroundColor: colors.background, fontSize: '13px' }}
                    >
                      <MenuItem value="price-asc" sx={{ fontSize: '13px' }}>Prix croissant</MenuItem>
                      <MenuItem value="price-desc" sx={{ fontSize: '13px' }}>Prix décroissant</MenuItem>
                      <MenuItem value="year-desc" sx={{ fontSize: '13px' }}>Année (récent)</MenuItem>
                      <MenuItem value="year-asc" sx={{ fontSize: '13px' }}>Année (ancien)</MenuItem>
                      <MenuItem value="power-desc" sx={{ fontSize: '13px' }}>Puissance</MenuItem>
                    </Select>
                  </FormControl>
                </FilterSection>

                {/* Filtre prix */}
                <FilterSection>
                  <FilterLabel>Prix</FilterLabel>
                  <PriceSlider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={Math.min(...vehicles.map(v => v.price))}
                    max={Math.max(...vehicles.map(v => v.price))}
                    step={1000}
                    valueLabelFormat={(value) => `${value.toLocaleString('fr-FR')} €`}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '11px' }}>
                      {priceRange[0].toLocaleString('fr-FR')} €
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '11px' }}>
                      {priceRange[1].toLocaleString('fr-FR')} €
                    </Typography>
                  </Box>
                </FilterSection>

                {/* Filtre année */}
                <FilterSection>
                  <FilterLabel>Année</FilterLabel>
                  <PriceSlider
                    value={yearRange}
                    onChange={(e, newValue) => setYearRange(newValue)}
                    valueLabelDisplay="auto"
                    min={2000}
                    max={2026}
                    step={1}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '11px' }}>
                      {yearRange[0]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '11px' }}>
                      {yearRange[1]}
                    </Typography>
                  </Box>
                </FilterSection>

                {/* Filtre marques */}
                <FilterSection>
                  <FilterLabel>Marques</FilterLabel>
                  <Box sx={{ maxHeight: '150px', overflowY: 'auto', pr: 1 }}>
                    {uniqueBrands.map(brand => (
                      <BrandCheckbox
                        key={brand}
                        control={
                          <Checkbox
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            size="small"
                            sx={{
                              color: colors.border,
                              '&.Mui-checked': {
                                color: colors.primary
                              }
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span style={{ fontSize: '13px' }}>{brand}</span>
                            <span style={{ color: colors.textSecondary, fontSize: '11px' }}>
                              ({brandCounts[brand]})
                            </span>
                          </Box>
                        }
                      />
                    ))}
                  </Box>
                </FilterSection>

                {/* Filtre motorisation */}
                {motorizations.length > 0 && (
                  <FilterSection>
                    <FilterLabel>Motorisation</FilterLabel>
                    {motorizations.map(motor => (
                      <BrandCheckbox
                        key={motor}
                        control={
                          <Checkbox
                            checked={selectedMotorizations.includes(motor)}
                            onChange={() => handleMotorizationChange(motor)}
                            size="small"
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span style={{ fontSize: '13px' }}>{motor}</span>
                            <span style={{ color: colors.textSecondary, fontSize: '11px' }}>
                              ({motorizationCounts[motor]})
                            </span>
                          </Box>
                        }
                      />
                    ))}
                  </FilterSection>
                )}

                {/* Filtre carrosserie */}
                {bodyTypes.length > 0 && (
                  <FilterSection>
                    <FilterLabel>Carrosserie</FilterLabel>
                    {bodyTypes.map(body => (
                      <BrandCheckbox
                        key={body}
                        control={
                          <Checkbox
                            checked={selectedBodyTypes.includes(body)}
                            onChange={() => handleBodyTypeChange(body)}
                            size="small"
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span style={{ fontSize: '13px' }}>{body}</span>
                            <span style={{ color: colors.textSecondary, fontSize: '11px' }}>
                              ({bodyTypeCounts[body]})
                            </span>
                          </Box>
                        }
                      />
                    ))}
                  </FilterSection>
                )}

                {/* Bouton réinitialiser */}
                {hasActiveFilters && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={resetFilters}
                    size="small"
                    sx={{ mt: 1, fontSize: '13px' }}
                  >
                    Réinitialiser
                  </Button>
                )}
              </FilterSidebar>
            </Box>
          )}

          {/* Catalogue de voitures - à droite */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Filtres actifs */}
            {hasActiveFilters && (
              <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {searchTerm && (
                  <ActiveFilterChip
                    label={`"${searchTerm}"`}
                    onDelete={() => setSearchTerm('')}
                    size="small"
                  />
                )}
                {selectedBrands.map(brand => (
                  <ActiveFilterChip
                    key={brand}
                    label={brand}
                    onDelete={() => handleBrandChange(brand)}
                    size="small"
                  />
                ))}
                {selectedMotorizations.map(motor => (
                  <ActiveFilterChip
                    key={motor}
                    label={motor}
                    onDelete={() => handleMotorizationChange(motor)}
                    size="small"
                  />
                ))}
                {selectedBodyTypes.map(body => (
                  <ActiveFilterChip
                    key={body}
                    label={body}
                    onDelete={() => handleBodyTypeChange(body)}
                    size="small"
                  />
                ))}
              </Box>
            )}

            {/* En-tête des résultats */}
            <ResultsHeader>
              <Typography variant="body2" sx={{ color: colors.textSecondary, fontSize: '13px' }}>
                {filteredVehicles.length} résultat{filteredVehicles.length > 1 ? 's' : ''}
              </Typography>
              {!isMobile && (
                <Typography variant="body2" sx={{ color: colors.textSecondary, fontSize: '13px' }}>
                  {selectedVehicles.length}/4 sélectionné{selectedVehicles.length > 1 ? 's' : ''}
                </Typography>
              )}
            </ResultsHeader>

            {/* Grille de véhicules */}
            {filteredVehicles.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <DirectionsCarIcon sx={{ fontSize: 48, color: colors.border, mb: 2 }} />
                <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 2 }}>
                  Aucun véhicule trouvé
                </Typography>
                <Button variant="outlined" size="small" onClick={resetFilters}>
                  Réinitialiser
                </Button>
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {paginatedVehicles.map((vehicle) => {
                    const isSelected = selectedVehicles.some(v => v._id === vehicle._id);
                    const selectionIndex = selectedVehicles.findIndex(v => v._id === vehicle._id);
                    
                    return (
                      <Grid size= {{xs:12, sm:6, lg:4}} key={vehicle._id}>
                        <VehicleCard>
                          {isSelected && (
                            <CardBadge>
                              <Chip
                                label={selectionIndex + 1}
                                size="small"
                                sx={{ backgroundColor: selectionColors[selectionIndex], color: '#FFFFFF', fontWeight: 600, width: 24, height: 24 }}
                              />
                            </CardBadge>
                          )}

                          <CardMedia component="img" height="140" image={vehicle.imageUrl || 'https://via.placeholder.com/400x200?text=Voiture'} alt={`${vehicle.brand} ${vehicle.model}`} sx={{ objectFit: 'cover' }}/>
                          <CardContent sx={{ p: 1.5, pb: 0 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '15px' }}>
                              {vehicle.brand} {vehicle.model}
                            </Typography>

                            <PriceTag>
                              {vehicle.price.toLocaleString('fr-FR')} €
                            </PriceTag>

                            <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
                              <Grid size = {{xs: 6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <CalendarTodayIcon sx={{ fontSize: 12, color: colors.textSecondary }} />
                                  <Typography variant="caption">{vehicle.year}</Typography>
                                </Box>
                              </Grid>
                              <Grid size = {{xs: 6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <SpeedIcon sx={{ fontSize: 12, color: colors.textSecondary }} />
                                  <Typography variant="caption">{vehicle.performance?.power} ch</Typography>
                                </Box>
                              </Grid>
                              <Grid size = {{xs: 6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocalGasStationIcon sx={{ fontSize: 12, color: colors.textSecondary }} />
                                  <Typography variant="caption">
                                    {vehicle.general?.motorization?.substring(0, 6)}...
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid size = {{xs: 6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <AttachMoneyIcon sx={{ fontSize: 12, color: colors.textSecondary }} />
                                  <Typography variant="caption">
                                    {vehicle.economic?.consumption} L
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>

                          <CardActions sx={{ p: 1.5 }}>
                            <Button
                              fullWidth
                              variant={isSelected ? "contained" : "outlined"}
                              color={isSelected ? "success" : "primary"}
                              onClick={() => toggleVehicleSelection(vehicle)}
                              startIcon={<CompareArrowsIcon />}
                              size="small"
                              sx={{ fontSize: '12px' }}
                            >
                              {isSelected ? 'Sélectionné' : 'Comparer'}
                            </Button>
                          </CardActions>
                        </VehicleCard>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Pagination */}
                {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 2 }}>
                    <IconButton 
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    sx={{ 
                        color: colors.primary,
                        '&.Mui-disabled': { color: colors.border }
                    }}
                    >
                    <span style={{ fontSize: '20px' }}>←</span>
                    </IconButton>
                    
                    <Typography sx={{ color: colors.textSecondary }}>
                    Page {page} sur {pageCount}
                    </Typography>
                    
                    <IconButton 
                    onClick={() => setPage(Math.min(pageCount, page + 1))}
                    disabled={page === pageCount}
                    sx={{ 
                        color: colors.primary,
                        '&.Mui-disabled': { color: colors.border }
                    }}
                    >
                    <span style={{ fontSize: '20px' }}>→</span>
                    </IconButton>
                </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </PageContainer>

      {/* FAB pour la comparaison */}
      {selectedVehicles.length > 0 && (
        <CompareFab
          variant="extended"
          onClick={() => setDrawerOpen(true)}
        >
          <Badge badgeContent={selectedVehicles.length} color="error" sx={{ mr: 1 }}>
            <CompareArrowsIcon sx={{ fontSize: 20 }} />
          </Badge>
          Comparer
        </CompareFab>
      )}

      {/* Drawer de sélection */}
      <SelectionDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Comparaison ({selectedVehicles.length}/4)
          </Typography>
          <IconButton size="small" onClick={() => setDrawerOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {selectedVehicles.map((vehicle, index) => (
          <SelectedVehicleChip key={vehicle._id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 3,
                  height: 36,
                  backgroundColor: selectionColors[index],
                  borderRadius: 2
                }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px' }}>
                  {vehicle.brand} {vehicle.model}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '11px' }}>
                  {vehicle.price.toLocaleString('fr-FR')} €
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => removeFromSelection(vehicle._id)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </SelectedVehicleChip>
        ))}

        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={startComparison}
            disabled={selectedVehicles.length < 2}
            size="small"
            sx={{ mb: 1, fontSize: '13px' }}
          >
            Comparer
          </Button>
          <Button fullWidth variant="outlined" onClick={clearSelection} size="small" sx={{ fontSize: '13px' }}>
            Effacer
          </Button>
        </Box>
      </SelectionDrawer>

      {/* Drawer de filtres pour mobile */}
      <Drawer
        anchor="bottom"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{ sx: { maxHeight: '70vh', p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1">Filtres</Typography>
          <IconButton size="small" onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5 }}>Tri</Typography>
        <Select
          fullWidth
          size="small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ mb: 2, fontSize: '13px' }}
        >
          <MenuItem value="price-asc" sx={{ fontSize: '13px' }}>Prix croissant</MenuItem>
          <MenuItem value="price-desc" sx={{ fontSize: '13px' }}>Prix décroissant</MenuItem>
          <MenuItem value="year-desc" sx={{ fontSize: '13px' }}>Année (récent)</MenuItem>
        </Select>

        <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5 }}>Motorisation</Typography>
        <Select
          fullWidth
          size="small"
          value={selectedMotorizations}
          multiple
          onChange={(e) => setSelectedMotorizations(e.target.value)}
          renderValue={(selected) => selected.join(', ')}
          sx={{ mb: 2, fontSize: '13px' }}
        >
          {motorizations.map(m => (
            <MenuItem key={m} value={m} sx={{ fontSize: '13px' }}>{m}</MenuItem>
          ))}
        </Select>

        <Button
          fullWidth
          variant="outlined"
          onClick={resetFilters}
          size="small"
          sx={{ mt: 1, fontSize: '13px' }}
        >
          Réinitialiser
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => setFilterDrawerOpen(false)}
          size="small"
          sx={{ mt: 1, fontSize: '13px' }}
        >
          Appliquer
        </Button>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ fontSize: '13px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Catalogue;