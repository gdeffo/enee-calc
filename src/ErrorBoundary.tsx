import React, { Component } from 'react';

type State = {
    hasError: boolean
    error: Error | null
    [key: string]: any
}

export default class ErrorBoundary extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error: Error) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            // return <h1>Something went wrong.</h1>;
            const name = this.state.error?.name;
            const message = this.state.error?.message;
            return (
                <div className="container d-flex p-5 mt-5">
                    <div className="alert alert-danger mx-auto">{`${name}: ${message}`}</div>
                </div>
            )
        }

        return this.props.children;
    }
}