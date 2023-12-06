interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
}


const Form: React.FC<FormProps> = (props) => {

    const isPromptValid = props.prompt.length < props.characterLimit;
    const updatePromptLimit = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPrompt(text);
        };
    };

    let statusColor = "text-slate-500";
    let statusText = null;
    if (!isPromptValid) {
        statusColor = "text-red-400";
        statusText = `Input must be less than ${props.characterLimit} characters`;
    };

    return (
    <>
        <div className="text-center text-gray-400 mb-6">
            <p>Ready for the brand you want to know?</p>
            <p>Let me give you a fascinating snippet!</p>
        </div>

        <input
            className="p-2 w-full rounded-lg focus:outline-teal-400 focus:outline text-black"
            type="text" 
            placeholder="coffee"
            value = {props.prompt}
            onChange={(e) => updatePromptLimit(e.currentTarget.value)}
        ></input>

        <div className={statusColor + " flex justify-between my-2 text-xs mb-6"}>
            <div>{statusText}</div>
            <div>{props.prompt.length} / {props.characterLimit}</div>
        </div>

        <button
            className="disabled:opacity-50 w-full p-2 rounded-md
            bg-gradient-to-r from-teal-400 to-blue-500 text-lg"
            disabled={!isPromptValid || props.isLoading} 
            onClick={props.onSubmit}
        >
            Submit 
        </button>
    </>
    );
};

export default Form;
