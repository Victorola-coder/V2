<template>
    <div class="lg:w-3/4 lg:mx-auto">
        <form @submit.prevent="submit" class="form">
            <h1>It's day {{day}}</h1>
            <div class="input">
                <div>
                    <span>Live Link (Optional)</span>
                </div>
                <input type="url" v-model="form.link" placeholder="https://www.example.com">
            </div>
            <div class="input">
                <div>
                    <span>Repository Link (Optional)</span>
                </div>
                <input type="url" v-model="form.repo" placeholder="https://www.example.com">
            </div>
            <div class="input">
                <div>
                    <span>Description (Required)</span>
                </div>
                <textarea v-model="form.desc" required placeholder="Describe your work"></textarea>
            </div>
            <div class="input">
                <div>
                    <span>Status</span>
                </div>
                <div class="flex items-center gap-2"><b class="font-semibold text-green-500">Production</b> <input v-model="form.production" type="checkbox"> <b class="font-semibold text-red-500">Development</b></div>
            </div>
            <div class="input">
                <div>
                    <span>Day</span>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex w-full">
                        <i class="not-italic inline-block text-center" style="width:calc(100% /30)" :class="i == form.day ? 'text-blue-500 font-semibold' : ''" v-for="i in count">{{ i }}</i>
                    </div>
                    <input type="range" v-model="form.day" min="1" max="30">
                </div>
            </div>
            <Opt txt="Frameworks & Libraries" :opts="frameworks"/>
            <Opt txt="Tools (Hosting & Database)" :opts="tools"/>
            <Opt txt="Languages" :opts="languages"/>
            <div class="flex items-center">
                <h1 class="w-1/2 items-center">Files (1MB per file)</h1>
                <div class="w-1/2 items-center flex justify-end">
                    <button type="button" @click="input.click" class="opt select flex items-center gap-1">Add <i class="material-icons text-base">control_point</i></button>
                </div>
            </div>
            <i v-if="error.file" class="error">Upload at least one file</i>
            <div class="grid grid-cols-1 gap-2">
                <div v-for="file in files" :key="file.name" class="flex items-start gap-2">
                    <h2 class="material-icons text-5xl">description</h2>
                    <div>
                        <p v-if="file.name.length < 75">{{ file.name }}</p>
                        <p v-else>{{ file.name.slice(0,70) }}...</p>
                        <div class="flex gap-2">
                            <span>Type: {{ file.type }}</span>
                            <span>Size: {{ (file.size / (1024 ** 2)).toFixed(2) }} MB</span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="opt py-2" type="submit">SUBMIT</button>
        </form>
        <input ref="input" @change="addFile" type="file" class="hidden" max="1">
        <div v-if="modal" class="fixed z-20 left-0 right-0 bottom-0 top-0 flex items-center justify-center">
            <div class="absolute -z-10 h-full w-full bg-black opacity-70"></div>
            <div class="bg-white rounded-xl font-bold text-xl text-black lg:w-1/2 sm:w-3/4 py-8 px-8 leading-relaxed">Limit is 1MB per file <br> You uploaded {{ modal.toFixed(2) }} MB instead</div>
        </div>
    </div>
</template>

<script setup>
const count = Array(30).fill(1).map((a,b) => a + b);
const error = reactive({
    file: false
})
const day = challengeDay();
const form = reactive({
    link: '',
    desc: '',
    production: false,
    day,
    repo: ''
});
definePageMeta({
    middleware: function(){
        if(process.client) return false;
        const signed = useCookie('_cid');
        if(!signed.value) return navigateTo('/signup');
    }
})
const transform = (array) => reactive(array.sort().map(a => ({txt: a, opt: false})));
const frameworks = transform(['React.js', 'Vue.js', 'Next.js', 'Nuxt.js', 'Svelte', 'Angular', 'AngularJS', 'TailwindCSS', 'Material UI', 'Vuex', 'Pinia', 'Redux', 'Bootstrap', 'jQuery', 'Express.js', 'Django', 'Laravel', 'Ruby On Rails']);
const tools = transform(['Firebase', 'Vercel', 'GitHub', 'MongoDB', 'SQL', 'Node.js', 'Netlify', 'React-Native', 'GitLab', 'BitBucket']);
const languages = transform(['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'PHP', 'TypeScript', 'Dart', 'C', 'C++', 'C#', 'SASS', 'Ruby']);
const files = reactive([]);
const input = ref(null);
const modal = ref(false);
function addFile({target}){
    const entry = target.files[0];
    const val = entry.size / (1024 ** 2);
    if(val > 1){
        modal.value = val;
        setTimeout(() => modal.value = false, 2000);
    } else {
        files.push(entry);
    }
}
function submit(){
    if(!files.length) return error.file = true;
    const ans = {
        day: form.day,
        completed: form.production,
        desc: `Day ${form.day}\n\n Status: ${form.production ? 'Production' : 'Development'}\n`,
        files
    }
    if(form.link) {
        ans.link = form.link
        ans.desc += `Live Link: ${form.link}\n`;
    };
    if(form.repo) {
        ans.repo = form.repo;
        ans.desc += `Repository Link: ${form.repo}\n`
    }
    const filter = (data) => data.filter(a => a.opt).map(a => a.txt);
    const usedFrameworks = filter(frameworks);
    if(usedFrameworks.length) ans.desc += `Frameworks & Libraries: ${usedFrameworks.join(', ')}\n`;
    const usedLang = filter(languages);
    if(usedLang.length) ans.desc += `Languages: ${usedLang.join(', ')}\n`;
    const usedTools = filter(tools);
    if(usedTools.length) ans.desc += `Tools (Hosting & Database): ${usedTools.join(', ')}\n`;
    ans.desc += `\nDescription: ${form.desc}`;
    console.log(ans);
}
</script>

<style>
input[type="checkbox"]{
    @apply appearance-none w-8 h-4 rounded-xl bg-white;
}
input[type="checkbox"]::before {
    content: " ";
    @apply rounded-full bg-red-500 h-3.5 inline-block w-3.5 -translate-y-3;
}
input[type="checkbox"]:checked::before {
    @apply -translate-x-3.5 bg-green-500;
}
</style>