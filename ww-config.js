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
                en: 'Label regular',
            },
            type: 'Text',
            defaultValue: 'Upload files',
            hidden: content => content.uploaderType !== 'regular',
        },
        labelMinimal: {
            label: {
                en: 'Label minimal',
            },
            type: 'Text',
            defaultValue: 'Choose files',
            hidden: content => content.uploaderType !== 'minimal',
        },
        labelInline: {
            label: {
                en: 'Label inline',
            },
            type: 'Text',
            defaultValue: 'Drop files',
            hidden: content => content.uploaderType !== 'inline',
        },
        multiple: {
            label: {
                en: 'Multiple',
            },
            type: 'OnOff',
            defaultValue: true,
        },
        isImageEditor: {
            label: {
                en: 'Image editor',
            },
            type: 'OnOff',
            defaultValue: true,
            hidden: content => content.uploaderType === 'minimal',
        },
        isImageOnly: {
            label: {
                en: 'Image only',
            },
            type: 'OnOff',
            defaultValue: true,
        },
        accept: {
            label: {
                en: 'Accept file types',
            },
            type: 'Text',
            defaultValue: '',
            hidden: content => content.isImageOnly,
            bindingValidation: {
                type: 'string',
                tooltip: 'e.g. .png, .jpg, .jpeg',
            },
            bindable: true,
        },
        idComponentBind: {
            label: {
                en: 'Files output variable',
            },
            type: 'Text',
            defaultValue: '',
            bindable: true,
        },
        metadata: {
            label: {
                en: 'Metadata',
            },
            type: 'Text',
            defaultValue: '',
            bindable: true,
        },
        removeCopyright: {
            label: {
                en: 'Remove copyright',
            },
            type: 'OnOff',
            defaultValue: true,
        },
        themeColor: {
            label: {
                en: 'Theme color',
            },
            type: 'Color',
            defaultValue: '#3771FF',
        },
    },
    triggerEvents: [
        {
            name: 'file:uploaded',
            label: { en: 'On file uploaded' },
            event: {},
        },
    ],
};
