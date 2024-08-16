export default {
    editor: {
        label: {
            en: 'Uploadcare file uploader',
        },
    },
    properties: {
        key: {
            label: {
                en: 'Uploadcare key',
            },
            type: 'Text',
            defaultValue: '',
        },
        ctxName: {
            label: {
                en: 'Context name',
            },
            type: 'Text',
            defaultValue: 'contextName',
            bindable: true,
        },
        uploaderType: {
            label: { en: 'Uploader type' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'regular', label: { en: 'Regular' } },
                    { value: 'minimal', label: { en: 'Minimal' } },
                    { value: 'inline', label: { en: 'Inline' } },
                ],
            },
            defaultValue: 'regular',
        },
        labelRegular: {
            label: {
                en: 'label',
            },
            type: 'Text',
            defaultValue: 'Upload files',
            hidden: content => content.uploaderType !== 'regular',
        },
        labelMinimal: {
            label: {
                en: 'label',
            },
            type: 'Text',
            defaultValue: 'Choose files',
            hidden: content => content.uploaderType !== 'minimal',
        },
        labelInline: {
            label: {
                en: 'label',
            },
            type: 'Text',
            defaultValue: 'Drop files',
            hidden: content => content.uploaderType !== 'inline',
        },
        isImageEditor: {
            label: {
                en: 'Image editor',
            },
            type: 'OnOff',
            defaultValue: true,
        },
        isImageOnly: {
            label: {
                en: 'Image only',
            },
            type: 'OnOff',
            defaultValue: true,
        },
        idComponentBind: {
            label: {
                en: 'Content variable id',
            },
            type: 'Text',
            defaultValue: '',
        },
        metadata: {
            label: {
                en: 'Metadata',
            },
            type: 'Text',
            defaultValue: '',
            bindable: true,
        },
        endpoint: {
            label: {
                en: 'Endpoint',
            },
            type: 'Text',
            defaultValue: 'https://ucarecdn.com',
            bindable: true,
        },
    },
};
