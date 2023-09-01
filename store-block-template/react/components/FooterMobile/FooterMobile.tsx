import React, { useState } from "react";
import { BsDashLg, BsPlusLg } from "react-icons/bs"
import styles from './FooterMobile.css'
import { FiArrowRight } from 'react-icons/fi'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
interface footerProps {
    menuLabel1: string,
    menuLabel2: string,
    menuLabel3: string,
    menu1 : menu[],
    menu2 : menu[],
    menu3: menu[],
    signupText: string,
    connectText: string,
    fbLink : string,
    instaLink : string,
    placeholderText: string,
    menu4: menu[]
}
type menu = {
    label: string,
    href: string
}

const FooterMobile: StorefrontFunctionComponent<footerProps> = (props) => {
    const [isMenuLabelOpen1,setIsMenuLabelOpen1] = useState(true)
    const [isMenuLabelOpen2,setIsMenuLabelOpen2] = useState(false)
    const [isMenuLabelOpen3,setIsMenuLabelOpen3] = useState(false)
    const toggleMenu1 = () => {
        setIsMenuLabelOpen1(!isMenuLabelOpen1)
    }
    const toggleMenu2 = () => {
        setIsMenuLabelOpen2(!isMenuLabelOpen2)
    }
    const toggleMenu3 = () => {
        setIsMenuLabelOpen3(!isMenuLabelOpen3)
    }
   return (
        <footer className="pa4">
            <div className="bg-light-gray">
                <div className="pt4 flex flex-wrap justify-between">
                    <div className="flex flex-column" onClick={toggleMenu1}>
                        <div>
                            <a className="pt2 b ml4">{props.menuLabel1}</a>
                            <span className={`${styles.addIcon} tr`}>{isMenuLabelOpen1 ? <BsDashLg /> : <BsPlusLg />}</span>
                        </div>
                        {isMenuLabelOpen1 && (
                            <div className="w-25-l w-50-m w-100">
                                <ul className={`${styles.listWrap}`}>
                                    <li className="mb2">
                                    {props.menu1?.map((menu: any, index: number) => {
                                        return (
                                            <a key={index} className={`${styles.menuItem} ml3 lh-copy`} href={menu.href}>
                                                {menu.label}
                                                {index !== menu.length - 1 && <br />}
                                            </a>
                                        )
                                    })}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="pt4 flex flex-wrap justify-between">
                    <div className="flex flex-column" onClick={toggleMenu2}>
                        <div>
                            <a className="b pt2 ml4">{props.menuLabel2}</a>
                            <span className={`${styles.addIcon} tr`}>{isMenuLabelOpen2 ? <BsDashLg /> : <BsPlusLg />}</span>
                        </div>
                        {isMenuLabelOpen2 && (
                            <div className="w-25-l w-50-m w-100">
                                <ul className={`${styles.listWrap}`}>
                                    <li className="mb2">
                                    {props.menu2?.map((menu: any, index: number) => {
                                        return (
                                            <a key={index} className={`${styles.menuItem} ml3 lh-copy`} href={menu.href}>
                                                {menu.label}
                                                {index !== menu.length - 1 && <br />}
                                            </a>
                                        )
                                    })}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="pt4 flex flex-wrap justify-between">
                    <div className="flex flex-column" onClick={toggleMenu3}>
                        <div>
                            <a className="b pt2 ml4">{props.menuLabel3}</a>
                            <span className={`${styles.addIcon} tr`}>{isMenuLabelOpen3 ? <BsDashLg /> : <BsPlusLg />}</span>
                        </div>
                        {isMenuLabelOpen3 && (
                            <div className="w-25-l w-50-m w-100">
                                <ul className={`${styles.listWrap}`}>
                                    <li className="mb2">
                                    {props.menu3?.map((menu: any, index: number) => {
                                        return (
                                            <a key={index} className={`${styles.menuItem} ml3 lh-copy`} href={menu.href}>
                                                {menu.label}
                                                {index !== menu.length - 1 && <br />}
                                            </a>
                                        )
                                    })}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="w-25-l w-50-m w-100">
                        <div className="pa2 ml3">
                            <h3 className="fw5 f4 measure-narrow">{props.signupText}</h3>
                        </div>
                        <div className={`${styles.newsletter}`}>
                            <form className={`${styles.inputForm} ml3`}>
                                <input type="text" placeholder={props.placeholderText} className={`pl5 mb3 w-90
                                    h2 ${styles.inputBox}`} />
                                    <span className={`tj ${styles.arrow}`}><FiArrowRight size={20} /></span>     
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className={`${styles.socialDiv} ml3`}> 
                        <h3 className="tr fw4 measure-narrow">{props.connectText}</h3>
                    </div>
                    <div className={`tr ${styles.socialIcons} ml3 mt2`}>
                        <span className="mr2">
                            <a className={`${styles.iconItem}`} href={props.instaLink}>
                                <FaInstagram size={20} className="social" />
                            </a>
                        </span>
                        <span>
                            <a className={`${styles.iconItem}`} href={props.fbLink}>
                                <FaFacebookF size={20} className="social" />
                            </a>
                        </span>
                    </div>
                </div>
                <div className="mt6 pv4 flex flex-wrap justify-between">
                    <ul className={`${styles.listWrapper}`}>
                            {props.menu4?.map((menu: any, index: number) => {
                                return (
                                    <li key={index} className={`${styles.listItem}`}> 
                                        <a className="ml3 f6 lh-copy" href="#">{menu.label}</a>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </div>
        </footer>
   )
}

FooterMobile.schema = {
    title: "Custom-mobile-footer",
    type: "object",
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
            title: "Enter Text for socialIcon"
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

export default FooterMobile