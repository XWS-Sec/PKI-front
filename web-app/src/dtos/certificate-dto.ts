export default interface Certificate {
  serialNumber: string;
  signatureAlgorithm: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  subject: string;
  status: string;
  ownerName: string;
  ownerSurname: string;
  ownerRole: null;
}
