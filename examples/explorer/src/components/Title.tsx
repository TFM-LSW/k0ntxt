import { useRecipe, Box } from "@chakra-ui/react"
import type { HeadingProps } from "@chakra-ui/react"

export const Title = (props: HeadingProps) => {
  const recipe = useRecipe({ key: "title" })
  const styles = recipe({ ...props })
  return <Box as="h1" css={styles} {...props} />
}
