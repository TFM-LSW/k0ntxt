import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  Circle,
  Field,
  Flex,
  Float,
  Heading,
  HStack,
  Input,
  InputGroup,
  Link,
  Menu,
  NativeSelect,
  Portal,
  Separator,
  SimpleGrid,
  Stack,
  Switch,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { memo, useMemo, useState } from 'react';
import { LuFolder, LuSearch, LuSquareCheck, LuUser } from 'react-icons/lu';
import DemoDrawer from './components/Drawer';

type CatalogPalette =
  | 'accent.primary'
  | 'accent.secondary'
  | 'status.positive'
  | 'status.negative'
  | 'status.caution'
  | 'status.info'
  | 'brand.charcoal'
  | 'brand.blue'
  | 'brand.purple'
  | 'brand.green'
  | 'brand.yellow'
  | 'brand.pink'
  | 'brand.neutral';

type StatusTone = 'positive' | 'negative' | 'caution' | 'info';
type AlertStatus = 'success' | 'error' | 'warning' | 'info';

const paletteGroups: Array<{
  label: string;
  options: Array<{ value: CatalogPalette; label: string }>;
}> = [
  {
    label: 'Accent',
    options: [
      { value: 'accent.primary', label: 'accent.primary' },
      { value: 'accent.secondary', label: 'accent.secondary' },
    ],
  },
  {
    label: 'Status',
    options: [
      { value: 'status.positive', label: 'status.positive' },
      { value: 'status.negative', label: 'status.negative' },
      { value: 'status.caution', label: 'status.caution' },
      { value: 'status.info', label: 'status.info' },
    ],
  },
  {
    label: 'Brand',
    options: [
      { value: 'brand.charcoal', label: 'brand.charcoal' },
      { value: 'brand.blue', label: 'brand.blue' },
      { value: 'brand.purple', label: 'brand.purple' },
      { value: 'brand.green', label: 'brand.green' },
      { value: 'brand.yellow', label: 'brand.yellow' },
      { value: 'brand.pink', label: 'brand.pink' },
      { value: 'brand.neutral', label: 'brand.neutral' },
    ],
  },
];

const statusOptions: Array<{
  value: StatusTone;
  label: string;
  description: string;
  palette: CatalogPalette;
  alertStatus: AlertStatus;
}> = [
  {
    value: 'positive',
    label: 'Positive',
    description: 'Used for successful actions and confirmation messaging.',
    palette: 'status.positive',
    alertStatus: 'success',
  },
  {
    value: 'negative',
    label: 'Negative',
    description: 'Used for destructive actions and blocking error states.',
    palette: 'status.negative',
    alertStatus: 'error',
  },
  {
    value: 'caution',
    label: 'Caution',
    description: 'Used for warnings that need attention but are not blocking.',
    palette: 'status.caution',
    alertStatus: 'warning',
  },
  {
    value: 'info',
    label: 'Info',
    description: 'Used for neutral notices and informational guidance.',
    palette: 'status.info',
    alertStatus: 'info',
  },
];

const buttonVariants = ['solid', 'surface', 'subtle', 'outline', 'ghost', 'plain'] as const;

