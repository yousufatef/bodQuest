import { Component } from 'react'

interface ErrorBoundaryProps {
    children?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            error: null
        };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center pt-[20%] h-full">
                    <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
                    <p className="text-red-600">{this.state.error?.toString()}</p>
                </div>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary