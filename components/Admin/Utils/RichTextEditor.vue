<template>
  <client-only placeholder="loading..." class="w-100">
    <ckeditor-nuxt
      :config="editorConfig"
      v-model="content"
      @input="$emit('input', $event)"
    />
  </client-only>
</template>

<script>
export default {
  name: 'RichTextEditor',

  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  props: {
    content: '',
  },

  data() {
    return {
      editorConfig: {
        width: 'auto',
        height: '500',
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
          'sourceEditing',
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
        removePlugins: ['Title'],
      },
    }
  },
}
</script>

<style></style>
