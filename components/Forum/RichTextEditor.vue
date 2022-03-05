<template>
  <client-only placeholder="Loading...">
    <Editor
      :init="init"
      model-events="change keyup undo redo blur focus paste"
      output-format="html"
      :plugins="plugins"
      :toolbar="toolbar"
      v-model="content"
      @input="$emit('input', $event)"
    />
  </client-only>
</template>

<script>
if (process.client) {
  require('tinymce/tinymce')
  require('tinymce/themes/silver')
  require('tinymce/icons/default')
  require('tinymce/skins/ui/oxide/skin.min.css')
  // Plugins
  require('tinymce/plugins/lists')
  require('tinymce/plugins/link')
  require('tinymce/plugins/paste')
  require('tinymce/plugins/help')
  require('tinymce/plugins/wordcount')
  require('tinymce/plugins/autolink')
  require('tinymce/plugins/autosave')
  require('tinymce/plugins/codesample')
  require('tinymce/plugins/fullscreen')
  require('tinymce/plugins/hr')
  require('tinymce/plugins/table')
  require('tinymce/plugins/textpattern')
}
import Editor from '@tinymce/tinymce-vue'
import Prism from '~/plugins/prism'

export default {
  name: 'RichTextEditor',

  components: {
    Editor,
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

      init: {
        skin: false,
        content_css:
          '/material_kit/css/material-kit.min.css, /prism/prism-shades-of-purple.css',
        // Custom css
        content_style:
          'body { margin-left: 0.5rem; margin-right: 0.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }' +
          'img{ max-width: 100%; height: auto; }',
        // sets height
        height: '70vh',
        width: '100%',
        // hides MenuBar
        menubar: false,
        // sets default element in editor to div
        forced_root_block: 'div',
        // Sticky Toolbar. Note: it doesnt work on Mobile
        toolbar_sticky: true,
        block_formats:
          'Div=div; Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre',
        // Context menu options
        contextmenu: 'link | bold italic | codesample | restoredraft',

        // Link settings
        default_link_target: '_blank',
        link_default_protocol: 'https',
        link_assume_external_targets: 'https',
        link_class_list: [
          { title: 'None', value: '' },
          { title: 'Primary Link', value: 'link-primary' },
          { title: 'Secondary Link', value: 'link-secondary' },
          { title: 'Dark Link', value: 'link-dark' },
          { title: 'Success Link', value: 'link-success' },
          { title: 'Info Link', value: 'link-info' },
          { title: 'Warning Link', value: 'link-warning' },
          { title: 'Danger Link', value: 'link-danger' },
        ],

        // Autosave settings
        autosave_ask_before_unload: true,
        autosave_interval: '10s',
        autosave_restore_when_empty: true,
        autosave_retention: '10m',

        // codesample settings
        codesample_global_prismjs: true,
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' },
        ],
      },
      plugins:
        'lists link paste help wordcount autolink autosave codesample fullscreen hr table textpattern',
      toolbar:
        'undo redo | formatselect | bold italic link | table | bullist numlist hr | codesample fullscreen | help',
      toolbar_mode: 'floating',
    }
  },
}
</script>

<style scoped></style>
