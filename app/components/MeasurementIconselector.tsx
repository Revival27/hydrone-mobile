import GeneralIcon from '../assets/images/icons/generalIcon.svg';
import SoilIcon from '../assets/images/icons/soilIcon.svg';
import VegetationIcon from '../assets/images/icons/vegetationIcon.svg';
import WaterIcon from '../assets/images/icons/waterIcon.svg';
import React from 'react';

enum SlugType {
  GENERAL = 'general',
  WATER = 'river_discharge',
  SOIL = 'soil_composition',
  VEGETATION = 'vegetation',
}

const MeasurementIconSelector = ({ measurement, height, width }) => {
  const getIcon = () => {
    switch (measurement?.measurement_type_slug) {
      case SlugType.GENERAL:
        return <GeneralIcon width={width} height={height} />;

      case SlugType.WATER:
        return <WaterIcon width={width} height={height} />;

      case SlugType.SOIL:
        return <SoilIcon width={width} height={height} />;

      case SlugType.VEGETATION:
        return <VegetationIcon width={width} height={height} />;

      default:
        return <GeneralIcon width={width} height={height} />;
    }
  };

  return <>{getIcon()}</>;
};

export default MeasurementIconSelector;
