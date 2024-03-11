enum SlugType {
  SOIL = 'soil_composition',
  WATER = 'river_discharge',
  GENERAL = 'general',
  VEGETATION = 'vegetation',
}

export const measurementTypeGetter = (slug_type: string | undefined) => {
  if (slug_type) {
    switch (slug_type) {
      case SlugType.SOIL:
        return 'Soil composition';

      case SlugType.WATER:
        return 'River discharge';

      case SlugType.VEGETATION:
        return 'Vegetation';

      case SlugType.GENERAL:
        return 'General';

      default:
        return 'General';
    }
  }
};
