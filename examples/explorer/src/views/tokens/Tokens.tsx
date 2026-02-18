import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  InputGroup,
  Link,
  List,
  Stack,
  Switch,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { Suspense, lazy, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

const GlobalColorRamp = lazy(() => import("./components/GlobalColorRamp"));
const SemanticColorRamp = lazy(() => import("./components/SemanticColorRamp"));
const FontExamples = lazy(() => import("./components/FontExamples"));

const Tokens = () => {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("global");
  const [searchInput, setSearchInput] = useState("");
  const [referencesOnly, setReferencesOnly] = useState(false);
  const debouncedQuery = useDebouncedValue(searchInput, 220);
  const isFiltering = searchInput !== debouncedQuery;

  return (
    <Box pb="12">
      <Stack gap="6" mb="8">
        <Box>
          <Heading size="2xl" mb={4}>
            Styles via design tokens
          </Heading>
          <Text mb="2" maxW="4xl">
            Design tokens are the atomic values of the system: named variables for visual decisions that replace hard-coded styles and keep product UI consistent at scale.
          </Text>
          <List.Root ml="4">
            <List.Item>Typography: font families, sizes, and weights</List.Item>
            <List.Item>Color: brand, status, and semantic intent</List.Item>
            <List.Item>Spacing: layout rhythm and component density</List.Item>
            <List.Item>Responsive breakpoints</List.Item>
            <List.Item>Opacity</List.Item>
            <List.Item>Motion and animation timing</List.Item>
          </List.Root>
        </Box>

        <Card.Root variant="outline" borderColor="border.muted" bg="bg.subtle">
          <Card.Body>
            <Stack direction={{ base: "column", lg: "row" }} gap="4" justify="space-between">
              <InputGroup startElement={<LuSearch />}>
                <Input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search by token name, reference, value, or description"
                />
              </InputGroup>
              <Flex align="center" gap="3" minW={{ lg: "210px" }}>
                <Switch.Root
                  checked={referencesOnly}
                  onCheckedChange={(details) => setReferencesOnly(!!details.checked)}
                  colorPalette="accent.primary"
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                  <Switch.Label>References only</Switch.Label>
                </Switch.Root>
              </Flex>
            </Stack>
            {isFiltering && (
              <Text mt="2" fontSize="xs" color="fg.muted">
                Updating results...
              </Text>
            )}
          </Card.Body>
        </Card.Root>
      </Stack>

      <Tabs.Root
        value={activeTab}
        onValueChange={(details) => setActiveTab(details.value)}
        lazyMount
        unmountOnExit
        mb="10"
      >
        <Tabs.List
          ref={tabsListRef}
          position="sticky"
          top="0"
          zIndex="1"
          bg="bg.subtle"
          boxShadow="sm"
        >
          <Tabs.Trigger value="global" asChild>
            <Link unstyled href="#global">
              <strong>Global</strong> (primitive)
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="alias" asChild>
            <Link unstyled href="#alias">
              <strong>Alias</strong> (semantic)
            </Link>
          </Tabs.Trigger>
          <ColorModeButton 
            position="absolute"
            right="0"
            top="2px"
          />
        </Tabs.List>
        <Tabs.Content value="global">
          <Suspense fallback={<Text color="fg.muted">Loading global tokens...</Text>}>
            <GlobalColorRamp query={debouncedQuery} referencesOnly={referencesOnly} />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="alias">
          <Suspense fallback={<Text color="fg.muted">Loading semantic tokens...</Text>}>
            <>
              <SemanticColorRamp query={debouncedQuery} referencesOnly={referencesOnly} />
              <FontExamples query={debouncedQuery} />
            </>
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Tokens;
