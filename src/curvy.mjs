export const A = function A(t) {
  return (1 - t) ** 3;
};

export const B = function B(t) {
  return 3.0 * t * (1 - t) ** 2.0;
};

export const C = function C(t) {
  return 3.0 * (t ** 2.0) * (1 - t);
};

export const D = function D(t) {
  return t ** 3;
};

export const g = function g(s, c_1, c_2, e, t) {
  return s * A(t) + c_1 * B(t) + c_2 * C(t) + e * D(t);
};

const E = function E(s, e, g, t) {
  return (g - s * A(t) - e * D(t)) / B(t);
};

const F = function F(s, e, g_2, t_1, t_2) {
  return (C(t_1) * (g_2 - s * A(t_2) - e * D(t_2))) / (B(t_1) * C(t_2));
};

export const findC1 = function findC1(s, e, g_1, g_2, t_1, t_2) {
  const e_for_c = E(s, e, g_1, t_1);
  const f_for_c = F(s, e, g_2, t_1, t_2);

  return ((e_for_c - f_for_c) * B(t_1) * C(t_2)) / (B(t_1) * C(t_2) - B(t_2) * C(t_1));
};

export const findC2 = function findC2(s, e, g, t, c_1) {
  return (g - s * A(t) - c_1 * B(t) - e * D(t)) / C(t);
};