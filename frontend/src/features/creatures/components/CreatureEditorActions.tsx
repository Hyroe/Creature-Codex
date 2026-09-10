import { Box, Button, Stack } from '@mui/material';

interface CreatureEditorActionsProps {
  isSubmitting: boolean;
  disabled?: boolean;

  submitLabel: string;
  submittingLabel: string;

  onCancel: () => void;
}

export function CreatureEditorActions({
  isSubmitting,
  disabled = false,
  submitLabel,
  submittingLabel,
  onCancel,
}: CreatureEditorActionsProps) {
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 20,

        mt: 2,
        py: 2,
        px: 2.5,

        border: 1,
        borderColor: 'divider',
        borderRadius: 2,

        backgroundColor: 'rgba(20, 23, 20, 0.94)',

        backdropFilter: 'blur(14px)',

        boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.18)',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          type="button"
          color="inherit"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={disabled || isSubmitting}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </Stack>
    </Box>
  );
}
