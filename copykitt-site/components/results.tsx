interface ResultsProps {
    prompt: string;
    snippet: string;
    keywords: string [];
    onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
    const KeywordElements = [];
    for (let i = 0; i < props.keywords.length; i++) {
        KeywordElements.push(
            <div className="bg-teal-200 p-1 text-teal-700 rounded-md" key={i}>
                #{props.keywords[i]}
            </div>
        );
    };

    const KeywordHolder = (
        <div className="flex flex-wrap gap-2">
            {KeywordElements}
        </div>
    );


    const resultSection = (label: string, body: any) => {
        return (
            <div className="bg-slate-700 p-4 my-2 rounded-lg">
                <div className="text-slate-400 text-sm font-bold mb-4">
                    {label}
                </div>
                <div>
                    {body}
                </div>
            </div>
        );
    };


    return (
    <>
        <div className="mb-4">
            {resultSection("Prompt", <div className="text-md font-bold"> {props.prompt}</div>)}
            {resultSection("Snippet", <div> {props.snippet}</div>)}
            {resultSection("Keywords", KeywordHolder)}
        </div>
        <button
            onClick={props.onBack}
            className="disabled:opacity-50 w-full p-2 rounded-md
            bg-gradient-to-r from-teal-400 to-blue-500 text-lg"
        >
        Back
        </button>
    </>    
    );
};

export default Results;
