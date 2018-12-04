
enum ResourceTypes {
  'Food' = 'Food',
  'Fuel' = 'Fuel',
  'Ingredient' = 'Ingredient',
  'Tool' = 'Tool',
  'Shelter' = 'Shelter',
  'BuildingMaterial' = 'BuildingMaterial'
}

enum ResourceNames {
  Food = 'Food',
  Wood = 'Wood',
  Fibre = 'Fibre',
  BasicTools = 'BasicTools'
}

enum ProductionTypes {
  Gather,
  Craft,
}

export { ResourceTypes, ProductionTypes, ResourceNames };
