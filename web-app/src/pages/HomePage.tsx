import { useEffect, useState } from 'react';
import CreateCerfiticateModal from '../components/modals/CreateCertificate';
import Certificate from '../dtos/certificate-dto';
import { downloadCertificateAsync, getCertificatesAsync, revokeCertificateAsync } from '../services/server';
import Table from '../Table';
import { HttpStatusCode } from '../utils/http-status-code.enum';

const HomePage = () => {
	const [certificates, setCertificates] = useState<Certificate[]>([]);
	const [modalVisible, setModalVisible] = useState(false);

	const hideModal = (refresh: boolean | null = false) => {
		if (refresh) loadCertificates();
		setModalVisible(false);
	};
	const openModal = () => {
		setModalVisible(true);
	};

	useEffect(() => {
		loadCertificates();
	}, []);

	const loadCertificates = async () => {
		const resp = await getCertificatesAsync();
		if (resp.status == HttpStatusCode.OK) {
			const certificates = await resp.json();
			console.log(certificates);

			setCertificates(certificates);
		}
	};

	const revokeCerfiticate = async (serialNumber: string, reason: string) => {
		const resp = await revokeCertificateAsync(serialNumber, reason);
		if (resp.status == HttpStatusCode.OK) {
			loadCertificates();
		}
	};

	const downloadCertificate = async (serialNumber: string) => {
		window.location.href = `https://localhost:44321/api/Certificates/${serialNumber}`;
	};

	const certificatesList = certificates.filter((e) => e.status == 'Active').map((e) => e.serialNumber);

	return (
		<div>
			<Table data={certificates} revokeCerfiticate={revokeCerfiticate} downloadCertificate={downloadCertificate} openNewCertificate={openModal} />
			<CreateCerfiticateModal modalVisible={modalVisible} hideModal={hideModal} certificates={certificatesList} />
		</div>
	);
};

export default HomePage;
