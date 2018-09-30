import React from 'react';

class UnorderedList extends React.Component {
    render() {
        let childNodes = null;
        const content = this.props.content.name || this.props.content;

        if (this.props.children) {
            childNodes = this.props.children.map(node =>
                <UnorderedList content={node} key={node} />
            );
        }

        return (
            <li key={content}>
                <span>{content}</span>
                {childNodes ? <ul>{childNodes}</ul> : null}
            </li>
        );
    }
}

export default UnorderedList;
