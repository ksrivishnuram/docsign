import { useDrag, useDrop } from 'react-dnd';
import { Container, Typography, Box } from '@mui/material';

const SignaturePlacement = ({ onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'signature',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop }, drop] = useDrop({
    accept: 'signature',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      onDrop(offset);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Container maxWidth="md" className="text-center mt-12">
      <Box ref={drop} className="border border-dashed border-gray-300 p-6">
        <Typography variant="h6">Drop Signature Here</Typography>
        <Box ref={drag} className="p-2 bg-gray-300 inline-block mt-4">
          Signature Placeholder
        </Box>
      </Box>
    </Container>
  );
};

export default SignaturePlacement;
