// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const FormContainer = ({ children }) => {
  return (
    <Container maxWidth="xs">
      <div className=" flex flex-col gap-6 my-4">{children}</div>
    </Container>
  );
};

export default FormContainer;
