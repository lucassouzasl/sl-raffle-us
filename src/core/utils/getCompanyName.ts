const getCompanyName = (empresa: string) => {
  const companyNames: { [key: string]: string } = {
    SLM: "SL - Mauá",
    JD: "SL - Jundiaí",
    SP: "Sementes Paraná",
    ND: "SL - Nordeste",
    JA: "Jovem Aprendiz",
    GR: "Gerentes",
  };
  return companyNames[empresa] || "";
};

export { getCompanyName };
