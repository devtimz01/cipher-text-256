import sodium from "libsodium-wrappers";

export const getLocalKeyBundle = () => {
  const identityPrivate = localStorage.getItem('identityPrivateKey');
  const signedPreKeyPrivate = localStorage.getItem('signedPreKeyPrivate');
  const signedPreKeySignature = localStorage.getItem('signedPreKeySignature');
  const oneTimePrivateKeys = localStorage.getItem('oneTimePrivateKeys');

  console.log({
    identityPrivate: !!identityPrivate,
    signedPreKeyPrivate: !!signedPreKeyPrivate,
    signedPreKeySignature: !!signedPreKeySignature,
    oneTimePrivateKeys: !!oneTimePrivateKeys
  });
  if (!identityPrivate || !signedPreKeyPrivate || !signedPreKeySignature || !oneTimePrivateKeys) {
    throw new Error('Missing keys in localStorage');
  }

  return {
    identityPrivate: sodium.from_base64(identityPrivate),
    signedPreKeyPrivate: sodium.from_base64(signedPreKeyPrivate),
    signedPreKeySignature: sodium.from_base64(signedPreKeySignature),
    oneTimePrivateKeys: JSON.parse(oneTimePrivateKeys).map((k: string) => sodium.from_base64(k))
  };
};