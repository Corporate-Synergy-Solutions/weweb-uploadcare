<template>
    <FileUploader
        :key="updateComponent"
        :ctxName="content.ctxName"
        v-model:files="files"
        :uploaderType="content.uploaderType"
        :metadata="content.metadata"
        :overrideLabel="overrideLabel"
        :config="config"
        :themeColor="content.themeColor"
        @uploaded="
            e =>
                $emit('trigger-event', {
                    name: 'file:uploaded',
                    event: e,
                })
        "
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
        'img-only': props.content.isImageOnly,
        'use-cloud-image-editor': props.content.isImageEditor,
        accept: !props.content.isImageOnly ? props.content.accept : '',
        'remove-copyright': props.content.removeCopyright,
        multiple: props.content.multiple,
    };
});

const overrideLabel = computed(() => {
    return {
        en: {
            'upload-files': props.content.labelRegular,
            'upload-file': props.content.labelRegular,
            'choose-files': props.content.labelMinimal,
            'choose-file': props.content.labelMinimal,
            'drop-files-here': props.content.labelInline,
        },
    };
});

const updateComponent = ref(0);
watch(config, () => (updateComponent.value += 1), { deep: true });
watch(files, val => {
    if (props.content.idComponentBind) wwLib.wwVariable.updateValue(props.content.idComponentBind, val);
});
</script>
