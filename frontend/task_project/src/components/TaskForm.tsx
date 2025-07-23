import { TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';

type Props = {
  onAdd: (title: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (trimmed) {
      onAdd(trimmed);
      setTitle('');
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <TextField
        label="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        size="small"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!title.trim()}
      >
        Ajouter
      </Button>
    </Stack>
  );
}
