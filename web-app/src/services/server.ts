export const getCertificatesAsync = async () => {
  return fetch("/api/Certificates", { method: "GET", headers: {} });
};
export const downloadCertificateAsync = async (serialNumber: string) => {
  return fetch(`/api/Certificates/${serialNumber}`, {
    method: "GET",
    headers: {},
  });
};

export const revokeCertificateAsync = async (serialNumber: string) => {
  return fetch(`/api/Certificates/revoke/${serialNumber}`, {
    method: "PUT",
    headers: {},
  });
};
