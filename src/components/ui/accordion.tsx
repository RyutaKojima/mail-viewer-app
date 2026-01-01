import { Accordion, HStack, BoxProps } from "@chakra-ui/react"
import * as React from "react"
import { LuChevronDown } from "react-icons/lu"

interface AccordionItemTriggerProps extends Accordion.ItemTriggerProps {
  indicatorPlacement?: "start" | "end"
  children?: React.ReactNode
}

export const AccordionItemTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionItemTriggerProps
>(function AccordionItemTrigger(props, ref) {
  const { children, indicatorPlacement = "end", ...rest } = props
  return (
    // @ts-expect-error children prop issue
    <Accordion.ItemTrigger {...rest} ref={ref}>
      {indicatorPlacement === "start" && (
        // @ts-expect-error children prop issue
        <Accordion.ItemIndicator rotate={{ base: "-90deg", _open: "0deg" }}>
          <LuChevronDown />
        </Accordion.ItemIndicator>
      )}
      <HStack gap="4" flex="1" textAlign="start" width="full">
        {children}
      </HStack>
      {indicatorPlacement === "end" && (
        // @ts-expect-error children prop issue
        <Accordion.ItemIndicator>
          <LuChevronDown />
        </Accordion.ItemIndicator>
      )}
    </Accordion.ItemTrigger>
  )
})

interface AccordionItemContentProps extends Accordion.ItemContentProps, BoxProps {
  children?: React.ReactNode
}

export const AccordionItemContent = React.forwardRef<
  HTMLDivElement,
  AccordionItemContentProps
>(function AccordionItemContent(props, ref) {
  return (
    // @ts-expect-error children prop issue
    <Accordion.ItemContent>
      <Accordion.ItemBody {...props} ref={ref} />
    </Accordion.ItemContent>
  )
})

interface AccordionRootProps extends Accordion.RootProps {
  children?: React.ReactNode
}

export const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  (props, ref) => (
    <Accordion.Root {...props} ref={ref} />
  )
)

interface AccordionItemProps extends Accordion.ItemProps {
  children?: React.ReactNode
  value: string
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => (
    <Accordion.Item {...props} ref={ref} />
  )
)
