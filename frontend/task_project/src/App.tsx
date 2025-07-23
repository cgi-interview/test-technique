import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { fetchTasks, createTask, completeTask } from './features/task/taskSlice';

function App() {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(state => state.tasks);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: 'success' | 'error';
    open: boolean;
  }>({ message: '', severity: 'success', open: false });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const showMessage = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ message, severity, open: true });
  };

  const handleAdd = async (title: string) => {
    try {
      await dispatch(createTask(title)).unwrap();
      showMessage('Tâche ajoutée avec succès', 'success');
    } catch {
      showMessage("Erreur lors de l'ajout de la tâche", 'error');
    }
  };

  const handleComplete = async (id: number, completed: boolean) => {
    try {
      await dispatch(completeTask({ id, completed })).unwrap();
      showMessage('Tâche mise à jour', 'success');
    } catch {
      showMessage("Erreur lors de la mise à jour de la tâche", 'error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card elevation={3}>
        <CardHeader
          title="Mes tâches"
          titleTypographyProps={{ variant: 'h5' }}
        />
        <Divider />
        <CardContent>
          <TaskForm onAdd={handleAdd} />
          {loading ? (
            <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
          ) : error ? (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          ) : (
            <TaskList tasks={tasks} onComplete={handleComplete} />
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
