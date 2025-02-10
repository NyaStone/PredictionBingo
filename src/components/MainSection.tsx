interface MainSectionProps {
    children: React.ReactNode;
}

function MainSection({ children }: MainSectionProps) {
    return (
        <div className="w-full px-4 mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl min-h-screen bg-gray-900 py-8">
            {children}
        </div>
    );
}

export default MainSection;