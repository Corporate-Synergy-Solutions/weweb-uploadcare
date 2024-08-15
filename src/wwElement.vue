<template>
    <FileUploader :config="config" v-model:files="files" />
</template>

<script setup>
import FileUploader from './uploadcare/FileUploader.vue';
import { ref, computed } from 'vue';

const props = defineProps({
    content: { type: Object, required: true },
});

const files = ref([]);
const config = computed(() => {
    return {
        ctxName: 'ctx',
        pubkey: props.content.key,
        multiple: true,
        sourceList: 'local, url, camera, dropbox, gdrive',
        confirmUpload: true,
        removeCopyright: true,
        imgOnly: true,
        useCloudImageEditor: true,
    };
});
</script>
