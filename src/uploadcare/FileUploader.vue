<template>
    <uc-config ref="configRef" :ctx-name="ctxName" v-bind="config"></uc-config>

    <uc-file-uploader-regular
        v-if="uploaderType === 'regular'"
        :ctx-name="ctxName"
        class="uploadcare-file-uploader"
    ></uc-file-uploader-regular>
    <uc-file-uploader-minimal
        v-else-if="uploaderType === 'minimal'"
        :ctx-name="ctxName"
        class="uploadcare-file-uploader"
    ></uc-file-uploader-minimal>
    <uc-file-uploader-inline v-else :ctx-name="ctxName" class="uploadcare-file-uploader"></uc-file-uploader-inline>

    <uc-upload-ctx-provider
        ref="ctxProviderRef"
        :ctx-name="ctxName"
        @change="handleChangeEvent"
    ></uc-upload-ctx-provider>
</template>

<script setup>
import '@uploadcare/file-uploader/web/uc-file-uploader-inline.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css';
import * as UC from '@uploadcare/file-uploader';
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { converter } from 'culori';

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
    metadata: {
        type: [String, Object],
        default: () => {},
    },
    overrideLabel: {
        type: Object,
        default: () => {},
    },
    themeColor: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:files']);

const uploadedFiles = ref([]);
const ctxProviderRef = ref(null);
const configRef = ref(null);

function handleChangeEvent(e) {
    if (e.detail) {
        uploadedFiles.value = e.detail.allEntries.filter(f => f.status === 'success');
        emit('update:files', uploadedFiles.value);
    }
}

function parseJson(str) {
    let obj = {};
    try {
        obj = JSON.parse(str);
    } catch (e) {
        return {};
    }
    return obj;
}

onMounted(() => {
    configRef.value.localeDefinitionOverride = props.overrideLabel;
    configRef.value.metadata = typeof props.metadata === 'string' ? parseJson(props.metadata) : props.metadata;
});

onBeforeUnmount(() => {
    configRef.value.localeDefinitionOverride = null;
    configRef.value.metadata = null;
});

watch(
    () => props.metadata,
    () => {
        configRef.value.metadata = null;
        configRef.value.metadata = typeof props.metadata === 'string' ? parseJson(props.metadata) : props.metadata;
    }
);

watch(
    () => props.overrideLabel,
    () => {
        configRef.value.localeDefinitionOverride = null;
        configRef.value.localeDefinitionOverride = props.overrideLabel;
    },
    { deep: true }
);

const oklch = converter('oklch');
const oklchCulori = computed(() => {
    const oklchObj = oklch(props.themeColor);
    return `${oklchObj.l} ${oklchObj.c} ${oklchObj.h}`;
});
</script>

<style scoped>
.uploadcare-file-uploader {
    --uc-primary-oklch-light: v-bind('oklchCulori');
}
</style>
