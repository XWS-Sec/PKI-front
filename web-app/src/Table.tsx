import React from "react";
import Certificate from "./dtos/certificate-dto";
import DownloadIcon from "./icons/DownloadIcon";
import PlusIcon from "./icons/PlusIcon";
import TrashIcon from "./icons/TrashIcon";

interface iTableProps {
  data: Certificate[];
  downloadCertificate: (serialNumber: string) => void;
  revokeCerfiticate: (serialNumber: string) => void;
}

const Table = (props: iTableProps) => {
  const data = props.data;

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-4 py-3">Serial number</th>
          <th className="px-4 py-3">Subject</th>
          <th className="px-4 py-3">Valid from</th>
          <th className="px-4 py-3">Valid until</th>
          <th className="px-4 py-3">Issuer</th>
          <th className="px-4 py-3">Owner</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3 text-green-600 cursor-pointer">
            <PlusIcon />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((certificate, index) => {
          return (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              <td className="px-4 py-4">{certificate.serialNumber}</td>
              <td className="px-4 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {certificate.subject}
              </td>
              <td className="px-4 py-4">{certificate.validFrom}</td>
              <td className="px-4 py-4">{certificate.validTo}</td>
              <td className="px-4 py-4">{certificate.issuer}</td>
              <td className="px-4 py-4">{certificate.ownerName}</td>
              <td className="px-4 py-4">{certificate.status}</td>
              <td className="px-4 py-4">
                <div
                  className="hover:text-green-600"
                  onClick={() => {
                    props.downloadCertificate(certificate.serialNumber);
                  }}
                >
                  <DownloadIcon />
                </div>
                <div
                  className="hover:text-red-600"
                  onClick={() => {
                    props.revokeCerfiticate(certificate.serialNumber);
                  }}
                >
                  <TrashIcon />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
