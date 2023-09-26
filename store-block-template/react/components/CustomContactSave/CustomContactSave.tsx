import React,{ useState,useEffect,useRef } from "react";
import { useMutation } from 'react-apollo';
import ReCAPTCHA from "react-google-recaptcha"
import  saveDocument from "../../graphql/saveDocument.graphql"
import uploadFile from "../../graphql/uploadFile.graphql"
interface ContactForm {
    name: string
    email: string
    subject: string
    message: string
    file: any
  }
  
const CustomSave : StorefrontFunctionComponent = () => {
    const message = ''
    const captchaRef = useRef(null)
    const [contactFormData,setContactFormData] = useState<ContactForm>({
        name: '',
        email: '',
        subject: '',
        message: '',
        file: null
    })
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const [sitecapKey,setSiteKey] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [error,setError] = useState(false)
    const [msg, setMessage] = useState(message)
    const [success,setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [uploadfile] = useMutation(uploadFile)
    const [save] = useMutation(saveDocument)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target as any;
        setContactFormData((prevProps) => ({
            ...prevProps, [name]: value
        }))
    }
    const handleRecaptchaChange = (captchaString: string|null) => {
        if(captchaString){
            setRecaptchaToken(captchaString)
        }
    }

    useEffect(() => {
        fetchCaptcha()
    }, [])

    const fetchCaptcha = async () => {
        const data = await fetch('/v1/captcha')
        if(data.ok){
            const response = await data.json()
            if(response.siteKey)
                setSiteKey(response.siteKey)
        }
    }

    const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target as any;
        const { data } = await uploadfile({
            variables: { file: files[0] },
        })
        setContactFormData(
            {
                ...contactFormData, file: data.uploadFile.fileUrl
            }
        )
        setFile(data.uploadFile.fileUrl)
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("formdata" + JSON.stringify(contactFormData));
        event.preventDefault()
        if (!recaptchaToken) {
            setError(true)
            setMessage("Please verify the reCAPTCHA")
            return
        }
        setIsLoading(true);
        try {
            const savedData = await save({
                variables: {
                  dataEntity: 'SC',
                  document: { document: { ...contactFormData } },
                  schema: 'contactSchema',
                },
            })
            if(savedData){
                setSuccess(true)
                setMessage("Data Saved Successfully")
                setTimeout(() => {
                    setSuccess(false);
                    setMessage("");
                  }, 3000);
            }
        } catch (error) {
            console.error("Error:", error);
            setError(true)
            setMessage(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <article className={`mw5 mw7-ns pa4 ba b--black center black-80`}>
            <h2 className="b lh-copy tc">Contact Info</h2>
            <form onSubmit={handleFormSubmit} method="post" acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                        <div className="mt4">
                            <label className="f6 b db mb2">Name</label>
                            <input className="pa2 input-reset ba b--black-20 bg-transparent w-100 measure" value={contactFormData.name}
                             onChange={handleChange} type="text" name="name"  id="name" />
                        </div>
                        <div className="mt5">
                            <label className="f6 b db mb2">Email</label>
                            <input className="pa2 input-reset ba b--black-20 bg-transparent w-100 measure"
                              onChange={handleChange}
                             value={contactFormData.email} type="email" name="email"  id="email" /> 
                        </div>
                        <div className="mt5">
                            <label  className="f6 b db mb2">Subject</label>
                            <textarea id="subject"  value={contactFormData.subject}
                             onChange={handleChange}
                            name="subject" className="input-reset db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="subject-desc"></textarea>
                        </div>
                        <div className="mt5">
                            <label  className="f6 b db mb2">Message</label>
                            <textarea id="message" value={contactFormData.message}
                            onChange={handleChange}
                            name="message" className="input-reset db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="message-desc"></textarea>
                        </div>
                        <div className="mt5">
                            <label className="f6 b db mb2">Upload File:</label>
                            <input type="file" onChange={(e) => { handleFileUpload(e) }}
                            className="input-reset ba b--black-20 pa2 mb2 db w-100 measure" id="fileInput" name="fileInput" />
                        {file && <p>Selected file: {file}</p>}
                        </div>
                        {sitecapKey && 
                            <div className="mt5">
                                <label  className="f6 b db mb2">Recaptcha</label>
                                <ReCAPTCHA
                                    sitekey={sitecapKey}  ref={captchaRef}
                                    onChange={(e) => { handleRecaptchaChange(e) }}
                                /> 
                            </div>
                        }  
                        
                </fieldset>
                <div className="mt3 flex items-center justify-center">
                {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    ) : (
                        <input className="ma-aut0 mb2 dib dark-blue b ph3 pv2 ba b--black bg-transparent grow pointer f6"
                        type="submit" value="Submit" disabled={!recaptchaToken} />
                    )}
                </div>
            </form>
            {error && !success && (
                <p className="w-90 ba br2 pa3 ma2 red bg-washed-red" role="alert">
                    {msg}
                </p>
            )}
            {success && (
                <p className="w-90 ba br2 pa3 ma2 green bg-washed-green" role="alert">
                    {msg}
                </p>
            )}
        </article>
  
    )

}
export default CustomSave