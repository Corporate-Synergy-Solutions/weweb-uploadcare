<template>
    <uc-config ref="configRef" :ctx-name="ctxName" v-bind="config"></uc-config>

    <uc-file-uploader-regular v-if="uploaderType === 'regular'" :ctx-name="ctxName"></uc-file-uploader-regular>
    <uc-file-uploader-minimal v-else-if="uploaderType === 'minimal'" :ctx-name="ctxName"></uc-file-uploader-minimal>
    <uc-file-uploader-inline v-else :ctx-name="ctxName"></uc-file-uploader-inline>

    <uc-upload-ctx-provider
        ref="ctxProviderRef"
        :ctx-name="ctxName"
        @change="handleChangeEvent"
        @modal-close="handleModalCloseEvent"
    ></uc-upload-ctx-provider>
</template>

<script setup>
import '@uploadcare/file-uploader/web/uc-file-uploader-inline.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css';
import * as UC from '@uploadcare/file-uploader';
import { ref, onMounted, onBeforeUnmount } from 'vue';

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
    uploaderType: {
        type: String,
        required: true,
    },
    ctxName: {
        type: String,
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
    configRef.localeDefinitionOverride = {
        en: {
            photo__one: 'photo',
            photo__many: 'photos',
            photo__other: 'photos',

            'upload-file': 'Upload photo',
            'upload-files': 'Upload photos',
            'choose-file': 'Choose photo',
            'choose-files': 'Choose photos',
            'drop-files-here': 'Drop photos here',
            'select-file-source': 'Select photo source',
            'edit-image': 'Edit photo',
            'no-files': 'No photos selected',
            'caption-edit-file': 'Edit photo',
            'files-count-allowed': 'Only {{count}} {{plural:photo(count)}} allowed',
            'files-max-size-limit-error': 'Photo is too big. Max photo size is {{maxFileSize}}.',
            'header-uploading': 'Uploading {{count}} {{plural:photo(count)}}',
            'header-succeed': '{{count}} {{plural:photo(count)}} uploaded',
            'header-total': '{{count}} {{plural:photo(count)}} selected',
        },
    };
});

onBeforeUnmount(() => {
    configRef.localeDefinitionOverride = null;
});
</script>
