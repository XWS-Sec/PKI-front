import { useEffect, useState } from "react";
import CreateCerfiticateModal from "../components/modals/CreateCertificate";
import Certificate from "../dtos/certificate-dto";
import {
  downloadCertificateAsync,
  getCertificatesAsync,
} from "../services/server";
import Table from "../Table";
import { HttpStatusCode } from "../utils/http-status-code.enum";

const HomePage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    const resp = await getCertificatesAsync();
    if (resp.status == HttpStatusCode.OK) {
      const certificates = await resp.json();
      setCertificates(certificates);
    }
  };

  const revokeCerfiticate = async (serialNumber: string) => {};

  const downloadCertificate = async (serialNumber: string) => {
    window.location.href = `https://localhost:44321/api/Certificates/${serialNumber}`;
  };

  return (
    <div>
      <Table
        data={certificates}
        revokeCerfiticate={revokeCerfiticate}
        downloadCertificate={downloadCertificate}
      />
    </div>
  );
};

export default HomePage;
