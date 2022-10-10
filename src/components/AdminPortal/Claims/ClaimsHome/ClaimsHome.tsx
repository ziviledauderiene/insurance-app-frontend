import { ClaimSearch, ClaimsTable } from 'components';
import { getClaims } from 'helpers/api';
import { Claim } from 'interfaces';
import { useEffect, useState } from 'react';

const ClaimsHome = (): JSX.Element => {
  const [claimsList, setClaimsList] = useState<Claim[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const claims = await getClaims();
        setClaimsList(claims);
      } catch (err) {
        setError(`Could not fetch claims. Error: ${err}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <ClaimSearch
        setClaimsList={setClaimsList}
        setLoading={setLoading}
        setError={setError} />
      <ClaimsTable claimList={claimsList} loading={loading} error={error} />
    </>
  );
};

export default ClaimsHome;
