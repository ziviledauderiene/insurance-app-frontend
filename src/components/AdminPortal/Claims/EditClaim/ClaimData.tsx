import { Box, Typography } from '@mui/material';
import { capitalize } from 'helpers';
import { Claim } from 'interfaces';

interface ClaimDataProps {
  claim: Claim;
  rowsToDisplay?: number;
}

const ClaimData = ({ claim, rowsToDisplay }: ClaimDataProps): JSX.Element => {
  const claimDataToDisplay = claim && [
    { label: 'Consumer:', data: claim.consumer },
    { label: 'Phone Number:', data: '+999 000 000' }, // change later - phone number must come from DB. Consumer's phone number.
    {
      label: 'Date Of Service:',
      data: new Date(claim.date).toLocaleDateString(),
    },
    { label: 'Plan:', data: capitalize(claim.plan) },
    { label: 'Amount:', data: `${claim.amount} $` },
  ];

  return (
    <>
      {claimDataToDisplay.slice(0, rowsToDisplay).map((row) => (
        <Box sx={{ display: 'flex' }} key={row.label}>
          <Typography paragraph sx={{ width: '17%' }}>
            <b>{row.label}</b>
          </Typography>
          <Typography paragraph>{row.data}</Typography>
        </Box>
      ))}
    </>
  );
};

ClaimData.defaultProps = {
  rowsToDisplay: 5,
};

export default ClaimData;
