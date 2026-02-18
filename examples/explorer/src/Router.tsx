import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import { Center, Container, Flex, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';

const About = lazy(() => import('./views/about/About'));
const ChakraTheme = lazy(() => import('./views/theme/ChakraTheme'));
const Tokens = lazy(() => import('./views/tokens/Tokens'));
const Typography = lazy(() => import('./views/typography/Typography'));

const RouteLoading = () => (
  <Center py="16" minH="240px">
    <Stack align="center" gap="3">
      <Spinner size="lg" color="accent.primary" borderWidth="3px" />
      <Text color="fg.muted">Loading view...</Text>
    </Stack>
  </Center>
);

const DesktopNav = () => (
  <HStack gap="2" as="nav" aria-label="primary navigation">
    <HStack gap="4" minH="48px" display={{ base: 'none', md: 'flex' }} mr="4">
      <HStack
        minH="8"
        px="3"
        rounded="md"
        // focusRing="outside"
        asChild
        fontWeight="medium"
        textStyle="sm"
      >
        <NavLink to="/" style={({ isActive }) => isActive ? { color: 'accent.primary' } : {}}>Vision</NavLink>
      </HStack>
      <HStack
        minH="8"
        px="3"
        rounded="md"
        // focusRing="outside"
        asChild
        fontWeight="medium"
        textStyle="sm"
      >
        <NavLink to="/tokens" style={({ isActive }) => isActive ? { color: 'accent.primary' } : {}}>Tokens</NavLink>
      </HStack>
      <HStack
        minH="8"
        px="3"
        rounded="md"
        // focusRing="outside"
        asChild
        fontWeight="medium"
        textStyle="sm"
      >
        <NavLink to="/theme" style={({ isActive }) => isActive ? { color: 'accent.primary' } : {}}>Theme Chakra</NavLink>
      </HStack>
    </HStack>
    <ColorModeButton />
  </HStack>
);

const NavigationBar = () => {
  return (
    <Flex as="nav" py={8} justify="start" alignItems="baseline">
      <Heading as="h2" size="xl" mb={4} mr="8">k0ntxt Design System</Heading>
      <DesktopNav />
    </Flex>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Container>
        <NavigationBar />
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/theme" element={<ChakraTheme />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/fonts" element={<Typography />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
};

export default AppRouter;
