<script setup lang="ts">
import { ref } from 'vue'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'



interface ListItems {
    value: string;
    label: string;
}

defineProps<{ list: ListItems[], label: string }>()

const open = ref(false)
const value = ref<string>('')

// const filterFunction = (list: typeof list, search: string) => list.filter(i => i.value.toLowerCase().includes(search.toLowerCase()))
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" role="combobox" :aria-expanded="open" class="min-w-[400px] justify-between">
                {{ value
                    ? list.find((item) => item.value === value)?.label
                    : label }}
                <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="min-w-[400px] p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Search Here..." />
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem v-for="item in list" :key="item.value" :value="item.value" @select="(ev) => {
                            if (typeof ev.detail.value === 'string') {
                                value = ev.detail.value
                            }
                            open = false
                        }">
                            {{ item.label }}
                            <CheckIcon :class="cn(
                                'ml-auto h-4 w-4',
                                value === item.value ? 'opacity-100' : 'opacity-0',
                            )" />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>