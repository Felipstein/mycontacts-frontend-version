class CategoryMapper {
  toDomain(persistenceData) {
    return {
      id: persistenceData.id,
      name: persistenceData.name,
    };
  }
}

export default new CategoryMapper();
