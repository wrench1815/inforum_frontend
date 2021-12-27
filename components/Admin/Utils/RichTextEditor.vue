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
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
          'alignment',
          '|',
          'fontColor',
          'fontBackgroundColor',
          'fontFamily',
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
        removePlugins: ['Title', 'MediaEmbedToolbar'],
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
