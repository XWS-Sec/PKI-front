export const getCertificatesAsync = async () => {
  return fetch("/api/Certificates", { method: "GET", headers: {} });
};
