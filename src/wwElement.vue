<template>
    <FileUploader :key="updateComponent" :uploaderType="content.uploaderType" :config="config" v-model:files="files" />
</template>

<script setup>
import FileUploader from './uploadcare/FileUploader.vue';
import { ref, computed, watch } from 'vue';

const props = defineProps({
    content: { type: Object, required: true },
});

const files = ref([]);
const config = computed(() => {
    return {
        ctxName: props.content.ctxName,
        pubkey: props.content.key,
        multiple: true,
        'source-list': 'local, url, camera, dropbox, gdrive',
        'confirm-upload': true,
        'remove-copyright': true,
        'img-only': true,
        'use-cloud-image-editor': true,
        'uploader-type': props.content.uploaderType,
    };
});
const updateComponent = ref(0);

watch(config, () => (updateComponent += 1), { deep: true });
</script>
