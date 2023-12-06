"use client"
import { Console } from "console";
import React from "react"
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import kittStaff from "../public/KittStaff.svg";

const CopyKitt: React.FC = () => {

    const ENDPOINT: string = 
    "https://ztc53mmd86.execute-api.us-west-1.amazonaws.com/prod/generate_snippet";
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const CHARACTER_LIMIT: number = 20;
    let resultsElement = null;
    let dispalyedElement = null;
    

    const onSubmit = () => {
        setIsLoading(true);
        console.log(`submitting: ${prompt}`);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then(res => res.json())
        .then(onResult);
    };

    const onResult = (data: any) => {
        setSnippet(data.snippet);
        setKeywords(data.keywords);
        setHasResult(true);
        setIsLoading(false);
    };

    const onReset = () => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
    };

    const FormElement = (
        <Form 
            prompt={prompt} 
            setPrompt={setPrompt} 
            onSubmit={onSubmit} 
            characterLimit={CHARACTER_LIMIT}
            isLoading={isLoading}
        />
    );

    const ResultsElement = (
        <Results 
            onBack={onReset}
            prompt={prompt}
            snippet={snippet}
            keywords={keywords} 
        />
    );

    if (hasResult) {
        dispalyedElement = ResultsElement;
    } else {
        dispalyedElement = FormElement;
    };

    const gradientTextStyle =
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

    return (
    <>
        <div className="h-screen flex">
            <div className="max-w-md m-auto p-2">
                <div className="bg-slate-800 p-5 rounded-lg">
                    <div className="text-center mb-6">
                        <Image className="mx-auto" src={kittStaff} width={150} height={150} alt="KittStaff" />
                        <h1 className={gradientTextStyle + " text-3xl font-light"}>
                            CopyKitt
                        </h1>
                        <div className={gradientTextStyle}>Your cutest AI branding assistant</div>
                    </div>
                    {dispalyedElement}
                </div>
            </div>
        </div>
    </>
    );
};

export default CopyKitt;
