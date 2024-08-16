<template>
    <FileUploader
        :key="updateComponent"
        :ctxName="content.ctxName"
        v-model:files="files"
        :uploaderType="content.uploaderType"
        :config="config"
    />
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
        pubkey: props.content.key,
        'source-list': 'local, url, camera, dropbox, gdrive',
        'confirm-upload': true,
        'remove-copyright': true,
        'img-only': true,
        'use-cloud-image-editor': props.content.isImageEditor,
        metadata: props.content.metadata,
        'cdn-cname': props.content.endpoint,
    };
});

const updateComponent = ref(0);
watch(config, () => (updateComponent.value += 1), { deep: true });
watch(files, val => {
    if (props.content.idComponentBind) wwLib.wwVariable.updateValue(props.content.idComponentBind, val);
});
</script>
