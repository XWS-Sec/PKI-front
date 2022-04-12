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
    value: 3,
  },
  {
    name: "KeyAgreement",
    value: 4,
  },
  {
    name: "DataEncipherment",
    value: 5,
  },
  {
    name: "KeyEncipherment",
    value: 6,
  },
  {
    name: "NonRepudiation",
    value: 7,
  },
  {
    name: "DigitalSignature",
    value: 8,
  },
  {
    name: "DecipherOnly",
    value: 9,
  },
];

export default KeyUsageFlags;
