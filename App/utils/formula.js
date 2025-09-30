// Bioremediation formula utilities

export const calculateRateConstant = (k_ref, Q10, T, T_ref) => {
  return k_ref * Math.pow(Q10, (T - T_ref) / 10);
};

export const calculateBiomassGrowth = (X0, mu, t) => {
  return X0 * Math.exp(mu * t);
};

export const monodEquation = (q_max, S, Ks) => {
  return (q_max * S) / (Ks + S);
};