const ChakraDemo = () => {
  const [selectedPalette, setSelectedPalette] = useState<CatalogPalette>('accent.primary');
  const [selectedStatus, setSelectedStatus] = useState<StatusTone>('positive');

  const activeStatus = useMemo(
    () => statusOptions.find((status) => status.value === selectedStatus) ?? statusOptions[0],
    [selectedStatus],
  );

  return (
    <Flex direction={{ base: 'column', xl: 'row' }} align="start" gap={{ base: '6', xl: '8' }}>
      <Card.Root
        variant="outline"
        w={{ base: 'full', xl: '320px' }}
        flexShrink={0}
        position={{ base: 'static', xl: 'sticky' }}
        top="16"
      >
        <Card.Header>
          <Heading size="md">Theme Controls</Heading>
          <Text mt="1" color="fg.muted">
            Tune global palette and status behavior for the component catalog.
          </Text>
        </Card.Header>
        <Card.Body>
          <Stack gap="5">
            <Field.Root>
              <Field.Label htmlFor="color-palette-select">Color palette</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  id="color-palette-select"
                  value={selectedPalette}
                  onChange={(event) => setSelectedPalette(event.target.value as CatalogPalette)}
                >
                  {paletteGroups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((palette) => (
                        <option key={palette.value} value={palette.value}>
                          {palette.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.HelperText>
                Applied to all `colorPalette` aware components in this view.
              </Field.HelperText>
            </Field.Root>

            <Field.Root>
              <Field.Label htmlFor="status-select">Status intent</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  id="status-select"
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value as StatusTone)}
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.HelperText>{activeStatus.description}</Field.HelperText>
            </Field.Root>

            <Box borderWidth="1px" borderColor="border.muted" rounded="md" p="3" colorPalette={selectedPalette}>
              <Text textStyle="sm" fontWeight="medium" mb="2">
                Palette preview
              </Text>
              <SimpleGrid columns={2} gap="2">
                <Box bg="colorPalette.solid" px="2" py="3" rounded="sm">
                  <Text textStyle="xs" color="colorPalette.contrast" fontWeight="semibold">
                    solid
                  </Text>
                </Box>
                <Box bg="colorPalette.emphasized" px="2" py="3" rounded="sm">
                  <Text textStyle="xs" color="colorPalette.fg" fontWeight="semibold">
                    emphasized
                  </Text>
                </Box>
                <Box bg="colorPalette.subtle" px="2" py="3" rounded="sm">
                  <Text textStyle="xs" color="colorPalette.fg" fontWeight="semibold">
                    subtle
                  </Text>
                </Box>
                <Box bg="colorPalette.muted" px="2" py="3" rounded="sm">
                  <Text textStyle="xs" color="colorPalette.fg" fontWeight="semibold">
                    muted
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Stack>
        </Card.Body>
      </Card.Root>

      <Stack flex="1" gap="6" w="full">
        <Box>
          <Heading size="lg">Component Catalog</Heading>
          <Text mt="2" color="fg.muted">
            Kitchen sink for theme-aware component behavior across actions, forms, feedback, and navigation.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <Card.Root variant="outline">
            <Card.Header>
              <Heading size="md">Buttons</Heading>
              <Text color="fg.muted">Core button variants and status actions.</Text>
            </Card.Header>
            <Card.Body>
              <Stack gap="4">
                <Flex gap="2" flexWrap="wrap">
                  {buttonVariants.map((variant) => (
                    <Button key={variant} size="sm" colorPalette={selectedPalette} variant={variant}>
                      {variant}
                    </Button>
                  ))}
                </Flex>
                <Separator />
                <ButtonGroup size="sm" variant="outline">
                  <Button colorPalette={activeStatus.palette} variant="solid">
                    {activeStatus.label} action
                  </Button>
                  <Button colorPalette={activeStatus.palette}>Secondary</Button>
                </ButtonGroup>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header>
              <Heading size="md">Inputs & Controls</Heading>
              <Text color="fg.muted">Common form patterns with theme support.</Text>
            </Card.Header>
            <Card.Body>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input type="email" placeholder="name@company.com" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Search</Field.Label>
                  <InputGroup startElement={<LuSearch />}>
                    <Input
                      colorPalette="accent.secondary"
                      variant="subtle"
                      placeholder="Search contacts"
                    />
                  </InputGroup>
                </Field.Root>

                <Flex
                  justify="space-between"
                  align="center"
                  borderWidth="1px"
                  borderColor="border.muted"
                  rounded="md"
                  px="3"
                  py="2"
                >
                  <Box>
                    <Text textStyle="sm" fontWeight="medium">
                      Notifications
                    </Text>
                    <Text textStyle="xs" color="fg.muted">
                      Receive updates about team activity.
                    </Text>
                  </Box>
                  <Switch.Root colorPalette={selectedPalette} id="notification-switch">
                    <Switch.HiddenInput />
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Root>
                </Flex>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header>
              <Heading size="md">Feedback</Heading>
              <Text color="fg.muted">Status messaging mapped to semantic intents.</Text>
            </Card.Header>
            <Card.Body>
              <Stack gap="4">
                <Alert.Root status={activeStatus.alertStatus}>
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{activeStatus.label} status</Alert.Title>
                    <Alert.Description>{activeStatus.description}</Alert.Description>
                  </Alert.Content>
                </Alert.Root>
                <HStack gap="2" flexWrap="wrap">
                  {statusOptions.map((status) => (
                    <Badge
                      key={status.value}
                      colorPalette={status.palette}
                      variant={status.value === selectedStatus ? 'solid' : 'subtle'}
                    >
                      {status.label}
                    </Badge>
                  ))}
                </HStack>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header>
              <Heading size="md">Navigation</Heading>
              <Text color="fg.muted">Tabs and action menu in application contexts.</Text>
            </Card.Header>
            <Card.Body>
              <Stack gap="4">
                <Tabs.Root defaultValue="members" variant="enclosed" colorPalette={selectedPalette}>
                  <Tabs.List bg="bg.muted" rounded="l3" p="1">
                    <Tabs.Trigger value="members">
                      <LuUser />
                      Members
                    </Tabs.Trigger>
                    <Tabs.Trigger value="projects">
                      <LuFolder />
                      Projects
                    </Tabs.Trigger>
                    <Tabs.Trigger value="settings">
                      <LuSquareCheck />
                      Settings
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded="l2" />
                  </Tabs.List>
                  <Tabs.Content value="members">Manage member access and roles.</Tabs.Content>
                  <Tabs.Content value="projects">Track active project delivery.</Tabs.Content>
                  <Tabs.Content value="settings">Configure team workspace defaults.</Tabs.Content>
                </Tabs.Root>

                <Menu.Root>
                  <Menu.Trigger asChild>
                    <Button variant="outline" size="sm">
                      Open menu
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item value="new-text">New Text File</Menu.Item>
                        <Menu.Item value="new-file">New File...</Menu.Item>
                        <Menu.Item value="open-file">Open File...</Menu.Item>
                        <Menu.Item value="export">Export</Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header>
              <Heading size="md">Data Display</Heading>
              <Text color="fg.muted">Cards, counters, and profile presentation.</Text>
            </Card.Header>
            <Card.Body>
              <Stack gap="4">
                <Card.Root colorPalette={selectedPalette} variant="outline">
                  <Card.Body gap="3">
                    <Avatar.Root size="lg" shape="rounded" colorPalette={selectedPalette}>
                      <Avatar.Fallback name="K0 Team" />
                    </Avatar.Root>
                    <Box>
                      <Card.Title>K0 Platform Team</Card.Title>
                      <Card.Description>
                        Responsible for the component library, release governance, and design token quality.
                      </Card.Description>
                    </Box>
                  </Card.Body>
                  <Card.Footer justifyContent="flex-end">
                    <Button variant="outline">View</Button>
                    <Button colorPalette={selectedPalette}>Manage</Button>
                  </Card.Footer>
                </Card.Root>

                <Box position="relative" w="full" p="4" borderWidth="1px" borderColor="border.muted" rounded="md">
                  <Text textStyle="sm" fontWeight="medium">
                    Pending approvals
                  </Text>
                  <Text textStyle="sm" color="fg.muted">
                    New pull requests awaiting review.
                  </Text>
                  <Float placement="top-end">
                    <Circle size="6" colorPalette={activeStatus.palette} bg="colorPalette.solid" color="colorPalette.contrast">
                      3
                    </Circle>
                  </Float>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header>
              <Heading size="md">Overlays & Links</Heading>
              <Text color="fg.muted">Modal patterns and external references.</Text>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" align="start">
                <DemoDrawer />
                <Link href="https://chakra-ui.com/docs/components" color="accent.primary">
                  Chakra components reference
                </Link>
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default memo(ChakraDemo);
