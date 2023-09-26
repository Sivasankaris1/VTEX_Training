import React,{ useState,useEffect } from "react";
import { useLazyQuery } from 'react-apollo'
import  documents  from '../../graphql/getDocument.graphql'
import styles from './CustomContactData.css'
import { ImSpinner9 } from 'react-icons/im'
interface contactProps {
   showMoreText: string,
   showLessText: string,
   pageSize: number
}
const CustomContactData : StorefrontFunctionComponent<contactProps> = (props) => {
    const [allcontactdata, setAllContactdata] = useState<any>([])
    const [loadData, setLoadData] = useState(props.pageSize)
    const [loading, setLoading] = useState(true);
    const showMoreItems = () => {
        setLoadData((prevValue) => prevValue + props.pageSize);
    };
    const showLessItems = () => {
        setLoadData((prevValue) => prevValue - props.pageSize);
    };
    const baseQuery = {
        acronym : "SD",
        schema: "sankarischema"
    }
    const [getdata, { data , error  }] = useLazyQuery(documents, {
        variables: {
            ...baseQuery,
            fields: [
               'id',
                'name',
                'lname',
                'Subject',
                'Age'
            ],
            pageSize: loadData
        },
        ssr: false,
      })
      const contactData = allcontactdata?.map((doc: any) => doc?.fields)

        useEffect(() => {
            getdata();
            if (data) {
                setAllContactdata([...data?.documents])
                setLoading(false);
            }
            if (error) {
                console.error("GraphQL Error:", error);
            }
        }, [data, loading, error, loadData, getdata])
        const filteredData:any = []
        if(contactData && contactData.length > 0) {
            const uniqueValues = new Set(contactData)
            for(const item of uniqueValues) {
                filteredData.push(item)
            }
        }
        return (
            <>
             {loading ? ( 
                <div className={`tc ${styles.loader}`}>
                    <ImSpinner9 size={20} className="spin"/>
                </div>
             ) : ( 
                <>
                {filteredData.length > 0 ? (
                    <>
                        <div className="pa2">
                            <div className={`flex justify-between pv6 ph3 b--grey`}>
                                <table className={`f6 w-100 collapse row wrap ${styles.tableContainer}`} cellSpacing="0">
                                    <thead>
                                        <tr className="br">
                                            <th className="fw6 tc ba b--white-60 pt2 pb3 pr3">ID</th>
                                            <th className="fw6 tc ba b--white-60 pt2 pb3 pr3">First Name</th>
                                            <th className="fw6 tc ba b--white-60 pt2 pb3 pr3">Last Name</th>
                                            <th className="fw6 tc ba b--white-60 pt2 pb3 pr3">Subject</th>
                                            <th className="fw6 tc ba b--white-60 pt2 pb3 pr3">Age</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((data: any, dataIndex: number) => (
                                            <tr key={dataIndex}>
                                                <td className="mr4 pl3 pv3 pr3 ba b--white-60">{data.find((itemVal: any) => itemVal.key === "id")?.value}</td>
                                                <td className="mr4 pl3 pv3 pr3 ba b--white-60">{data.find((itemVal: any) => itemVal.key === "name")?.value}</td>
                                                <td className="mr4 pl3 pv3 pr3 ba b--white-60">{data.find((itemVal: any) => itemVal.key === "lname")?.value}</td>
                                                <td className="mr4 pl3 pv3 pr3 ba b--white-60">{data.find((itemVal: any) => itemVal.key === "Subject")?.value}</td>
                                                <td className="mr4 pl3 pv3 pr3 ba b--white-60">{data.find((itemVal: any) => itemVal.key === "Age")?.value}</td> 
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex items-center justify-center pa4">
                            <button onClick={showMoreItems} className="f5 br2 mr1 no-underline black bg-animate bg-blue inline-flex items-center pa3 ba border-box pl1 white">
                                {props.showMoreText}
                            </button>
                            <button onClick={showLessItems} className="f5 br2 no-underline black bg-animate bg-blue inline-flex items-center pa3 ba border-box mr4 pl1 white">
                                {props.showLessText}
                            </button>
                        </div>
                    </>
                    ) 
                    : (
                    <div>
                        <p className="tc">Unable to fetch data..</p>
                    </div>
                    )
                }
                </>
                ) }
            </>
        )
}

CustomContactData.schema = {
    title: "custom-contact-data",
    type : "object",
    properties: {
        showMoreText: {
            title: "Enter Text for showMore",
            type: "string"
        },
        showLessText: {
            title: "Enter Text for showLess",
            type: "string"
        },
        pageSize: {
            title: "Enter limit for data",
            type: "number"
        }
    }
}

export default CustomContactData