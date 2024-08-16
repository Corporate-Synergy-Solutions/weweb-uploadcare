<template>
    <uc-config :ctx-name="content.ctxName" v-bind="config"></uc-config>

    <uc-file-uploader-regular
        v-if="content.uploaderType === 'regular'"
        :ctx-name="content.ctxName"
    ></uc-file-uploader-regular>
    <uc-file-uploader-minimal
        v-else-if="content.uploaderType === 'minimal'"
        :ctx-name="content.ctxName"
    ></uc-file-uploader-minimal>
    <uc-file-uploader-inline v-else :ctx-name="content.ctxName"></uc-file-uploader-inline>

    <uc-upload-ctx-provider
        ref="ctxProviderRef"
        :ctx-name="content.ctxName"
        @change="handleChangeEvent"
        @modal-close="handleModalCloseEvent"
    ></uc-upload-ctx-provider>
</template>

<script setup>
import '@uploadcare/file-uploader/web/uc-file-uploader-inline.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css';
import * as UC from '@uploadcare/file-uploader';
import { ref, computed, watch } from 'vue';

const uploadedFiles = ref([]);
const ctxProviderRef = ref(null);

UC.defineComponents(UC);

const props = defineProps({
    content: { type: Object, required: true },
});

const files = ref([]);
const config = computed(() => {
    return {
        pubkey: props.content.key,
        multiple: true,
        'source-list': 'local, url, camera, dropbox, gdrive',
        'confirm-upload': true,
        'remove-copyright': true,
        'img-only': true,
        'use-cloud-image-editor': true,
        'locale-definition-override': {
            en: {
                'upload-file': 'Upload file',
                'upload-files': 'Upload files',
                'choose-file': 'Choose file',
                'choose-files': 'Choose files',
                'drop-files-here': 'Drop files here',
                'select-file-source': 'Select file source',
            },
        },
    };
});

function handleChangeEvent(e) {
    if (e.detail) {
        uploadedFiles.value = e.detail.allEntries.filter(f => f.status === 'success');
    }
}

function handleModalCloseEvent() {
    if (props.content.uploaderType === 'regular') resetState();
}

function resetState() {
    ctxProviderRef.value.getAPI().removeAllFiles();
    uploadedFiles.value = [];
}

watch(config, () => resetState(), { deep: true });
</script>
