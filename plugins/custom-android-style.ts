const { withAndroidStyles } = require('@expo/config-plugins');

const withCustomStyles = (config: { modResults: unknown }) => {
  return withAndroidStyles(config, async (config: { modResults: any }) => {
    config.modResults = applyCustomStyles(config.modResults);
    return config;
  });
};

function applyCustomStyles(styles: {
  resources: { style: { $: { name: string; parent: string }; item: { _: string; $: { name: string } }[] }[] };
}) {
  // Add items to the App Theme
  const appTheme = styles.resources.style.find((style: { $: { name: string } }) => style.$.name === 'AppTheme');
  if (appTheme) {
    appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:datePickerDialogTheme' } });
    appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:timePickerDialogTheme' } });
  }

  // Add new style definition
  styles.resources.style.push({
    $: { name: 'Dialog.Theme', parent: 'Theme.AppCompat.Light.Dialog' },
    item: [{ _: '#72A7FF', $: { name: 'colorAccent' } }],
  });

  return styles;
}

module.exports = withCustomStyles;
