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
          'bold',
          'italic',
          'underline',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'alignment',
          'outdent',
          'indent',
          '|',
          'code',
          'codeBlock',
          '|',
          'blockQuote',
          'undo',
          'redo',
          'highlight',
        ],
        /* Alignment, AutoImage, Autoformat, Autolink, BlockQuote, Bold, CloudServices, Code, CodeBlock, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, Heading, Highlight, HorizontalLine, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, LinkImage, List, ListStyle, MathType, MediaEmbed, MediaEmbedToolbar, PageBreak, Paragraph, PasteFromOffice, RemoveFormat, SimpleUploadAdapter, SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText, Strikethrough, Subscript, Superscript, Table, TableCellProperties, TableProperties, TableToolbar, TextTransformation, Title, TodoList, Underline, WordCount */
        removePlugins: [
          'Title',
          'ImageCaption',
          'ImageInsert',
          'LinkImage',
          'SimpleUploadAdapter',
          'ImageUpload',
          'ImageStyle',
          'ImageToolbar',
          'ImageResize',
          'Image',
          'HorizontalLine',
          'FontFamily',
          'FontSize',
          'FontBackgroundColor',
          'CloudServices',
          'Autoformat',
          'MediaEmbedToolbar',
          'uploadimage',
          'AutoImage',
          'Base64UploadAdapter',
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
