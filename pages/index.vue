<script setup lang="ts">
import * as emoji from 'node-emoji'
import { PartyPopper, ChevronRight } from 'lucide-vue-next'

const moods = reactive({
    happy: emoji.search('joy')[0],
    sad: emoji.search('cry')[0],
    neutral: emoji.search('neutral')[0],
    angry: emoji.search('angry')[0],
});

interface Hobby {
    name: string;
}

const hobbies = ref<Hobby[]>([
    { name: 'Cooking' },
    { name: 'Partying' },
    { name: 'Engineering' },
    { name: 'Outdoors' },
    { name: 'Bike Riding' },
    { name: 'Swimming' },
    { name: 'Books' }
])

const { data } = await useFetch("/api/cities");

const activeTab = ref(1)

const steps = reactive({
    energy: 0,
    activity: '',
    location: ''
});

const stepsCompleted = computed(() => steps.energy > 0 && steps.activity != null && steps.location != null)

const showNextTab = () => {
    const totalTabs = Object.keys(steps).length;
    activeTab.value = activeTab.value >= totalTabs ? 1 : ++activeTab.value;
}
</script>

<template>
    <section class="text-center container flex justify-center items-center h-[90vh]">
        <div class="lets-get-started max-w-screen-md mx-auto">
            <div class="energy-selector my-8" v-if="activeTab === 1">
                <p class="text-4xl font-semibold leading-relaxed">Okay, let's start simple, what is your energy level ?</p>
                <div class="mx-auto my-12 text-center max-w-lg flex gap-2">
                    <span class="text-xs">Low</span>
                    <Slider :default-value="[33]" :max="100" :step="1" class="max-w-96" />
                    <span class="text-xs">Pretty High</span>
                </div>
            </div>
            <div class="hobby-selector my-8" v-if="activeTab === 2">
                <p class="text-4xl font-semibold leading-relaxed">Nice, what is your ideal type of fun ?</p>
                <div class="mx-auto max-w-screen-sm grid grid-cols-4 gap-1 py-4">
                    <Toggle class=" data-[state=on]:border-fuchsia-300 data-[state=on]:bg-white h-32 border bg-white"
                        v-for="hobby of hobbies">
                        <span>{{ hobby.name }} </span>
                        <!-- <span>{{ mood.name.toUpperCase() }}</span> -->
                    </Toggle>
                </div>
            </div>
            <div class="location-info my-8" v-if="activeTab === 3">
                <p class="text-4xl font-semibold leading-relaxed">Mind telling us where you are located ?</p>
                <div class="mx-auto my-8 text-center max-w-screen-md">
                    <Combobox :list="data.cities" label="Where are you at in the land of Zakayo ?" />
                </div>
            </div>
            <div class="lets-goo my-12">
                <Button class="text-xs px-8" v-if="activeTab === 3 && stepsCompleted">
                    <PartyPopper class="mr-4 h-8" />
                    <span>Hebu Nitolee Form</span>
                </Button>
                <Button variant="secondary" class="text-sm pr-2" v-else @click="showNextTab">
                    <span>Next</span>
                    <ChevronRight class="ml-2 h-4" />
                </Button>
            </div>
        </div>
    </section>
</template>