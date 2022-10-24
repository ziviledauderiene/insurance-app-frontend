import { Edit } from '@mui/icons-material';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import {
  BasicModal,
  ConfirmDialog,
  EditClaimForm,
  ClaimData,
  SnackBarNote,
} from 'components';
import { getClaim, updateClaim } from 'helpers';
import {
  AdminPages,
  AlertSeverity,
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
  const [snackIsOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string | undefined>();
  const [severity, setSeverity] = useState<AlertSeverity | undefined>();
  const [reload, setReload] = useState<boolean>(false);
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
  }, [claimNumber, reload]);

  const handleSnackClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const onSuccess = (message: string) => {
    setSnackMessage(message);
    setSeverity(AlertSeverity.success);
    setSnackOpen(true);
    setReload((prevState) => !prevState);
  };
  const onError = (message: string) => {
    setSnackMessage(message);
    setSeverity(AlertSeverity.error);
    setSnackOpen(true);
  };
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
              <EditClaimForm
                claim={claim}
                onSuccess={onSuccess}
                onError={onError}
              />
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
                label="Claim"
              />
              <SnackBarNote
                snackMessage={snackMessage}
                snackIsOpen={snackIsOpen}
                handleSnackClose={handleSnackClose}
                severity={severity}
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
