import { Box} from '@chakra-ui/react';
import backgroundImage from './bcg.jpg';

const BackgroundWrapper = ({ children }) => {
    return (
      <Box position="relative" minHeight="100vh">
        {/* Background image */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          filter="blur(8px)" // Adjust the blur value as desired
          zIndex={-1}
          backgroundBlendMode= "normal"
        />
  
        {/* Content */}
        {children}
      </Box>
    );
  };
  export default BackgroundWrapper;