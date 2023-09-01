import React from 'react'
import styles from './FooterDesktop.css'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

interface footerProps {
    menuLabel1: string,
    menuLabel2: string,
    menuLabel3: string,
    menu1 : menu[],
    menu2 : menu[],
    menu3: menu[],
    menu4: menu[],
    imageList : imageList[],
    signupText: string,
    connectText: string,
    fbLink : string,
    instaLink : string,
    placeholderText: string
}
type menu = {
    label: string,
    href: string
}
type imageList = {
    image : string,
    href: string
}
const FooterDesktop: StorefrontFunctionComponent<footerProps> = (props) => {
    return (
        <footer className="pa4">
            <div className="bg-light-gray">
                <div className="flex flex-wrap justify-between">
                    <div className="w-25-l w-50-m w-100">
                        <ul className="list pl0">
                            <li className="mb2 mt7">
                                <p className="ml7 b"> {props.menuLabel1} </p>
                            </li>
                            <li className="mb2 ml7">
                                {props.menu1?.map((menu: any, index: number) => {
                                    return (
                                        <a key={index} className={`lh-copy ${styles.menuItemd} `} href={menu.href}>
                                            {menu.label}
                                            {index !== menu.length - 1 && <br />}
                                        </a>
                                    )
                                })}
                            </li>
                        </ul>
                    </div>
                    <div className="w-25-l w-50-m w-100">
                        <ul className="list pl0">
                            <li className="mb2 mt7">
                                <p className="ml7 b"> {props.menuLabel2} </p>
                            </li>
                            <li className="mb2 ml7">
                                {props.menu2?.map((menu: any, index: number) => {
                                    return (
                                        <a key={index} className={`${styles.menuItemd} lh-copy `} href={menu.href}>
                                            {menu.label}
                                            {index !== menu.length - 1 && <br />}
                                        </a>
                                    )
                                })}
                            </li>
                        </ul>
                    </div>
                    <div className="w-25-l w-50-m w-100">
                        <ul className="list pl0">
                            <li className="mb2 mt7">
                                <p className="ml7 b"> {props.menuLabel3} </p>
                            </li>
                            <li className="mb2 ml7">
                                {props.menu3?.map((menu: any, index: number) => {
                                    return (
                                        <a key={index} className={`${styles.menuItemd} lh-copy `} href={menu.href}>
                                            {menu.label}
                                            {index !== menu.length - 1 && <br />}
                                        </a>
                                    )
                                })}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="w-25-l w-50-m w-100">
                        <div className="pa2 ml7">
                            <h3 className="fw5 f4 measure-narrow">{props.signupText}</h3>
                        </div>
                        <div className={`${styles.newsletterd}`}>
                            <form className={`${styles.inputFormd} ml7`}>
                                <input type="text" placeholder={props.placeholderText} className={`pl5 mb3 w-75
h2 ${styles.inputBoxd}`} />
                                    <span className={`tj ${styles.arrowd}`}><FiArrowRight size={20} /></span>     
                            </form>
                        </div>
                    </div>
                    <div className={`${styles.socialDiv} w-25-l w-50-m w-100`}>
                        <div className="pa2"> 
                            <h3 className="tr ml4 fw4 measure-narrow">{props.connectText}</h3>
                        </div>
                        <div className={`pt3 ml4 ${styles.socialIconsd}`}>
                            <span>
                                <a className={`${styles.iconItemd}`} href={props.instaLink}>
                                    <FaInstagram size={20} className="social" />
                                </a>
                            </span>
                            <span>
                                <a className={`${styles.iconItemd}`} href={props.fbLink}>
                                    <FaFacebookF size={20} className="social" />
                                </a>
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <ul className={`${styles.listWrapperd}`}>
                                    {props.menu4?.map((menu: any, index: number) => {
                                        return (
                                            <li key={index} className={`${styles.listItemd}`}>
                                                <a className="ml5 f6 lh-copy" href="#">{menu.label}</a>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>   
            </div>
        </footer>
    )
}
FooterDesktop.schema = {
    title: "custom-desktop-footer",
    type : "object",
    properties: {
        menuLabel1: {
            type: "string",
            title: "Enter label1 "
        },
        menu1: {
            title: "Menu 1",
            type : "array",
            items : {
                properties : {
                    label: {
                        type: "string",
                        title: "Enter label for menu1"
                    },
                    href: {
                        type:"string",
                        title: "Enter href value"
                    }
                }
            }
        },
        menuLabel2: {
            type: "string",
            title: "Enter label2 "
        },
        menu2: {
            title: "Menu 2",
            type : "array",
            items : {
                properties : {
                    label: {
                        type: "string",
                        title: "Enter label for menu2"
                    },
                    href: {
                        type:"string",
                        title: "Enter href value"
                    }
                }
            }
        },
        menuLabel3: {
            type: "string",
            title: "Enter label3 "
        },
        menu3: {
            title: "Menu 3",
            type : "array",
            items : {
                properties : {
                    label: {
                        type: "string",
                        title: "Enter label for menu3"
                    },
                    href: {
                        type:"string",
                        title: "Enter href value"
                    }
                }
            }
        },
        signupText: {
            type: "string",
            title: "Enter Signup text"
        },
        connectText: {
            type: "string",
            title: "Enter Text"
        },
        fbLink: {
            type: "string",
            title: "Enter Facebook Link "
        },
        instaLink: {
            type: "string",
            title: "Enter Instagram Link"
        },
        placeholderText: {
            type: "string",
            title: "Enter placeholder"
        },
        menu4: {
            title: "Bottom row menu",
            type : "array",
            items : {
                properties : {
                    label: {
                        type: "string",
                        title: "Enter label for menu4"
                    },
                    href: {
                        type:"string",
                        title: "Enter href value"
                    }
                }
            }
        }
    }
}

export default FooterDesktop