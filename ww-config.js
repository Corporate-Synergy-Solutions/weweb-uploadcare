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
        },
        uploaderType: {
            label: { en: 'Uploader type' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'minimal', label: { en: 'Minimal' } },
                    { value: 'regular', label: { en: 'Regular' } },
                    { value: 'inline', label: { en: 'Inline' } },
                ],
            },
            defaultValue: 'minimal',
        },
    },
};
