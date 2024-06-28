import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CommonForm({ action, formControls, isBtnDisabled, btnType, buttonText, formData, setFormData, handleFileChange }) {


    function renderInputByComponentType(getCurrentControl,idx) {
        let content = null;

        switch (getCurrentControl.componentType) {
            case 'input':
                content = (
                    <div key={idx} className="relative flex items-center mt-8">
                        <Input
                            type="text"
                            disabled={getCurrentControl.disabled}
                            placeholder={getCurrentControl.placeholder}
                            name={getCurrentControl.name}
                            id={getCurrentControl.name}
                            value={formData[getCurrentControl.name]}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                )
                break;
            case "file":
                content = (
                    <Label key={idx} className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
                        htmlFor={getCurrentControl.name}
                    >
                        <h2>{getCurrentControl.label}</h2>
                        <Input
                            onChange={handleFileChange} id={getCurrentControl.name}
                            type="file"
                        />
                    </Label>
                )
                break;
            default:
                content = (
                    <div  key={idx} className="relative flex items-center mt-8">
                        <Input
                            type="text"
                            disabled={getCurrentControl.disabled}
                            placeholder={getCurrentControl.placeholder}
                            name={getCurrentControl.name}
                            id={getCurrentControl.name}
                            value={formData[getCurrentControl.name]}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                )
                break;
        }

        return content
    }

    return (
        <form action={action}>
            {
                formControls.map((controls,idx) => renderInputByComponentType(controls,idx))
            }
            <div className="mt-6 w-full">
                <Button
                    type={btnType || "submit"}
                    className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
                    disabled={!isBtnDisabled()}
                    >{buttonText}</Button>
            </div>
        </form>
    )
}