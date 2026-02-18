import { Title } from "../../components/Title";
import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Icon,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Strong,
  Text,
} from "@chakra-ui/react";
import explorerPackage from "../../../package.json";
import visionLegoRef from "../../images/vision-lego-ref-2.png";
import { SiChakraui } from "react-icons/si";

const lastUpdated = "Sep 2025";

type RoadmapItem = {
  date?: string;
  phase: "Foundation" | "Enablement" | "Adoption";
  title: string;
  rationale: string;
  status: "done" | "planned";
};

const roadmapItems: RoadmapItem[] = [
  {
    date: "2025-04-09",
    phase: "Foundation",
    title: "Core DTCG tokens",
    rationale:
      "Defined canonical primitives and naming so downstream tooling had stable contracts.",
    status: "done",
  },
  {
    date: "2025-05-28",
    phase: "Enablement",
    title: "Style Dictionary pipeline",
    rationale:
      "Automated platform outputs from one token source to reduce manual drift.",
    status: "done",
  },
  {
    date: "2025-07-17",
    phase: "Adoption",
    title: "CSS token explorer",
    rationale:
      "Improved discoverability and adoption by exposing resolved values and references.",
    status: "done",
  },
  {
    date: "2025-09-12",
    phase: "Adoption",
    title: "Chakra converted theme",
    rationale:
      "Validated production integration path for semantic tokens in component systems.",
    status: "done",
  },
  {
    phase: "Adoption",
    title: "Power BI theme exports",
    rationale:
      "Extend token parity to analytics surfaces and reporting products.",
    status: "planned",
  },
  {
    phase: "Adoption",
    title: "Tailwind theme exports",
    rationale:
      "Accelerate implementation velocity with token-aligned utility generation.",
    status: "planned",
  },
  {
    phase: "Adoption",
    title: "Accessibility compliance track",
    rationale:
      "Establish WCAG-focused token audits for contrast, focus states, and component interaction quality.",
    status: "planned",
  },
  {
    phase: "Enablement",
    title: "Deprecation and versioning policy",
    rationale:
      "Define a clear lifecycle for token and theme changes so enterprise teams can adopt updates safely.",
    status: "planned",
  },
];

const completedMilestones = roadmapItems.filter((item) => item.status === "done").length;
const plannedMilestones = roadmapItems.filter((item) => item.status === "planned").length;

