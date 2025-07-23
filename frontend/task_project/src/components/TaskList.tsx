import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Typography, Paper } from '@mui/material';
import type { Task } from '../types/Task';

type Props = {
  tasks: Task[];
  onComplete: (id: number, completed: boolean) => void;
};

export default function TaskList({ tasks, onComplete }: Props) {
  if (tasks.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Aucune tâche pour le moment.
      </Typography>
    );
  }

  return (
    <Paper variant="outlined">
      <List disablePadding>
        {tasks.map((task) => (
          <ListItem key={task.id} divider disablePadding>
            <ListItemButton
              onClick={() => onComplete(task.id, !task.completed)}
              dense
              sx={{ pl: 2 }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={task.title}
                primaryTypographyProps={{
                  sx: {
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.disabled' : 'text.primary',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
