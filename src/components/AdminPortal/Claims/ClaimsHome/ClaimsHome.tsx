import { Box, Pagination } from '@mui/material';
import { ClaimSearch, ClaimsTable } from 'components';
import { getClaims } from 'helpers/api';
import { Claim, FormValues } from 'interfaces';
import { useEffect, useState } from 'react';

const ClaimsHome = (): JSX.Element => {
  const [claimsList, setClaimsList] = useState<Claim[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [claimsCount, setClaimsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchValues, setSearchValues] = useState<FormValues | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (searchValues) {
          setCurrentPage(1);
        }
        const searchQuery =
          searchValues && searchValues.status === 'All Claims'
            ? { ...searchValues, status: '' }
            : searchValues;
        const { claims, count } = await getClaims(searchQuery, currentPage);
        setClaimsList(claims);
        setClaimsCount(count);
      } catch (err) {
        setError(`Could not fetch claims. Error: ${err}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchValues, currentPage]);

  useEffect(() => {
    setTotalPages(claimsCount === 0 ? 1 : Math.ceil(claimsCount / 10));
  }, [claimsCount]);

  const pageChangeHandler = (page: number) => setCurrentPage(page);

  return (
    <>
      <ClaimSearch setSearchValues={setSearchValues} />
      <ClaimsTable claimList={claimsList} loading={loading} error={error} />
      <Box sx={{ my: '30px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_event, page) => pageChangeHandler(page)}
        />
      </Box>
    </>
  );
};

export default ClaimsHome;