const About = () => {
  return (
    <Box pb="12" position="relative">
      <Box
        position="absolute"
        top="-80px"
        left="-60px"
        w="340px"
        h="340px"
        borderRadius="full"
        bg="accent.primary/10"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Container maxW="7xl" px={{ base: "0", md: "4" }}>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "minmax(0, 1.2fr) minmax(0, 1fr)",
          }}
          gap={{ base: "6", xl: "8" }}
        >
          <Card.Root
            variant="outline"
            bg="bg.subtle"
            borderColor="border.muted"
            position="relative"
            overflow="hidden"
          >
            <Box
              display={{ base: "block", lg: "none" }}
              h={{ base: "160px", md: "220px" }}
              backgroundImage={`url(${visionLegoRef})`}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
            />
            <Box
              display={{ base: "none", lg: "block" }}
              position="absolute"
              inset="0"
              backgroundImage={`url(${visionLegoRef})`}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
            />
            <Box
              display={{ base: "none", lg: "block" }}
              position="absolute"
              inset="0"
              bg="bg"
              opacity={0.58}
              backdropFilter="blur(1px)"
            />
            <Card.Body p={{ base: "6", md: "8" }} position="relative">
              <Box
                bg="bg.subtle"
                borderWidth="1px"
                borderColor="border.muted"
                rounded="lg"
                p={{ base: "5", md: "7" }}
                w={{ base: "100%", lg: "86%" }}
              >
                <Title size="xl" mb="8" mt="2" w={{ base: "100%", lg: "90%" }}>
                  Design decisions encoded once, delivered consistently everywhere.
                </Title>
                <Text color="fg.muted" maxW="2xl" mb="5">
                  For a large enterprise modernizing legacy marketing and design studio workflows,
                  our token platform creates a reliable contract between product design and engineering:
                  one governed source for brand expression, accessibility, and implementation across
                  product teams.
                </Text>
                <SimpleGrid columns={{ base: 1, sm: 3 }} gap="2.5" mb="6">
                  <Box borderWidth="1px" borderColor="border.muted" rounded="md" px="3" py="2.5" bg="bg">
                    <Text fontSize="xs" color="fg.muted">Completed milestones</Text>
                    <Text fontWeight="semibold">{completedMilestones}</Text>
                  </Box>
                  <Box borderWidth="1px" borderColor="border.muted" rounded="md" px="3" py="2.5" bg="bg">
                    <Text fontSize="xs" color="fg.muted">Planned next</Text>
                    <Text fontWeight="semibold">{plannedMilestones}</Text>
                  </Box>
                  <Box borderWidth="1px" borderColor="border.muted" rounded="md" px="3" py="2.5" bg="bg">
                    <Text fontSize="xs" color="fg.muted">Current stage</Text>
                    <Text fontWeight="semibold">Adoption</Text>
                  </Box>
                </SimpleGrid>
                <HStack gap="2" mb="2" flexWrap="wrap">
                  <Badge colorPalette="accent.primary" variant="solid">
                    v{explorerPackage.version}
                  </Badge>
                  <Badge colorPalette="brand.blue" variant="subtle">
                    {lastUpdated}
                  </Badge>
                  <Badge colorPalette="status.positive" variant="subtle">
                    DTCG aligned
                  </Badge>
                  <Badge colorPalette="status.info" variant="subtle">
                    Transformation program
                  </Badge>
                </HStack>
              </Box>
            </Card.Body>
          </Card.Root>

          <Stack gap="6">
            <Card.Root variant="outline" bg="bg" borderColor="border.muted">
              <Card.Header pb="2">
                <Heading as="h2" size="xl">
                  Operating principles.
                </Heading>
              </Card.Header>
              <Card.Body pt="0">
                <List.Root mb="2" pl="4">
                  <ListItem>
                    <Strong color="fg">Single source governance:</Strong> core, semantic, and component
                    intent are managed centrally to avoid divergence.
                  </ListItem>
                  <ListItem>
                    <Strong color="fg">Cross-platform output:</Strong> one token model compiles to
                    CSS variables, Chakra theme artifacts, and implementation-friendly formats.
                  </ListItem>
                  <ListItem>
                    <Strong color="fg">Semantic clarity:</Strong> token naming reflects UI purpose,
                    reducing ambiguity in both design and code reviews.
                  </ListItem>
                </List.Root>
              </Card.Body>
            </Card.Root>

            <Card.Root variant="outline" bg="bg" borderColor="border.muted">
              <Card.Header pb="2">
                <Heading as="h2" size="xl">
                  Delivery outcomes.
                </Heading>
              </Card.Header>
              <Card.Body pt="0">
                <Text mb="2">
                  The program is designed to move from standards to adoption with minimal translation
                  loss, while supporting teams transitioning from legacy studio operating models.
                </Text>
                <Text mb="2">
                  The work completed so far provides an embryonic foundation for a product industrial theme,
                  and the next intention is to couple this with a complementary presentational theme, in a
                  model similar to GitHub Primer.
                </Text>
                <List.Root mb="2" pl="4">
                  <ListItem>
                    <Strong color="fg">Faster onboarding:</Strong> teams consume opinionated tokens instead of inventing local scales.
                  </ListItem>
                  <ListItem>
                    <Strong color="fg">Lower variance:</Strong> component behavior and visual states remain consistent release to release.
                  </ListItem>
                  <ListItem>
                    <Strong color="fg">Auditability:</Strong> design decisions are traceable through token references and generated artifacts.
                  </ListItem>
                  <ListItem>
                    <Strong color="fg">Change-safe transformation:</Strong> legacy teams can adopt incrementally without disrupting ongoing delivery.
                  </ListItem>
                </List.Root>
              </Card.Body>
            </Card.Root>

            <Card.Root variant="outline" bg="bg" borderColor="border.muted">
              <Card.Header pb="2">
                <Heading as="h2" size="xl">
                  Designed for humans, built for AI.
                </Heading>
              </Card.Header>
              <Card.Body pt="0">
                <Text mb="2">
                  Tokens aren’t only beneficial for designers and developers;
                  they also provide structured, machine-readable data that
                  enables AI-driven prototyping and accelerates automated
                  product development.
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root variant="outline" bg="bg" borderColor="border.muted">
              <Card.Header pb="2">
                <HStack gap="2" align="center">
                  <Box
                    boxSize="8"
                    rounded="full"
                    borderWidth="1px"
                    borderColor="border.muted"
                    bg="bg.subtle"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={SiChakraui}
                      boxSize="5"
                      color="#14b8a6"
                      aria-hidden
                    />
                  </Box>
                  <Heading as="h2" size="xl">
                    Chakra UI Ready.
                  </Heading>
                </HStack>
              </Card.Header>
              <Card.Body pt="0">
                <Text mb="2">
                  Chakra UI enablement turns these tokens into a practical UI
                  delivery layer: semantic color roles, typography, spacing, and
                  component states are mapped into a reusable theme so product
                  teams can ship consistently, reduce one-off styling decisions,
                  and scale implementation quality across features.
                </Text>
                <Text mb="2">
                  Chakra UI MCP server support strengthens this further by giving teams
                  context-aware implementation guidance directly in the workflow, reducing
                  documentation drift and improving speed-to-delivery for token-aligned UI changes.
                </Text>
              </Card.Body>
            </Card.Root>
          </Stack>
        </Grid>

        <Card.Root mt="6" variant="outline" bg="bg" borderColor="border.muted">
          <Card.Header pb="2" mb="6">
            <Heading as="h2" size="xl">
              Roadmap.
            </Heading>
            <Text color="fg.muted">
              Sequenced milestones demonstrating the path from standards foundation to product adoption.
            </Text>
          </Card.Header>
          <Card.Body pt="0">
            <Box position="relative" pr={{ base: "0", md: "2" }}>
              <Stack gap="4">
                {roadmapItems.map((item) => {
                  const isDone = item.status === "done";
                  const progressPalette = isDone
                    ? "status.positive"
                    : "status.caution";
                  return (
                    <Box
                      key={`${item.date ?? "undated"}-${item.title}`}
                      position="relative"
                    >
                      <Box
                        borderWidth="1px"
                        borderColor="border.muted"
                        borderLeftWidth="4px"
                        borderLeftColor={
                          isDone ? "accent.primary" : "brand.yellow"
                        }
                        rounded="xl"
                        p="3.5"
                        bg={isDone ? "accent.primary/5" : "brand.yellow/8"}
                        shadow="xs"
                      >
                        <HStack
                          justify="space-between"
                          align="center"
                          flexWrap="wrap"
                          gap="2"
                        >
                          <Text fontWeight="semibold">{item.title}</Text>
                          <HStack gap="2">
                            <Badge
                              variant="outline"
                              colorPalette={progressPalette}
                            >
                              {item.phase}
                            </Badge>
                            <Badge
                              variant="subtle"
                              colorPalette={progressPalette}
                            >
                              {item.date ?? "Undated"}
                            </Badge>
                            <Badge
                              variant={isDone ? "solid" : "subtle"}
                              colorPalette={progressPalette}
                            >
                              {isDone ? "Complete" : "Planned"}
                            </Badge>
                          </HStack>
                        </HStack>
                        <Text mt="1.5" color="fg.muted" fontSize="sm">
                          {item.rationale}
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
};

export default About;
