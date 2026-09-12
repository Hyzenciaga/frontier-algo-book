import React from 'react';
import OriginalLink from '@theme-original/MDXComponents/A';
import type {Props} from '@theme/MDXComponents/A';

export default function ArticleLink(props: Props) {
  // Python attachments are files, not routes: Pages cannot serve a .py/ path.
  if (props.href?.includes('/assets/files/') && /\.py(?:[?#]|$)/.test(props.href)) {
    return <a href={props.href} download title={props.title} className={props.className}>{props.children}</a>;
  }
  return <OriginalLink {...props}/>;
}
