import { Edit } from '@mui/icons-material';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import {
  BasicModal,
  ConfirmDialog,
  EditClaimForm,
  ClaimData,
} from 'components';
import { getClaim, updateClaim } from 'helpers';
import {
  AdminPages,
  Claim,
  ClaimStatus,
  DialogAction,
  Portals,
} from 'interfaces';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router';

const buttonStyles: {
  variant: 'contained';
  color: 'secondary';
  sx: {
    mx: string;
  };
} = {
  variant: 'contained',
  color: 'secondary',
  sx: {
    mx: '20px',
  },
};

const EditClaim = (): JSX.Element => {
  const [claim, setClaim] = useState<Claim>();
  const [dialogIsOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<DialogAction | undefined>(
    undefined
  );
  const { claimNumber } = useParams();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (claimNumber) {
      (async () => {
        try {
          const data = await getClaim(claimNumber);
          setClaim(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [claimNumber]);

  const approveHandler = () => {
    setDialogOpen(true);
    setDialogAction(DialogAction.approve);
  };
  const denyHandler = () => {
    setDialogOpen(true);
    setDialogAction(DialogAction.deny);
  };
  const confirmHandler = async () => {
    if (claim) {
      try {
        await updateClaim(claim.id, {
          status:
            dialogAction === DialogAction.approve
              ? ClaimStatus.approved
              : ClaimStatus.denied,
        });
        setDialogAction(undefined);
        setDialogOpen(false);
        navigate(`/${Portals.admin}/${AdminPages.claims}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const closeHandler = () => setDialogOpen(false);

  return (
    <Container>
      <Card elevation={0} variant="outlined" sx={{ p: '50px' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: '50px' }}
        >
          <Typography variant="h6">
            <b>Claim number:</b> {claimNumber}
          </Typography>
          {claim && (
            <BasicModal
              label={
                <>
                  Edit Claim <Edit sx={{ mx: '10px' }} />
                </>
              }
            >
              <EditClaimForm claim={claim} />
            </BasicModal>
          )}
        </Box>
        {claim ? (
          <>
            <ClaimData claim={claim} />
            <Box sx={{ float: 'right' }}>
              <Button {...buttonStyles} onClick={approveHandler}>
                Approve
              </Button>
              <Button {...buttonStyles} onClick={denyHandler}>
                Deny
              </Button>
              <ConfirmDialog
                action={dialogAction}
                dialogIsOpen={dialogIsOpen}
                handleConfirm={confirmHandler}
                handleDialogClose={closeHandler}
              />
            </Box>
          </>
        ) : (
          <Typography paragraph>No data to show.</Typography>
        )}
      </Card>
    </Container>
  );
};

export default EditClaim;
