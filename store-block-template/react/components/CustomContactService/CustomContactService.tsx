import React, { useState, useEffect} from "react"
import styles from './CustomContactService.css'
const CustomContactService: StorefrontFunctionComponent = () => {
  const [contactData,setContactData] = useState([])
  const [err,setError] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchContactData()
  }, [])

  const fetchContactData = async () => {
      const responseData = await fetch('/v1/contact')
      if(responseData.ok){
        const data = await responseData.json()
        setContactData(data)
        setLoading(false)
      }else{
        setError("Failed in retrieving data")
        setLoading(false)
      }
  }

    return (
        <div className="pa2">
          {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    ) : ''
          }
            <div className={`flex flex-column justify-between pv6 ph3 b--grey`}>
                {err ? ( 
                  <p className="w-90 ba tc br2 pa3 ma2 red bg-washed-red" role="alert">
                    {err}
                  </p>
                ) : ( 
                  <>
                    <div className="tc">
                      <h4 className="f6 f2-m f-subheadline-l fw6">Contact Data Using API</h4>
                    </div>
                    <table className={`f6 w-100 collapse row wrap`} cellSpacing="0">
                        <thead>
                            <tr className={`br`}>
                                <th className="fw6 tc ba b--black-60 pt2 pb3 pr3">ID</th>
                                <th className="fw6 tc ba b--black-60 pt2 pb3 pr3">Name</th>
                                <th className="fw6 tc ba b--black-60 pt2 pb3 pr3">Email</th>
                                <th className="fw6 tc ba b--black-60 pt2 pb3 pr3">Subject</th>
                                <th className="fw6 tc ba b--black-60 pt2 pb3 pr3">Message</th>
                                <th className="fw6 tc ba b--black-60 pt2 pb3 pr3">Uploaded File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactData.map((data: any, dataIndex: number) => (
                                <tr key={dataIndex} className={`${styles.striped}`}>
                                    <td className="mr4 pl3 pv3 pr3 ba b--black-60">{data?.id}</td>
                                    <td className="mr4 pl3 pv3 pr3 ba b--black-60">{data?.name}</td>
                                    <td className="mr4 pl3 pv3 pr3 ba b--black-60">{data?.email}</td>
                                    <td className="mr4 pl3 pv3 pr3 ba b--black-60">{data?.subject}</td>
                                    <td className="mr4 pl3 pv3 pr3 ba b--black-60">{data?.message}</td>
                                    <td className="mr4 pl3 pv3 pr3 ba b--black-60">{data?.file}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </>
                )}
            </div>
        </div>
    )
}

export default CustomContactService