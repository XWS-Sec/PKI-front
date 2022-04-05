const KeyUsageFlags = [
  {
    name: "EncipherOnly",
    value: 1,
  },
  {
    name: "CrlSign",
    value: 2,
  },
  {
    name: "KeyCertSign",
    value: 4,
  },
  {
    name: "KeyAgreement",
    value: 8,
  },
  {
    name: "DataEncipherment",
    value: 16,
  },
  {
    name: "KeyEncipherment",
    value: 32,
  },
  {
    name: "NonRepudiation",
    value: 64,
  },
  {
    name: "DigitalSignature",
    value: 128,
  },
  {
    name: "DecipherOnly",
    value: 32768,
  },
];

export default KeyUsageFlags;
