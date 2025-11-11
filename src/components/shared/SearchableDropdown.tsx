"use client"

import * as React from "react"
import { Check, ChevronsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import type { Params } from "@/store/useMediaStore"

// const frameworks = [
//   { value: "react", label: "React" },
//   { value: "nextjs", label: "Next.js" },
//   { value: "vue", label: "Vue" },
//   { value: "angular", label: "Angular" },
//   { value: "svelte", label: "Svelte" },
// ]

interface SearchableDropdownProps {
  data: { value: string, label: string }[],
  DefaultLabel: string
  setFilterCounter: React.Dispatch<React.SetStateAction<number>>
  setTemporaryFilter: React.Dispatch<React.SetStateAction<Params>>,
  filterCounter: number
}

export default function SearchableDropdown({ data, DefaultLabel, setTemporaryFilter, setFilterCounter, filterCounter }: SearchableDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")




  if (filterCounter === 0 && value !== "") setValue("")



  const handleFilter = (currentValue: string) => {
    // console.log(currentValue)
    // console.log(value)

    // setValue(currentValue === value ? "" : currentValue)

    if (DefaultLabel === "Countries") setTemporaryFilter(temporaryFilter => ({ ...temporaryFilter, with_origin_country: currentValue }))
    if (DefaultLabel === "Years") setTemporaryFilter(temporaryFilter => ({ ...temporaryFilter, year: parseInt(currentValue) }))
    if (DefaultLabel === "Actors") setTemporaryFilter(temporaryFilter => ({ ...temporaryFilter, with_cast: currentValue }))
    if (value === "") {
      setFilterCounter(prev => prev + 1)
    }

  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] lg:w-[200px] mb-5 rounded-3xl px-0 lg:px-4! text-xs  border-primary! justify-between bg-background"
        >
          {value
            ? data.filter((f) => f.value === value)[0]?.label
            : DefaultLabel}
          <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] lg:w-[200px] bg-background border-primary p-0">
        <Command>
          <CommandInput placeholder={`Search ${DefaultLabel}`} />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    handleFilter(currentValue === value ? "" : currentValue)
                  }}
                  value={framework.value}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
