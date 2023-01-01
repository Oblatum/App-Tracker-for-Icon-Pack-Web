module.exports = {
  'src/**/*.{js,jsx,ts,vue}': ['prettier --write', 'eslint --max-warnings 0 --fix'],
  'src/**/*.{scss,css}': ['prettier --write', 'stylelint --fix --allow-empty-input'],
};
