export default interface CreateCertificate {
  issuerSerialNumber?: string;
  subject: string;
  validFrom: string;
  validTo: string;
  userOwner: string;
  keyUsageFlagsCommaSeparated: string;
}
