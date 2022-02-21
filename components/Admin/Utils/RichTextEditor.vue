<template>
  <div placeholder="loading..." class="w-100">
    <ckeditor-nuxt
      :config="editorConfig"
      v-model="content"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'RichTextEditor',

  components: {
    'ckeditor-nuxt': () => {
      return import('@blowstack/ckeditor-nuxt')
    },
  },

  props: {
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: '',

      editorConfig: {
        width: 'auto',
        toolbar: [
          'heading',
          '|',
          'underline',
          'bold',
          'italic',
          'strikethrough',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'insertTable',
          'insertImage',
          'mediaEmbed',
          '|',
          'outdent',
          'indent',
          '|',
          'undo',
          'redo',
          '|',
          'alignment',
          '|',
          'fontColor',
          'fontSize',
          'highlight',
          '|',
          'codeBlock',
          'code',
          '|',
          'subscript',
          'superscript',
          'horizontalLine',
        ],
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties',
          ],
        },

        removePlugins: [
          'Title',
          'MediaEmbedToolbar',
          'SimpleUploadAdapter',
          'ImageToolbar',
          'Base64UploadAdapter',
          'CKFinder',
        ],
      },
    }
  },
}
</script>

<style scoped>
.customWidth + div.ck.ck-editor.ck-reset.ck-rounded-corners {
  width: 100% !important;
}
.ck-editor__editable_inline {
  min-height: 400px;
}
</style>
