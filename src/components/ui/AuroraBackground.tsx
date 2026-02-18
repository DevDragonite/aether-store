export function AuroraBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-aether-darker pointer-events-none">
            {/* Base dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aether-darker/90" />

            {/* Aurora blobs */}
            <div
                className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] opacity-50 animate-aurora blur-[100px]"
                style={{
                    backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.5), transparent 50%),
                radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.5), transparent 50%),
                radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.5), transparent 50%)
            `,
                    backgroundSize: '100% 100%',
                }}
            />

            {/* Stars / Dust overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
