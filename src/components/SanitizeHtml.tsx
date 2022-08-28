import parse, { DOMNode, domToReact } from 'html-react-parser';
import { ElementType } from 'domelementtype';
import DOMPurify from 'isomorphic-dompurify';

type SanitizeHtmlProps = {
    htmlString: string;
};

export const SanitizeHtml = (props: SanitizeHtmlProps) => {
    const sanitize = (html: string) => {
        const sanitized = DOMPurify.sanitize(html);
        return sanitized;
    };

    const parsedHtml = parse(sanitize(props.htmlString), {
        replace: (node) => {
            if (node.type === ElementType.Tag) {
                const tag = node as any;
                if (tag && tag.name === 'pre') {
                    return (
                        <pre style={{ background: '#e9f2d9', padding: 10 }}>
                            {domToReact(tag.childNodes as DOMNode[])}
                        </pre>
                    );
                }
            }
        },
    });

    return <div style={{ overflowWrap: 'break-word' }}>{parsedHtml}</div>;
};
