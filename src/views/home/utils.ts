import { slugify } from 'transliteration';

export function appfilter(appName: string, packageName: string, activityName: string) {
  return `<!-- ${appName} -->
<item component="ComponentInfo{${packageName}/${activityName}}" drawable="${latinize(appName)}"/>
`;
}

function latinize(str: string) {
  const regex = /^[a-zA-Z]$/;
  const parsedText = slugify(str, {
    allowedChars: 'a-zA-Z0-9_',
    separator: '_',
    uppercase: false,
    lowercase: true,
    fixChineseSpacing: true,
    trim: true,
  });
  return regex.test(parsedText[0]) ? parsedText : `a${parsedText}`;
}
