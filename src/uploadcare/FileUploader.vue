<template>
    <uc-config :ctx-name="config.ctxName" :pubKey="config.key"></uc-config>

    <uc-file-uploader-regular :ctx-name="config.ctxName"></uc-file-uploader-regular>

    <uc-upload-ctx-provider
        :ctx-name="config.ctxName"
        @change="handleChangeEvent"
        @modal-close="handleModalCloseEvent"
    ></uc-upload-ctx-provider>
</template>

<script setup>
import '@uploadcare/file-uploader/web/uc-file-uploader-inline.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css';

import * as UC from '@uploadcare/file-uploader';
import { onBeforeUnmount, onMounted, ref } from 'vue';

UC.defineComponents(UC);

const props = defineProps({
    files: {
        type: Array,
        required: true,
    },
    config: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['update:files']);

const uploadedFiles = ref([]);
const ctxProviderRef = ref(null);
const configRef = ref(null);

function resetUploaderState() {
    ctxProviderRef.value.getAPI().removeAllFiles();
}

function handleChangeEvent(e) {
    if (e.detail) {
        uploadedFiles.value = e.detail.allEntries.filter(f => f.status === 'success');
    }
}

function handleModalCloseEvent() {
    resetUploaderState();

    emit('update:files', [...props.files, ...uploadedFiles.value]);
    uploadedFiles.value = [];
}

onMounted(() => {
    UC.defineComponents(UC);
    configRef.localeDefinitionOverride = {
        en: {
            'upload-file': 'Upload file',
            'upload-files': 'Upload files',
            'choose-file': 'Choose file',
            'choose-files': 'Choose files',
            'drop-files-here': 'Drop files here',
            'select-file-source': 'Select file source',
            'edit-image': 'Edit file',
            'no-files': 'No files selected',
            'caption-edit-file': 'Edit file',
            'files-count-allowed': 'Only {{count}} {{plural:file(count)}} allowed',
            'files-max-size-limit-error': 'file is too big. Max file size is {{maxFileSize}}.',
        },
    };
});

onBeforeUnmount(() => {
    configRef.localeDefinitionOverride = null;
});
</script>
