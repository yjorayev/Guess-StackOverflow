import { MessageBar, MessageBarType } from '@fluentui/react';

type ContainerProps = {
    error: string | undefined;
    children?: React.ReactNode;
};

export const Container = (props: ContainerProps) => {
    if (props.error) {
        return <MessageBar messageBarType={MessageBarType.error}>{props.error}</MessageBar>;
    }

    return <>{props.children}</>;
};
